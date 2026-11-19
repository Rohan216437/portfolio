/**
 * Tiny event bus for sarcastic toasts ("quips").
 * Any component can call quip("…") without prop drilling.
 */
export const QUIP_EVENT = "rg:quip";

export type QuipDetail = { text: string; tone?: "acid" | "hot" | "volt"; ms?: number };

export function quip(text: string, opts: Omit<QuipDetail, "text"> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<QuipDetail>(QUIP_EVENT, { detail: { text, ...opts } }));
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouch() {
  return typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}
