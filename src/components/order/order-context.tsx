"use client";

import * as React from "react";
import {
  getCategory,
  type OrderCategory,
  type OrderTask,
  type PackageId,
} from "@/lib/order-catalog";

export type OrderStep = "task" | "configure" | "details" | "summary";
export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export type OrderPhoto = {
  id: string;
  name: string;
  type: string;
  size: number;
  /** object URL for preview */
  preview: string;
  file: File;
};

export type OrderMode = "catalog" | "custom";

type OrderState = {
  isOpen: boolean;
  mode: OrderMode;
  step: OrderStep;
  category: OrderCategory | null;
  taskIndex: number | null;
  quantity: number;
  pkg: PackageId;
  description: string;
  contactName: string;
  phone: string;
  email: string;
  photos: OrderPhoto[];
  status: SubmitStatus;
  errorMessage: string;
};

type OrderContextValue = OrderState & {
  task: OrderTask | null;
  openOrder: (slug: string) => void;
  openCustom: () => void;
  close: () => void;
  goBack: () => void;
  selectTask: (index: number) => void;
  setQuantity: (q: number) => void;
  setPackage: (p: PackageId) => void;
  setDescription: (v: string) => void;
  setContactName: (v: string) => void;
  setPhone: (v: string) => void;
  setEmail: (v: string) => void;
  addPhotos: (photos: OrderPhoto[]) => void;
  removePhoto: (id: string) => void;
  goTo: (step: OrderStep) => void;
  submit: () => Promise<void>;
  reset: () => void;
};

const initialState: OrderState = {
  isOpen: false,
  mode: "catalog",
  step: "task",
  category: null,
  taskIndex: null,
  quantity: 1,
  pkg: "basic",
  description: "",
  contactName: "",
  phone: "",
  email: "",
  photos: [],
  status: "idle",
  errorMessage: "",
};

const OrderContext = React.createContext<OrderContextValue | null>(null);

export function useOrder() {
  const ctx = React.useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}

const STEP_ORDER_CATALOG: OrderStep[] = ["task", "configure", "details", "summary"];
const STEP_ORDER_CUSTOM: OrderStep[] = ["details", "summary"];

function stepsForMode(mode: OrderMode): OrderStep[] {
  return mode === "custom" ? STEP_ORDER_CUSTOM : STEP_ORDER_CATALOG;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<OrderState>(initialState);

  // mirror the latest state/photos into refs so submit() (a stable callback)
  // always reads current values and cleanup can revoke object URLs
  const stateRef = React.useRef(state);
  stateRef.current = state;
  const photosRef = React.useRef<OrderPhoto[]>([]);
  photosRef.current = state.photos;
  React.useEffect(() => {
    return () => {
      photosRef.current.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, []);

  const task = React.useMemo<OrderTask | null>(() => {
    if (!state.category || state.taskIndex === null) return null;
    return state.category.tasks[state.taskIndex] ?? null;
  }, [state.category, state.taskIndex]);

  const openOrder = React.useCallback((slug: string) => {
    const category = getCategory(slug) ?? null;
    setState({ ...initialState, isOpen: true, mode: "catalog", category, step: "task" });
  }, []);

  const openCustom = React.useCallback(() => {
    setState({ ...initialState, isOpen: true, mode: "custom", step: "details" });
  }, []);

  const close = React.useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const reset = React.useCallback(() => {
    photosRef.current.forEach((p) => URL.revokeObjectURL(p.preview));
    setState(initialState);
  }, []);

  const goTo = React.useCallback((step: OrderStep) => {
    setState((s) => ({ ...s, step }));
  }, []);

  const goBack = React.useCallback(() => {
    setState((s) => {
      const order = stepsForMode(s.mode);
      const i = order.indexOf(s.step);
      if (i <= 0) return { ...s, isOpen: false };
      return { ...s, step: order[i - 1] };
    });
  }, []);

  const selectTask = React.useCallback((index: number) => {
    setState((s) => ({ ...s, taskIndex: index, step: "configure", quantity: 1 }));
  }, []);

  const setQuantity = React.useCallback((q: number) => {
    setState((s) => ({ ...s, quantity: Math.min(50, Math.max(1, Math.round(q || 1))) }));
  }, []);

  const setPackage = React.useCallback((p: PackageId) => {
    setState((s) => ({ ...s, pkg: p }));
  }, []);

  const setDescription = React.useCallback((v: string) => {
    setState((s) => ({ ...s, description: v.slice(0, 2000) }));
  }, []);

  const setContactName = React.useCallback((v: string) => {
    setState((s) => ({ ...s, contactName: v.slice(0, 120) }));
  }, []);

  const setPhone = React.useCallback((v: string) => {
    setState((s) => ({ ...s, phone: v.slice(0, 40) }));
  }, []);

  const setEmail = React.useCallback((v: string) => {
    setState((s) => ({ ...s, email: v.slice(0, 160) }));
  }, []);

  const addPhotos = React.useCallback((photos: OrderPhoto[]) => {
    setState((s) => ({ ...s, photos: [...s.photos, ...photos].slice(0, 5) }));
  }, []);

  const removePhoto = React.useCallback((id: string) => {
    setState((s) => {
      const found = s.photos.find((p) => p.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return { ...s, photos: s.photos.filter((p) => p.id !== id) };
    });
  }, []);

  const submit = React.useCallback(async () => {
    setState((s) => ({ ...s, status: "submitting", errorMessage: "" }));
    try {
      const snapshot = stateRef.current;
      const selected =
        snapshot.category?.tasks[snapshot.taskIndex ?? 0] ?? null;

      const photoPayload = await Promise.all(
        snapshot.photos.map(async (p) => ({
          name: p.name,
          type: p.type,
          dataUrl: await compressToDataUrl(p.file),
        })),
      );

      const payload = {
        mode: snapshot.mode,
        categorySlug: snapshot.category?.slug ?? "",
        taskTitle: selected?.title ?? "",
        quantity: snapshot.quantity,
        package: snapshot.pkg,
        description: snapshot.description,
        contactName: snapshot.contactName,
        phone: snapshot.phone,
        email: snapshot.email,
        photos: photoPayload,
        hp: "", // honeypot — real users leave this empty
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong sending your request.");
      }

      setState((s) => ({ ...s, status: "success" }));
    } catch (err) {
      setState((s) => ({
        ...s,
        status: "error",
        errorMessage:
          err instanceof Error
            ? err.message
            : "Something went wrong sending your request.",
      }));
    }
  }, []);

  const value: OrderContextValue = {
    ...state,
    task,
    openOrder,
    openCustom,
    close,
    goBack,
    selectTask,
    setQuantity,
    setPackage,
    setDescription,
    setContactName,
    setPhone,
    setEmail,
    addPhotos,
    removePhoto,
    goTo,
    submit,
    reset,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

/**
 * Downscale + re-encode an image so photo payloads stay small enough for a
 * serverless request/email attachment. Falls back to the original data URL if
 * the browser can't process it.
 */
async function compressToDataUrl(file: File, maxDim = 1600, quality = 0.8): Promise<string> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no ctx");
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    return canvas.toDataURL("image/jpeg", quality);
  } catch {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
