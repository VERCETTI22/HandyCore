import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  BeforeAfterSlider,
  type ComparisonProject,
} from "@/components/ui/before-after-slider";
import { RoomScene } from "@/components/visuals/room-scene";
import { TvWallScene } from "@/components/visuals/tvwall-scene";

const projects: ComparisonProject[] = [
  {
    title: "Living room repaint & gallery wall",
    location: "Westboro · Ottawa, ON",
    before: <RoomScene state="before" className="h-full w-full" />,
    after: <RoomScene state="after" className="h-full w-full" />,
  },
  {
    title: "TV mounting & cable tidy-up",
    location: "Kanata · Ottawa, ON",
    before: <TvWallScene state="before" className="h-full w-full" />,
    after: <TvWallScene state="after" className="h-full w-full" />,
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
          title="Real results, drag to see"
          description="Every job is documented start to finish. Grab the handle and slide — this is the same room, before and after."
          align="center"
          tone="dark"
        />
        <Reveal delay={2} className="mx-auto mt-14 max-w-4xl">
          <BeforeAfterSlider projects={projects} />
        </Reveal>
      </Container>
    </section>
  );
}
