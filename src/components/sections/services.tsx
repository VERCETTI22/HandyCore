"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Handyman services, done right"
          description="The five jobs Ottawa homeowners call me for most. If what you need isn't listed, just ask — odds are it's on my list too."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i % 3}>
                <a
                  href="#contact"
                  className="group relative flex h-full flex-col rounded-3xl border border-line bg-paper p-7 shadow-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lift"
                >
                  <span className="spec-label absolute right-6 top-7 text-faint">
                    {service.index}
                  </span>

                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-6 text-xl font-bold text-ink">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                    {service.blurb}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <span className="transition-colors group-hover:text-brand-700">
                      Get a quote
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-700" />
                  </span>
                </a>
              </Reveal>
            );
          })}

          {/* brand CTA card fills the 6th slot */}
          <Reveal delay={2}>
            <a
              href="#contact"
              className="group flex h-full flex-col justify-between rounded-3xl bg-ink p-7 text-white shadow-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-lift"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-ink">
                <Plus className="h-7 w-7" strokeWidth={2} />
              </span>
              <div className="mt-6">
                <h3 className="text-xl font-bold">Something else on your list?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">
                  Odd jobs, small fixes, whole afternoons of them — tell me what you
                  need and I&apos;ll sort it.
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Start here
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
