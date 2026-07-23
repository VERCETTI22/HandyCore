import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { BeforeAfter } from "@/components/sections/before-after";
import { WhyChoose } from "@/components/sections/why-choose";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { business } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: business.name,
  description:
    "Professional handyman services for homeowners in Ottawa — furniture assembly, painting, door repair, TV mounting and general repairs.",
  telephone: business.phoneDisplay,
  email: business.email,
  areaServed: "Ottawa, ON",
  address: { "@type": "PostalAddress", addressLocality: "Ottawa", addressRegion: "ON", addressCountry: "CA" },
  priceRange: "$$",
  openingHours: "Mo-Sa 08:00-20:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "100" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyChoose />
        <HowItWorks />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
