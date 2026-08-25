export function SectionKicker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <p className="font-mono text-[0.65rem] tracking-[0.22em] text-text-muted uppercase">
      <span className="text-accent">{index}</span>
      {" · "}
      {label}
    </p>
  );
}
