"use client";

import { MotionConfig } from "framer-motion";
import { ContactModalProvider } from "@/components/ui/contact-modal";
import { OrderProvider } from "@/components/order/order-context";
import { OrderModal } from "@/components/order/order-modal";

/**
 * Global motion settings — honours the user's reduced-motion preference.
 *
 * OrderProvider wraps ContactModalProvider so the contact modal itself sits
 * inside the order context: its primary action hands off to the order flow.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <OrderProvider>
        <ContactModalProvider>{children}</ContactModalProvider>
        <OrderModal />
      </OrderProvider>
    </MotionConfig>
  );
}
