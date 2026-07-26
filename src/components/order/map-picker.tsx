"use client";

import * as React from "react";
import type { Map as LeafletMap, LeafletMouseEvent } from "leaflet";
import { Crosshair, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

const OTTAWA: [number, number] = [45.4215, -75.6972];

/**
 * Location picker in the ride-hailing style: a clean, low-noise basemap with a
 * pin fixed to the centre of the viewport. The customer moves the map under the
 * pin instead of trying to tap an exact point — far easier on a phone. The pin
 * lifts while the map moves and drops when it settles, then the coordinates are
 * reverse-geocoded into the address field.
 *
 * Leaflet and the tiles load only when this component mounts (the panel is
 * opened on demand), so they never affect first paint.
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
  const mapRef = React.useRef<LeafletMap | null>(null);
  const onPickRef = React.useRef(onPick);
  const onAddressRef = React.useRef(onAddress);
  React.useEffect(() => {
    onPickRef.current = onPick;
    onAddressRef.current = onAddress;
  });

  // seed the starting view once; the map centre drives the value from then on
  const initial = React.useRef({ lat, lng });

  const [moving, setMoving] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [locating, setLocating] = React.useState(false);
  const [resolving, setResolving] = React.useState(false);
  // `lat` is only read for the very first render; the map centre drives it after
  const [touched, setTouched] = React.useState(lat !== null);
  const [geoError, setGeoError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;
    let abort: AbortController | null = null;
    let timer: number | undefined;

    async function reverseGeocode(la: number, lo: number) {
      if (!onAddressRef.current) return;
      abort?.abort();
      abort = new AbortController();
      setResolving(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&lat=${la}&lon=${lo}`,
          { headers: { Accept: "application/json" }, signal: abort.signal },
        );
        const data = await res.json();
        if (!cancelled && data?.display_name) onAddressRef.current?.(data.display_name);
      } catch {
        /* keep whatever the customer typed */
      } finally {
        if (!cancelled) setResolving(false);
      }
    }

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const start = initial.current;
      const center: [number, number] =
        start.lat != null && start.lng != null ? [start.lat, start.lng] : OTTAWA;

      map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        // no glide-past after a drag: the pin has to land exactly where the
        // customer let go, otherwise placing it precisely is a fight
        inertia: false,
      }).setView(center, start.lat != null ? 17 : 12);
      mapRef.current = map;

      // Positron — a quiet, mostly-monochrome basemap that keeps the pin and
      // the surrounding UI the loudest things on screen.
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
          subdomains: "abcd",
          detectRetina: true,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      map.on("movestart", () => setMoving(true));
      map.on("moveend", () => {
        setMoving(false);
        if (!map) return;
        const c = map.getCenter();
        setTouched(true);
        onPickRef.current(c.lat, c.lng);
        window.clearTimeout(timer);
        timer = window.setTimeout(() => reverseGeocode(c.lat, c.lng), 250);
      });

      // clicking pans the centre (and therefore the pin) to that point
      map.on("click", (e: LeafletMouseEvent) => map?.panTo(e.latlng));

      window.setTimeout(() => {
        map?.invalidateSize();
        if (!cancelled) setReady(true);
      }, 80);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      abort?.abort();
      map?.remove();
      map = null;
      mapRef.current = null;
    };
    // initialised once — the map centre is the source of truth afterwards
  }, []);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setGeoError("Your browser can't share a location.");
      return;
    }
    setGeoError("");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        // snap rather than fly — instant and reliable, and it settles the pin
        // (and the address lookup) right away
        mapRef.current?.setView(
          [pos.coords.latitude, pos.coords.longitude],
          17,
        );
      },
      () => {
        setLocating(false);
        setGeoError("We couldn't get your location. Move the map instead.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-line">
        <div
          ref={containerRef}
          className="handycore-map h-64 w-full bg-surface sm:h-72"
          aria-label="Map — move the map to place the pin on your location"
        />

        {/* centre pin — its tip marks the exact point */}
        <div className="pointer-events-none absolute inset-0 z-[500] flex items-center justify-center">
          <div className="flex flex-col items-center" style={{ marginTop: -34 }}>
            <div
              className={cn(
                "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                moving ? "-translate-y-2" : "translate-y-0",
              )}
            >
              <svg width="30" height="40" viewBox="0 0 30 40" fill="none" aria-hidden>
                <path
                  d="M15 1c7.2 0 13 5.6 13 12.6C28 23 15 37 15 37S2 23 2 13.6C2 6.6 7.8 1 15 1z"
                  fill="#F4B400"
                  stroke="#121212"
                  strokeWidth="2"
                />
                <circle cx="15" cy="13.5" r="4.6" fill="#121212" />
              </svg>
            </div>
            <span
              className={cn(
                "h-1.5 rounded-full bg-ink/25 blur-[1px] transition-all duration-200",
                moving ? "w-2 opacity-40" : "w-3.5 opacity-70",
              )}
            />
          </div>
        </div>

        {/* use my location */}
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating || !ready}
          aria-label="Use my current location"
          className="absolute right-3 top-3 z-[600] inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow-lift ring-1 ring-black/5 transition-colors hover:bg-surface disabled:opacity-60"
        >
          {locating ? (
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
          ) : (
            <Crosshair className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* hint / status */}
        <div className="pointer-events-none absolute inset-x-3 top-3 z-[550] flex justify-start">
          <span
            className={cn(
              "rounded-full bg-ink/80 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition-opacity",
              touched ? "opacity-0" : "opacity-100",
            )}
          >
            Move the map to place the pin
          </span>
        </div>
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
        {resolving ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            Finding the address…
          </>
        ) : (
          "Drag the map, or use the crosshair to jump to where you are."
        )}
      </p>
      {geoError && <p className="mt-1 text-xs text-amber-600">{geoError}</p>}
    </div>
  );
}
