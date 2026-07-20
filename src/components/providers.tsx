"use client";

import { MotionConfig } from "framer-motion";
import { ContactModalProvider } from "@/components/ui/contact-modal";

/** Global motion settings — honours the user's reduced-motion preference. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ContactModalProvider>{children}</ContactModalProvider>
    </MotionConfig>
  );
}
