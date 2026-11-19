# Portfolio Plan: "RohanOS"

> **Current concept (2026-11-16):** the portfolio is a fake desktop operating system — RohanOS.
> The earlier scroll-driven "ENHANCE." infinite zoom was dropped (it didn't feel good to scroll through).
> Sections below the line describe the old concept and are kept only for reference; the content rules,
> colour/typography system and decisions still apply.

## How RohanOS works

| Piece | What it does | File |
|---|---|---|
| Boot screen | BIOS lines → 0…99 → 97 → 100 "Fine. We're faking it." (once per session, skippable; *Restart* in the RG menu replays it) | `src/components/os/Boot.tsx` |
| Menu bar | RG menu (About / Terminal / Boring Mode / Restart / Shut Down gag), active app name, chai battery (drains, click to refill), Boring Mode, theme switch, IST clock | `MenuBar.tsx` |
| **Nimbu Mirchi Antivirus™** | Hangs from the top-right corner, swings. Hover = status tooltip. Poke it 4× → protection disabled → bug invasion, squash 12 bugs in 12 s | `NimbuMirchi.tsx` |
| Desktop | Wallpaper with name/tagline (the page `h1`), icon grid, right-click context menu, mouse parallax | `RohanOS.tsx` |
| Windows | Open with a fly-out from the clicked icon, close back into it, minimise into the dock, drag, resize, maximise (double-click title), Esc to close. Full-screen sheets on mobile | `Window.tsx` |
| Dock | Welcome, About, Skills, Projects, Experience, Mail, Terminal, Recycle Bin | `RohanOS.tsx` |
| Apps | welcome.app · about.txt (Wikipedia parody) · Task Manager (skills, no %) · ~/projects → case-study windows · Metro career line · Mail (working contact form) · Terminal (`help`, `sudo hire rohan`, `nimbu`, `chai`, …) · Recycle Bin = Bug Zoo · resume.pdf | `src/components/os/apps/*` |
| Easter eggs | custom sarcastic cursor, idle nap, tab title, console note, Konami / typing `bug` opens the Bug Zoo | `Cursor.tsx`, `Gags.tsx` |

Unchanged: Boring Mode (`/boring`), case-study pages (`/work/[slug]`), contact API, content layer (`src/content/*`).

---

## (Superseded) Original concept: "ENHANCE."

One continuous infinite zoom through Rohan Gupta's professional identity.
The visitor never changes pages; every scene is hidden inside a detail of the previous one.

---

## 1. Information architecture

All content lives in **one typed data layer** (`src/content/*.ts`). Both the zoom experience and Boring Mode read from it, so nothing is duplicated and nothing gets out of sync.

```
content/
  profile.ts      name, title, location, intro, links (placeholders)
  experience.ts   DBTPL role, MeCard responsibilities, dates (TBC)
  projects.ts     MeCard, AI Learning Companion, MeCard Test Automation (+ case studies)
  skills.ts       5 categories, each skill tagged with a usage context (no percentages)
  gags.ts         every joke string in one place (easy to tune the spice level)
```

### Routes
| Route | Purpose |
|---|---|
| `/` | The zoom experience (default) |
| `/boring` | Boring Mode: clean recruiter layout, fully server-rendered, readable in 30s |
| `/work/[slug]` | Real, shareable case-study pages (SEO). In the zoom experience they open as an immersive overlay with the URL updated |
| `/api/contact` | Contact form handler |

---

## 2. The zoom journey (scene map)

Each arrow is a continuous zoom **into a specific object** of the scene before it.

| # | Scene | Content | Portal into next scene |
|---|---|---|---|
| 0 | **Preloader** | 0 → 99% → 97% "Loading talent… this may take a while." → 100% "Fine. We're faking it." (≤ 2.2s total, skippable, shown once per session) | — |
| 1 | **Hero** | Giant `ROHAN GUPTA`, "Developer. Allegedly.", hint "Scroll to explore. Or don't. I'm a website, not a cop." | The **O in ROHAN** becomes a lens/portal |
| 2 | **About**: a tiny planet | Mini illustrated Rohan on a planet + fake-Wikipedia bio panel (real intro, `[citation needed]` after compliments) | Zoom into **mini-Rohan's head** |
| 3 | **Skills**: the brain office | Chaotic workspace: floating snippets, sticky notes, terminal, ER diagram, flying papers. Skills shown as a **system process monitor** | A sticky note: **"projects (do not open)"** |
| 4 | **Projects**: digital museum | 3 framed exhibits with museum placards. Click → zoom into the frame → case study overlay | The museum's **EXIT sign** (shaped like a metro sign) |
| 5 | **Experience**: subway map | Line from "Learning Curve" through humorous stations; real stations carry real facts | Final station **"Contact Terminus"** |
| 6 | **Contact**: cinematic dark void | Mailbox + working form, "Send (I'll reply within 3–5 business years)" | Zoom into the **mailbox slot** |
| 7 | **Loop** | Comes out at the hero again, in a "smaller universe". Loop counter: "Loop 3. Seriously, are you okay?" | — |

**Persistent UI (outside the zoom):** Boring Mode button (top right, always visible), theme switch, a thin **depth meter** on the side (scene markers, clickable and keyboard-navigable, so nobody gets stuck).

---

## 3. Visual direction

### Dark theme: "Neon Noir"
Cinematic, deep, atmospheric. Grain overlay, soft radial glows, scanline hints.
| Token | Value | Use |
|---|---|---|
| `--bg` | `#07070C` | base |
| `--bg-elev` | `#11111A` | panels |
| `--ink` | `#EDEBFF` | text |
| `--ink-dim` | `#8B89A6` | secondary text |
| `--acid` | `#C6FF3D` | primary accent (acid lime) |
| `--hot` | `#FF3D9A` | secondary accent (hot magenta), errors, gags |
| `--volt` | `#3DF2FF` | tertiary (cyan), links, glows |

### Light theme: "Paper Lab"
Not an inversion: a printed lab notebook / editorial poster feel. Warm paper, crisp black ink, highlighter marks.
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F3F0E8` | warm paper |
| `--bg-elev` | `#FFFFFF` | cards |
| `--ink` | `#14131A` | text |
| `--ink-dim` | `#5E5B6B` | secondary |
| `--acid` | `#5B3DF5` | ultraviolet (primary accent) |
| `--hot` | `#FF4A1C` | vermilion |
| `--marker` | `#D9FF4A` | highlighter swipe behind key words |

Glows become hard offset shadows in light mode, and grain becomes paper texture.

### Theme switch
A circular reveal from the toggle (View Transitions API, with a crossfade fallback). Persisted in `localStorage`; an inline script sets the theme before first paint (no flash). The default follows the OS setting.
Gag: switching to light gives "Light mode. Bold choice."; switching back to dark gives "Welcome back to the cave."

### Typography (self-hosted via `next/font`)
- **Display:** *Unbounded* (wide, futuristic, still readable): hero and scene titles, oversized
- **Body:** *Space Grotesk*: copy and UI
- **Mono:** *JetBrains Mono*: terminal, process monitor, placards, gags
- Treatments: split-letter reveals, scramble/decode on hover, a glitch only on the hero name and 404-style jokes, outlined vs. filled text contrast. A fluid type scale with `clamp()`.

---

## 4. Skills presentation (no fake percentages)

A **process monitor** (think `htop`), where status means *context of use*, not proficiency:

| Status | Meaning | Example |
|---|---|---|
| `● RUNNING IN PRODUCTION` | used in professional work on MeCard | PHP, CodeIgniter 3, MySQL, JS, HTML, CSS, AJAX, REST APIs, Git |
| `● ACTIVE DEVELOPMENT` | used in current personal builds | Python, FastAPI, SQLAlchemy, Next.js, TypeScript, Qdrant, Ollama |
| `○ LOADED MODULE` | worked with / familiar | (to be confirmed by Rohan) |

Each row has a sarcastic "process note" in mono: `SQL: querying life decisions`, `Email replies: 404 Not Found` (a fake process that is clearly not a skill), and so on.
Floating around: sticky notes, terminal, ER diagram, memes. All decorative and `aria-hidden`; the monitor itself is a real accessible table.

---

## 5. Animation and interaction architecture

### Zoom engine
- One fixed full-viewport **stage**. Scenes are absolutely stacked layers.
- A tall scroll track (Lenis smooth scroll) drives **one master GSAP timeline** via ScrollTrigger (`scrub`).
- Each transition: the current scene scales up around its portal anchor (`transform-origin` = portal coordinates, measured on resize) from 1× to ~40× while fading out; the next scene scales from ~0.03× to 1× from that same point. Only `transform` and `opacity` animate (GPU-only, no layout thrash).
- Each scene gets a **hold segment** in the timeline, so content is readable and its internal reveals (text splits, items flying in) play inside the hold.
- Off-screen scenes are `visibility: hidden` and `inert` (performance + a11y).
- A scene registry (`scenes.ts`) defines order, portal anchor, hold length, and label. Adding or reordering scenes is a config change.

### Case studies
Click an exhibit → the frame zooms to fill the screen → a case-study overlay with its own scroll (Lenis paused), `history.pushState('/work/slug')`. Esc / back zooms back out.

### Running gags (all optional, lightweight, and skippable)
| Gag | Implementation note |
|---|---|
| Sarcastic cursor | `data-cursor="text"` attributes; one rAF loop; disabled on touch & reduced motion |
| Photo hover "Yes, that's really him." / resume "The PDF is boring. I warned you." | via the cursor labels; on mobile a tap shows a speech bubble |
| Scroll backwards: "Oh, now you want to leave?" | throttled, once per scene |
| Idle 20s → yawn → sleep → "You still there?" | `requestIdleCallback`-friendly timer; paused while the user is typing in the form |
| Tab title "Come back 😢" → "Fine. Whatever." | `visibilitychange` |
| Console message | one styled `console.log` |
| Konami code / typing `bug` → blooper reel | hidden "Bug Zoo" scene with real debugging jokes |
| Loop counter | `sessionStorage` |

### Accessibility and motion
- `prefers-reduced-motion`: zooms become crossfades, the preloader is skipped, idle/cursor gags are off.
- Full keyboard path: Tab through scenes; the depth meter is a nav landmark with skip links; focus moves to each scene heading.
- All jokes are text, so screen readers get the humour too. Decorative SVGs are `aria-hidden`.
- Boring Mode is always one click/tab away.

---

## 6. Responsive plan

| Breakpoint | Experience |
|---|---|
| Desktop / laptop | Full zoom, cursor gags, parallax depth in scenes |
| Tablet | Full zoom, tap-for-gags, fewer floating elements |
| Mobile | Zoom with fewer layers per scene; portals are **tappable** ("tap the O"); case studies open as bottom sheets; gags appear as speech bubbles from a tiny mascot; a "Pinch to zoom? We already did that for you." hint; haptic tick (`navigator.vibrate`) on scene change where supported |

Scenes are composed from SVG with a `viewBox`, so they scale cleanly; text stays in HTML (not baked into the SVG) for readability and SEO.

---

## 7. Stack

`next` (App Router) · `react` · `typescript` · `tailwindcss` · `gsap` (+ ScrollTrigger, SplitText; free) · `lenis`

That's the whole dependency list. No three.js, no framer-motion, no UI kit.

SEO: metadata + OG image per route, `Person` JSON-LD, sitemap, a real semantic HTML outline in both modes.

> The current folder holds an untouched Vite + React template. It will be replaced with Next.js (the brief asks for Next.js, and SSR helps SEO for Boring Mode and case studies).

---

## 8. Build phases

1. **Foundation**: Next.js setup, design tokens, fonts, theme switcher, content data layer, **Boring Mode** first (the content backbone, and a usable portfolio from day one).
2. **Zoom engine**: stage, master timeline, scene registry, depth meter, preloader, hero, placeholder scenes wired end-to-end.
3. **Scenes**: About planet → Brain office → Museum + case studies → Subway → Contact + working form → Loop.
4. **Gags**: cursor, idle/yawn, tab title, console, back-scroll, Konami blooper reel, loop counter.
5. **Polish**: mobile interactions, reduced motion, a11y audit, SEO, Lighthouse/performance pass, deploy.

---

## 9. Decisions (answered 2026-11-16)

- Clients are never named. BDI is never mentioned.
- DBTPL: July 2023 – present. PHP/CodeIgniter on MeCard since July 2024.
- Selenium automation = part of MeCard work. Node.js + React used in the AI project (private repo, no public link).
- Humour: extreme. Hosting: Vercel. Contact form: Gmail via App Password (`.env.local`, see `.env.example`).
- Implementation note: the zoom is driven directly from Lenis scroll events (no ScrollTrigger needed), GSAP stays available for later effects.

## 10. Still missing (placeholders in `src/content/profile.ts`)

GitHub URL · LinkedIn URL · resume PDF (`public/resume/`) · professional email · photo · final domain (`siteUrl`).
