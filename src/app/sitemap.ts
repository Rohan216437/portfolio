import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return [
    { url: base, priority: 1 },
    { url: `${base}/boring`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, priority: 0.7 })),
  ];
}
