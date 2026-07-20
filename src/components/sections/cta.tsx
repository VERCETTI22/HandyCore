import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ContactModalButton } from "@/components/ui/contact-modal";
import { business } from "@/lib/content";

export function Cta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand py-24 text-ink md:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-light opacity-70" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="spec-label inline-flex items-center gap-2 text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Get started
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl md:text-6xl">
              Ready to fix your home?
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              Tell me what needs doing and I&apos;ll send an honest, no-obligation
              quote the same day. No call centres — just a straight answer from the
              person who&apos;ll do the work.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ContactModalButton variant="dark" size="lg">
                Get Free Quote
              </ContactModalButton>
              <Button
                href={business.phoneHref}
                variant="outline"
                size="lg"
                className="text-ink ring-ink/25 hover:bg-ink/5 hover:ring-ink"
              >
                <Phone className="h-4 w-4" />
                {business.phoneDisplay}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-10 text-left sm:grid-cols-4 sm:text-center">
              <ContactFact icon={Phone} label="Call or text" value={business.phoneDisplay} />
              <ContactFact icon={Mail} label="Email" value={business.email} />
              <ContactFact icon={Clock} label="Hours" value={business.hours} />
              <ContactFact icon={MapPin} label="Serving" value={business.area} />
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 sm:items-center">
      <Icon className="h-5 w-5 text-ink/70" strokeWidth={1.8} />
      <dt className="spec-label mt-1 text-ink/50">{label}</dt>
      <dd className="text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}
