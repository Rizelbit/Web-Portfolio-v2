import {
  Code2, FileCode, Globe, Wind, Server, Database,
  GitBranch, FileText, Cloud, Package, Zap, Hash,
  Braces, Cpu, Coffee, Binary, LayoutGrid, Triangle,
  Box, Hexagon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════
   Centralized Data — Reinhard Alfonzo Portfolio
   ═══════════════════════════════════════════════ */

/* ─── Navigation ─── */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

/* ─── Skills ─── */
export interface Skill {
  name: string;
  color: string;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  { name: "Go", color: "#00ADD8", icon: Code2 },
  { name: "TypeScript", color: "#3178C6", icon: FileCode },
  { name: "JavaScript", color: "#F7DF1E", icon: Braces },
  { name: "Python", color: "#3776AB", icon: Code2 },
  { name: "C", color: "#A8B9CC", icon: Cpu },
  { name: "C++", color: "#00599C", icon: Cpu },
  { name: "HTML5", color: "#E34F26", icon: Globe },
  { name: "CSS3", color: "#1572B6", icon: Hash },
  { name: "Haskell", color: "#5D4F85", icon: Binary },
  { name: "Java", color: "#ED8B00", icon: Coffee },
  { name: "React", color: "#61DAFB", icon: Hexagon },
  { name: "TailwindCSS", color: "#06B6D4", icon: Wind },
  { name: "Next.js", color: "#FFFFFF", icon: Triangle },
  { name: "Bootstrap", color: "#7952B3", icon: LayoutGrid },
  { name: "Node.js", color: "#339933", icon: Server },
  { name: "Express", color: "#FFFFFF", icon: Server },
  { name: "PostgreSQL", color: "#4169E1", icon: Database },
  { name: "MongoDB", color: "#47A248", icon: Database },
  { name: "MySQL", color: "#4479A1", icon: Database },
  { name: "Git / GitHub", color: "#F05032", icon: GitBranch },
  { name: "Docker", color: "#2496ED", icon: Box },
  { name: "Azure", color: "#0078D4", icon: Cloud },
  { name: "Vercel", color: "#FFFFFF", icon: Triangle },
  { name: "pnpm", color: "#F69220", icon: Package },
  { name: "Bun", color: "#FBF0DF", icon: Zap },
  { name: "LaTeX", color: "#008080", icon: FileText },
  { name: "VS Code", color: "#007ACC", icon: Code2 },
  { name: "IntelliJ IDEA", color: "#FE315D", icon: Code2 },
];

/* ─── About Feature Cards ─── */
export interface FeatureCard {
  title: string;
  description: string;
  iconName: "code" | "barChart" | "users";
}

export const featureCards: FeatureCard[] = [
  {
    title: "Web Development",
    description:
      "Building responsive, performant web applications with modern frameworks like React, Next.js, and TailwindCSS.",
    iconName: "code",
  },
  {
    title: "Data Science",
    description:
      "Exploring data-driven insights through analysis, visualization, and machine learning with Python and SQL.",
    iconName: "barChart",
  },
  {
    title: "Project Management",
    description:
      "Leading teams and managing software projects from ideation to delivery using agile methodologies.",
    iconName: "users",
  },
];

/* ─── Projects ─── */
export interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  githubUrl: string;
  liveUrl?: string;
  isPlaceholder?: boolean;
}

export const projects: Project[] = [
  {
    title: "HEALTHCORE-N",
    description:
      "Nimons Hospital Administration System — a comprehensive hospital management solution built with Abstract Data Types in C. Features patient records, scheduling, and resource management.",
    tags: ["C", "ADT", "Data Structures", "CLI"],
    gradient: "from-violet-600/30 via-indigo-600/20 to-blue-600/10",
    githubUrl: "https://github.com/reinhardalfonzo",
  },
  {
    title: "Matrix Calculator GHDB",
    description:
      "A linear algebraic matrix calculator built with Java and JavaFX. Supports operations like determinants, inverses, Gaussian elimination, and Cramer's rule.",
    tags: ["Java", "JavaFX", "Linear Algebra", "GUI"],
    gradient: "from-cyan-600/30 via-teal-600/20 to-emerald-600/10",
    githubUrl: "https://github.com/reinhardalfonzo",
  },
  {
    title: "Coming Soon",
    description:
      "An exciting new project is in the works. Stay tuned for updates — this space will be filled with something worth scrolling for.",
    tags: ["???", "TBD"],
    gradient: "from-amber-600/20 via-orange-600/10 to-red-600/10",
    githubUrl: "#",
    isPlaceholder: true,
  },
];

/* ─── Experience (placeholders) ─── */
export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "internship" | "organization";
}

export const experiences: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    organization: "Company Placeholder",
    period: "2025 — Present",
    description:
      "Contributed to full-stack development of internal tools and client-facing applications. Collaborated with cross-functional teams to deliver scalable solutions.",
    type: "work",
  },
  {
    role: "Data Science Intern",
    organization: "Internship Placeholder",
    period: "2024 — 2025",
    description:
      "Assisted in building data pipelines, performing exploratory analysis, and developing predictive models for business intelligence dashboards.",
    type: "internship",
  },
  {
    role: "Head of Technology",
    organization: "Organization Placeholder",
    period: "2023 — 2024",
    description:
      "Led the technology division of a student organization. Managed a team of developers and organized tech-focused events and workshops.",
    type: "organization",
  },
];

/* ─── Contact Info ─── */
export interface ContactInfo {
  type: "email" | "phone" | "location";
  label: string;
  value: string;
  href?: string;
}

export const contactInfo: ContactInfo[] = [
  {
    type: "email",
    label: "Email",
    value: "reinhardalfonso@gmail.com",
    href: "mailto:reinhardalfonso@gmail.com",
  },
  {
    type: "phone",
    label: "Phone",
    value: "+62 822-1155-1510",
    href: "tel:+6282211551510",
  },
  {
    type: "location",
    label: "Location",
    value: "Bandung, Indonesia",
  },
];

/* ─── Social Links ─── */
export interface SocialLink {
  name: string;
  url: string;
  iconName: "github" | "linkedin";
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/reinhardalfonzo", iconName: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/reinhardalfonzo", iconName: "linkedin" },
];
