"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  X,
  Check,
  Minus,
  Plus,
  ArrowRight,
  ChevronRight,
  Loader2,
  PartyPopper,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { estimateFor, formatCad, packages } from "@/lib/order-catalog";
import { useOrder, type OrderStep } from "./order-context";
import { PhotoUploader } from "./photo-uploader";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const STEP_LABELS: Record<OrderStep, string> = {
  task: "Choose a task",
  configure: "Your job",
  details: "Details & photos",
  summary: "Review & confirm",
};
const STEP_INDEX: OrderStep[] = ["task", "configure", "details", "summary"];
const CUSTOM_STEPS: OrderStep[] = ["details", "summary"];

export function OrderModal() {
  const order = useOrder();
  const { isOpen, status } = order;
  const panelRef = React.useRef<HTMLDivElement>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 20);
    return () => {
      window.clearTimeout(id);
      lastFocused.current?.focus?.();
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        order.close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, order]);

  if (typeof document === "undefined") return null;

  const showSuccess = status === "success";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="order-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
        >
          <div
            aria-hidden
            onClick={order.close}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div
            className="relative flex min-h-full items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) order.close();
            }}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-modal-title"
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[calc(100svh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-lift"
            >
              {showSuccess ? (
                <SuccessView />
              ) : (
                <>
                  <ModalHeader />
                  <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
                    <StepBody />
                  </div>
                  <ModalFooter />
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/*  Header + progress                                                  */
/* ------------------------------------------------------------------ */
function ModalHeader() {
  const { mode, step, goBack, close } = useOrder();
  const steps = mode === "custom" ? CUSTOM_STEPS : STEP_INDEX;
  const activeIndex = steps.indexOf(step);

  return (
    <div className="border-b border-line px-5 pt-4 pb-4 sm:px-7">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          className="-ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h2 id="order-modal-title" className="text-sm font-bold text-ink">
          {STEP_LABELS[step]}
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {steps.map((s, i) => (
          <span
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= activeIndex ? "bg-brand" : "bg-line",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step body                                                          */
/* ------------------------------------------------------------------ */
function StepBody() {
  const { step } = useOrder();
  // Keyed on step so each step mounts fresh and fades in. No AnimatePresence /
  // exit here on purpose: forward progress must never wait on an exit animation.
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {step === "task" && <TaskStep />}
      {step === "configure" && <ConfigureStep />}
      {step === "details" && <DetailsStep />}
      {step === "summary" && <SummaryStep />}
    </motion.div>
  );
}

function TaskStep() {
  const { category, selectTask } = useOrder();
  if (!category) return null;
  return (
    <div>
      <p className="text-sm text-muted">{category.blurb}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {category.tasks.map((task, i) => (
          <li key={task.title}>
            <button
              type="button"
              onClick={() => selectTask(i)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-paper p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-ink">{task.title}</span>
                <span className="mt-0.5 block truncate text-[13px] text-muted">
                  {task.includes.join(" · ")}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-xs text-muted">from</span>
                <span className="block font-extrabold text-ink">
                  {formatCad(task.estimateFrom)}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-brand-700" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConfigureStep() {
  const { category, task, quantity, setQuantity, pkg, setPackage } = useOrder();
  if (!task) return null;
  const estimate = estimateFor(task, quantity, pkg);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="spec-label text-muted">{category?.title}</span>
        <h3 className="mt-1 text-xl font-extrabold text-ink">{task.title}</h3>
      </div>

      {/* what's included */}
      <div className="rounded-2xl border border-line bg-surface p-4">
        <span className="text-xs font-bold uppercase tracking-wider text-muted">
          What&apos;s included
        </span>
        <ul className="mt-3 flex flex-col gap-2">
          {task.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-text">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* quantity */}
      <div className="flex items-center justify-between">
        <div>
          <span className="block font-semibold text-ink">Quantity</span>
          <span className="text-[13px] text-muted">Number of {task.unit}s</span>
        </div>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      {/* package */}
      <div>
        <span className="block font-semibold text-ink">Timing</span>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {packages.map((p) => (
            <PackageCard
              key={p.id}
              name={p.name}
              tagline={p.tagline}
              factor={p.factor}
              selected={pkg === p.id}
              onSelect={() => setPackage(p.id)}
            />
          ))}
        </div>
      </div>

      <EstimateBar estimate={estimate} />
    </div>
  );
}

function DetailsStep() {
  const {
    mode,
    description,
    setDescription,
    contactName,
    setContactName,
    phone,
    setPhone,
    email,
    setEmail,
  } = useOrder();
  const isCustom = mode === "custom";

  return (
    <div className="flex flex-col gap-6">
      {isCustom && (
        <div>
          <span className="spec-label text-muted">Custom request</span>
          <h3 className="mt-1 text-xl font-extrabold text-ink">
            Tell us what you need
          </h3>
          <p className="mt-1 text-sm text-muted">
            Describe the job, add a few photos, and leave your details — we&apos;ll
            reply with a price and time.
          </p>
        </div>
      )}
      <div>
        <label htmlFor="order-description" className="block font-semibold text-ink">
          {isCustom ? "What do you need done?" : "What exactly needs doing?"}
        </label>
        <p className="mt-0.5 text-[13px] text-muted">
          {isCustom
            ? "A short description helps us quote it accurately."
            : "The more detail, the more accurate your quote."}
        </p>
        <textarea
          id="order-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="e.g. Mount a 55-inch TV on a drywall wall, hide the cables, and set up the soundbar underneath."
          className="mt-3 w-full resize-none rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:bg-paper"
        />
      </div>

      <div>
        <span className="block font-semibold text-ink">Add photos</span>
        <p className="mt-0.5 mb-3 text-[13px] text-muted">
          Show the space or the item — it really helps.
        </p>
        <PhotoUploader />
      </div>

      <div>
        <span className="block font-semibold text-ink">Your details</span>
        <p className="mt-0.5 mb-3 text-[13px] text-muted">
          We&apos;ll use these to send your quote and confirm the booking.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="order-name" className="block text-sm font-semibold text-ink">
              Your name
            </label>
            <input
              id="order-name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="First name"
              className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:bg-paper"
            />
          </div>
          <div>
            <label htmlFor="order-phone" className="block text-sm font-semibold text-ink">
              Phone
            </label>
            <input
              id="order-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(343) 555-0123"
              className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:bg-paper"
            />
          </div>
          <div>
            <label htmlFor="order-email" className="block text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="order-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:bg-paper"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryStep() {
  const {
    mode,
    category,
    task,
    quantity,
    pkg,
    description,
    contactName,
    phone,
    email,
    photos,
    status,
    errorMessage,
  } = useOrder();
  const isCustom = mode === "custom";
  if (!isCustom && !task) return null;
  const estimate = task ? estimateFor(task, quantity, pkg) : 0;
  const pkgName = packages.find((p) => p.id === pkg)?.name;

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <span className="spec-label text-muted">
          {isCustom ? "Custom request" : category?.title}
        </span>
        <h3 className="mt-1 text-lg font-extrabold text-ink">
          {isCustom ? "Your request" : task?.title}
        </h3>

        <dl className="mt-4 flex flex-col gap-2.5 text-sm">
          {!isCustom && task && (
            <>
              <Row label="Includes" value={task.includes.join(" · ")} />
              <Row label="Quantity" value={`${quantity} ${task.unit}${quantity > 1 ? "s" : ""}`} />
              <Row label="Timing" value={pkgName ?? ""} />
            </>
          )}
          {(description || isCustom) && (
            <Row label={isCustom ? "Details" : "Notes"} value={description || "—"} />
          )}
          <Row label="Name" value={contactName || "—"} />
          <Row label="Phone" value={phone || "—"} />
          <Row label="Email" value={email || "—"} />
          {photos.length > 0 && <Row label="Photos" value={`${photos.length} attached`} />}
        </dl>

        {photos.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {photos.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.id}
                src={p.preview}
                alt={p.name}
                className="h-14 w-14 rounded-lg border border-line object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {!isCustom && <EstimateBar estimate={estimate} />}

      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage || "We couldn't send your request. Please try again."}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer navigation                                                  */
/* ------------------------------------------------------------------ */
function ModalFooter() {
  const {
    mode,
    step,
    task,
    goTo,
    submit,
    status,
    description,
    contactName,
    phone,
    email,
  } = useOrder();

  if (step === "task") return null;

  const contactValid =
    contactName.trim().length > 0 && isValidPhone(phone) && isValidEmail(email);
  const descValid = mode !== "custom" || description.trim().length >= 10;
  const canReview = contactValid && descValid;

  return (
    <div className="border-t border-line px-5 py-4 sm:px-7">
      {step === "configure" && (
        <Button size="lg" className="w-full" onClick={() => goTo("details")} disabled={!task}>
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {step === "details" && (
        <div className="flex flex-col gap-2">
          <Button
            size="lg"
            className="w-full"
            onClick={() => goTo("summary")}
            disabled={!canReview}
          >
            Review order <ArrowRight className="h-4 w-4" />
          </Button>
          {!canReview && (
            <p className="text-center text-xs text-muted">
              {!descValid
                ? "Add a short description of the job."
                : "Add your name, phone and email so we can reach you."}
            </p>
          )}
        </div>
      )}

      {step === "summary" && (
        <Button
          size="lg"
          className="w-full"
          onClick={submit}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>Confirm order</>
          )}
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success                                                            */
/* ------------------------------------------------------------------ */
function SuccessView() {
  const { reset } = useOrder();
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand-700">
        <PartyPopper className="h-8 w-8" />
      </span>
      <h2 id="order-modal-title" className="mt-6 text-2xl font-extrabold text-ink">
        Order received!
      </h2>
      <p className="mt-3 max-w-sm text-muted">
        Thanks — your request is under review. We&apos;ll get back to you very soon
        with a confirmed price and time.
      </p>
      <Button size="lg" className="mt-8" onClick={reset}>
        Done
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */
function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-base font-bold tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function PackageCard({
  name,
  tagline,
  factor,
  selected,
  onSelect,
}: {
  name: string;
  tagline: string;
  factor: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex flex-col rounded-2xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-brand bg-brand-tint/60 shadow-soft"
          : "border-line bg-paper hover:border-brand/40",
      )}
    >
      <span className="flex items-center justify-between">
        <span className="font-bold text-ink">{name}</span>
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border",
            selected ? "border-brand bg-brand text-ink" : "border-line-strong",
          )}
        >
          {selected && <Check className="h-3 w-3" strokeWidth={3} />}
        </span>
      </span>
      <span className="mt-1 text-[13px] leading-snug text-muted">{tagline}</span>
      {factor > 1 && (
        <span className="mt-2 text-xs font-semibold text-brand-700">
          +{Math.round((factor - 1) * 100)}% priority
        </span>
      )}
    </button>
  );
}

function EstimateBar({ estimate }: { estimate: number }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white">
      <div>
        <span className="block text-xs text-white/60">Estimated total</span>
        <span className="text-[11px] text-white/45">
          Final price confirmed after review
        </span>
      </div>
      <span className="text-xl font-extrabold">from {formatCad(estimate)}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-20 shrink-0 text-muted">{label}</dt>
      <dd className="min-w-0 flex-1 font-medium text-ink">{value}</dd>
    </div>
  );
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidPhone(v: string): boolean {
  return v.replace(/[^0-9]/g, "").length >= 7;
}
