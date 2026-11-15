/**
 * Single source of truth for personal details.
 * Anything marked TODO is a placeholder — never invent these.
 */
export const profile = {
  name: "Rohan Gupta",
  firstName: "Rohan",
  lastName: "Gupta",
  title: "Software Development Engineer",
  subtitle: "Full-Stack Developer",
  location: "Mumbai, India",
  tagline: "Developer. Allegedly.",

  intro: [
    "I am a Software Development Engineer working on enterprise web applications, backend systems, frontend development, database management and API integrations.",
    "I enjoy exploring technologies, solving complicated problems, debugging applications and building practical software solutions.",
    "Currently, I primarily work on MeCard, an enterprise digital business card management platform — across the full development lifecycle, from understanding requirements and designing database structures to backend functionality, frontend interactions, testing and debugging.",
    "I am also exploring artificial intelligence, locally hosted language models and RAG-based applications.",
  ],

  shortIntro:
    "Software Development Engineer in Mumbai building enterprise web applications with PHP, CodeIgniter, MySQL and JavaScript — and exploring local LLMs and RAG with Python, FastAPI and Next.js.",

  traits: [
    "Curious",
    "Creative",
    "Technical",
    "Problem solver",
    "Learns by building",
    "Frontend + backend",
  ],

  links: {
    github: "", // TODO: [ADD GITHUB PROFILE]
    linkedin: "", // TODO: [ADD LINKEDIN PROFILE]
    resume: "", // TODO: [ADD RESUME PDF] e.g. "/resume/rohan-gupta-resume.pdf"
    email: "", // TODO: [ADD PROFESSIONAL EMAIL]
  },

  photo: "", // TODO: [ADD PHOTO] e.g. "/rohan.jpg"

  siteUrl: "https://rohan-gupta.vercel.app", // TODO: replace with final Vercel/custom domain
} as const;

export type Profile = typeof profile;
