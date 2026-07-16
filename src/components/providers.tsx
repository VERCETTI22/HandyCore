"use client";

import { MotionConfig } from "framer-motion";

/** Global motion settings — honours the user's reduced-motion preference. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
