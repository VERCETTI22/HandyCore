import { Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, business } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="bg-surface py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* left — intro */}
          <div className="lg:pr-6">
            <Reveal>
              <span className="spec-label inline-flex items-center gap-2 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                FAQ
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.05] text-ink sm:text-4xl md:text-5xl">
                Questions? Answered.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                The things homeowners ask before booking. Still unsure about
                something? Call and ask — no pressure, no obligation.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8">
                <Button href={business.phoneHref} variant="dark" size="lg">
                  <Phone className="h-4 w-4" />
                  {business.phoneDisplay}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* right — accordion */}
          <Reveal delay={1}>
            <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
