import {
  Hammer,
  PaintRoller,
  DoorClosed,
  Tv,
  Wrench,
  ShieldCheck,
  Wallet,
  Sparkles,
  Clock,
  ClipboardList,
  CalendarClock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

/* ---- Business details (edit these to update the site) ------------- */
export const business = {
  name: "HandyCore",
  tagline: "Professional Handyman Services in Ottawa",
  phoneDisplay: "(613) 555-0142",
  phoneHref: "tel:+16135550142",
  email: "hello@handycore.ca",
  area: "Ottawa & surrounding areas",
  hours: "Mon–Sat · 8am–8pm",
};

/* ---- Navigation --------------------------------------------------- */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* ---- Hero trust stats --------------------------------------------- */
export const heroStats: { icon: string; value: string; label: string }[] = [
  { icon: "⭐", value: "100+", label: "Happy customers" },
  { icon: "🛡", value: "Fully", label: "Insured & vetted" },
  { icon: "⚡", value: "Same week", label: "Availability" },
];

/* ---- Services ----------------------------------------------------- */
export type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  index: string;
};

export const services: Service[] = [
  {
    icon: Hammer,
    title: "Furniture Assembly",
    blurb: "Flat-pack, wardrobes and shelving built solid, square and level.",
    index: "01",
  },
  {
    icon: PaintRoller,
    title: "Painting",
    blurb: "Clean lines, even coats and tidy edges — rooms that look new.",
    index: "02",
  },
  {
    icon: DoorClosed,
    title: "Door Repair",
    blurb: "Sticking, sagging or squeaking doors adjusted and made right.",
    index: "03",
  },
  {
    icon: Tv,
    title: "TV Mounting",
    blurb: "Securely mounted, cables tucked away, perfectly straight.",
    index: "04",
  },
  {
    icon: Wrench,
    title: "General Repairs",
    blurb: "The odd jobs and small fixes that never seem to get done.",
    index: "05",
  },
];

/* ---- Why choose HandyCore ----------------------------------------- */
export const reasons: { icon: LucideIcon; title: string; blurb: string }[] = [
  {
    icon: ShieldCheck,
    title: "Reliable",
    blurb: "I show up when I say I will and do exactly what I promised.",
  },
  {
    icon: Wallet,
    title: "Affordable",
    blurb: "Honest, upfront pricing you approve before any work begins.",
  },
  {
    icon: Sparkles,
    title: "Clean Work",
    blurb: "I tidy as I go and leave your home cleaner than I found it.",
  },
  {
    icon: Clock,
    title: "On Time",
    blurb: "Punctual arrivals and real respect for your schedule.",
  },
];

/* ---- How it works ------------------------------------------------- */
export const steps: {
  icon: LucideIcon;
  title: string;
  blurb: string;
}[] = [
  {
    icon: ClipboardList,
    title: "Request a Quote",
    blurb:
      "Send a few details by phone or the quick form. You'll get an honest, no-obligation price the same day.",
  },
  {
    icon: CalendarClock,
    title: "Schedule Service",
    blurb:
      "We pick a time that fits your week — including evenings — and I confirm everything before arriving.",
  },
  {
    icon: CheckCircle2,
    title: "Enjoy the Results",
    blurb:
      "The job gets done right, cleaned up and checked with you, so your home finally feels finished.",
  },
];

/* ---- Reviews ------------------------------------------------------ */
export type Review = {
  quote: string;
  name: string;
  location: string;
  initials: string;
};

export const reviews: Review[] = [
  {
    quote:
      "Mounted our TV and hid every single cable. It looks like it was always meant to be there — punctual and spotless work.",
    name: "Sarah M.",
    location: "Westboro · Ottawa, ON",
    initials: "SM",
  },
  {
    quote:
      "Assembled two wardrobes and a bed frame in an afternoon. Everything is rock solid and perfectly level. Couldn't be happier.",
    name: "David R.",
    location: "Kanata · Ottawa, ON",
    initials: "DR",
  },
  {
    quote:
      "Repainted our hallway and it looks brand new. Clean lines, zero mess, and an honest price I agreed to up front.",
    name: "Priya S.",
    location: "The Glebe · Ottawa, ON",
    initials: "PS",
  },
  {
    quote:
      "Fixed three doors that had been driving me crazy for years. Quick, friendly and genuinely fair. Highly recommend.",
    name: "Marc L.",
    location: "Orléans · Ottawa, ON",
    initials: "ML",
  },
  {
    quote:
      "Booked an evening slot around my work schedule. Reliable, tidy and easy to deal with — I've already booked him again.",
    name: "Jennifer T.",
    location: "Barrhaven · Ottawa, ON",
    initials: "JT",
  },
];

/* ---- FAQ ---------------------------------------------------------- */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How much do you charge?",
    a: "Every home and job is a little different, so I quote each one up front with no hidden fees. Most small jobs start around $80, and you'll always approve the price before I begin.",
  },
  {
    q: "Do you bring your own tools?",
    a: "Always. I arrive fully equipped with professional tools and standard fixings, so there's nothing you need to buy, supply or prepare in advance.",
  },
  {
    q: "Can I book evenings?",
    a: "Yes. Alongside daytime slots, I keep evening and select weekend appointments open so we can work around your schedule, not the other way around.",
  },
  {
    q: "How do I pay?",
    a: "Whatever is easiest for you — e-transfer, credit card or cash. Payment is only due once the work is finished and you're completely happy with it.",
  },
];
