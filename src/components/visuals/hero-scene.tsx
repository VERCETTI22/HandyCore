import * as React from "react";

/**
 * Editorial illustration: a handyman mounting a floating shelf in a modern,
 * light-filled room. Back-view figure, brand palette only.
 *
 * Swap for a real photo later: drop an image into /public and render it in the
 * hero instead of this component (see components/sections/hero.tsx).
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 620 760"
      className={className}
      role="img"
      aria-label="Illustration of a handyman mounting a shelf in a modern home"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ---- room shell ---- */}
      <rect width="620" height="760" fill="#f5f2ea" />
      <rect y="452" width="620" height="120" fill="#efe9dd" />
      <rect x="0" y="450" width="620" height="2" fill="#12121210" />
      {/* floor */}
      <rect y="572" width="620" height="188" fill="#e7ddcb" />
      <rect y="572" width="620" height="3" fill="#1212120d" />
      <g stroke="#12121210" strokeWidth="1.5">
        <line x1="150" y1="572" x2="120" y2="760" />
        <line x1="330" y1="572" x2="330" y2="760" />
        <line x1="510" y1="572" x2="545" y2="760" />
      </g>

      {/* ---- soft daylight beam from the window ---- */}
      <path d="M60 120 L250 120 L430 760 L120 760 Z" fill="#ffffff" opacity="0.28" />

      {/* ---- window ---- */}
      <g>
        <rect x="46" y="104" width="176" height="232" rx="8" fill="#eef3f4" />
        <rect
          x="46"
          y="104"
          width="176"
          height="232"
          rx="8"
          fill="none"
          stroke="#121212"
          strokeWidth="3"
        />
        <line x1="134" y1="108" x2="134" y2="332" stroke="#121212" strokeWidth="3" />
        <line x1="50" y1="220" x2="218" y2="220" stroke="#121212" strokeWidth="3" />
        {/* sill */}
        <rect x="38" y="336" width="192" height="11" rx="4" fill="#ffffff" />
        <rect x="38" y="347" width="192" height="5" rx="2" fill="#12121212" />
      </g>

      {/* windowsill plant */}
      <g>
        <path d="M74 336 h26 l-4 -22 h-18 z" fill="#121212" />
        <path
          d="M87 314 C 78 296 74 288 82 276 C 86 292 90 300 87 314 Z"
          fill="#F4B400"
        />
        <path
          d="M87 314 C 96 298 102 292 96 278 C 90 294 88 300 87 314 Z"
          fill="#121212"
          opacity="0.85"
        />
      </g>

      {/* ---- pendant lamp ---- */}
      <line x1="486" y1="0" x2="486" y2="96" stroke="#121212" strokeWidth="2.5" />
      <path d="M462 130 C 462 106 510 106 510 130 Z" fill="#121212" />
      <ellipse cx="486" cy="132" rx="24" ry="5" fill="#F4B400" />

      {/* ---- floating shelf ---- */}
      <ellipse cx="366" cy="322" rx="128" ry="9" fill="#121212" opacity="0.06" />
      <rect x="248" y="298" width="236" height="15" rx="5" fill="#ffffff" />
      <rect x="248" y="309" width="236" height="5" rx="2.5" fill="#12121212" />
      <rect x="270" y="313" width="12" height="30" rx="3" fill="#121212" />
      <rect x="450" y="313" width="12" height="30" rx="3" fill="#121212" />
      {/* shelf styling: books, plant, frame */}
      <rect x="300" y="266" width="12" height="32" rx="2" fill="#121212" />
      <rect x="314" y="272" width="12" height="26" rx="2" fill="#F4B400" />
      <rect x="330" y="262" width="12" height="36" rx="2" fill="#2b2f36" />
      <g>
        <rect x="416" y="270" width="30" height="28" rx="4" fill="#121212" />
        <rect x="421" y="275" width="20" height="18" rx="2" fill="#F4B400" />
      </g>
      {/* small plant on shelf */}
      <path d="M356 298 h22 l-3 -16 h-16 z" fill="#12121218" />
      <path d="M367 282 C 360 270 358 264 364 256 C 366 268 369 274 367 282 Z" fill="#121212" opacity="0.8" />
      <path d="M367 282 C 374 270 378 264 372 256 C 368 268 366 274 367 282 Z" fill="#F4B400" />

      {/* ---- rug ---- */}
      <ellipse cx="330" cy="690" rx="220" ry="34" fill="#fff6de" />
      <ellipse cx="330" cy="690" rx="220" ry="34" fill="none" stroke="#F4B400" strokeOpacity="0.4" strokeWidth="2" />

      {/* ---- figure shadow ---- */}
      <ellipse cx="360" cy="654" rx="86" ry="16" fill="#121212" opacity="0.08" />

      {/* ================= handyman (back view) ================= */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* legs */}
        <path d="M338 452 q-6 90 -8 176 l24 0 q4 -84 8 -170 z" fill="#20242b" />
        <path d="M372 452 q8 90 10 178 l24 0 q0 -88 -8 -174 z" fill="#191d23" />
        {/* boots */}
        <path d="M324 628 h30 v10 q0 8 -10 8 h-26 q-6 0 -6 -6 q0 -8 12 -12 z" fill="#121212" />
        <path d="M382 630 h30 v10 q0 8 -10 8 h-26 q-6 0 -6 -6 q0 -8 12 -12 z" fill="#121212" />

        {/* torso / work shirt (back) */}
        <path
          d="M318 322 q-6 -18 14 -24 q34 -8 66 2 q16 6 12 24 l-8 116 q-2 16 -20 16 h-52 q-16 0 -16 -16 z"
          fill="#3c434d"
        />
        {/* back seam + yoke */}
        <path d="M366 302 v150" stroke="#2f353d" strokeWidth="2.5" />
        <path d="M322 330 q44 14 88 0" fill="none" stroke="#2f353d" strokeWidth="2.5" />

        {/* tool belt */}
        <rect x="312" y="430" width="108" height="18" rx="4" fill="#F4B400" />
        <rect x="330" y="446" width="26" height="26" rx="4" fill="#121212" />
        <rect x="378" y="446" width="26" height="30" rx="4" fill="#1b1b1b" />

        {/* left arm resting at side */}
        <path d="M406 330 q22 12 20 58 q-2 24 -12 40" fill="none" stroke="#3c434d" strokeWidth="22" />
        <circle cx="412" cy="432" r="10" fill="#d99f76" />

        {/* head + hair + cap (facing the wall) */}
        <rect x="356" y="286" width="18" height="20" rx="8" fill="#d99f76" />
        <circle cx="366" cy="266" r="27" fill="#d99f76" />
        <path d="M340 266 q0 -30 27 -30 q27 0 26 28 q-14 -12 -30 -8 q-16 4 -23 10 z" fill="#1c1c1c" />
        {/* cap */}
        <path d="M338 258 q2 -30 30 -30 q28 0 30 28 q-30 -10 -60 2 z" fill="#F4B400" />
        <path d="M334 258 q-14 2 -20 8 q18 4 30 -2 z" fill="#e3a500" />

        {/* raised right arm holding a drill up to the shelf bracket */}
        <path d="M330 328 q-30 -6 -50 -24" fill="none" stroke="#3c434d" strokeWidth="22" />
        <path d="M280 304 q-14 -12 -22 -20" fill="none" stroke="#d99f76" strokeWidth="17" />
      </g>

      {/* ---- cordless drill in raised hand ---- */}
      <g>
        <rect x="236" y="286" width="30" height="18" rx="5" fill="#121212" transform="rotate(-32 251 295)" />
        <rect x="248" y="296" width="12" height="26" rx="4" fill="#1b1b1b" transform="rotate(-32 254 309)" />
        <rect x="248" y="316" width="16" height="9" rx="3" fill="#F4B400" transform="rotate(-32 256 320)" />
        <rect x="226" y="290" width="16" height="7" rx="3" fill="#3c434d" transform="rotate(-32 234 293)" />
        <circle cx="223" cy="289" r="3.4" fill="#F4B400" />
      </g>

      {/* ---- toolbox on the floor ---- */}
      <g>
        <rect x="120" y="560" width="96" height="46" rx="8" fill="#121212" />
        <rect x="120" y="560" width="96" height="14" rx="7" fill="#1b1b1b" />
        <path
          d="M150 560 q0 -16 18 -16 q18 0 18 16"
          fill="none"
          stroke="#F4B400"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <rect x="134" y="582" width="68" height="4" rx="2" fill="#F4B400" opacity="0.85" />
      </g>
    </svg>
  );
}
