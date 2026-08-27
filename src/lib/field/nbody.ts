import { FIXED_DT, G_DEFAULT, SOFTENING } from "./constants";
import type { Body, FieldState, TrailBuffer } from "./types";

const EPS2 = SOFTENING * SOFTENING;

export function cloneBodies(bodies: readonly Body[]): Body[] {
  return bodies.map((body) => ({ ...body }));
}

export function createFieldState(bodies: readonly Body[]): FieldState {
  const next = cloneBodies(bodies);
  computeAccelerations(next, G_DEFAULT);
  return { bodies: next, time: 0, stepCount: 0 };
}

export function cloneFieldState(state: FieldState): FieldState {
  return {
    bodies: cloneBodies(state.bodies),
    time: state.time,
    stepCount: state.stepCount,
  };
}

export function computeAccelerations(bodies: Body[], gravity: number) {
  const n = bodies.length;
  for (let i = 0; i < n; i++) {
    bodies[i].ax = 0;
    bodies[i].ay = 0;
  }

  for (let i = 0; i < n; i++) {
    const a = bodies[i];
    for (let j = i + 1; j < n; j++) {
      const b = bodies[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const inv = gravity / (dx * dx + dy * dy + EPS2) ** 1.5;
      const ax = dx * inv;
      const ay = dy * inv;
      a.ax += ax * b.mass;
      a.ay += ay * b.mass;
      b.ax -= ax * a.mass;
      b.ay -= ay * a.mass;
    }
  }
}

/** Velocity Verlet. Accelerations must already match the current positions. */
export function stepField(state: FieldState, gravity: number, dt = FIXED_DT) {
  const { bodies } = state;
  const n = bodies.length;
  const dt2 = dt * dt;

  for (let i = 0; i < n; i++) {
    const body = bodies[i];
    body.x += body.vx * dt + 0.5 * body.ax * dt2;
    body.y += body.vy * dt + 0.5 * body.ay * dt2;
  }

  const oldAx = new Array<number>(n);
  const oldAy = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    oldAx[i] = bodies[i].ax;
    oldAy[i] = bodies[i].ay;
  }

  computeAccelerations(bodies, gravity);

  for (let i = 0; i < n; i++) {
    const body = bodies[i];
    body.vx += 0.5 * (oldAx[i] + body.ax) * dt;
    body.vy += 0.5 * (oldAy[i] + body.ay) * dt;
  }

  state.time += dt;
  state.stepCount += 1;
}

export function advanceField(
  state: FieldState,
  gravity: number,
  seconds: number,
  dt = FIXED_DT,
  onStep?: (state: FieldState) => void
) {
  const steps = Math.max(0, Math.round(seconds / dt));
  for (let i = 0; i < steps; i++) {
    stepField(state, gravity, dt);
    onStep?.(state);
  }
}

export function zeroTotalMomentum(bodies: Body[]) {
  let m = 0;
  let px = 0;
  let py = 0;
  for (const body of bodies) {
    m += body.mass;
    px += body.mass * body.vx;
    py += body.mass * body.vy;
  }
  if (m <= 0) return;
  const vx = px / m;
  const vy = py / m;
  for (const body of bodies) {
    body.vx -= vx;
    body.vy -= vy;
  }
}

export function centerOfMass(bodies: readonly Body[]) {
  let m = 0;
  let x = 0;
  let y = 0;
  for (const body of bodies) {
    m += body.mass;
    x += body.mass * body.x;
    y += body.mass * body.y;
  }
  if (m <= 0) return { x: 0, y: 0, mass: 0 };
  return { x: x / m, y: y / m, mass: m };
}

export function shiftBodies(bodies: Body[], dx: number, dy: number) {
  for (const body of bodies) {
    body.x += dx;
    body.y += dy;
  }
}

export function applyImpulse(
  bodies: Body[],
  wx: number,
  wy: number,
  strength: number,
  radius: number
) {
  let nearest = 0;
  let nearestD = Infinity;

  for (let i = 0; i < bodies.length; i++) {
    const body = bodies[i];
    const d = Math.hypot(body.x - wx, body.y - wy);
    if (d < nearestD) {
      nearestD = d;
      nearest = i;
    }
    if (d > radius) continue;
    const falloff = 1 - d / radius;
    const inv = d < 1e-6 ? 0 : (strength * falloff) / d;
    body.vx += (body.x - wx) * inv;
    body.vy += (body.y - wy) * inv;
  }

  if (nearestD > radius * 0.55) {
    const body = bodies[nearest];
    const d = Math.max(nearestD, 1e-4);
    const inv = (strength * 0.55) / d;
    body.vx += (body.x - wx) * inv;
    body.vy += (body.y - wy) * inv;
  }
}

export function createTrails(count: number, capacity: number): TrailBuffer[] {
  const cap = Math.max(2, Math.floor(capacity));
  return Array.from({ length: count }, () => ({
    x: new Float32Array(cap),
    y: new Float32Array(cap),
    capacity: cap,
    length: 0,
    cursor: 0,
  }));
}

export function recordTrails(trails: TrailBuffer[], bodies: readonly Body[]) {
  const n = Math.min(trails.length, bodies.length);
  for (let i = 0; i < n; i++) {
    const trail = trails[i];
    const body = bodies[i];
    trail.x[trail.cursor] = body.x;
    trail.y[trail.cursor] = body.y;
    trail.cursor = (trail.cursor + 1) % trail.capacity;
    if (trail.length < trail.capacity) trail.length += 1;
  }
}

export function clearTrails(trails: TrailBuffer[]) {
  for (const trail of trails) {
    trail.length = 0;
    trail.cursor = 0;
  }
}

export function trailPoint(
  trail: TrailBuffer,
  indexFromOldest: number
): { x: number; y: number } | null {
  if (indexFromOldest < 0 || indexFromOldest >= trail.length) return null;
  const idx =
    (trail.cursor - trail.length + indexFromOldest + trail.capacity * 4) %
    trail.capacity;
  return { x: trail.x[idx], y: trail.y[idx] };
}

export function mechanicalEnergy(bodies: readonly Body[], gravity: number) {
  let kinetic = 0;
  let potential = 0;
  const n = bodies.length;

  for (let i = 0; i < n; i++) {
    const a = bodies[i];
    kinetic += 0.5 * a.mass * (a.vx * a.vx + a.vy * a.vy);
    for (let j = i + 1; j < n; j++) {
      const b = bodies[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      potential -= (gravity * a.mass * b.mass) / Math.sqrt(dx * dx + dy * dy + EPS2);
    }
  }

  return { kinetic, potential, total: kinetic + potential };
}

export function boundsReport(bodies: readonly Body[]) {
  let maxR = 0;
  let minPair = Infinity;
  for (let i = 0; i < bodies.length; i++) {
    maxR = Math.max(maxR, Math.hypot(bodies[i].x, bodies[i].y));
    for (let j = i + 1; j < bodies.length; j++) {
      minPair = Math.min(
        minPair,
        Math.hypot(bodies[j].x - bodies[i].x, bodies[j].y - bodies[i].y)
      );
    }
  }
  return { maxR, minPair };
}

export function makeBody(
  id: string,
  mass: number,
  x: number,
  y: number,
  vx: number,
  vy: number
): Body {
  return { id, mass, x, y, vx, vy, ax: 0, ay: 0 };
}
