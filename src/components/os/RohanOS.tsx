"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OSContext, rectOf, type AppId, type OSApi, type Win } from "./context";
import { Window, MENU_H } from "./Window";
import { AppIcon } from "./AppIcon";
import { MenuBar } from "./MenuBar";
import { Boot } from "./Boot";
import { Cursor } from "./Cursor";
import { Gags } from "./Gags";
import { WelcomeApp } from "./apps/WelcomeApp";
import { AboutApp } from "./apps/AboutApp";
import { SkillsApp } from "./apps/SkillsApp";
import { ProjectsApp, CaseApp } from "./apps/ProjectsApp";
import { ExperienceApp } from "./apps/ExperienceApp";
import { ContactApp, ResumeApp } from "./apps/ContactApp";
import { TerminalApp } from "./apps/TerminalApp";
import { BugZooApp } from "./apps/BugZooApp";
import { QuipToaster } from "@/components/ui/QuipToaster";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { toggleTheme } from "@/components/ui/ThemeToggle";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { gags } from "@/content/gags";
import { quip } from "@/lib/quip";

const SIZES: Record<AppId, [number, number]> = {
  welcome: [620, 470],
  about: [880, 620],
  skills: [860, 580],
  projects: [820, 600],
  case: [980, 700],
  experience: [920, 620],
  contact: [640, 680],
  terminal: [700, 440],
  bugs: [920, 640],
  resume: [440, 380],
};

const TITLES: Record<Exclude<AppId, "case">, string> = {
  welcome: "welcome.app",
  about: "about.txt — Wikipedia-ish",
  skills: "Task Manager — brain.exe",
  projects: "~/projects",
  experience: "Metro — The Career Line",
  contact: "Mail — New Message",
  terminal: "Terminal — rohan@os",
  bugs: "Recycle Bin — The Bug Zoo",
  resume: "resume.pdf",
};

const DESKTOP: { app: AppId; label: string }[] = [
  { app: "about", label: "About Me" },
  { app: "skills", label: "Skills" },
  { app: "projects", label: "Projects" },
  { app: "experience", label: "Experience" },
  { app: "contact", label: "Contact" },
  { app: "terminal", label: "Terminal" },
  { app: "resume", label: "resume.pdf" },
  { app: "bugs", label: "Recycle Bin" },
];

const DOCK: AppId[] = ["welcome", "about", "skills", "projects", "experience", "contact", "terminal"];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export function RohanOS() {
  const [wins, setWins] = useState<Win[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);
  const [bootKey, setBootKey] = useState(0);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const zTop = useRef(10);
  const isMobile = useIsMobile();
  const wallRef = useRef<HTMLDivElement>(null);

  const dockRectFor = useCallback((app: AppId) => () => rectOf(document.querySelector(`[data-dock="${app === "case" ? "projects" : app}"]`)), []);

  const open: OSApi["open"] = useCallback((app, opts = {}) => {
    const id = app === "case" ? `case:${opts.payload}` : app;
    const origin = rectOf(opts.origin ?? document.querySelector(`[data-dock="${app === "case" ? "projects" : app}"]`) ?? document.querySelector(`[data-icon="${app}"]`));
    const z = ++zTop.current;
    setWins((ws) => {
      const existing = ws.find((w) => w.id === id);
      if (existing) return ws.map((w) => (w.id === id ? { ...w, minimized: false, z } : w));
      const [dw, dh] = SIZES[app];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(dw, vw - 40);
      const h = Math.min(dh, vh - MENU_H - 110);
      const n = ws.length % 6;
      const x = Math.max(20, Math.round((vw - w) / 2 + (n - 2) * 34));
      const y = Math.max(MENU_H + 14, Math.round((vh - h) / 2 - 30 + (n - 2) * 26));
      const title = app === "case" ? `${projects.find((p) => p.slug === opts.payload)?.name ?? "Unknown"} — case-study.md` : TITLES[app];
      return [...ws, { id, app, payload: opts.payload, title, x, y, w, h, z, minimized: false, maximized: false, origin }];
    });
    setActiveId(id);
  }, []);

  const remove = useCallback((id: string) => {
    setWins((ws) => {
      const rest = ws.filter((w) => w.id !== id);
      const top = rest.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
      setActiveId(top?.id ?? null);
      return rest;
    });
  }, []);

  // `close` from inside apps (e.g. terminal `exit`) — no animation needed there.
  const api = useMemo<OSApi>(() => ({ open, close: remove, isMobile }), [open, remove, isMobile]);

  const patch = (id: string, p: Partial<Win>) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, ...p } : w)));
  const focus = (id: string) => {
    if (activeId === id) return;
    const z = ++zTop.current;
    patch(id, { z });
    setActiveId(id);
  };

  // first window after boot (desktop only — mobile starts on the home screen)
  const firstOpen = useRef(false);
  useEffect(() => {
    if (!booted || firstOpen.current) return;
    firstOpen.current = true;
    if (!window.matchMedia("(max-width: 700px)").matches) window.setTimeout(() => open("welcome"), 250);
  }, [booted, open]);

  // wallpaper parallax (cheap: two CSS vars)
  useEffect(() => {
    const el = wallRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", String(e.clientX / innerWidth - 0.5));
        el.style.setProperty("--my", String(e.clientY / innerHeight - 0.5));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (!ctx) return;
    const off = () => setCtx(null);
    window.addEventListener("pointerdown", off);
    window.addEventListener("keydown", off);
    return () => {
      window.removeEventListener("pointerdown", off);
      window.removeEventListener("keydown", off);
    };
  }, [ctx]);

  const active = wins.find((w) => w.id === activeId && !w.minimized);
  const openSecret = useCallback(() => open("bugs"), [open]);

  const renderApp = (w: Win) => {
    switch (w.app) {
      case "welcome":
        return <WelcomeApp />;
      case "about":
        return <AboutApp />;
      case "skills":
        return <SkillsApp />;
      case "projects":
        return <ProjectsApp />;
      case "case":
        return <CaseApp slug={w.payload ?? ""} />;
      case "experience":
        return <ExperienceApp />;
      case "contact":
        return <ContactApp />;
      case "terminal":
        return <TerminalApp winId={w.id} />;
      case "bugs":
        return <BugZooApp />;
      case "resume":
        return <ResumeApp />;
    }
  };

  const ctxItems: { label: string; run: () => void }[] = [
    { label: "Refresh", run: () => quip("Refreshed. Nothing was fixed. As is tradition.", { tone: "volt" }) },
    { label: "New Folder", run: () => quip("Another side project you'll never finish? Bold.", { tone: "hot" }) },
    { label: "Change Wallpaper", run: () => toggleTheme(ctx?.x, ctx?.y) },
    { label: "Open Terminal Here", run: () => open("terminal") },
    { label: "Get Info", run: () => open("about") },
  ];

  return (
    <OSContext.Provider value={api}>
      <a href="/boring" className="sr-only-focusable fixed left-4 top-12 z-[400] rounded bg-acid px-3 py-2 text-on-acid">
        Skip the OS — go to the plain résumé view
      </a>

      <MenuBar title={active?.title.split(" — ")[0] ?? "Finder-ish"} onRestart={() => setBootKey((k) => k + 1)} />

      {/* ── desktop ── */}
      <main
        id="main"
        className="fixed inset-0 overflow-hidden pt-9"
        onContextMenu={(e) => {
          if ((e.target as Element).closest("[role=dialog], button, a")) return;
          e.preventDefault();
          setCtx({ x: Math.min(e.clientX, innerWidth - 220), y: Math.min(e.clientY, innerHeight - 220) });
        }}
      >
        {/* wallpaper */}
        <div ref={wallRef} aria-hidden className="dots absolute inset-0" style={{ "--mx": 0, "--my": 0 } as React.CSSProperties}>
          <div
            className="absolute -left-[10%] top-[5%] size-[50vmax] rounded-full bg-acid/10 blur-[120px] light:bg-acid/15"
            style={{ translate: "calc(var(--mx) * 40px) calc(var(--my) * 40px)", animation: "blob 18s ease-in-out infinite" }}
          />
          <div
            className="absolute -right-[15%] bottom-[-15%] size-[55vmax] rounded-full bg-hot/10 blur-[130px]"
            style={{ translate: "calc(var(--mx) * -60px) calc(var(--my) * -60px)", animation: "blob 22s ease-in-out infinite reverse" }}
          />
        </div>

        {/* identity on the wallpaper */}
        <div className="pointer-events-none absolute bottom-24 left-5 right-5 select-none max-[700px]:bottom-auto max-[700px]:top-14 sm:left-10">
          <p className="t-label flex items-center gap-2 text-ink-dim">
            <span className="inline-block size-2 animate-pulse rounded-full bg-acid" />
            RohanOS v2.0.24 · {profile.location}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.6rem,9vw,8.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em]">
            {profile.firstName.toUpperCase()}
            <br />
            <span className="bg-gradient-to-r from-acid via-volt to-hot bg-clip-text text-transparent">{profile.lastName.toUpperCase()}</span>
          </h1>
          <p className="mt-3 font-display text-base sm:text-xl">
            <span className="text-ink-dim">{profile.title} · </span>
            <ScrambleText items={gags.hero.taglines} className="text-acid" />
          </p>
        </div>

        {/* desktop icons */}
        <ul
          aria-label="Desktop"
          className="absolute grid gap-1 max-[700px]:inset-x-3 max-[700px]:top-[46%] max-[700px]:grid-cols-4 min-[701px]:right-4 min-[701px]:top-14 min-[701px]:grid-flow-col min-[701px]:grid-rows-[repeat(4,auto)] sm:min-[701px]:right-14"
        >
          {DESKTOP.map(({ app, label }) => (
            <li key={app}>
              <button
                type="button"
                data-icon={app}
                onClick={(e) => open(app, { origin: e.currentTarget.querySelector("span") })}
                className="group flex w-full flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none focus-visible:bg-acid/15 min-[701px]:w-24"
                data-cursor={app === "bugs" ? "Contains bugs. Obviously." : app === "resume" ? gags.cursor.resume : `Open ${label}`}
              >
                <span className="transition-transform group-hover:-translate-y-1 group-active:scale-95">
                  <AppIcon app={app} size={isMobile ? 56 : 52} />
                </span>
                <span className="rounded px-1 text-[11px] font-medium leading-tight text-ink [text-shadow:0_1px_3px_var(--bg)] group-hover:bg-acid group-hover:text-on-acid">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* windows */}
        {wins.map((w) => (
          <Window
            key={w.id}
            win={w}
            active={w.id === activeId}
            mobile={isMobile}
            dockRect={dockRectFor(w.app)}
            onFocus={() => focus(w.id)}
            onClose={() => remove(w.id)}
            onMinimize={() => {
              patch(w.id, { minimized: true });
              const top = wins.filter((x) => x.id !== w.id && !x.minimized).sort((a, b) => b.z - a.z)[0];
              setActiveId(top?.id ?? null);
            }}
            onToggleMax={() => patch(w.id, { maximized: !w.maximized })}
            onMove={(x, y) => patch(w.id, { x, y })}
            onResize={(nw, nh) => patch(w.id, { w: nw, h: nh })}
          >
            {renderApp(w)}
          </Window>
        ))}

        {/* dock */}
        <nav aria-label="Dock" className="absolute bottom-3 left-1/2 z-[180] -translate-x-1/2 max-[700px]:hidden">
          <ul className="flex items-end gap-1.5 rounded-2xl border border-line bg-bg-elev/60 px-2.5 pb-2 pt-2.5 shadow-2xl backdrop-blur-xl">
            {DOCK.map((app) => {
              const running = wins.some((w) => w.app === app || (app === "projects" && w.app === "case"));
              return (
                <li key={app} className="relative">
                  <button
                    type="button"
                    data-dock={app}
                    onClick={() => open(app)}
                    aria-label={`Open ${TITLES[app as Exclude<AppId, "case">]}`}
                    className="group relative block transition-transform duration-200 hover:-translate-y-2 hover:scale-[1.22]"
                  >
                    <AppIcon app={app} size={44} />
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[10px] text-bg opacity-0 transition group-hover:opacity-100">
                      {TITLES[app as Exclude<AppId, "case">].split(" — ")[0]}
                    </span>
                  </button>
                  {running && <span aria-hidden className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink" />}
                </li>
              );
            })}
            <li aria-hidden className="mx-1 h-10 w-px self-center bg-line" />
            <li>
              <button type="button" data-dock="bugs" onClick={() => open("bugs")} aria-label="Open Recycle Bin" className="block transition-transform duration-200 hover:-translate-y-2 hover:scale-[1.22]">
                <AppIcon app="bugs" size={44} />
              </button>
            </li>
          </ul>
        </nav>

        {/* context menu */}
        {ctx && (
          <div
            role="menu"
            className="fixed z-[260] w-52 rounded-lg border border-line bg-bg-elev/95 p-1 shadow-2xl backdrop-blur-xl"
            style={{ left: ctx.x, top: ctx.y }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {ctxItems.map((it) => (
              <button
                key={it.label}
                role="menuitem"
                type="button"
                onClick={() => {
                  it.run();
                  setCtx(null);
                }}
                className="block w-full rounded px-3 py-1.5 text-left text-[13px] hover:bg-acid hover:text-on-acid"
              >
                {it.label}
              </button>
            ))}
          </div>
        )}
      </main>

      <Boot key={bootKey} force={bootKey} onDone={() => setBooted(true)} />
      <Cursor />
      <Gags onSecret={openSecret} />
      <QuipToaster />
    </OSContext.Provider>
  );
}
