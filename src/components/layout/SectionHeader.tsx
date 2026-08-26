import { SectionKicker } from "@/components/layout/SectionKicker";

export function SectionHeader({
  index,
  label,
  title,
  headingId,
}: {
  index: string;
  label: string;
  title: string;
  headingId: string;
}) {
  return (
    <header className="mb-6 sm:mb-7">
      <SectionKicker index={index} label={label} />
      <h2
        id={headingId}
        className="mt-2.5 font-heading text-2xl font-medium tracking-[-0.018em] text-text sm:text-[1.75rem]"
      >
        {title}
      </h2>
    </header>
  );
}
