import type { Range } from "./motion";

/**
 * Scroll-progress windows shared by the villa draft SVG and the pinned
 * caption beats, so the drawing and the copy stay in lockstep.
 */
export const BEATS: Record<string, Range> = {
  hero: [0, 0.06],
  design: [0.06, 0.28],
  frame: [0.3, 0.52],
  cladding: [0.54, 0.76],
  handover: [0.78, 1],
};
