/**
 * Professional experience. Keep this strictly factual.
 * - No client names.
 * - DBTPL: July 2023 – present. PHP/CodeIgniter on MeCard since July 2024.
 */
export const experience = [
  {
    company: "Digital Business Technology Private Limited",
    short: "DBTPL",
    role: "Software Development Engineer",
    start: "July 2023",
    end: "Present",
    location: "Mumbai, India",
    product: "MeCard — enterprise digital business card management platform",
    stack: ["PHP", "CodeIgniter 3", "MySQL", "JavaScript", "HTML", "CSS", "AJAX", "REST APIs"],
    responsibilities: [
      "Backend development using PHP and CodeIgniter",
      "Frontend functionality using JavaScript, HTML and CSS",
      "MySQL database management, migrations and schema changes",
      "Corporate administration modules and user management",
      "Role-based access control, authentication and authorization",
      "Digital business card management and digital identity workflows",
      "QR code generation and scanning, attendance scanner integration",
      "Analytics and activity tracking",
      "MIS reporting and Excel exports",
      "Third-party API integrations",
      "Session management and security improvements",
      "Production debugging and application maintenance",
      "Developer testing, QA/UAT support and Selenium test automation",
      "Git-based version control",
    ],
  },
] as const;

/**
 * Subway map. `real: true` stations are facts; the rest are clearly-labelled
 * "service stations" (jokes) that never carry dates or claims.
 */
export type Station = {
  id: string;
  name: string;
  real: boolean;
  date?: string;
  detail: string;
};

export const stations: Station[] = [
  {
    id: "boarding",
    name: "DBTPL Central",
    real: true,
    date: "July 2023",
    detail: "Boarded Digital Business Technology Pvt. Ltd. as a Software Development Engineer.",
  },
  {
    id: "learning-curve",
    name: "Learning Curve",
    real: false,
    detail: "Steep gradient. Mind the gap. The gap is everything I didn't know yet.",
  },
  {
    id: "mecard",
    name: "MeCard Line",
    real: true,
    date: "July 2024",
    detail:
      "Started working on MeCard with PHP and CodeIgniter 3 — backend, frontend, MySQL, access control, QR & attendance scanning, analytics, MIS reports.",
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow Express",
    real: false,
    detail: "Non-stop service. Marked as duplicate on arrival.",
  },
  {
    id: "production",
    name: "Production Central",
    real: true,
    date: "Ongoing",
    detail:
      "Production debugging, security & session improvements, migrations, third-party integrations, QA/UAT support and Selenium automation.",
  },
  {
    id: "imposter",
    name: "Imposter Syndrome Junction",
    real: false,
    detail: "Everyone gets off here eventually. Most of us get back on.",
  },
  {
    id: "ai",
    name: "AI Sidings",
    real: true,
    date: "In progress",
    detail: "Exploring local LLMs, RAG and vector search through a personal AI learning project.",
  },
  {
    id: "terminus",
    name: "Contact Terminus",
    real: false,
    detail: "All passengers must disembark. Hiring managers, please use the mailbox.",
  },
];
