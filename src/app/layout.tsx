import type { Metadata, Viewport } from "next";
import { Unbounded, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.shortIntro,
  keywords: [
    "Rohan Gupta",
    "Software Development Engineer",
    "Full-Stack Developer",
    "PHP",
    "CodeIgniter",
    "Next.js",
    "FastAPI",
    "Mumbai",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title,
    description: profile.shortIntro,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description: profile.shortIntro },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070c" },
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
  ],
};

// Runs before first paint: saved theme → OS preference → dark.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: experience[0].company },
  knowsAbout: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "FastAPI", "RAG"],
  url: profile.siteUrl,
  sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${unbounded.variable} ${grotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
