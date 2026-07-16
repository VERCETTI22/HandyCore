# HandyCore

A premium, conversion-focused landing page for **HandyCore** — a professional
handyman serving Ottawa. Built to feel like a custom agency site: minimal, lots
of white space, soft shadows, rounded corners, and subtle motion.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (design tokens live in `src/app/globals.css`)
- **Framer Motion** — scroll reveals, hover lift, button ripple, navbar blur
- **Radix UI** — accessible FAQ accordion
- **lucide-react** — icons
- **Manrope** (display/body) + **JetBrains Mono** (spec-style labels)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Design system

All tokens are defined once in `src/app/globals.css` under `@theme`:

| Token | Value | Usage |
| --- | --- | --- |
| `--color-brand` | `#F4B400` | Primary yellow (`bg-brand`, `text-brand`) |
| `--color-ink` | `#121212` | Dark (`bg-ink`, `text-ink`) |
| `--color-paper` | `#FFFFFF` | Background |
| `--color-surface` | `#F8F8F8` | Secondary surface |
| `--color-text` | `#222222` | Body text |

Radii are 14–32px (`rounded-2xl` … `rounded-4xl`), with a soft two-layer shadow
system (`shadow-soft`, `shadow-lift`).

## Editing content

**All copy, services, reviews, and FAQs live in one file:**
[`src/lib/content.ts`](src/lib/content.ts).

Update the `business` object there to change the phone number, email, hours, and
service area — those values feed the navbar, hero, CTA, footer, and SEO schema.

## Folder structure

```
src/
  app/
    layout.tsx          # fonts, metadata, providers
    page.tsx            # section assembly + LocalBusiness JSON-LD
    globals.css         # design tokens + base styles
    icon.svg            # favicon (spirit-level mark)
  components/
    layout/             # navbar, footer
    sections/           # hero, services, before-after, why-choose,
                        # how-it-works, reviews, faq, cta
    ui/                 # button, container, logo, reveal, accordion,
                        # section-heading, before-after-slider
    visuals/            # SVG illustrations (hero + before/after scenes)
  lib/
    content.ts          # ← all site content
    utils.ts            # cn() helper
```

## Swapping the illustrations for real photos

The hero and before/after images are hand-built **SVG illustrations** so the site
looks finished out of the box. To use real photography instead:

1. Drop optimized images into `public/` (e.g. `public/hero.jpg`).
2. **Hero** — in `src/components/sections/hero.tsx`, replace `<HeroScene … />`
   with a `next/image`:
   ```tsx
   import Image from "next/image";
   // …
   <Image src="/hero.jpg" alt="Handyman at work in a modern Ottawa home"
          fill priority className="object-cover" />
   ```
3. **Before / After** — in `src/components/sections/before-after.tsx`, swap the
   `before`/`after` nodes in the `projects` array for `<Image>` elements. The
   slider works with any content.

`next/image` handles lazy loading, sizing, and modern formats automatically.

---

> Placeholder details to replace before launch: phone `(613) 555-0142`, email
> `hello@handycore.ca`, and the review quotes/ratings in `content.ts`.
