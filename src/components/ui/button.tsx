"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap select-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-ink shadow-[var(--shadow-brand)] hover:bg-brand-600",
  dark: "bg-ink text-white hover:bg-ink-700",
  outline:
    "bg-transparent text-ink ring-1 ring-inset ring-line-strong hover:ring-ink hover:bg-surface",
  ghost: "bg-transparent text-ink hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type Ripple = { id: number; x: number; y: number; size: number };

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<HTMLMotionProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<HTMLMotionProps<"a">, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);

  function spawnRipple(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const id = Date.now() + Math.random();
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size },
    ]);
    window.setTimeout(
      () => setRipples((r) => r.filter((rp) => rp.id !== id)),
      650,
    );
  }

  const classes = cn(base, variants[variant], sizes[size], className);

  const rippleLayer = (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.35, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute rounded-full bg-current"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            marginLeft: -r.size / 2,
            marginTop: -r.size / 2,
          }}
        />
      ))}
    </span>
  );

  const content = (
    <>
      {rippleLayer}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const motionProps = {
    whileTap: { scale: 0.97 },
    whileHover: { y: -2 },
    transition: { type: "spring" as const, stiffness: 400, damping: 22 },
    onPointerDown: spawnRipple,
  };

  if ("href" in props && props.href !== undefined) {
    return (
      <motion.a className={classes} {...motionProps} {...(props as HTMLMotionProps<"a">)}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      {...motionProps}
      {...(props as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
}
