import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  tag: string;
  before: string;
  after: string;
};

const projects: Project[] = [
  {
    title: '85" TV wall-mount & cable setup',
    tag: "TV Mounting",
    before: "/projects/1-before.jpg",
    after: "/projects/1-after.jpg",
  },
  {
    title: "Exterior light fixture replaced",
    tag: "Lighting",
    before: "/projects/2-before.jpg",
    after: "/projects/2-after.jpg",
  },
  {
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
          eyebrow="Projects"
          title="Real work, real homes"
          description="A few recent jobs around Ottawa — here's the before and after, side by side."
          align="center"
          tone="dark"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i % 2}>
              <article className="h-full overflow-hidden rounded-3xl bg-ink-800 ring-1 ring-white/10">
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
