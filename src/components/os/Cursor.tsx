"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, isTouch } from "@/lib/quip";

/**
 * Custom cursor with sarcastic labels from the nearest [data-cursor] element.
 * Desktop only (fine pointer, motion allowed). The native cursor returns otherwise.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let current = "";

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest?.("[data-cursor], a, button, [data-portal], input, textarea");
      const text = target?.getAttribute("data-cursor") ?? "";
      if (text !== current) {
        current = text;
        setLabel(text);
      }
      ring.current?.toggleAttribute("data-hover", !!target);
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onLeave = () => ring.current?.style.setProperty("opacity", "0");
    const onEnter = () => ring.current?.style.setProperty("opacity", "1");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      <div ref={dot} className="absolute left-0 top-0 -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-acid mix-blend-difference" />
      <div
        ref={ring}
        className="group absolute left-0 top-0 transition-opacity [&[data-hover]>span:first-child]:scale-150 [&[data-hover]>span:first-child]:border-acid"
      >
        <span className="absolute -left-4 -top-4 block size-8 rounded-full border border-ink/50 transition-transform duration-300" />
        {label && (
          <span className="absolute left-5 top-4 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 font-mono text-[11px] font-medium text-bg shadow-lg">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
