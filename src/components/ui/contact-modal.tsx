"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  X,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/order/order-context";
import { business } from "@/lib/content";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ------------------------------------------------------------------ */
/*  Context — one shared modal instance for every CTA on the page      */
/* ------------------------------------------------------------------ */
type ContactModalValue = {
  isOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
};

const ContactModalContext = React.createContext<ContactModalValue | null>(null);

export function useContactModal() {
  const ctx = React.useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used inside <ContactModalProvider>");
  }
  return ctx;
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const openContactModal = React.useCallback(() => setIsOpen(true), []);
  const closeContactModal = React.useCallback(() => setIsOpen(false), []);

  const value = React.useMemo(
    () => ({ isOpen, openContactModal, closeContactModal }),
    [isOpen, openContactModal, closeContactModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  );
}

/**
 * Button that opens the shared contact modal. Lets server components trigger
 * the modal without becoming client components themselves.
 */
export function ContactModalButton({
  children,
  variant,
  size,
  className,
}: {
  children: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}) {
  const { openContactModal } = useContactModal();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={openContactModal}
    >
      {children}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);
  const { openCustom } = useOrder();

  // move focus in on open, restore it on close
  React.useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 20);
    return () => {
      window.clearTimeout(id);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Escape to close + Tab focus trap
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // the portal target only exists in the browser; on the server this renders
  // nothing, which matches the client's first paint (the modal starts closed)
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
        >
          {/* backdrop */}
          <div
            aria-hidden
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
          />

          {/* click on the surrounding space also closes */}
          <div
            className="relative flex min-h-full items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl rounded-3xl border border-line bg-paper p-5 shadow-lift sm:p-7"
            >
              <h2 id="contact-modal-title" className="sr-only">
                Contact HandyCore
              </h2>

              {/* header */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="-ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* primary route — hand off to the full order flow */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  // let this panel finish fading out before the order flow takes
                  // over, so the two dialogs never overlap on screen
                  window.setTimeout(openCustom, 220);
                }}
                className="group mt-2 flex w-full items-center gap-4 rounded-2xl bg-brand p-5 text-left shadow-brand transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-brand-600"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                  <ClipboardList className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-extrabold text-ink sm:text-xl">
                    Place your order online
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-ink/70 sm:text-sm">
                    Describe the job, add photos, pick a time.
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* secondary routes, deliberately quieter than the button above */}
              <div className="mt-5 flex items-center gap-3">
                <span aria-hidden className="h-px flex-1 bg-line" />
                <span className="text-xs font-medium text-muted">
                  or reach us directly
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ContactCard
                  icon={Mail}
                  title="Email us"
                  value={business.email}
                  href={`mailto:${business.email}`}
                />
                <ContactCard
                  icon={Phone}
                  title="Call or text"
                  value={business.phoneDisplay}
                  href={business.phoneHref}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-brand/40 hover:bg-paper hover:shadow-soft"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-700 transition-colors group-hover:bg-brand group-hover:text-ink">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold text-ink">{title}</span>
        <span className="block truncate text-[13px] font-semibold text-brand-700">
          {value}
        </span>
      </span>
      <span className="shrink-0 text-ink">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
