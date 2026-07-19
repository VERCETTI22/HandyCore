import * as React from "react";
import { cn } from "@/lib/utils";

/** HandyCore wordmark with a yellow-fist-and-hammer mark. */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <HammerMark />
      <span
        className={cn(
          "text-[1.28rem] font-extrabold tracking-[-0.03em]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        Handy<span className="text-brand-700">Core</span>
      </span>
    </span>
  );
}

function HammerMark() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="36" height="36" rx="10" fill="#121212" />

      {/* hammer head (steel) */}
      <rect x="8" y="6.5" width="20" height="6" rx="2.4" fill="#ccd1d8" />
      <rect x="8" y="10.2" width="20" height="2.6" rx="1.3" fill="#a7adb5" />
      {/* claw notch */}
      <path d="M8 7 L11.6 9.75 L8 12.5 Z" fill="#121212" />

      {/* wooden handle */}
      <rect x="15.9" y="12" width="4.2" height="18" rx="2.1" fill="#c88a48" />
      <rect x="17.4" y="12.5" width="1.2" height="17" rx="0.6" fill="#b17a3c" />

      {/* yellow fist */}
      <g fill="#F4B400">
        <circle cx="13.6" cy="18.4" r="2.6" />
        <circle cx="16.7" cy="17.9" r="2.75" />
        <circle cx="19.8" cy="17.9" r="2.75" />
        <circle cx="22.9" cy="18.4" r="2.6" />
        <rect x="11" y="18" width="15.2" height="10.6" rx="4.6" />
        <rect x="23.8" y="18.8" width="4" height="7" rx="2" />
      </g>
      {/* finger + thumb definition */}
      <g stroke="#d29a00" strokeWidth="1.15" strokeLinecap="round">
        <path d="M12.6 21.6 H22.6" />
        <path d="M12.6 24.2 H22.6" />
        <path d="M12.6 26.8 H22.6" />
        <path d="M24.3 20.2 V25.4" />
      </g>
    </svg>
  );
}
