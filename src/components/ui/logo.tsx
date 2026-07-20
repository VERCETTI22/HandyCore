import * as React from "react";
import { cn } from "@/lib/utils";

/** Claw-hammer head silhouette (claw hooks up-left, face drops down). */
const HEAD_PATH =
  "M16.5 15 C13.5 13.5 10.5 11 7.5 10 C5.5 9.4 3.2 10.2 3 12.2 C2.85 13.9 4.3 14.7 5.8 15.1 C8 15.7 9.6 16.8 10.6 18.2 L10.6 27 C10.6 29.4 12 31 14.2 31 L16.5 31 Z";

const GOLD = "#d9a64e";

/**
 * HandyCore lockup: an "H" crossed by a gold hammer, plus the wordmark.
 * Colours adapt so the mark reads on both light and dark surfaces.
 */
export function Logo({
  tone = "light",
  withTagline = false,
  className,
}: {
  tone?: "light" | "dark";
  withTagline?: boolean;
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <HammerH
        letter={isDark ? "#ffffff" : "#0f0f0f"}
        outline={isDark ? "#0f0f0f" : "#ffffff"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.3rem] font-extrabold tracking-[-0.02em]",
            isDark ? "text-white" : "text-ink",
          )}
        >
          Handy
          <span className={isDark ? "text-brand" : "text-brand-700"}>Core</span>
        </span>
        {withTagline && (
          <span
            className={cn(
              "mt-2 text-[0.5rem] font-semibold uppercase tracking-[0.22em]",
              isDark ? "text-white/50" : "text-muted",
            )}
          >
            Reliable. Skilled. Dependable.
          </span>
        )}
      </span>
    </span>
  );
}

function HammerH({ letter, outline }: { letter: string; outline: string }) {
  return (
    <svg
      width="40"
      height="38"
      viewBox="0 0 42 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* the H */}
      <g fill={letter}>
        <rect x="12" y="2" width="8" height="36" rx="1" />
        <rect x="30" y="2" width="8" height="36" rx="1" />
        <rect x="12" y="16.4" width="26" height="7.2" />
      </g>

      {/* separation halo so the hammer reads on top of the H */}
      <g fill={outline} stroke={outline} strokeWidth="3.2" strokeLinejoin="round">
        <path d={HEAD_PATH} />
        <rect x="14" y="18.2" width="25" height="5.6" rx="2.8" />
      </g>

      {/* the hammer */}
      <g fill={GOLD}>
        <path d={HEAD_PATH} />
        <rect x="14" y="18.2" width="25" height="5.6" rx="2.8" />
      </g>
    </svg>
  );
}
