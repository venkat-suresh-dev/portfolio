export function formatViewport(width: number, height: number) {
  return `${width} × ${height}`;
}

export function formatScrollPercent(percent: number) {
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  return `${String(clamped).padStart(2, "0")}%`;
}

export function formatSectionToken(id: string | null) {
  if (!id) return "—";
  return id.replace(/-/g, " ").toUpperCase();
}
