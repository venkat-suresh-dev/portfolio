export function SectionKicker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
      <span>{index}</span>
      {" / "}
      {label}
    </p>
  );
}
