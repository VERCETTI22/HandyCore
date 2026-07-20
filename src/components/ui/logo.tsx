import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Source artwork is 553x600 (hammer-through-H mark). */
const MARK_RATIO = 553 / 600;

/**
 * HandyCore lockup: the hammer-through-H mark plus the wordmark.
 * Two artworks ship so the mark reads on either surface — the "H" is black on
 * light backgrounds and white on dark ones, while the hammer stays gold.
 */
export function Logo({
  tone = "light",
  height = 38,
  priority = false,
  className,
}: {
  tone?: "light" | "dark";
  /** rendered height of the mark, in px */
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const isDark = tone === "dark";
  const width = Math.round(height * MARK_RATIO);

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={isDark ? "/logo-dark.png" : "/logo.png"}
        alt="HandyCore"
        width={width}
        height={height}
        priority={priority}
        className="shrink-0"
      />
      <span
        className={cn(
          "text-[1.28rem] font-extrabold tracking-[-0.03em]",
          isDark ? "text-white" : "text-ink",
        )}
      >
        Handy<span className="text-brand-700">Core</span>
      </span>
    </span>
  );
}
