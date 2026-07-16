import * as React from "react";
import { cn } from "@/lib/utils";

/** HandyCore wordmark with a spirit-level bubble mark. */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LevelMark />
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

function LevelMark() {
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
      {/* spirit-level vial */}
      <rect x="6.5" y="15" width="23" height="6" rx="3" fill="#ffffff" fillOpacity="0.14" />
      {/* centre guide lines */}
      <rect x="15.5" y="14" width="1.4" height="8" rx="0.7" fill="#ffffff" fillOpacity="0.35" />
      <rect x="19.1" y="14" width="1.4" height="8" rx="0.7" fill="#ffffff" fillOpacity="0.35" />
      {/* the bubble — perfectly level */}
      <circle cx="18" cy="18" r="2.7" fill="#F4B400" />
    </svg>
  );
}
