"use client";

import { createContext, useContext } from "react";

export type AppId =
  | "welcome"
  | "about"
  | "skills"
  | "projects"
  | "case"
  | "experience"
  | "contact"
  | "terminal"
  | "bugs"
  | "resume";

export type Rect = { x: number; y: number; w: number; h: number };

export type Win = {
  id: string; // appId, or `case:<slug>`
  app: AppId;
  payload?: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  origin?: Rect;
};

export type OSApi = {
  open: (app: AppId, opts?: { payload?: string; origin?: Element | null }) => void;
  close: (id: string) => void;
  isMobile: boolean;
};

export const OSContext = createContext<OSApi>({ open: () => {}, close: () => {}, isMobile: false });
export const useOS = () => useContext(OSContext);

export function rectOf(el?: Element | null): Rect | undefined {
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
}
