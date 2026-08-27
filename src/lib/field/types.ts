export type Vec2 = {
  x: number;
  y: number;
};

export type Body = {
  id: string;
  mass: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
};

export type TrailBuffer = {
  x: Float32Array;
  y: Float32Array;
  capacity: number;
  length: number;
  cursor: number;
};

export type FieldState = {
  bodies: Body[];
  time: number;
  stepCount: number;
};

export type FieldPresetId = "orbital" | "chaotic" | "binary";

export type FieldPreset = {
  id: FieldPresetId;
  index: string;
  name: string;
  label: string;
  bodyCount: number;
};

export type FieldRunState = "RUNNING" | "PAUSED" | "RESET";

export type FieldParams = {
  gravity: number;
  timeScale: number;
  trail: number;
};

export type ImpulseMark = {
  x: number;
  y: number;
  born: number;
};

export type FieldPalette = {
  bg: string;
  cyan: string;
  core: string;
  mid: string;
  ring: string;
  halo: string;
  hairline: string;
  grid: string;
  tertiary: string;
  secondary: string;
  mono: string;
};

export type RenderQuality = "full" | "compact" | "teaser";
