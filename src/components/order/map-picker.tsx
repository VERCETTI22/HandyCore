"use client";

import * as React from "react";
import type { Map as LeafletMap, Marker, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

const OTTAWA: [number, number] = [45.4215, -75.6972];

const PIN_SVG = `<svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg"><path d="M14 0C6.3 0 0 6.1 0 13.7 0 24 14 38 14 38s14-14 14-24.3C28 6.1 21.7 0 14 0z" fill="#F4B400" stroke="#121212" stroke-width="1.5"/><circle cx="14" cy="13.5" r="4.5" fill="#121212"/></svg>`;

/**
 * Lightweight location picker. Loads Leaflet + OpenStreetMap only when mounted
 * (the map panel is opened on demand), so it never weighs down first paint.
 * Tap/drag drops a pin; the coordinates are reverse-geocoded into an address.
 */
export function MapPicker({
  lat,
  lng,
  onPick,
  onAddress,
}: {
  lat: number | null;
  lng: number | null;
  onPick: (lat: number, lng: number) => void;
  onAddress?: (address: string) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const onPickRef = React.useRef(onPick);
  const onAddressRef = React.useRef(onAddress);
  React.useEffect(() => {
    onPickRef.current = onPick;
    onAddressRef.current = onAddress;
  });
  // read the initial coordinates once; live updates come through props elsewhere
  const initial = React.useRef({ lat, lng });

  React.useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;
    let marker: Marker | null = null;

    async function reverseGeocode(la: number, lo: number) {
      if (!onAddressRef.current) return;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${la}&lon=${lo}`,
          { headers: { Accept: "application/json" } },
        );
        const data = await res.json();
        if (data?.display_name) onAddressRef.current(data.display_name);
      } catch {
        /* keep whatever the user typed */
      }
    }

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const start = initial.current;
      const center: [number, number] =
        start.lat != null && start.lng != null ? [start.lat, start.lng] : OTTAWA;

      map = L.map(containerRef.current, { zoomControl: true }).setView(
        center,
        start.lat != null ? 15 : 12,
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      const icon = L.divIcon({
        className: "handycore-pin",
        html: PIN_SVG,
        iconSize: [28, 38],
        iconAnchor: [14, 37],
      });

      const place = (la: number, lo: number) => {
        if (!map) return;
        if (marker) {
          marker.setLatLng([la, lo]);
        } else {
          marker = L.marker([la, lo], { icon, draggable: true }).addTo(map);
          marker.on("dragend", () => {
            const p = marker!.getLatLng();
            onPickRef.current(p.lat, p.lng);
            reverseGeocode(p.lat, p.lng);
          });
        }
      };

      if (start.lat != null && start.lng != null) place(start.lat, start.lng);

      map.on("click", (e: LeafletMouseEvent) => {
        place(e.latlng.lat, e.latlng.lng);
        onPickRef.current(e.latlng.lat, e.latlng.lng);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      });

      // the panel expands with an animation — recalc size once it's settled
      window.setTimeout(() => map?.invalidateSize(), 80);
    })();

    return () => {
      cancelled = true;
      map?.remove();
      map = null;
      marker = null;
    };
    // init once; coordinates are seeded from the ref above
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-60 w-full overflow-hidden rounded-2xl ring-1 ring-line"
      role="application"
      aria-label="Map — tap to drop a pin on your location"
    />
  );
}
