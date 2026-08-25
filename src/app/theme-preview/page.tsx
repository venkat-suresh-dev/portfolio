import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/layout/GlowCard";
import { GridBackground } from "@/components/layout/GridBackground";
import { ScanlineOverlay } from "@/components/layout/ScanlineOverlay";
import { cn } from "@/lib/utils";

const colorSwatches = [
  { name: "bg", className: "bg-bg", textClass: "text-text" },
  { name: "surface", className: "bg-surface", textClass: "text-text" },
  { name: "surface-2", className: "bg-surface-2", textClass: "text-text" },
  { name: "text", className: "bg-text", textClass: "text-bg" },
  {
    name: "text-muted",
    className: "bg-text-muted",
    textClass: "text-bg",
  },
  { name: "accent", className: "bg-accent", textClass: "text-bg" },
  { name: "accent-2", className: "bg-accent-2", textClass: "text-bg" },
  {
    name: "highlight",
    className: "bg-highlight",
    textClass: "text-bg",
  },
] as const;

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 space-y-2">
      <p className="font-mono text-xs tracking-widest text-text-muted uppercase">
        {id}
      </p>
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        {children}
      </h2>
    </div>
  );
}

function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-surface-2 bg-surface px-2.5 py-0.5 font-mono text-xs text-text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export default function ThemePreviewPage() {
  return (
    <>
      <GridBackground />
      <ScanlineOverlay />

      <main className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12 space-y-4">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">
            SYSTEM.STATUS / theme-preview
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Design Token Preview
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Phase 2 foundation — colors, typography, shadcn primitives, and
            layout chrome. Use Tab to verify focus-visible states.
          </p>
        </header>

        <section aria-labelledby="colors-heading" className="mb-16">
          <SectionHeading id="§01">Color Tokens</SectionHeading>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {colorSwatches.map((swatch) => (
              <div
                key={swatch.name}
                className="overflow-hidden rounded-lg border border-surface-2"
              >
                <div className={cn("h-20", swatch.className)} />
                <div className="bg-surface px-3 py-2">
                  <p className="font-mono text-xs text-text">{swatch.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="typography-heading" className="mb-16">
          <SectionHeading id="§02">Typography</SectionHeading>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-xs text-text-muted">
                font-heading / Space Grotesk
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight">
                Heading XL — 4xl
              </h1>
              <h2 className="font-heading text-3xl font-semibold tracking-tight">
                Heading LG — 3xl
              </h2>
              <h3 className="font-heading text-2xl font-medium tracking-tight">
                Heading MD — 2xl
              </h3>
              <h4 className="font-heading text-xl font-medium">
                Heading SM — xl
              </h4>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs text-text-muted">
                font-sans / Inter
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-text">
                Body text at base size. Recruiters should scan this comfortably
                on mobile and desktop without strain. Legibility beats
                aesthetics.
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
                Secondary body copy at sm size for supporting details, metadata,
                and less prominent descriptions.
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs text-text-muted">
                font-mono / JetBrains Mono
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>§01</Badge>
                <Badge>§02</Badge>
                <Badge className="text-accent">SYSTEM.STATUS</Badge>
                <Badge className="border-accent/30 text-accent">
                  GATE.AIR.340
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="components-heading" className="mb-16">
          <SectionHeading id="§03">shadcn Button</SectionHeading>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section aria-labelledby="badges-heading" className="mb-16">
          <SectionHeading id="§04">Badge-like Labels</SectionHeading>
          <div className="flex flex-wrap gap-2">
            <Badge>Python</Badge>
            <Badge>PyTorch</Badge>
            <Badge className="border-accent/30 text-accent">ML Ops</Badge>
            <Badge className="border-accent-2/30 text-accent-2">
              NLP
            </Badge>
            <Badge className="border-highlight/40 bg-highlight/10 text-highlight">
              GATE AIR 340
            </Badge>
          </div>
        </section>

        <section aria-labelledby="glowcard-heading" className="mb-16">
          <SectionHeading id="§05">GlowCard</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlowCard>
              <p className="font-mono text-xs text-accent">§PROJECT.01</p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-text">
                Sample Project Card
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Hover or focus inner controls to see the restrained cyan glow.
                Reusable for Projects and Certifications sections.
              </p>
              <Button className="mt-4" variant="outline" size="sm">
                View details
              </Button>
            </GlowCard>

            <GlowCard>
              <p className="font-mono text-xs text-accent-2">§CERT.01</p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-text">
                Certification Panel
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Surface background, surface-2 border, and a soft accent glow on
                hover — no overpowering neon.
              </p>
              <a
                href="#focus-test"
                className="mt-4 inline-flex text-sm text-accent underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Focusable link inside card
              </a>
            </GlowCard>
          </div>
        </section>

        <section aria-labelledby="focus-heading" className="mb-8">
          <SectionHeading id="§06">Focus-visible</SectionHeading>
          <p
            id="focus-test"
            className="mb-4 text-sm text-text-muted"
          >
            Tab through these controls. Focus rings must remain visible.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button id="focus-primary">Primary focus</Button>
            <Button variant="outline">Outline focus</Button>
            <button
              type="button"
              className="rounded-lg border border-surface-2 bg-surface px-4 py-2 text-sm text-text transition-colors hover:border-accent/35 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none"
            >
              Native button
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
