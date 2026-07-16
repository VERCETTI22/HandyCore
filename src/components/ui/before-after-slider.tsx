"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComparisonProject = {
  title: string;
  location: string;
  before: React.ReactNode;
  after: React.ReactNode;
};

export function BeforeAfterSlider({
  projects,
  className,
}: {
  projects: ComparisonProject[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [pos, setPos] = React.useState(52);
  const [dragging, setDragging] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const project = projects[index];

  const setFromClientX = React.useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  function go(dir: 1 | -1) {
    setIndex((i) => (i + dir + projects.length) % projects.length);
    setPos(52);
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={ref}
        className="group relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-3xl bg-ink-800 ring-1 ring-white/10"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setDragging(true);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {/* AFTER (base) */}
            <div className="absolute inset-0">{project.after}</div>
            {/* BEFORE (clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              {project.before}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* corner labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
          After
        </span>

        {/* divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90"
          style={{ left: `${pos}%` }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label="Reveal before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 3));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 3));
            }}
            className="pointer-events-auto absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-ink shadow-lift ring-1 ring-black/5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand active:scale-95"
          >
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* caption + project navigation */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-white/5 hover:text-brand"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="min-w-0 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <p className="truncate text-lg font-bold text-white">{project.title}</p>
              <p className="spec-label mt-1 text-white/45">{project.location}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to project ${i + 1}`}
                onClick={() => {
                  setIndex(i);
                  setPos(52);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-brand" : "w-1.5 bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-white/5 hover:text-brand"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
