export function splitPersonName(name: string) {
  const trimmed = name.trim();
  const index = trimmed.lastIndexOf(" ");
  if (index <= 0) {
    return { given: trimmed, family: null as string | null };
  }

  return {
    given: trimmed.slice(0, index),
    family: trimmed.slice(index + 1),
  };
}

export function DisplayName({
  name,
  as: Tag = "p",
  id,
  className,
}: {
  name: string;
  as?: "h1" | "p";
  id?: string;
  className?: string;
}) {
  const { given, family } = splitPersonName(name);

  return (
    <Tag id={id} className={className}>
      <span className="block">{given}</span>
      {family ? <span className="block">{family}</span> : null}
    </Tag>
  );
}
