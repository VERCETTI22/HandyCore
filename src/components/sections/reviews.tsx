"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { reviews } from "@/lib/content";

export function Reviews() {
  const scroller = React.useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section id="reviews" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <span className="spec-label inline-flex items-center gap-2 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Reviews
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.05] text-ink sm:text-4xl md:text-5xl">
                Loved by Ottawa homeowners
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5" fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted">
                  4.9 average · 100+ jobs completed
                </span>
              </div>
            </Reveal>
          </div>

          {/* arrows */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous reviews"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-surface"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next reviews"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-surface"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scroll-padding-left:1.5rem]"
        >
          {reviews.map((review) => (
            <article
              key={review.name}
              data-card
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl border border-line bg-paper p-8 shadow-soft sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-brand/25" fill="currentColor" strokeWidth={0} />
              </div>

              <p className="mt-5 flex-1 text-[17px] leading-relaxed text-ink">
                “{review.quote}”
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  {review.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-ink">{review.name}</span>
                  <span className="block text-xs text-muted">{review.location}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
