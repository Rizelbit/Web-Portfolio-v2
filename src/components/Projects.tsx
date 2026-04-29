"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
} from "lucide-react";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { projects } from "@/lib/data";
import { fadeInUp, viewportOnce } from "@/lib/animations";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* ─── Update scroll state ─── */
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    /* Determine active card based on scroll position */
    const cardWidth = el.children[0]?.clientWidth ?? 0;
    const gap = 24; // gap-6 = 24px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, projects.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  /* ─── Navigation ─── */
  const scrollToCard = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el || !el.children[index]) return;

    const card = el.children[index] as HTMLElement;
    const scrollLeft =
      card.offsetLeft - el.offsetLeft - (el.clientWidth - card.clientWidth) / 2;

    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const prev = () => scrollToCard(Math.max(0, activeIndex - 1));
  const next = () =>
    scrollToCard(Math.min(projects.length - 1, activeIndex + 1));

  return (
    <section id="projects" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14"
        >
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <h2 className="mb-3 text-3xl font-heading font-bold text-text-primary sm:text-4xl md:text-5xl">
                Featured <span className="text-accent">Projects</span>
              </h2>
              <p className="max-w-md text-text-muted font-body">
                A selection of projects that showcase my problem-solving and development skills.
              </p>
            </div>

            {/* Desktop Arrows */}
            <div className="mt-6 hidden gap-3 sm:mt-0 sm:flex">
              <button
                onClick={prev}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-primary transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous project"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={!canScrollRight}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-primary transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Next project"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent-cyan sm:mt-4" />
        </motion.div>
      </div>

      {/* ─── Carousel Container ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </motion.div>

      {/* ─── Dot Indicators ─── */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-8 bg-accent"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Mobile Arrows */}
      <div className="mt-6 flex justify-center gap-3 sm:hidden">
        <button
          onClick={prev}
          disabled={!canScrollLeft}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-primary transition-all duration-300 hover:border-accent/30 disabled:opacity-30"
          aria-label="Previous project"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={next}
          disabled={!canScrollRight}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-primary transition-all duration-300 hover:border-accent/30 disabled:opacity-30"
          aria-label="Next project"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Project Card Component
   ═══════════════════════════════════════════════ */

function ProjectCard({
  project,
  index,
  isActive,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
}) {
  return (
    <motion.div
      className={`group relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border transition-all duration-500 sm:w-[70vw] lg:w-[65vw] ${
        isActive
          ? "border-accent/20 shadow-[0_0_40px_rgba(124,58,237,0.1)]"
          : "border-white/[0.06]"
      }`}
      style={{ minHeight: "420px" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* ─── Gradient Visual Area ─── */}
      <div
        className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} sm:h-60`}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {project.isPlaceholder ? (
          <div className="relative flex flex-col items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock size={40} className="text-white/30" />
            </motion.div>
            <div
              className="h-3 w-32 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
              }}
            />
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-2 px-6 text-center">
            <span className="text-4xl font-heading font-bold text-white/20 sm:text-5xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-body text-white/30">
              Project Preview
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {!project.isPlaceholder && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-heading font-semibold text-white transition-all duration-300 hover:bg-accent-light"
              >
                View Project
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Card Content ─── */}
      <div className="flex flex-1 flex-col justify-between bg-bg-secondary/80 p-6 backdrop-blur-sm">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3
              className={`text-xl font-heading font-bold sm:text-2xl ${
                project.isPlaceholder ? "text-text-muted" : "text-text-primary"
              }`}
            >
              {project.title}
            </h3>
            {!project.isPlaceholder && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-text-muted transition-colors duration-200 hover:text-text-primary"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon size={20} />
              </a>
            )}
          </div>

          <p className="mb-5 text-sm leading-relaxed text-text-muted font-body">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-xs font-body font-medium ${
                project.isPlaceholder
                  ? "border border-white/[0.06] text-text-dim"
                  : "border border-accent/20 bg-accent/5 text-accent-light"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
