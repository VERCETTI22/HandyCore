"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Star, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroScene } from "@/components/visuals/hero-scene";
import { heroStats } from "@/lib/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      {/* soft ambient wash behind the illustration column */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-brand/12 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* ---- left ---- */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-text shadow-soft">
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
              honest pricing, and professional results — from one trusted local pro
              who treats your home like his own.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#contact" size="lg">
                Get Free Quote
              </Button>
              <Button href="tel:+16135550142" variant="outline" size="lg">
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
            </motion.div>

            {/* stat cards */}
            <motion.div
              variants={item}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {heroStats.map((stat, i) => {
                const Icon = [Star, ShieldCheck, Zap][i];
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-4 shadow-soft"
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

          {/* ---- right — illustration ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          >
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-surface shadow-lift ring-1 ring-line">
              <HeroScene className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
            </div>

            {/* floating rating chip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl border border-line bg-paper/90 px-4 py-3 shadow-lift backdrop-blur-md sm:-left-6"
            >
              <div className="flex text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-ink">4.9 rating</div>
                <div className="text-xs text-muted">100+ local jobs</div>
              </div>
            </motion.div>

            {/* floating availability chip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="absolute -right-3 bottom-8 flex items-center gap-3 rounded-2xl border border-line bg-paper/90 px-4 py-3 shadow-lift backdrop-blur-md sm:-right-6"
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute h-4 w-4 rounded-full bg-emerald-400/25" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-ink">Available this week</div>
                <div className="text-xs text-muted">Booking in Ottawa now</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
