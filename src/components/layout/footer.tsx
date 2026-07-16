import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { navLinks, services, business } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Professional handyman services for Ottawa homeowners. One trusted local
              pro — insured, punctual, and genuinely proud of the work.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-600"
            >
              Get a free quote
            </a>
          </div>

          {/* quick links */}
          <nav aria-label="Quick links">
            <h3 className="spec-label text-white/40">Quick links</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <nav aria-label="Services">
            <h3 className="spec-label text-white/40">Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-white/70 transition-colors hover:text-brand"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="spec-label text-white/40">Contact</h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={business.phoneHref}
                  className="flex items-center gap-3 text-white/70 transition-colors hover:text-brand"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-3 text-white/70 transition-colors hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" />
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Clock className="h-4 w-4 shrink-0 text-brand" />
                {business.hours}
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4 shrink-0 text-brand" />
                {business.area}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/45">
            © {year} {business.name}. All rights reserved.
          </p>
          <p className="spec-label text-white/30">Handyman services · Ottawa, ON</p>
        </div>
      </Container>
    </footer>
  );
}
