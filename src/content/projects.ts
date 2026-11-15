/**
 * Projects + case studies. Strictly factual: no invented clients, users,
 * metrics, deployments or performance numbers.
 */
export type CaseSection = { heading: string; body?: string; bullets?: string[] };

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  status: string;
  year: string;
  summary: string;
  caption: string; // the museum placard joke
  medium: string; // "Mixed media: ..." placard line
  stack: string[];
  contributions: string[];
  repo: { label: string; href?: string };
  sections: CaseSection[];
  accent: "acid" | "hot" | "volt";
};

export const projects: Project[] = [
  {
    slug: "mecard",
    index: "01",
    name: "MeCard",
    category: "Enterprise Application",
    status: "In production · actively maintained",
    year: "2024 — present",
    summary:
      "An enterprise digital business card management platform that lets organizations manage digital employee identities, business cards and corporate workflows.",
    caption:
      "An enterprise application with enough business logic to make your brain request a database backup.",
    medium: "PHP, MySQL, caffeine and an unreasonable number of edge cases.",
    stack: ["PHP", "CodeIgniter 3", "MySQL", "JavaScript", "HTML", "CSS", "AJAX", "REST APIs"],
    contributions: [
      "Corporate administration",
      "User management",
      "Backend development",
      "Authentication & authorization",
      "Role-based access control",
      "QR code generation",
      "Attendance scanner integration",
      "Analytics & activity tracking",
      "Database migrations",
      "MIS reporting & Excel exports",
      "Third-party integrations",
      "Security improvements",
      "Production debugging",
    ],
    repo: { label: "Proprietary — company codebase" },
    accent: "acid",
    sections: [
      {
        heading: "What it is",
        body: "MeCard is a digital business card management platform built for organizations. Companies use it to manage digital employee identities and business cards, administer their corporate users, and run related workflows like attendance scanning and reporting.",
      },
      {
        heading: "My role",
        body: "I work on MeCard as a Software Development Engineer across the stack — from understanding requirements and designing database changes to implementing backend functionality, frontend interactions, testing and production debugging. I contribute to the platform as part of the team; I didn't architect it single-handedly, and I'm not going to pretend I did.",
      },
      {
        heading: "Areas I've worked on",
        bullets: [
          "Corporate administration modules and corporate user management",
          "Authentication, authorization and role-based access control",
          "Digital business card management and digital identity workflows",
          "QR code generation and scanning, attendance scanner integration",
          "Analytics and activity tracking",
          "MIS reporting and Excel exports",
          "Database migrations and schema changes in MySQL",
          "Third-party API integrations",
          "Session management and application security improvements",
          "Enterprise customizations and enhancements for corporate customers",
        ],
      },
      {
        heading: "How the work flows",
        bullets: [
          "Requirement → database design / migration",
          "CodeIgniter 3 controllers, models and libraries in PHP",
          "Frontend interactions with JavaScript, AJAX, HTML and CSS",
          "Developer testing, then QA/UAT support",
          "Git-based version control, release, and production debugging when reality disagrees",
        ],
      },
      {
        heading: "Footnote from the curator",
        body: "Enterprise software is where 'just add a checkbox' becomes a migration, three permission checks and an Excel export. I have made peace with this. Mostly.",
      },
    ],
  },
  {
    slug: "ai-learning-companion",
    index: "02",
    name: "AI Learning Companion",
    category: "Personal AI Project",
    status: "Under active development · private repo",
    year: "In progress",
    summary:
      "An AI-powered learning companion for exploring conversational learning, locally hosted language models and document-based knowledge retrieval (RAG).",
    caption:
      "Teaching AI to explain things while I'm still trying to understand half of them.",
    medium: "Python, vectors, local GPUs crying softly.",
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "Pydantic",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Zod",
      "Qdrant",
      "Ollama",
      "Qwen",
      "Gemma",
      "RAG",
    ],
    contributions: [
      "FastAPI backend",
      "Next.js frontend",
      "Vector database integration",
      "Document retrieval",
      "Local LLM experimentation",
      "Database management",
      "Conversational AI workflows",
    ],
    repo: { label: "Private repository — walkthrough on request" },
    accent: "volt",
    sections: [
      {
        heading: "What it is",
        body: "A personal project to learn how conversational AI tutors actually work under the hood — by building one. It combines locally hosted language models with document-based retrieval so the assistant can answer from provided material instead of just vibes.",
      },
      {
        heading: "Architecture",
        bullets: [
          "Frontend: Next.js + React + TypeScript, with Zod for schema validation",
          "Backend: FastAPI (Python) with Pydantic models",
          "Persistence: SQLAlchemy ORM with Alembic migrations",
          "Retrieval: documents embedded and stored in Qdrant (vector database)",
          "Generation: local LLMs (Qwen, Gemma) served through Ollama",
          "Glue: a RAG pipeline — retrieve relevant chunks, then generate grounded answers",
        ],
      },
      {
        heading: "What I'm exploring",
        bullets: [
          "Conversational learning workflows",
          "How retrieval quality changes answer quality",
          "Trade-offs of running models locally",
          "Clean API contracts between a Python backend and a TypeScript frontend",
        ],
      },
      {
        heading: "Status",
        body: "Under active development in a private repository. Happy to walk through the code and architecture in an interview.",
      },
    ],
  },
  {
    slug: "mecard-test-automation",
    index: "03",
    name: "MeCard Test Automation",
    category: "Developer Productivity · Test Automation",
    status: "Part of MeCard engineering work",
    year: "2024 — present",
    summary:
      "A Selenium-based automated testing framework for MeCard's authentication, access permissions and corporate administration workflows.",
    caption: "Because clicking the same button 500 times manually is not a personality trait.",
    medium: "JavaScript, a headless Chrome and pure spite for repetitive clicking.",
    stack: ["JavaScript", "Node.js", "Selenium WebDriver", "Chrome", "npm"],
    contributions: [
      "Authentication test flows",
      "Access-control checks",
      "Corporate administration workflows",
      "Customer-specific workflow coverage",
    ],
    repo: { label: "Internal — part of MeCard work" },
    accent: "hot",
    sections: [
      {
        heading: "Why it exists",
        body: "Enterprise access control has many roles and many paths through the app. Verifying them by hand after every change is slow and error-prone, so I built automated browser tests as part of my MeCard work.",
      },
      {
        heading: "What it covers",
        bullets: [
          "Authentication flows",
          "Access permissions and role-based access control",
          "Corporate administration workflows",
          "Customer-specific enterprise workflows",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "Node.js test scripts driving Chrome through Selenium WebDriver",
          "Managed with npm",
          "Runs the repetitive click-paths so humans can focus on the interesting bugs",
        ],
      },
    ],
  },
];

export const additionalWork = [
  "Website functionality and email integrations",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
