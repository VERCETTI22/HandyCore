import * as React from "react";

/** TV-mounting project shown before (on a stand, cables everywhere) and after
 *  (wall-mounted, cables hidden, tidy console). Shares geometry with the
 *  living-room scene so it reads as the same room type. */
export function TvWallScene({
  state,
  className,
}: {
  state: "before" | "after";
  className?: string;
}) {
  const after = state === "after";
  const wall = after ? "#f2ede1" : "#dad9d3";
  const floor = after ? "#e7ddcb" : "#d6cfc2";

  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      role="img"
      aria-label={after ? "TV cleanly wall-mounted" : "Old TV on a stand with tangled cables"}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="900" height="600" fill={wall} />
      <rect y="470" width="900" height="130" fill={floor} />
      <rect y="468" width="900" height="3" fill="#12121212" />

      {after && (
        <path d="M330 90 L560 90 L600 460 L300 460 Z" fill="#ffffff" opacity="0.16" />
      )}

      {!after && (
        <g stroke="#b6b5ac" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9">
          <path d="M470 120 q14 40 -6 78" />
          <rect x="452" y="104" width="8" height="8" rx="2" fill="#b6b5ac" stroke="none" />
        </g>
      )}

      {after ? (
        <g>
          {/* wall-mounted flat TV */}
          <rect x="300" y="118" width="300" height="180" rx="12" fill="#121212" />
          <rect x="312" y="130" width="276" height="156" rx="6" fill="#1b1b1b" />
          <path d="M330 150 L400 262" stroke="#d9a64e" strokeWidth="6" opacity="0.25" strokeLinecap="round" />
          {/* soundbar */}
          <rect x="336" y="312" width="228" height="16" rx="8" fill="#1b1b1b" />
          {/* floating console */}
          <rect x="250" y="372" width="400" height="82" rx="14" fill="#d9c7ad" />
          <rect x="250" y="372" width="400" height="82" rx="14" fill="none" stroke="#00000010" strokeWidth="2" />
          <line x1="450" y1="380" x2="450" y2="446" stroke="#00000018" strokeWidth="2" />
          <circle cx="438" cy="414" r="4" fill="#121212" />
          <circle cx="462" cy="414" r="4" fill="#121212" />
          {/* styling on console */}
          <rect x="286" y="342" width="12" height="30" rx="2" fill="#121212" />
          <rect x="300" y="348" width="12" height="24" rx="2" fill="#d9a64e" />
          <g>
            <path d="M600 372 h34 l-6 -34 h-22 z" fill="#121212" />
            <path d="M617 338 C 606 320 604 306 620 296 C 624 316 626 328 617 338 Z" fill="#1c1c1c" />
            <path d="M617 338 C 628 320 630 306 614 296 C 610 316 608 328 617 338 Z" fill="#d9a64e" />
          </g>
        </g>
      ) : (
        <g>
          {/* old TV stand + bulky TV */}
          <rect x="286" y="366" width="330" height="104" rx="6" fill="#c2beb2" />
          <rect x="286" y="366" width="330" height="14" rx="6" fill="#b4b0a4" />
          <rect x="336" y="236" width="230" height="150" rx="8" fill="#3a3a36" />
          <rect x="350" y="250" width="202" height="122" rx="4" fill="#2b2b28" />
          {/* tangled cables */}
          <g stroke="#8f8e86" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M420 386 q-30 40 10 60 q40 20 -10 34" />
            <path d="M470 386 q30 30 -6 54 q-30 18 20 30" />
            <path d="M510 386 q10 46 -40 60" />
          </g>
        </g>
      )}
    </svg>
  );
}
