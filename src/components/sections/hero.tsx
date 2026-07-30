"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Star, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useContactModal } from "@/components/ui/contact-modal";
import { heroStats } from "@/lib/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAT_ICONS = [Star, ShieldCheck, Zap];

export function Hero() {
  const { openContactModal } = useContactModal();

  return (
    <section id="home" className="relative flex flex-col overflow-hidden">
      {/* ---- photo ------------------------------------------------------
           One element for every breakpoint, so the browser downloads the
           shot once. On desktop it becomes a panel pinned to the right,
           starting at the fixed header's bottom edge (70px + 1px border) so
           the nav stays on clean white, and running to the bottom of the
           section. Below lg it drops into the flow directly under the copy
           and carries the trust chips on top of it. */}
      <div className="relative order-2 aspect-[4/3] w-full sm:aspect-[2/1] lg:absolute lg:bottom-0 lg:right-0 lg:top-[71px] lg:order-none lg:aspect-auto lg:w-[58%] xl:w-[62%]">
        <Image
          src="/hero.jpg"
          alt="HandyCore toolbox, drill, level and hand tools laid out in a bright home"
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-right"
        />
        {/* blends the photo's left edge into the page behind the copy */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-[24%] bg-gradient-to-r from-paper to-transparent lg:block"
        />

        {/* trust chips — small screens only. They sit over the empty wall on
            the left of the shot, leaving the toolbox and tools clear. The
            desktop cards below are hidden here, so only one set is ever
            visible. */}
        <ul className="absolute left-2.5 top-1/2 flex w-[40%] max-w-[160px] -translate-y-1/2 flex-col gap-2 lg:hidden">
          {heroStats.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <li
                key={stat.label}
                className="flex items-center gap-2 rounded-xl border border-white/60 bg-paper/85 px-2.5 py-2 shadow-soft backdrop-blur-md"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-700">
                  <Icon className="h-3.5 w-3.5" fill={i === 0 ? "currentColor" : "none"} />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[13px] font-extrabold text-ink">
                    {stat.value}
                  </span>
                  {/* wraps rather than truncates so the label always reads in
                      full, even at 320px */}
                  <span className="block text-[10px] leading-[1.25] text-muted">
                    {stat.label}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <Container className="relative order-1 lg:order-none">
        <div className="flex flex-col justify-center pt-24 pb-6 lg:min-h-svh lg:pt-32 lg:pb-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:max-w-[42%]"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-4 py-2 text-sm font-medium text-text shadow-soft backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-brand-700" />
                Professional Handyman Services in Ottawa
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.25rem]"
            >
              Quality work.
              <br />
              You can{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">trust.</span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-[-2px] bottom-[0.1em] z-0 h-[0.36em] origin-left rounded-[3px] bg-brand"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              Reliable handyman services for homeowners in Ottawa. Fast response,
              honest pricing, and professional results — and we treat your home
              like our own.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContactModal}>
                Get Free Quote
              </Button>
              <Button variant="outline" size="lg" onClick={openContactModal}>
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
            </motion.div>

            {/* trust cards — desktop only; the chips over the photo cover
                small screens, so the two never show at the same time. */}
            <motion.div
              variants={item}
              className="mt-10 hidden gap-3 lg:grid lg:grid-cols-3"
            >
              {heroStats.map((stat, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-paper/90 p-4 shadow-soft backdrop-blur-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-700">
                      <Icon className="h-5 w-5" fill={i === 0 ? "currentColor" : "none"} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-extrabold text-ink">
                        {stat.value}
                      </span>
                      <span className="block text-xs text-muted">{stat.label}</span>
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
