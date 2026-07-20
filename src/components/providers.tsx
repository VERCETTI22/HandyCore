"use client";

import { MotionConfig } from "framer-motion";
import { ContactModalProvider } from "@/components/ui/contact-modal";
import { OrderProvider } from "@/components/order/order-context";
import { OrderModal } from "@/components/order/order-modal";

/** Global motion settings — honours the user's reduced-motion preference. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ContactModalProvider>
        <OrderProvider>
          {children}
          <OrderModal />
        </OrderProvider>
      </ContactModalProvider>
    </MotionConfig>
  );
}
