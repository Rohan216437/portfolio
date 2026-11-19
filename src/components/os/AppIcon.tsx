import type { AppId } from "./context";

/** Icon tiles. Pure SVG/CSS, theme-aware. */
const tile: Record<AppId, string> = {
  welcome: "from-acid to-volt",
  about: "from-[#f9d423] to-[#ff4e50]",
  skills: "from-volt to-[#5b3df5]",
  projects: "from-[#ffb347] to-[#ff7a18]",
  case: "from-[#ffb347] to-[#ff7a18]",
  experience: "from-hot to-[#7b2ff7]",
  contact: "from-[#43e97b] to-[#38f9d7]",
  terminal: "from-[#1d1d27] to-[#000]",
  bugs: "from-[#8e9eab] to-[#5b6770]",
  resume: "from-[#f5f5f5] to-[#cfcfcf]",
};

function Glyph({ app }: { app: AppId }) {
  const c = "size-[55%]";
  switch (app) {
    case "welcome":
      return <span className="font-display text-[0.95em] font-extrabold text-[#07070c]">RG</span>;
    case "about":
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "skills":
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
          <path d="M3 17l4-6 4 3 4-8 6 9" />
          <path d="M3 21h18" />
        </svg>
      );
    case "projects":
    case "case":
      return (
        <svg viewBox="0 0 24 24" className={c} fill="#fff">
          <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" opacity=".95" />
        </svg>
      );
    case "experience":
      return <span className="font-display text-[1.05em] font-extrabold text-white">M</span>;
    case "contact":
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="#07070c" strokeWidth="2.2" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "terminal":
      return <span className="font-mono text-[0.8em] font-bold text-[#c6ff3d]">&gt;_</span>;
    case "bugs":
      return <span className="text-[1.1em]">🐛</span>;
    case "resume":
      return <span className="font-mono text-[0.55em] font-black text-[#e8410f]">PDF</span>;
  }
}

export function AppIcon({ app, size = 52 }: { app: AppId; size?: number }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-[28%] bg-gradient-to-br shadow-[0_8px_20px_-8px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.35)] ${tile[app]}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      <Glyph app={app} />
    </span>
  );
}
