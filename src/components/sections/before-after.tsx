import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Real customer feedback, published with first name only and no location. */
type Review = {
  quote: string;
  name: string;
  initial: string;
};

type Project = {
  title: string;
  tag: string;
  before: string;
  after: string;
  /** optional — a card shows just the photos until a real review exists */
  review?: Review;
};

const projects: Project[] = [
  {
    title: '85" TV wall-mount & cable setup',
    tag: "TV Mounting",
    before: "/projects/1-before.jpg",
    after: "/projects/1-after.jpg",
    review: { quote: "Great", name: "Neel", initial: "N" },
  },
  {
    title: "Exterior light fixture replaced",
    tag: "Lighting",
    before: "/projects/2-before.jpg",
    after: "/projects/2-after.jpg",
    review: { quote: "Awesome 👍", name: "Sandra", initial: "S" },
  },
  {
    // no written feedback left for this job — photos speak for themselves
    title: "Floating shelves installed",
    tag: "Shelving",
    before: "/projects/3-before.jpg",
    after: "/projects/3-after.jpg",
  },
  {
    title: "Hardwired smoke & CO alarm",
    tag: "General Repairs",
    before: "/projects/4-before.jpg",
    after: "/projects/4-after.jpg",
    review: {
      quote: "Conscientious, polite, communicative, adaptable.",
      name: "Danl",
      initial: "D",
    },
  },
];

export function BeforeAfter() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-ink py-24 text-white md:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Projects & Reviews"
          title="Real work, real homes"
          description="A few recent jobs around Ottawa — the before, the after, and what the homeowner said."
          align="center"
          tone="dark"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i % 2}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-ink-800 ring-1 ring-white/10">
                <div className="grid grid-cols-2 gap-[3px]">
                  <ProjectImage
                    src={project.before}
                    alt={`${project.title} — before`}
                    label="Before"
                  />
                  <ProjectImage
                    src={project.after}
                    alt={`${project.title} — after`}
                    label="After"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <h3 className="text-[15px] font-bold text-white">{project.title}</h3>
                  <span className="spec-label shrink-0 text-white/40">{project.tag}</span>
                </div>

                {project.review && (
                  <div className="mt-auto flex items-center gap-3 border-t border-white/10 px-5 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                      {project.review.initial}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] leading-snug text-white/80">
                        “{project.review.quote}”
                      </span>
                      <span className="mt-0.5 block text-xs font-semibold text-white/45">
                        {project.review.name}
                      </span>
                    </span>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectImage({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: "Before" | "After";
}) {
  const isAfter = label === "After";
  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 24vw, 46vw"
        className="object-cover"
      />
      <span
        className={cn(
          "absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
          isAfter
            ? "bg-brand text-ink"
            : "bg-ink/70 text-white/85 backdrop-blur-sm",
        )}
      >
        {label}
      </span>
    </div>
  );
}
