import * as React from "react";

/**
 * Same living-room corner drawn in two states for the before/after slider.
 * Both share identical geometry so they line up perfectly under the reveal.
 * Swap for real project photos later — just render <img> layers instead.
 */
export function RoomScene({
  state,
  className,
}: {
  state: "before" | "after";
  className?: string;
}) {
  const after = state === "after";

  const wall = after ? "#f2ede1" : "#dad9d3";
  const floor = after ? "#e7ddcb" : "#d6cfc2";
  const glass = after ? "#eef3f4" : "#ced5d5";
  const frame = after ? "#121212" : "#a3a39b";

  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      role="img"
      aria-label={
        after ? "Finished, freshly painted living room" : "Room before renovation"
      }
      preserveAspectRatio="xMidYMid slice"
    >
      {/* wall + floor */}
      <rect width="900" height="600" fill={wall} />
      <rect y="470" width="900" height="130" fill={floor} />
      <rect y="468" width="900" height="3" fill="#12121212" />

      {/* before-only wear: patches + hairline cracks */}
      {!after && (
        <g opacity="0.9">
          <rect x="120" y="150" width="150" height="110" rx="4" fill="#d0cfc8" />
          <rect x="360" y="90" width="90" height="70" rx="4" fill="#cfcec7" />
          <g stroke="#b6b5ac" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M180 96 q10 40 -8 70 q-14 24 4 54" />
            <path d="M470 300 q20 26 4 60" />
            <path d="M250 330 q-16 20 2 50" />
          </g>
          <rect x="150" y="300" width="60" height="40" rx="3" fill="#d2d1ca" />
        </g>
      )}

      {/* after-only daylight beam */}
      {after && (
        <path d="M600 110 L780 110 L840 470 L560 470 Z" fill="#ffffff" opacity="0.22" />
      )}

      {/* window */}
      <rect x="560" y="96" width="228" height="256" rx="8" fill={glass} />
      <rect x="560" y="96" width="228" height="256" rx="8" fill="none" stroke={frame} strokeWidth="4" />
      <line x1="674" y1="100" x2="674" y2="348" stroke={frame} strokeWidth="4" />
      <line x1="564" y1="224" x2="784" y2="224" stroke={frame} strokeWidth="4" />
      <rect x="550" y="352" width="248" height="12" rx="4" fill={after ? "#ffffff" : "#c7c6bf"} />

      {/* AFTER decor: gallery wall */}
      {after && (
        <g>
          <g>
            <rect x="128" y="118" width="104" height="132" rx="6" fill="#ffffff" />
            <rect x="128" y="118" width="104" height="132" rx="6" fill="none" stroke="#121212" strokeWidth="4" />
            <rect x="144" y="134" width="72" height="100" rx="3" fill="#d9a64e" opacity="0.9" />
          </g>
          <g>
            <rect x="252" y="140" width="120" height="88" rx="6" fill="#ffffff" />
            <rect x="252" y="140" width="120" height="88" rx="6" fill="none" stroke="#121212" strokeWidth="4" />
            <rect x="268" y="156" width="88" height="56" rx="3" fill="#2b2f36" />
          </g>
          <g>
            <rect x="392" y="118" width="92" height="70" rx="6" fill="#ffffff" />
            <rect x="392" y="118" width="92" height="70" rx="6" fill="none" stroke="#121212" strokeWidth="4" />
            <rect x="406" y="132" width="64" height="42" rx="3" fill="#efe9dd" />
          </g>
          {/* wall sconce with warm glow */}
          <circle cx="512" cy="150" r="30" fill="#d9a64e" opacity="0.16" />
          <rect x="506" y="150" width="12" height="34" rx="4" fill="#121212" />
          <circle cx="512" cy="146" r="7" fill="#d9a64e" />
        </g>
      )}

      {/* monstera plant — lush in after, absent/bare in before */}
      {after ? (
        <g>
          <path d="M772 470 h72 l-12 -70 h-48 z" fill="#121212" />
          <g fill="#1c1c1c">
            <path d="M808 400 C 770 360 758 330 792 300 C 800 348 818 372 808 400 Z" />
            <path d="M808 400 C 846 360 858 330 824 300 C 816 348 798 372 808 400 Z" />
            <path d="M808 400 C 792 350 788 320 808 296 C 820 340 818 372 808 400 Z" />
          </g>
          <g fill="#d9a64e" opacity="0.9">
            <path d="M808 400 C 786 372 782 352 802 336 C 808 360 816 384 808 400 Z" />
          </g>
        </g>
      ) : (
        <g opacity="0.85">
          {/* before: a bare empty pot */}
          <path d="M786 470 h56 l-9 -46 h-38 z" fill="#c3c2ba" />
        </g>
      )}

      {/* BEFORE clutter: paint tray + roller waiting on the floor */}
      {!after ? (
        <g>
          <rect x="118" y="500" width="150" height="30" rx="6" fill="#b9b8b0" />
          <rect x="118" y="500" width="90" height="30" rx="6" fill="#c7c6bf" />
          <rect x="196" y="470" width="10" height="66" rx="4" fill="#121212" transform="rotate(18 201 503)" />
          <rect x="214" y="452" width="42" height="16" rx="8" fill="#e8e7e0" transform="rotate(18 235 460)" />
        </g>
      ) : (
        // after: a soft rug for warmth
        <ellipse cx="300" cy="540" rx="210" ry="26" fill="#faf3e3" />
      )}
    </svg>
  );
}
