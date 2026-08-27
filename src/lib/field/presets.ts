import { G_DEFAULT } from "./constants";
import {
  centerOfMass,
  createFieldState,
  makeBody,
  shiftBodies,
  zeroTotalMomentum,
} from "./nbody";
import type { Body, FieldPreset, FieldPresetId, FieldState } from "./types";

export const FIELD_PRESETS: readonly FieldPreset[] = [
  {
    id: "orbital",
    index: "01",
    name: "ORBITAL",
    label: "01 / ORBITAL",
    bodyCount: 4,
  },
  {
    id: "chaotic",
    index: "02",
    name: "CHAOTIC",
    label: "02 / CHAOTIC",
    bodyCount: 4,
  },
  {
    id: "binary",
    index: "03",
    name: "BINARY + PERTURBER",
    label: "03 / BINARY + PERTURBER",
    bodyCount: 3,
  },
] as const;

export function getPreset(id: FieldPresetId): FieldPreset {
  return FIELD_PRESETS.find((item) => item.id === id) ?? FIELD_PRESETS[0];
}

function binaryPair(
  idA: string,
  idB: string,
  m1: number,
  m2: number,
  cx: number,
  cy: number,
  sep: number,
  angle: number,
  gravity: number
): [Body, Body] {
  const total = m1 + m2;
  const omega = Math.sqrt((gravity * total) / (sep * sep * sep));
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const r1 = (m2 / total) * sep;
  const r2 = (m1 / total) * sep;
  const v1 = omega * r1;
  const v2 = omega * r2;

  return [
    makeBody(idA, m1, cx + r1 * c, cy + r1 * s, -v1 * s, v1 * c),
    makeBody(idB, m2, cx - r2 * c, cy - r2 * s, v2 * s, -v2 * c),
  ];
}

function addDrift(bodies: Body[], vx: number, vy: number) {
  for (const body of bodies) {
    body.vx += vx;
    body.vy += vy;
  }
}

function finalize(bodies: Body[]): FieldState {
  const com = centerOfMass(bodies);
  shiftBodies(bodies, -com.x, -com.y);
  zeroTotalMomentum(bodies);
  return createFieldState(bodies);
}

function orbitalBodies(): Body[] {
  const g = G_DEFAULT;
  const left = binaryPair("M-01", "M-02", 1, 1, -0.46, 0.02, 0.26, 0.18, g);
  const right = binaryPair("M-03", "M-04", 1, 1, 0.46, -0.02, 0.26, 0.18 + Math.PI, g);
  const outer = Math.sqrt((g * 2) / (2 * 0.92));
  addDrift(left, 0, outer);
  addDrift(right, 0, -outer);
  return [...left, ...right];
}

function chaoticBodies(): Body[] {
  const g = G_DEFAULT;
  const d = 0.36;
  const sep = 0.2;
  const left = binaryPair("M-01", "M-02", 1.08, 0.92, -d, 0.01, sep, 0.35, g);
  const right = binaryPair("M-03", "M-04", 1.04, 0.88, d, -0.01, sep, 1.25, g);
  const outer = Math.sqrt((g * 2) / (2 * (2 * d))) * 0.92;
  addDrift(left, 0, outer);
  addDrift(right, 0, -outer);
  left[0].vx += 0.06;
  return [...left, ...right];
}

function binaryPerturberBodies(): Body[] {
  const g = G_DEFAULT;
  const m1 = 1.2;
  const m2 = 1;
  const mP = 0.48;
  const sep = 0.22;
  const R = 0.8;
  const total = m1 + m2 + mP;
  const mBin = m1 + m2;
  const [a, b] = binaryPair("M-01", "M-02", m1, m2, -((mP / total) * R), 0, sep, 0.32, g);
  const vRel = Math.sqrt((g * (mBin + mP)) / R) * 1.05;
  const vP = vRel * (mBin / total);
  const vBin = vRel * (mP / total);
  a.vy -= vBin;
  b.vy -= vBin;
  const perturber = makeBody("M-03", mP, (mBin / total) * R, 0, 0, vP);
  return [a, b, perturber];
}

function teaserBodies(): Body[] {
  const s = 0.5;
  const vScale = Math.sqrt(G_DEFAULT / s);
  return [
    makeBody(
      "M-01",
      1,
      0.9700043560391937 * s,
      -0.2430877376727276 * s,
      0.4662036850002983 * vScale,
      0.4323657300003275 * vScale
    ),
    makeBody(
      "M-02",
      1,
      -0.9700043560391937 * s,
      0.2430877376727276 * s,
      0.4662036850002983 * vScale,
      0.4323657300003275 * vScale
    ),
    makeBody(
      "M-03",
      1,
      0,
      0,
      -0.9324073700005966 * vScale,
      -0.8647314600006551 * vScale
    ),
  ];
}

export function createPresetState(id: FieldPresetId): FieldState {
  switch (id) {
    case "chaotic":
      return finalize(chaoticBodies());
    case "binary":
      return finalize(binaryPerturberBodies());
    default:
      return finalize(orbitalBodies());
  }
}

export function createTeaserState(): FieldState {
  return finalize(teaserBodies());
}

export function createSpecimenState(): FieldState {
  return createPresetState("orbital");
}
