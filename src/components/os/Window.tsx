"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { Rect, Win } from "./context";
import { prefersReducedMotion } from "@/lib/quip";

export const MENU_H = 36;
const EASE = "cubic-bezier(.2,.9,.2,1)";

type Props = {
  win: Win;
  active: boolean;
  mobile: boolean;
  dockRect: () => Rect | undefined;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
  children: React.ReactNode;
};

/** Animate the element from/to a source rect (icon / dock) — the "genie-lite" transition. */
function flyFrom(el: HTMLElement, from: Rect | undefined, reverse = false) {
  if (prefersReducedMotion()) return Promise.resolve();
  const r = el.getBoundingClientRect();
  let start = "translate(0px, 24px) scale(.94)";
  if (from) {
    const sx = Math.max(0.05, from.w / r.width);
    const sy = Math.max(0.05, from.h / r.height);
    const dx = from.x + from.w / 2 - (r.left + r.width / 2);
    const dy = from.y + from.h / 2 - (r.top + r.height / 2);
    start = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  }
  const frames = [
    { transform: start, opacity: 0, filter: "blur(6px)" },
    { transform: "none", opacity: 1, filter: "blur(0)" },
  ];
  const anim = el.animate(reverse ? frames.reverse() : frames, {
    duration: reverse ? 320 : 460,
    easing: reverse ? "cubic-bezier(.6,0,.8,.4)" : EASE,
    fill: "forwards",
  });
  return anim.finished.then(() => {
    if (!reverse) anim.cancel();
  });
}

export function Window({ win, active, mobile, dockRect, onFocus, onClose, onMinimize, onToggleMax, onMove, onResize, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const wasMin = useRef(win.minimized);
  const closing = useRef(false);

  // open animation
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mobile && !prefersReducedMotion()) {
      el.animate([{ transform: "translateY(100%)" }, { transform: "none" }], { duration: 420, easing: EASE });
    } else {
      flyFrom(el, win.origin);
    }
    el.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // restore from minimized → fly out of the dock
  useEffect(() => {
    const el = ref.current;
    if (wasMin.current && !win.minimized && el) flyFrom(el, dockRect());
    wasMin.current = win.minimized;
  }, [win.minimized, dockRect]);

  const close = async () => {
    if (closing.current) return;
    closing.current = true;
    const el = ref.current;
    if (el) {
      if (mobile && !prefersReducedMotion()) {
        await el.animate([{ transform: "none" }, { transform: "translateY(100%)" }], { duration: 300, easing: "ease-in", fill: "forwards" }).finished;
      } else {
        await flyFrom(el, win.origin ?? dockRect(), true);
      }
    }
    onClose();
  };

  const minimize = async () => {
    const el = ref.current;
    if (el) await flyFrom(el, dockRect(), true);
    onMinimize();
    if (el) el.getAnimations().forEach((a) => a.cancel());
  };

  // drag by the title bar
  const onPointerDown = (e: React.PointerEvent) => {
    if (mobile || win.maximized || (e.target as Element).closest("button")) return;
    const el = ref.current!;
    const sx = e.clientX - win.x;
    const sy = e.clientY - win.y;
    let x = win.x;
    let y = win.y;
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "";
    const move = (ev: PointerEvent) => {
      x = Math.min(innerWidth - 80, Math.max(80 - win.w, ev.clientX - sx));
      y = Math.min(innerHeight - 60, Math.max(MENU_H, ev.clientY - sy));
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      delete el.dataset.dragging;
      onMove(x, y);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
  };

  // resize from the bottom-right corner
  const onResizeDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const el = ref.current!;
    const sx = e.clientX;
    const sy = e.clientY;
    let w = win.w;
    let h = win.h;
    (e.target as Element).setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      w = Math.max(360, win.w + ev.clientX - sx);
      h = Math.max(260, win.h + ev.clientY - sy);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      onResize(w, h);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const full = mobile || win.maximized;
  const style: React.CSSProperties = full
    ? { left: 0, top: MENU_H, width: "100vw", height: `calc(100dvh - ${MENU_H}px - ${mobile ? 0 : 76}px)`, zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={win.title}
      tabIndex={-1}
      onPointerDownCapture={onFocus}
      onKeyDown={(e) => e.key === "Escape" && close()}
      className={`fixed flex flex-col overflow-hidden border bg-bg-elev/95 backdrop-blur-xl outline-none transition-[box-shadow,border-color] [&[data-dragging]]:select-none ${
        full ? "rounded-none border-x-0 border-b-0" : "rounded-xl"
      } ${active ? "border-ink/25 shadow-[0_30px_80px_-20px_rgba(0,0,0,.75)]" : "border-line shadow-[0_16px_40px_-20px_rgba(0,0,0,.6)]"}`}
      style={{ ...style, display: win.minimized ? "none" : undefined }}
    >
      {/* title bar */}
      <div
        onPointerDown={onPointerDown}
        onDoubleClick={() => !mobile && onToggleMax()}
        className={`relative flex h-10 shrink-0 items-center gap-2 border-b border-line px-3 ${full ? "" : "cursor-grab active:cursor-grabbing"} ${
          active ? "bg-bg/40" : "bg-bg/20"
        }`}
      >
        {mobile ? (
          <button type="button" onClick={close} className="font-mono text-xs text-acid" aria-label={`Close ${win.title}`}>
            ‹ Home
          </button>
        ) : (
        <div className="group/tl flex items-center gap-2">
          <button type="button" onClick={close} aria-label={`Close ${win.title}`} className="grid size-3.5 place-items-center rounded-full bg-hot text-[9px] font-bold leading-none text-black/70" data-cursor="Close. It won't be offended.">
            <span className="opacity-0 group-hover/tl:opacity-100">×</span>
          </button>
          {(
            <>
              <button type="button" onClick={minimize} aria-label={`Minimise ${win.title}`} className="grid size-3.5 place-items-center rounded-full bg-[#ffbd2e] text-[9px] font-bold leading-none text-black/70">
                <span className="opacity-0 group-hover/tl:opacity-100">–</span>
              </button>
              <button type="button" onClick={onToggleMax} aria-label={`${win.maximized ? "Restore" : "Maximise"} ${win.title}`} className="grid size-3.5 place-items-center rounded-full bg-acid text-[8px] font-bold leading-none text-black/70">
                <span className="opacity-0 group-hover/tl:opacity-100">⤢</span>
              </button>
            </>
          )}
        </div>
        )}
        <p className={`pointer-events-none absolute inset-x-24 truncate text-center font-mono text-xs ${active ? "text-ink" : "text-ink-dim"}`}>{win.title}</p>
      </div>

      <div className="@container relative min-h-0 flex-1 overflow-auto overscroll-contain">{children}</div>

      {!full && (
        <span
          aria-hidden
          onPointerDown={onResizeDown}
          className="absolute bottom-0 right-0 size-4 cursor-nwse-resize [background:linear-gradient(135deg,transparent_50%,var(--line)_50%)]"
        />
      )}
    </div>
  );
}
