"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="How it works"
          description="Three simple steps from “I really should fix that” to done — usually within the same week."
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* desktop connector line */}
          <div
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-0.5 md:block"
          >
            <div className="absolute inset-0 rounded-full bg-line-strong" />
            <motion.div
              className="absolute inset-y-0 left-0 origin-left rounded-full bg-brand"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ right: 0 }}
            />
          </div>

          <div className="grid gap-y-4 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <div key={step.title} className="flex flex-col items-center">
                  <Reveal delay={i} className="flex w-full flex-col items-center text-center">
                    <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl font-extrabold text-white shadow-soft ring-4 ring-surface">
                      {i + 1}
                    </span>
                    <span className="mt-6 flex items-center gap-2 text-brand-700">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                      <span className="spec-label text-muted">Step {i + 1}</span>
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted">
                      {step.blurb}
                    </p>
                  </Reveal>

                  {/* mobile down-arrow connector */}
                  {!isLast && (
                    <div className="my-5 flex justify-center md:hidden" aria-hidden>
                      <ArrowDown className="h-5 w-5 text-brand" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
