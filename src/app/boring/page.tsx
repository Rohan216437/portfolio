import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects, additionalWork } from "@/content/projects";
import { skillGroups, statusLabel, type SkillStatus } from "@/content/skills";
import { gags } from "@/content/gags";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ContactForm } from "@/components/ui/ContactForm";
import { ProfileLinks } from "@/components/ui/ProfileLinks";
import { StatusDot } from "@/components/ui/StatusDot";
import { QuipToaster } from "@/components/ui/QuipToaster";

export const metadata: Metadata = {
  title: "Résumé view",
  description: `${profile.name} — ${profile.title} in ${profile.location}. Experience, skills, projects and contact.`,
  alternates: { canonical: "/boring" },
};

const nav = [
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["contact", "Contact"],
] as const;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-line py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-[12rem_1fr]">
        <h2 id={`${id}-h`} className="t-label pt-1.5 text-ink-dim">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function BoringPage() {
  const job = experience[0];
  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-50 rounded bg-acid px-3 py-2 text-on-acid">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/boring" className="font-display text-sm font-bold tracking-tight">
            RG<span className="text-acid">.</span>
          </Link>
          <nav aria-label="Sections" className="ml-2 hidden gap-1 md:flex">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-full px-3 py-1.5 text-sm text-ink-dim transition hover:bg-bg-elev hover:text-ink">
                {label}
              </a>
            ))}
            {profile.links.resume && (
              <a href={profile.links.resume} download className="rounded-full px-3 py-1.5 text-sm text-ink-dim hover:text-ink">
                Resume
              </a>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-acid px-4 py-2 font-mono text-xs text-acid transition hover:bg-acid hover:text-on-acid"
            >
              ✦ Back to RohanOS
            </Link>
            <ThemeToggle quiet />
          </div>
        </div>
        <nav aria-label="Sections (mobile)" className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-ink-dim">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mt-6 rounded-lg border border-dashed border-line px-4 py-2 font-mono text-xs text-ink-dim">
          {gags.boring.banner}
        </p>

        {/* Summary — the 30-second read */}
        <section aria-label="Summary" className="py-14 md:py-20">
          <p className="t-label text-acid">{profile.location}</p>
          <h1 className="t-huge mt-3">{profile.name}</h1>
          <p className="mt-4 font-display text-lg text-ink-dim md:text-2xl">
            {profile.title} · {profile.subtitle}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.shortIntro}</p>
          <dl className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              ["Current role", `${job.role}, ${job.short}`],
              ["Since", job.start],
              ["Main product", "MeCard (enterprise platform)"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-line bg-bg-elev p-4">
                <dt className="t-label text-ink-dim">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <ProfileLinks className="mt-8" />
        </section>

        <Section id="about" title="About">
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
            {profile.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.traits.map((t) => (
              <li key={t} className="rounded-full bg-bg-elev px-3 py-1 text-sm text-ink-dim">
                {t}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title="Skills">
          <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-dim">
            {(Object.keys(statusLabel) as SkillStatus[]).map((s) => (
              <li key={s} className="flex items-center gap-2">
                <StatusDot status={s} /> {statusLabel[s].legend}
              </li>
            ))}
          </ul>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.id}>
                <h3 className="font-display text-base font-semibold">{g.label}</h3>
                <ul className="mt-3 space-y-1.5">
                  {g.skills.map((s) => (
                    <li key={s.name} className="flex items-center gap-2.5">
                      <StatusDot status={s.status} />
                      <span>{s.name}</span>
                      <span className="sr-only">({statusLabel[s.status].legend})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <article>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="t-title">{job.role}</h3>
              <p className="font-mono text-sm text-ink-dim">
                {job.start} — {job.end}
              </p>
            </div>
            <p className="mt-1 text-ink-dim">
              {job.company} · {job.location}
            </p>
            <p className="mt-5 font-medium">
              Working on {job.product}. PHP / CodeIgniter development on MeCard since July 2024.
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-2 md:grid-cols-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-ink/90">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-acid" />
                  {r}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {job.stack.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-ink-dim">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.slug} className="flex flex-col rounded-2xl border border-line bg-bg-elev p-6 transition hover:border-acid">
                <p className="t-label text-ink-dim">
                  {p.index} · {p.category}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 font-mono text-xs text-acid">{p.status}</p>
                <p className="mt-4 flex-1 text-ink/90">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 8).map((t) => (
                    <li key={t} className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-ink-dim">
                      {t}
                    </li>
                  ))}
                  {p.stack.length > 8 && <li className="px-1 font-mono text-[11px] text-ink-dim">+{p.stack.length - 8}</li>}
                </ul>
                <Link href={`/work/${p.slug}`} className="mt-6 font-mono text-sm text-acid underline-offset-4 hover:underline">
                  Read case study →
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-dim">Also: {additionalWork.join(", ")}.</p>
        </Section>

        <Section id="contact" title="Contact">
          <p className="mb-6 max-w-xl text-lg">Open to full-stack and backend opportunities, and interesting freelance work. Based in {profile.location}.</p>
          <ProfileLinks className="mb-8" />
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="mx-auto max-w-6xl border-t border-line px-4 py-8 text-sm text-ink-dim sm:px-6">
        © {profile.name}. Built with Next.js, one Nimbu Mirchi and a concerning amount of sarcasm — which you skipped.{" "}
        <Link href="/" className="text-acid underline-offset-4 hover:underline">
          Boot RohanOS.
        </Link>
      </footer>
      <QuipToaster />
    </>
  );
}
