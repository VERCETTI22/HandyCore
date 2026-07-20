import {
  Hammer,
  PaintRoller,
  DoorClosed,
  Tv,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Service ordering catalogue for the "request a quote" flow.
 *
 * Prices are INDICATIVE "from" estimates at average Ottawa market rates — they
 * are shown as a guide and recalculated live, but the final price is always
 * confirmed by HandyCore after reviewing the request. They intentionally do not
 * act as a binding checkout total. Edit the numbers freely.
 */
export type OrderTask = {
  title: string;
  /** what a typical job of this kind includes */
  includes: string[];
  /** indicative starting price in CAD */
  estimateFrom: number;
  /** how quantity is counted, e.g. "room", "door", "item" (singular) */
  unit: string;
};

export type OrderCategory = {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  tasks: OrderTask[];
};

export type PackageId = "basic" | "express";

export const packages: {
  id: PackageId;
  name: string;
  tagline: string;
  factor: number;
}[] = [
  { id: "basic", name: "Basic", tagline: "Standard scheduling, usually this week", factor: 1 },
  { id: "express", name: "Express", tagline: "Priority — soonest slot, evenings & weekends", factor: 1.25 },
];

export const orderCategories: OrderCategory[] = [
  {
    slug: "furniture-assembly",
    title: "Furniture Assembly",
    icon: Hammer,
    blurb: "Flat-pack and built-in furniture, put together solid and level.",
    tasks: [
      {
        title: "Flat-pack item (desk, dresser, table)",
        unit: "item",
        estimateFrom: 60,
        includes: ["Full assembly", "Levelled & wall-anchored if needed", "Packaging cleared away"],
      },
      {
        title: "Wardrobe / closet system",
        unit: "unit",
        estimateFrom: 110,
        includes: ["Assembly & alignment", "Doors and drawers adjusted", "Secured to wall for safety"],
      },
      {
        title: "Bed frame",
        unit: "bed",
        estimateFrom: 80,
        includes: ["Frame & slats assembled", "Squared and tightened", "Squeak check"],
      },
      {
        title: "Shelving / bookcase",
        unit: "unit",
        estimateFrom: 75,
        includes: ["Assembly", "Anchored to wall studs", "Levelled"],
      },
      {
        title: "IKEA kitchen cabinet unit",
        unit: "cabinet",
        estimateFrom: 130,
        includes: ["Cabinet build & hang", "Doors aligned", "Levelled and secured"],
      },
    ],
  },
  {
    slug: "painting",
    title: "Painting",
    icon: PaintRoller,
    blurb: "Clean lines and even coats — rooms that look new.",
    tasks: [
      {
        title: "Single room repaint (walls)",
        unit: "room",
        estimateFrom: 280,
        includes: ["Prep, fill & sand", "Two coats", "Trim protected, tidy clean-up"],
      },
      {
        title: "Accent / feature wall",
        unit: "wall",
        estimateFrom: 120,
        includes: ["Prep & tape", "Two coats", "Crisp edges"],
      },
      {
        title: "Trim, baseboards & doors",
        unit: "room",
        estimateFrom: 160,
        includes: ["Sand & prep", "Two coats enamel", "Clean lines"],
      },
      {
        title: "Ceiling",
        unit: "room",
        estimateFrom: 150,
        includes: ["Prep & cover", "Roller coats", "Splatter clean-up"],
      },
      {
        title: "Touch-ups & patch + paint",
        unit: "visit",
        estimateFrom: 90,
        includes: ["Fill & sand marks", "Colour-matched touch-up", "Blend to existing"],
      },
    ],
  },
  {
    slug: "door-repair",
    title: "Door Repair",
    icon: DoorClosed,
    blurb: "Sticking, sagging or squeaking doors made right.",
    tasks: [
      {
        title: "Adjust sticking / misaligned door",
        unit: "door",
        estimateFrom: 70,
        includes: ["Diagnose the bind", "Plane / realign", "Smooth close test"],
      },
      {
        title: "Hinge repair or replacement",
        unit: "door",
        estimateFrom: 80,
        includes: ["Remove & replace hinges", "Reset screws / anchors", "Align and test"],
      },
      {
        title: "New handle / deadbolt install",
        unit: "door",
        estimateFrom: 85,
        includes: ["Fit handle or deadbolt", "Align strike plate", "Smooth operation check"],
      },
      {
        title: "Interior door supply & install",
        unit: "door",
        estimateFrom: 180,
        includes: ["Hang & shim", "Hardware fitted", "Levelled and finished"],
      },
      {
        title: "Sliding / closet door fix",
        unit: "door",
        estimateFrom: 90,
        includes: ["Track & roller service", "Realign", "Glide test"],
      },
    ],
  },
  {
    slug: "tv-mounting",
    title: "TV Mounting",
    icon: Tv,
    blurb: "Securely mounted, cables tucked away, perfectly straight.",
    tasks: [
      {
        title: 'TV wall mount (up to 55")',
        unit: "TV",
        estimateFrom: 90,
        includes: ["Bracket into studs", "TV hung & levelled", "Basic cable tidy"],
      },
      {
        title: 'Large TV (56" and up)',
        unit: "TV",
        estimateFrom: 130,
        includes: ["Heavy-duty bracket", "Two-person safe hang", "Levelled"],
      },
      {
        title: "Mount + in-wall cable concealment",
        unit: "TV",
        estimateFrom: 170,
        includes: ["Mount & level", "Cables hidden in-wall", "Power/HDMI routed"],
      },
      {
        title: "Soundbar / shelf add-on",
        unit: "add-on",
        estimateFrom: 60,
        includes: ["Soundbar or shelf mounted", "Aligned to TV", "Cables tidied"],
      },
    ],
  },
  {
    slug: "general-repairs",
    title: "General Repairs",
    icon: Wrench,
    blurb: "The odd jobs and small fixes that never get done.",
    tasks: [
      {
        title: "Picture / mirror / art hanging",
        unit: "piece",
        estimateFrom: 50,
        includes: ["Correct fixings for the wall", "Levelled", "Marks cleaned up"],
      },
      {
        title: "Curtain rods & blinds",
        unit: "window",
        estimateFrom: 70,
        includes: ["Brackets fitted", "Rod / blind hung", "Levelled & tested"],
      },
      {
        title: "Small drywall patch & paint",
        unit: "patch",
        estimateFrom: 110,
        includes: ["Patch & sand", "Prime & paint", "Blended finish"],
      },
      {
        title: "Caulking (bath / kitchen)",
        unit: "area",
        estimateFrom: 90,
        includes: ["Remove old caulk", "Clean & reseal", "Neat finish"],
      },
      {
        title: "Odd jobs (per hour)",
        unit: "hour",
        estimateFrom: 65,
        includes: ["Flexible handyman time", "Bring your list", "Tools & fixings included"],
      },
    ],
  },
];

export function getCategory(slug: string) {
  return orderCategories.find((c) => c.slug === slug);
}

/** Indicative estimate for a task given quantity and package. */
export function estimateFor(
  task: OrderTask,
  quantity: number,
  pkg: PackageId,
): number {
  const factor = packages.find((p) => p.id === pkg)?.factor ?? 1;
  return Math.round(task.estimateFrom * Math.max(1, quantity) * factor);
}

export function formatCad(amount: number): string {
  return `$${amount.toLocaleString("en-CA")}`;
}
