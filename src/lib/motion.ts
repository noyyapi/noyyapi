export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export type Range = [number, number];

/** Local 0→1 progress of `value` within `[start, end]`. */
export function localT(value: number, [start, end]: Range): number {
  if (end === start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Smoothstep easing. */
export function ease(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Splits a 0→1 progress into `count` overlapping staggered windows so a
 * group of items reveal one after another instead of all at once.
 */
export function staggerT(t: number, index: number, count: number, spread = 0.6): number {
  if (count <= 1) return t;
  const step = (1 - spread) / (count - 1);
  const start = step * index;
  const end = start + spread;
  return localT(t, [start, end]);
}
