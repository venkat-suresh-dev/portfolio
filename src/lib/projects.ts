import type { Project, ProjectEvidenceFigure } from "@/data/projects";

export function projectDocId(project: Project, index: number) {
  return project.docId ?? `PRJ-${String(index + 1).padStart(2, "0")}`;
}

export function projectFolio(project: Project, index: number) {
  const id = projectDocId(project, index);
  const match = id.match(/(\d+)/);
  return match ? match[1].padStart(2, "0") : String(index + 1).padStart(2, "0");
}

export function projectStatusLabel(project: Project) {
  if (project.prototype || project.status === "prototype") {
    return "PROTOTYPE";
  }
  if (project.statusLabel) return project.statusLabel;
  return project.status.replace(/-/g, " ");
}

export function splitProjectTitle(title: string) {
  const match = title.match(/^(\[PLACEHOLDER\])\s*(.*)$/);
  if (!match) return { placeholder: null, text: title };
  return { placeholder: match[1], text: match[2] };
}

export function projectEvidenceByIds(
  project: Project,
  ids?: readonly string[]
): readonly ProjectEvidenceFigure[] {
  const evidence = project.evidence ?? [];
  if (!ids) return evidence;
  return ids.flatMap((id) => {
    const figure = evidence.find((item) => item.id === id);
    return figure ? [figure] : [];
  });
}
