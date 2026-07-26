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

export function Hero() {
  const { openContactModal } = useContactModal();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* ---- photo: full-bleed backdrop on desktop ---------------------
           The shot has an empty, light left-hand side, so the copy sits
           straight on it; a soft wash guarantees contrast at any width. */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 via-35% to-transparent" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[100svh] flex-col justify-center pt-28 pb-16 lg:min-h-[92svh] lg:pt-32">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:max-w-[46%]"
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

            {/* trust stats */}
            <motion.div
              variants={item}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {heroStats.map((stat, i) => {
                const Icon = [Star, ShieldCheck, Zap][i];
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

      {/* ---- photo: stacked under the copy on phones and tablets ---- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative -mt-6 aspect-[3/2] w-full lg:hidden"
      >
        <Image
          src="/hero.jpg"
          alt="HandyCore toolbox, drill, level and hand tools laid out in a bright home"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
