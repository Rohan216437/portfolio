/**
 * Skills — no proficiency percentages. `status` describes WHERE a skill
 * has been used, not how good I am at it.
 *   work     → used in professional work at DBTPL (MeCard)
 *   personal → used in personal builds (AI Learning Companion)
 *   loaded   → worked with / familiar
 */
export type SkillStatus = "work" | "personal" | "loaded";

export type Skill = { name: string; status: SkillStatus; note: string };

export type SkillGroup = { id: string; label: string; process: string; skills: Skill[] };

export const statusLabel: Record<SkillStatus, { label: string; legend: string }> = {
  work: { label: "RUNNING @ WORK", legend: "Used in professional work" },
  personal: { label: "ACTIVE DEV", legend: "Used in personal projects" },
  loaded: { label: "LOADED", legend: "Worked with / familiar" },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    process: "visual_cortex.exe",
    skills: [
      { name: "HTML5", status: "work", note: "It's a programming language. Fight me." },
      { name: "CSS3", status: "work", note: "Centered a div once. Witnesses available." },
      { name: "JavaScript", status: "work", note: "Operational. '1' + 1 = '11'. Still operational." },
      { name: "TypeScript", status: "personal", note: "JavaScript, but it argues back." },
      { name: "React.js", status: "personal", note: "Component detected. Re-rendering feelings." },
      { name: "Next.js", status: "personal", note: "You're looking at it. Literally." },
      { name: "Bootstrap", status: "loaded", note: "col-md-6 is muscle memory." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    process: "brainstem_d",
    skills: [
      { name: "PHP", status: "work", note: "Running in production. Yes, still. No, it's fine." },
      { name: "CodeIgniter 3", status: "work", note: "Legacy? We say 'battle-tested'." },
      { name: "AJAX", status: "work", note: "Asynchronous. Like my email replies." },
      { name: "REST APIs", status: "work", note: "200 OK. Emotionally, 207 Multi-Status." },
      { name: "Node.js", status: "work", note: "node_modules: heavier than a neutron star." },
      { name: "Python", status: "personal", note: "Indentation-based anxiety." },
      { name: "FastAPI", status: "personal", note: "Fast. The API, not the deadlines." },
      { name: "Express.js", status: "loaded", note: "Minimal framework. Maximal middleware." },
    ],
  },
  {
    id: "data",
    label: "Databases",
    process: "long_term_memory.db",
    skills: [
      { name: "MySQL", status: "work", note: "Holds the data. And the grudges." },
      { name: "SQL", status: "work", note: "SELECT * FROM life_decisions; — 0 rows returned." },
      { name: "Database migrations", status: "work", note: "Rearranging tables at 2 AM like furniture." },
      { name: "SQLAlchemy", status: "personal", note: "Alchemy, but the gold is stack traces." },
      { name: "PostgreSQL", status: "loaded", note: "MySQL's cousin who studied abroad." },
      { name: "Prisma", status: "loaded", note: "An ORM with good vibes." },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    process: "muscle_memory.sh",
    skills: [
      { name: "Git", status: "work", note: "git commit -m \"final_final_v3_REAL\"" },
      { name: "Selenium WebDriver", status: "work", note: "Clicks buttons so I don't have to." },
      { name: "API integrations", status: "work", note: "Reading other people's docs so you don't have to." },
      { name: "npm", status: "work", note: "npm install hope" },
      { name: "GitHub", status: "loaded", note: "Green squares = serotonin." },
      { name: "Composer", status: "loaded", note: "composer install && pray" },
      { name: "Docker", status: "loaded", note: "A container of unresolved questions." },
      { name: "Postman", status: "loaded", note: "Delivers requests. Never the ones I want." },
      { name: "Linux", status: "loaded", note: "sudo make me a sandwich." },
    ],
  },
  {
    id: "ai",
    label: "AI & Emerging",
    process: "prefrontal_llm.gguf",
    skills: [
      { name: "Ollama", status: "personal", note: "Local LLMs. Laptop fan auditions as a jet engine." },
      { name: "Qdrant", status: "personal", note: "Finds meaning in vectors. Unlike me on Mondays." },
      { name: "RAG", status: "personal", note: "Retrieval-Augmented Generation. Not a cleaning cloth." },
      { name: "Qwen", status: "personal", note: "Smarter than me before coffee." },
      { name: "Gemma", status: "personal", note: "Also smarter than me before coffee." },
      { name: "Pydantic", status: "personal", note: "Validates data. Can't validate my choices." },
      { name: "Alembic", status: "personal", note: "Version control for the database's mood swings." },
      { name: "Zod", status: "personal", note: "Kneel before Zod. (It's a schema validator.)" },
    ],
  },
];

/** Clearly-fake processes. Shown in the brain, never in Boring Mode. */
export const fakeProcesses = [
  { name: "email_replies", status: "404 NOT FOUND" },
  { name: "sleep_schedule", status: "DEPRECATED" },
  { name: "work_life_balance", status: "PENDING CODE REVIEW" },
  { name: "song_lyrics_2009", status: "USING 63% OF BRAIN" },
];
