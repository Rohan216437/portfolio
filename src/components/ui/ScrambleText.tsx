"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/quip";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&01";

/** Cycles through phrases with a decode/scramble effect. */
export function ScrambleText({ items, interval = 3400, className = "" }: { items: readonly string[]; interval?: number; className?: string }) {
  const [text, setText] = useState(items[0]);
  const idx = useRef(0);

  useEffect(() => {
    if (items.length < 2) return;
    let raf = 0;
    const reduced = prefersReducedMotion();
    const id = window.setInterval(() => {
      if (document.hidden) return;
      idx.current = (idx.current + 1) % items.length;
      const target = items[idx.current];
      if (reduced) return setText(target);
      const start = performance.now();
      const dur = 700;
      cancelAnimationFrame(raf);
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / dur);
        const reveal = Math.floor(t * target.length);
        let out = target.slice(0, reveal);
        for (let i = reveal; i < target.length; i++) out += target[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        setText(out);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, interval);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [items, interval]);

  return (
    <span className={className}>
      <span aria-hidden>{text}</span>
      <span className="sr-only">{items[0]}</span>
    </span>
  );
}
