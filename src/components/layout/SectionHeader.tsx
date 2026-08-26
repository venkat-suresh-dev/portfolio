export function SectionHeader({
  index,
  title,
  headingId,
}: {
  index: string;
  title: string;
  headingId: string;
}) {
  return (
    <header className="mb-8 sm:mb-10">
      <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
        {index}
      </p>
      <h2
        id={headingId}
        className="mt-2 text-[1.25rem] font-medium tracking-[-0.02em] text-text sm:text-[1.375rem]"
      >
        {title}
      </h2>
    </header>
  );
}
