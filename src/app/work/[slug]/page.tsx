import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { QuipToaster } from "@/components/ui/QuipToaster";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} — case study`, description: p.summary, alternates: { canonical: `/work/${p.slug}` } };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/boring#projects" className="font-mono text-sm text-ink-dim hover:text-ink">
            ← All projects
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/" className="rounded-full border border-acid px-4 py-2 font-mono text-xs text-acid hover:bg-acid hover:text-on-acid">
              ✦ RohanOS
            </Link>
            <ThemeToggle quiet />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <CaseStudyBody project={project} />
        <nav aria-label="Next project" className="mt-24 border-t border-line pt-10">
          <p className="t-label text-ink-dim">Next exhibit</p>
          <Link href={`/work/${next.slug}`} className="t-huge mt-3 inline-block transition hover:text-acid">
            {next.name} →
          </Link>
        </nav>
      </main>
      <QuipToaster />
    </>
  );
}
