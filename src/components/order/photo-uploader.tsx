"use client";

import * as React from "react";
import { ImagePlus, X } from "lucide-react";
import { useOrder, type OrderPhoto } from "./order-context";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function PhotoUploader() {
  const { photos, addPhotos, removePhoto } = useOrder();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState("");

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError("");
    const incoming = Array.from(fileList);
    const room = MAX_FILES - photos.length;
    const accepted: OrderPhoto[] = [];
    const problems: string[] = [];

    for (const file of incoming) {
      if (accepted.length >= room) {
        problems.push(`Up to ${MAX_FILES} photos.`);
        break;
      }
      if (!ACCEPTED.includes(file.type)) {
        problems.push(`${file.name}: only JPG, PNG or WebP.`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        problems.push(`${file.name}: over 5 MB.`);
        continue;
      }
      accepted.push({
        id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file),
        file,
      });
    }

    if (accepted.length) addPhotos(accepted);
    if (problems.length) setError(problems[0]);
    if (inputRef.current) inputRef.current.value = "";
  }

  const full = photos.length >= MAX_FILES;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.preview}
              alt={photo.name}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(photo.id)}
              aria-label={`Remove ${photo.name}`}
              className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink/80 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {!full && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-strong bg-surface text-muted transition-colors hover:border-brand hover:text-ink"
          >
            <ImagePlus className="h-6 w-6" strokeWidth={1.6} />
            <span className="text-[11px] font-semibold">Add photo</span>
          </button>
        )}
      </div>

      <p className="mt-2.5 text-xs text-muted">
        {photos.length}/{MAX_FILES} · JPG, PNG or WebP · up to 5 MB each.
      </p>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
