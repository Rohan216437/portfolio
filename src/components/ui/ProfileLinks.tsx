import { profile } from "@/content/profile";

const isDev = process.env.NODE_ENV !== "production";

type Item = { key: keyof typeof profile.links; label: string; placeholder: string; cursor?: string };

const items: Item[] = [
  { key: "github", label: "GitHub", placeholder: "[ADD GITHUB PROFILE]" },
  { key: "linkedin", label: "LinkedIn", placeholder: "[ADD LINKEDIN PROFILE]" },
  { key: "resume", label: "Resume (PDF)", placeholder: "[ADD RESUME PDF]", cursor: "The PDF is boring. I warned you." },
  { key: "email", label: "Email", placeholder: "[ADD PROFESSIONAL EMAIL]", cursor: "He'll reply. Eventually." },
];

/**
 * Social / resume links. Missing links are hidden in production and shown
 * as visible placeholders in development so nothing gets forgotten.
 */
export function ProfileLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map(({ key, label, placeholder, cursor }) => {
        const value = profile.links[key];
        if (!value) {
          return isDev ? (
            <li key={key}>
              <span className="inline-block rounded-full border border-dashed border-hot/70 px-4 py-2 font-mono text-xs text-hot">
                {placeholder}
              </span>
            </li>
          ) : null;
        }
        const href = key === "email" ? `mailto:${value}` : value;
        const external = key === "github" || key === "linkedin";
        return (
          <li key={key}>
            <a
              href={href}
              data-cursor={cursor}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(key === "resume" ? { download: true } : {})}
              className="inline-block rounded-full border border-line px-4 py-2 font-mono text-xs text-ink transition hover:border-acid hover:text-acid"
            >
              {label} ↗
            </a>
          </li>
        );
      })}
    </ul>
  );
}
