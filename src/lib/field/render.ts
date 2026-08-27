import {
  COMPACT_MQ,
  DPR_CAP_COMPACT,
  DPR_CAP_DESKTOP,
  IMPULSE_MARK_MS,
  WORLD_HALF,
} from "./constants";
import { trailPoint } from "./nbody";
import type {
  FieldPalette,
  FieldState,
  ImpulseMark,
  RenderQuality,
  TrailBuffer,
  Vec2,
} from "./types";

export function readFieldPalette(el: HTMLElement): FieldPalette {
  const styles = getComputedStyle(el);
  const root = getComputedStyle(document.documentElement);
  return {
    bg: root.getPropertyValue("--bg-base").trim() || "#08090c",
    cyan: root.getPropertyValue("--accent-system").trim() || "#4fe0d4",
    core: root.getPropertyValue("--particle-core").trim() || "#ffffff",
    mid: root.getPropertyValue("--particle-mid").trim() || "#e8f7ff",
    ring: root.getPropertyValue("--particle-ring").trim() || "#4fe0d4",
    halo: root.getPropertyValue("--particle-halo").trim() || "transparent",
    hairline: root.getPropertyValue("--border-hairline").trim(),
    grid: root.getPropertyValue("--grid-line").trim(),
    tertiary: root.getPropertyValue("--text-tertiary").trim(),
    secondary: root.getPropertyValue("--text-secondary").trim(),
    mono:
      styles.getPropertyValue("--font-mono").trim() ||
      root.getPropertyValue("--font-mono").trim() ||
      "ui-monospace, monospace",
  };
}

export function fieldDpr(quality: RenderQuality) {
  const cap = quality === "full" ? DPR_CAP_DESKTOP : DPR_CAP_COMPACT;
  return Math.min(window.devicePixelRatio || 1, cap);
}

export function isCompactViewport() {
  return window.matchMedia(COMPACT_MQ).matches;
}

export type ViewTransform = {
  width: number;
  height: number;
  scale: number;
  cx: number;
  cy: number;
};

export function viewTransform(
  cssWidth: number,
  cssHeight: number
): ViewTransform {
  const scale = Math.min(cssWidth, cssHeight) / (2 * WORLD_HALF);
  return {
    width: cssWidth,
    height: cssHeight,
    scale,
    cx: cssWidth / 2,
    cy: cssHeight / 2,
  };
}

export function worldToView(x: number, y: number, view: ViewTransform): Vec2 {
  return {
    x: view.cx + x * view.scale,
    y: view.cy - y * view.scale,
  };
}

export function viewToWorld(
  px: number,
  py: number,
  view: ViewTransform
): Vec2 {
  return {
    x: (px - view.cx) / view.scale,
    y: (view.cy - py) / view.scale,
  };
}

function mix(color: string, amount: number) {
  return `color-mix(in srgb, ${color} ${amount}%, transparent)`;
}

function bodyRadius(mass: number, quality: RenderQuality) {
  const base = quality === "teaser" ? 3.2 : quality === "compact" ? 3.6 : 4.2;
  return base + Math.sqrt(mass) * (quality === "full" ? 1.65 : 1.25);
}

export function drawField(options: {
  ctx: CanvasRenderingContext2D;
  view: ViewTransform;
  palette: FieldPalette;
  state: FieldState;
  trails: TrailBuffer[];
  quality: RenderQuality;
  frameAlpha?: number;
  bodyAlpha?: number;
  pointer?: Vec2 | null;
  marks?: ImpulseMark[];
  now?: number;
  fieldId?: string;
}) {
  const {
    ctx,
    view,
    palette,
    state,
    trails,
    quality,
    frameAlpha = 1,
    bodyAlpha = 1,
    pointer = null,
    marks = [],
    now = 0,
    fieldId = "FLD-01",
  } = options;

  ctx.save();
  ctx.clearRect(0, 0, view.width, view.height);
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, view.width, view.height);

  ctx.globalAlpha = frameAlpha;
  drawMeasurementFrame(ctx, view, palette, quality, fieldId);

  if (quality !== "teaser") {
    drawOriginPlane(ctx, view, palette);
  }

  ctx.globalAlpha = frameAlpha * bodyAlpha;
  drawTrails(ctx, view, palette, trails, quality);

  for (const mark of marks) {
    drawImpulseMark(ctx, view, palette, mark, now);
  }

  const order = state.bodies.map((body, index) => ({ body, index }));
  order.sort((a, b) => a.body.mass - b.body.mass);

  for (const { body } of order) {
    const p = worldToView(body.x, body.y, view);
    drawBody(ctx, p.x, p.y, bodyRadius(body.mass, quality), palette, quality);
  }

  if (pointer && quality === "full") {
    drawPointerMark(ctx, pointer, palette);
  }

  ctx.restore();
}

function drawMeasurementFrame(
  ctx: CanvasRenderingContext2D,
  view: ViewTransform,
  palette: FieldPalette,
  quality: RenderQuality,
  fieldId: string
) {
  const inset = quality === "teaser" ? 8 : 14;
  const x = inset + 0.5;
  const y = inset + 0.5;
  const w = view.width - inset * 2 - 1;
  const h = view.height - inset * 2 - 1;

  ctx.strokeStyle = mix(palette.hairline, 70);
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);

  ctx.beginPath();
  const cols = quality === "teaser" ? 4 : 6;
  const rows = quality === "teaser" ? 3 : 4;
  ctx.strokeStyle = mix(palette.grid, 100);
  for (let i = 1; i < cols; i++) {
    const gx = x + (w * i) / cols;
    ctx.moveTo(gx, y);
    ctx.lineTo(gx, y + h);
  }
  for (let i = 1; i < rows; i++) {
    const gy = y + (h * i) / rows;
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
  }
  ctx.stroke();

  const tick = quality === "teaser" ? 4 : 6;
  ctx.beginPath();
  ctx.strokeStyle = mix(palette.secondary, 35);
  const tickCount = quality === "teaser" ? 3 : 5;
  for (let i = 1; i <= tickCount; i++) {
    const tx = x + (w * i) / (tickCount + 1);
    ctx.moveTo(tx, y + h);
    ctx.lineTo(tx, y + h - tick);
    const ty = y + (h * i) / (tickCount + 1);
    ctx.moveTo(x, ty);
    ctx.lineTo(x + tick, ty);
  }
  ctx.stroke();

  const c = quality === "teaser" ? 6 : 9;
  ctx.strokeStyle = mix(palette.cyan, 42);
  ctx.beginPath();
  ctx.moveTo(x, y + c);
  ctx.lineTo(x, y);
  ctx.lineTo(x + c, y);
  ctx.moveTo(x + w - c, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + c);
  ctx.moveTo(x + w, y + h - c);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w - c, y + h);
  ctx.moveTo(x + c, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + h - c);
  ctx.stroke();

  ctx.font = `500 9px ${palette.mono}`;
  ctx.fillStyle = mix(palette.tertiary, 90);
  ctx.textBaseline = "top";
  ctx.fillText(fieldId, x + 8, y + 7);
}

function drawOriginPlane(
  ctx: CanvasRenderingContext2D,
  view: ViewTransform,
  palette: FieldPalette
) {
  const origin = worldToView(0, 0, view);
  ctx.beginPath();
  ctx.strokeStyle = mix(palette.cyan, 14);
  ctx.lineWidth = 1;
  ctx.moveTo(origin.x - 18, origin.y);
  ctx.lineTo(origin.x + 18, origin.y);
  ctx.moveTo(origin.x, origin.y - 18);
  ctx.lineTo(origin.x, origin.y + 18);
  ctx.stroke();
}

function drawTrails(
  ctx: CanvasRenderingContext2D,
  view: ViewTransform,
  palette: FieldPalette,
  trails: TrailBuffer[],
  quality: RenderQuality
) {
  const buckets = quality === "full" ? 7 : 5;

  for (const trail of trails) {
    if (trail.length < 2) continue;
    const points: Vec2[] = [];
    for (let i = 0; i < trail.length; i++) {
      const pt = trailPoint(trail, i);
      if (!pt) continue;
      points.push(worldToView(pt.x, pt.y, view));
    }

    const width = quality === "teaser" ? 0.7 : 1;
    for (let b = 0; b < buckets; b++) {
      const start = Math.floor((points.length - 1) * (b / buckets));
      const end = Math.floor((points.length - 1) * ((b + 1) / buckets));
      if (end <= start) continue;
      const t = (b + 1) / buckets;
      ctx.beginPath();
      ctx.moveTo(points[start].x, points[start].y);
      for (let i = start + 1; i <= end; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = mix(palette.cyan, Math.round(16 + t * 44));
      ctx.lineWidth = width * (0.75 + t * 0.85);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
  }
}

function drawBody(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  palette: FieldPalette,
  quality: RenderQuality
) {
  if (quality === "full") {
    const bloom = ctx.createRadialGradient(x, y, 0, x, y, radius * 3.6);
    bloom.addColorStop(0, mix(palette.cyan, 18));
    bloom.addColorStop(0.4, mix(palette.cyan, 6));
    bloom.addColorStop(1, mix(palette.cyan, 0));
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(x, y, radius * 3.6, 0, Math.PI * 2);
    ctx.fill();
  } else if (quality === "compact") {
    ctx.fillStyle = mix(palette.cyan, 10);
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  const gx = x - radius * 0.18;
  const gy = y - radius * 0.26;
  const fill = ctx.createRadialGradient(gx, gy, 0, x, y, radius);
  fill.addColorStop(0, palette.core);
  fill.addColorStop(0.28, palette.core);
  fill.addColorStop(0.42, palette.mid);
  fill.addColorStop(0.7, palette.cyan);
  fill.addColorStop(1, mix(palette.cyan, 78));
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius + 0.4, 0, Math.PI * 2);
  ctx.strokeStyle = palette.ring;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawImpulseMark(
  ctx: CanvasRenderingContext2D,
  view: ViewTransform,
  palette: FieldPalette,
  mark: ImpulseMark,
  now: number
) {
  const age = now - mark.born;
  if (age < 0 || age > IMPULSE_MARK_MS) return;
  const t = age / IMPULSE_MARK_MS;
  const p = worldToView(mark.x, mark.y, view);
  const r = 6 + t * 28;
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
  ctx.strokeStyle = mix(palette.cyan, Math.round((1 - t) * 40));
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = mix(palette.core, Math.round((1 - t) * 35));
  ctx.moveTo(p.x - 4, p.y);
  ctx.lineTo(p.x + 4, p.y);
  ctx.moveTo(p.x, p.y - 4);
  ctx.lineTo(p.x, p.y + 4);
  ctx.stroke();
}

function drawPointerMark(
  ctx: CanvasRenderingContext2D,
  pointer: Vec2,
  palette: FieldPalette
) {
  ctx.beginPath();
  ctx.strokeStyle = mix(palette.cyan, 32);
  ctx.lineWidth = 1;
  ctx.moveTo(pointer.x - 7, pointer.y);
  ctx.lineTo(pointer.x - 2, pointer.y);
  ctx.moveTo(pointer.x + 2, pointer.y);
  ctx.lineTo(pointer.x + 7, pointer.y);
  ctx.moveTo(pointer.x, pointer.y - 7);
  ctx.lineTo(pointer.x, pointer.y - 2);
  ctx.moveTo(pointer.x, pointer.y + 2);
  ctx.lineTo(pointer.x, pointer.y + 7);
  ctx.stroke();
}

export function resizeCanvas(
  canvas: HTMLCanvasElement,
  cssWidth: number,
  cssHeight: number,
  dpr: number
) {
  const w = Math.max(1, Math.round(cssWidth * dpr));
  const h = Math.max(1, Math.round(cssHeight * dpr));
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}
