import * as React from "react";

/* Palette — kept in step with the brand tokens */
const YELLOW = "#F4B400";
const YELLOW_DEEP = "#d99f00";
const INK = "#121212";
const SKIN = "#e3a880";
const SKIN_SHADE = "#d1946f";
const SHIRT = "#3b4655";
const SHIRT_DARK = "#323c49";
const DENIM = "#2a313c";
const WOOD = "#c98a4b";
const WOOD_DARK = "#ac7137";
const STEEL = "#525a64";
const STEEL_LIGHT = "#6b747f";

/**
 * Hero illustration: a handyman standing in a bright apartment, hammer in hand.
 * Drawn at exactly 4:5 so nothing is cropped by the hero frame.
 *
 * Swap for a real photo later: drop an image into /public and render it in the
 * hero instead of this component (see components/sections/hero.tsx).
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 750"
      className={className}
      role="img"
      aria-label="Illustration of a handyman holding a hammer in a bright apartment"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ---------------- room ---------------- */}
      <rect width="600" height="750" fill="#f7f4ee" />
      {/* daylight falling in from the window */}
      <path d="M64 145 L244 145 L392 750 L112 750 Z" fill="#ffffff" opacity="0.32" />
      {/* baseboard + floor */}
      <rect y="543" width="600" height="14" fill="#ffffff" />
      <rect y="557" width="600" height="193" fill="#e4d9c6" />
      <g stroke={INK} strokeOpacity="0.06" strokeWidth="2">
        <line x1="150" y1="557" x2="120" y2="750" />
        <line x1="330" y1="557" x2="330" y2="750" />
        <line x1="500" y1="557" x2="536" y2="750" />
      </g>

      {/* ---------------- window ---------------- */}
      <g>
        <rect x="64" y="145" width="180" height="230" rx="6" fill="#e9eff1" />
        <rect
          x="64"
          y="145"
          width="180"
          height="230"
          rx="6"
          fill="none"
          stroke={INK}
          strokeWidth="5"
        />
        <line x1="154" y1="147" x2="154" y2="373" stroke={INK} strokeWidth="5" />
        <line x1="66" y1="260" x2="242" y2="260" stroke={INK} strokeWidth="5" />
        {/* sill */}
        <rect x="54" y="375" width="200" height="12" rx="4" fill="#ffffff" />
        <rect x="54" y="387" width="200" height="5" rx="2" fill={INK} opacity="0.07" />
      </g>

      {/* plant on the sill */}
      <g>
        <path d="M92 375 h34 l-5 -32 h-24 z" fill={INK} />
        <line x1="109" y1="345" x2="109" y2="306" stroke={INK} strokeWidth="3" />
        <ellipse cx="93" cy="326" rx="15" ry="9" transform="rotate(-24 93 326)" fill={INK} opacity="0.85" />
        <ellipse cx="126" cy="322" rx="15" ry="9" transform="rotate(22 126 322)" fill={INK} opacity="0.7" />
        <ellipse cx="109" cy="308" rx="13" ry="10" transform="rotate(-6 109 308)" fill={INK} opacity="0.9" />
      </g>

      {/* ---------------- pendant lamp ---------------- */}
      <g>
        <line x1="490" y1="0" x2="490" y2="150" stroke={INK} strokeWidth="4" />
        <path d="M462 190 C 462 160 518 160 518 190 Z" fill={INK} />
        <ellipse cx="490" cy="190" rx="28" ry="6" fill={YELLOW} />
      </g>

      {/* ---------------- shelf ---------------- */}
      <g>
        <rect x="424" y="240" width="146" height="11" rx="4" fill="#ffffff" />
        <rect x="424" y="251" width="146" height="4" rx="2" fill={INK} opacity="0.09" />
        <rect x="440" y="212" width="13" height="28" rx="2" fill={INK} />
        <rect x="456" y="204" width="13" height="36" rx="2" fill={YELLOW} />
        <rect x="472" y="216" width="13" height="24" rx="2" fill={SHIRT} />
        {/* small framed picture */}
        <rect x="502" y="206" width="34" height="34" rx="4" fill={INK} />
        <rect x="508" y="212" width="22" height="22" rx="2" fill={YELLOW} />
      </g>

      {/* ---------------- rug + shadow ---------------- */}
      <ellipse cx="380" cy="686" rx="182" ry="30" fill="#fdf3dc" />
      <ellipse cx="380" cy="686" rx="182" ry="30" fill="none" stroke={YELLOW} strokeOpacity="0.35" strokeWidth="2" />
      <ellipse cx="380" cy="678" rx="78" ry="14" fill={INK} opacity="0.1" />

      {/* ---------------- toolbox ---------------- */}
      <g>
        <rect x="105" y="602" width="130" height="53" rx="9" fill={INK} />
        <rect x="105" y="602" width="130" height="15" rx="7" fill="#1e1e1e" />
        <path
          d="M148 602 q0 -19 22 -19 q22 0 22 19"
          fill="none"
          stroke={YELLOW}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="120" y="629" width="100" height="6" rx="3" fill={YELLOW} opacity="0.9" />
      </g>

      {/* ================= handyman ================= */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* legs */}
        <path d="M348 500 L344 660 L372 660 L378 500 Z" fill={DENIM} />
        <path d="M388 500 L394 660 L422 660 L416 500 Z" fill="#232932" />
        {/* boots */}
        <path d="M338 656 h36 v14 q0 9 -9 9 h-31 q-7 0 -7 -7 q0 -9 11 -13 z" fill={INK} />
        <path d="M390 656 h36 v14 q0 9 -9 9 h-31 q-7 0 -7 -7 q0 -9 11 -13 z" fill={INK} />

        {/* torso */}
        <path
          d="M346 372 C346 360 358 352 380 352 C402 352 416 360 416 372 L418 492 L342 492 Z"
          fill={SHIRT}
        />
        {/* button placket + collar */}
        <line x1="380" y1="366" x2="381" y2="492" stroke={SHIRT_DARK} strokeWidth="3" />
        <path d="M364 356 L380 372 L396 356" fill="none" stroke={SHIRT_DARK} strokeWidth="3.5" />
        {/* chest pocket */}
        <rect x="396" y="392" width="20" height="16" rx="3" fill={SHIRT_DARK} />

        {/* tool belt */}
        <rect x="334" y="490" width="92" height="19" rx="5" fill={YELLOW} />
        <rect x="368" y="492" width="18" height="15" rx="3" fill={YELLOW_DEEP} />
        <rect x="342" y="509" width="27" height="27" rx="5" fill={INK} />
        <rect x="392" y="509" width="25" height="31" rx="5" fill="#1c1c1c" />

        {/* right arm (viewer's right) — relaxed, held clear of the body */}
        <path d="M414 374 L444 434" stroke={SHIRT_DARK} strokeWidth="27" />
        <path d="M444 434 L443 492" stroke={SKIN} strokeWidth="21" />
        <circle cx="443" cy="500" r="11.5" fill={SKIN} />

        {/* left arm — bent, holding the hammer up */}
        <path d="M348 374 L320 428" stroke={SHIRT_DARK} strokeWidth="27" />
        <path d="M320 428 L297 378" stroke={SKIN} strokeWidth="21" />

        {/* ---- hammer ---- */}
        <g>
          {/* handle */}
          <rect x="289" y="330" width="14" height="86" rx="6" fill={WOOD} />
          <rect x="289" y="386" width="14" height="30" rx="6" fill={WOOD_DARK} />
          {/* head */}
          <path
            d="M288 316 C275 313 265 320 260 330 C266 335 273 334 277 329 C280 325 284 322 288 324 Z"
            fill={STEEL}
          />
          <rect x="284" y="312" width="36" height="21" rx="4" fill={STEEL} />
          <rect x="284" y="312" width="36" height="7" rx="3" fill={STEEL_LIGHT} />
          <rect x="311" y="308" width="13" height="29" rx="4" fill="#5f6772" />
        </g>
        {/* hand gripping the handle, drawn over it */}
        <circle cx="296" cy="372" r="11.5" fill={SKIN} />
        <path d="M289 368 h15" stroke={SKIN_SHADE} strokeWidth="2.5" />

        {/* ---- head ---- */}
        <rect x="367" y="332" width="26" height="24" rx="9" fill={SKIN_SHADE} />
        <circle cx="380" cy="308" r="35" fill={SKIN} />
        {/* ear */}
        <circle cx="346" cy="312" r="7" fill={SKIN_SHADE} />
        {/* hair showing under the cap */}
        <path d="M347 300 C348 288 358 280 380 280 C402 280 412 288 413 300 C400 293 360 293 347 300 Z" fill="#2b2b2b" />
        {/* face */}
        <circle cx="369" cy="308" r="3.4" fill={INK} />
        <circle cx="393" cy="308" r="3.4" fill={INK} />
        <path d="M363 300 q6 -4 12 -1" fill="none" stroke={INK} strokeWidth="2.6" />
        <path d="M387 299 q6 -3 12 1" fill="none" stroke={INK} strokeWidth="2.6" />
        <path d="M370 322 q10 8 20 0" fill="none" stroke={INK} strokeWidth="2.8" />

        {/* cap */}
        <path d="M344 292 C344 264 362 252 380 252 C398 252 416 264 416 292 C396 284 364 284 344 292 Z" fill={YELLOW} />
        <path d="M344 292 C338 292 332 295 330 300 C340 305 352 302 358 297 Z" fill={YELLOW_DEEP} />
        <path d="M348 276 C356 268 404 268 412 276" fill="none" stroke={YELLOW_DEEP} strokeWidth="3" />
      </g>
    </svg>
  );
}
