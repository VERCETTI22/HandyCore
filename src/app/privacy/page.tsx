import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/layout/footer";
import { business } from "@/lib/content";

const LAST_UPDATED = "July 24, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HandyCore collects, uses and protects your personal information, in line with Canada's PIPEDA and anti-spam (CASL) requirements.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-[70px] items-center justify-between">
          <Link href="/" aria-label="HandyCore home" className="rounded-lg py-1">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </Container>
      </header>

      <main className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <span className="spec-label inline-flex items-center gap-2 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-ink md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted">Last updated: {LAST_UPDATED}</p>

          <div className="prose-legal mt-10 flex flex-col gap-9">
            <Section title="1. Who we are">
              <P>
                {business.name} is a professional handyman business serving{" "}
                {business.area}. This Privacy Policy explains what personal
                information we collect through our website ({" "}
                <a href="https://www.handycore.co" className="text-brand-700 underline-offset-2 hover:underline">
                  handycore.co
                </a>
                {" "}), how we use it, who we share it with, and the choices you
                have. We handle your personal information in accordance with
                Canada&apos;s Personal Information Protection and Electronic
                Documents Act (PIPEDA) and applicable provincial privacy law in
                Ontario.
              </P>
            </Section>

            <Section title="2. Information we collect">
              <P>
                We only collect the information you choose to give us when you
                request a quote or book a service through our online form:
              </P>
              <UL
                items={[
                  "Your name",
                  "Your phone number and email address",
                  "The service address, and — only if you choose to drop a pin on the map — the approximate map coordinates of the location",
                  "Your preferred dates and time window",
                  "A description of the work you need",
                  "Any photos you upload to show us the job",
                ]}
              />
              <P>
                We do <strong>not</strong> ask you to create an account, and we do{" "}
                <strong>not</strong> collect payment card details, banking
                information, or government identifiers on this website.
              </P>
            </Section>

            <Section title="3. How we use your information">
              <P>We use the information you provide only to:</P>
              <UL
                items={[
                  "Respond to your request and prepare an honest quote",
                  "Schedule and carry out the work you asked for",
                  "Contact you about your request or booking",
                  "Keep a reasonable record of the job",
                ]}
              />
              <P>
                We do not use your information for any purpose unrelated to the
                service you contacted us about.
              </P>
            </Section>

            <Section title="4. Your consent">
              <P>
                By submitting the form, you consent to us collecting and using
                your personal information for the purposes described above. You
                may withdraw your consent at any time by contacting us (see
                &ldquo;Contact us&rdquo; below), subject to legal or contractual
                limits and reasonable notice. Withdrawing consent may mean we can
                no longer provide the service you requested.
              </P>
            </Section>

            <Section title="5. Photos you upload">
              <P>
                Photos are used only to understand and quote your job. Before an
                uploaded photo is sent to us, your browser re-compresses it, which
                removes embedded metadata such as GPS location tags. Please avoid
                including other people or sensitive details in your photos.
              </P>
            </Section>

            <Section title="6. Service providers and international transfers">
              <P>
                We keep our operations lean and use a small number of trusted
                service providers to run the website and deliver your request:
              </P>
              <UL
                items={[
                  "Vercel — website hosting. Requests may be processed on servers located in the United States.",
                  "Resend — email delivery, used to send your request to our business inbox. May process data in the United States.",
                  "Cloudflare — domain name (DNS) management and security.",
                  "OpenStreetMap and its contributors — if you open the map to pin your location, the map imagery and the address look-up (geocoding) are provided by OpenStreetMap; the coordinates you select are sent to their service to display the map and find the matching address.",
                ]}
              />
              <P>
                Because some of these providers operate outside Canada (for
                example, in the United States), your information may be stored or
                processed outside Canada and may be accessible to courts or
                authorities in those countries under their laws. We share only
                what is necessary to provide the service and choose reputable
                providers. We do not sell your personal information to anyone.
              </P>
            </Section>

            <Section title="7. Cookies and tracking">
              <P>
                This website does <strong>not</strong> use advertising cookies or
                third-party tracking, and we do not run analytics that profile
                you. Our hosting and security providers may use minimal, essential
                technical storage needed to load the site securely and reliably.
              </P>
            </Section>

            <Section title="8. Marketing and anti-spam (CASL)">
              <P>
                We contact you only in response to the request you send us. We do
                not send marketing or promotional messages without your consent,
                in keeping with Canada&apos;s Anti-Spam Legislation (CASL). If we
                ever send an optional update you can opt out at any time.
              </P>
            </Section>

            <Section title="9. How long we keep your information">
              <P>
                We keep your request information only for as long as we need it to
                provide the service and for a reasonable period afterward for our
                records and any legal or tax obligations, after which we delete or
                anonymize it. Request emails are stored in our secure business
                inbox.
              </P>
            </Section>

            <Section title="10. How we protect your information">
              <P>
                We take reasonable steps to protect your information. The website
                is served over encrypted HTTPS, form submissions are validated on
                our server and rate-limited to deter abuse, and access to your
                information is limited to what is needed to serve you. No method of
                transmission or storage is completely secure, but we work to keep
                your information safe.
              </P>
            </Section>

            <Section title="11. Your rights">
              <P>Under Canadian privacy law, you have the right to:</P>
              <UL
                items={[
                  "Access the personal information we hold about you",
                  "Ask us to correct information that is inaccurate or incomplete",
                  "Withdraw your consent to our use of your information",
                  "Ask us to delete your information, subject to legal limits",
                ]}
              />
              <P>
                To exercise any of these rights, email us at{" "}
                <a href={`mailto:${business.email}`} className="text-brand-700 underline-offset-2 hover:underline">
                  {business.email}
                </a>
                . If you have a privacy concern we cannot resolve, you may contact
                the Office of the Privacy Commissioner of Canada at{" "}
                <a href="https://www.priv.gc.ca" className="text-brand-700 underline-offset-2 hover:underline">
                  priv.gc.ca
                </a>
                .
              </P>
            </Section>

            <Section title="12. Children">
              <P>
                Our services and website are intended for adults (homeowners). We
                do not knowingly collect personal information from children.
              </P>
            </Section>

            <Section title="13. Changes to this policy">
              <P>
                We may update this Privacy Policy from time to time. Any changes
                take effect when posted on this page, and we will update the
                &ldquo;Last updated&rdquo; date above.
              </P>
            </Section>

            <Section title="14. Contact us">
              <P>
                If you have questions about this policy or your personal
                information, please contact us:
              </P>
              <div className="rounded-2xl border border-line bg-surface p-5 text-sm">
                <p className="font-bold text-ink">{business.name}</p>
                <p className="mt-1 text-muted">{business.area}</p>
                <p className="mt-3 text-text">
                  Email:{" "}
                  <a href={`mailto:${business.email}`} className="font-semibold text-brand-700 underline-offset-2 hover:underline">
                    {business.email}
                  </a>
                </p>
                <p className="text-text">
                  Phone:{" "}
                  <a href={business.phoneHref} className="font-semibold text-brand-700 underline-offset-2 hover:underline">
                    {business.phoneDisplay}
                  </a>
                </p>
              </div>
            </Section>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-muted">{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}
