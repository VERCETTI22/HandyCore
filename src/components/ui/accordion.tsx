"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-paper transition-colors data-[state=open]:border-brand/40 data-[state=open]:shadow-soft",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-ink transition-colors hover:text-brand-700 md:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-colors group-hover:bg-brand group-hover:text-ink group-data-[state=open]:bg-ink group-data-[state=open]:text-white">
          <Plus className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.25s_cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-[accordion-down_0.3s_cubic-bezier(0.22,1,0.36,1)]"
      {...props}
    >
      <div className={cn("px-6 pb-6 pt-0 text-[15px] leading-relaxed text-muted", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
