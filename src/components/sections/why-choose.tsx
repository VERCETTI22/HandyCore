import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { reasons } from "@/lib/content";

const badges = ["Fully insured", "Police-checked", "Satisfaction guaranteed"];

export function WhyChoose() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* left — pitch */}
          <div className="lg:pr-8">
            <Reveal>
              <span className="spec-label inline-flex items-center gap-2 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Why HandyCore
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.05] text-ink sm:text-4xl md:text-5xl">
                Reliable service.
                <br />
                <span className="text-brand-700">Every time.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                You&apos;re not calling a call centre. You get experienced local
                handymen who answer the phone, quote the job, and do the work
                themselves — carefully, start to finish.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {badges.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-text"
                  >
                    <Check className="h-4 w-4 text-brand-700" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-9">
                <Button href="#contact" size="lg">
                  Get a free quote
                </Button>
              </div>
            </Reveal>
          </div>

          {/* right — reason cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <Reveal key={reason.title} delay={i % 2}>
                  <div className="group h-full rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-paper hover:shadow-lift">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-700 transition-colors group-hover:bg-brand group-hover:text-ink">
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink">{reason.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      {reason.blurb}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
