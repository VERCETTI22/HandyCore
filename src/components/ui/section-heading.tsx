import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type Tone = "light" | "dark";

/** Mono "spec label" eyebrow + display title — the section signature. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            "spec-label inline-flex items-center gap-2",
            tone === "dark" ? "text-white/55" : "text-muted",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2
          className={cn(
            "mt-4 text-[2rem] leading-[1.05] font-extrabold sm:text-4xl md:text-5xl",
            tone === "dark" ? "text-white" : "text-ink",
            centered && "max-w-3xl",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={2}>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed md:text-lg",
              centered && "mx-auto",
              tone === "dark" ? "text-white/60" : "text-muted",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
