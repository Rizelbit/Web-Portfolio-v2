"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════
   Register GSAP ScrollTrigger plugin (once)
   ═══════════════════════════════════════════════ */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════
   Inline Project Data
   ═══════════════════════════════════════════════ */
const projects = [
  {
    id: 1,
    title: "DOM Tree Visualizer",
    description:
      "A React + Go web app for DOM tree traversal using BFS and DFS with CSS selector matching.",
    tags: ["Go", "Typescript", "Docker", "Azure"],
    github: "https://github.com/Rizelbit/Tubes2_BOELANGOSONK-V2",
    image: "/images/projects/DOM Tree Visualizer.png",
  },
  {
    id: 2,
    title: "tapOS",
    description:
      "tapOS is a 32-bit x86 operating system built from scratch, combining a robust kernel with multitasking, virtual memory, EXT2 filesystem, and an interactive shell for a complete low-level computing experience.",
    tags: ["C", "Assembly", "Kernel", "EXT2"],
    github: "https://github.com/Rizelbit/TugasBesar-os-tapOS",
    image: "/images/projects/tapOS.jpeg",
  },
  {
    id: 3,
    title: "Nimonspoli",
    description:
      "Nimonspoli is a Monopoly-inspired turn-based board game developed in C++, combining OOP design, layered architecture, and strategic gameplay elements like Skill Cards and a dynamic board.",
    tags: ["C++", "Raylib", "OOP"],
    github: "https://github.com/Rizelbit/tugas-besar-1-pop",
    image: "/images/projects/Nimonspoli.jpeg",
  },
];

/* ═══════════════════════════════════════════════
   GitHub Icon (inline SVG)
   ═══════════════════════════════════════════════ */
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Desktop breakpoint
   ═══════════════════════════════════════════════ */
const DESKTOP_BP = 1024;

/* ═══════════════════════════════════════════════
   Projects Component
   ═══════════════════════════════════════════════ */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  /* ─── Desktop: GSAP Pinned Horizontal Scroll ─── */
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    /* Check prefers-reduced-motion */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktop = window.innerWidth >= DESKTOP_BP;
    setIsDesktop(desktop);

    if (!desktop || prefersReducedMotion) return;

    /* Create GSAP context for cleanup */
    const ctx = gsap.context(() => {
      let maxScroll = track.scrollWidth - section.clientWidth;

      /* Quick setter for performant x-translation */
      const setX = gsap.quickSetter(track, "x", "px");

      const st = ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: true,
        anticipatePin: 0.5,
        start: "top top",
        end: () => `+=${maxScroll}`,
        onUpdate: (self) => {
          const x = -self.progress * maxScroll;
          setX(x);

          /* Calculate active project index (intro panel = index -1, skip it) */
          const cardWidth = track.children[1]
            ? (track.children[1] as HTMLElement).offsetWidth
            : 0;
          const gap = 48; // gap-12
          const introWidth = (track.children[0] as HTMLElement).offsetWidth;
          const scrolled = self.progress * maxScroll;
          const afterIntro = scrolled - introWidth - gap;

          if (afterIntro < 0) {
            setActiveIndex(0);
          } else {
            const idx = Math.round(afterIntro / (cardWidth + gap));
            setActiveIndex(Math.min(idx, projects.length - 1));
          }
        },
        invalidateOnRefresh: true,
      });

      /* ResizeObserver + debounced recalculation */
      let resizeTimer: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const nowDesktop = window.innerWidth >= DESKTOP_BP;
          setIsDesktop(nowDesktop);

          if (!nowDesktop) {
            st.kill();
            gsap.set(track, { x: 0 });
            return;
          }

          maxScroll = track.scrollWidth - section.clientWidth;
          st.vars.end = `+=${maxScroll}`;
          ScrollTrigger.refresh();
        }, 150);
      });

      ro.observe(section);
      ro.observe(track);

      /* Lenis compatibility — scrollerProxy */
      // The SmoothScrollProvider uses Lenis which manages its own RAF.
      // ScrollTrigger works with Lenis out of the box when using
      // the default scroller (document), so no explicit scrollerProxy
      // is needed unless a custom scroll container is specified.

      return () => {
        clearTimeout(resizeTimer);
        ro.disconnect();
        st.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ─── Mobile: native scroll indicator update ─── */
  const handleMobileScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const cardWidth = el.children[0]
        ? (el.children[0] as HTMLElement).offsetWidth
        : 0;
      const gap = 16;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, projects.length - 1));
    },
    []
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative"
    >
      {/* ─── Desktop Layout: Pinned Horizontal Scroll ─── */}
      <div className="projects-desktop">
        <div ref={trackRef} className="projects-track">
          {/* Intro Panel */}
          <div className="projects-intro">
            <div className="projects-intro-inner">
              <span className="projects-intro-label">PORTFOLIO</span>
              <h2 className="projects-intro-heading">
                Featured{" "}
                <span className="text-gradient">Projects</span>
              </h2>
              <p className="projects-intro-subtitle">
                A curated selection of projects that showcase my problem-solving
                approach and development craft.
              </p>
              <div className="projects-intro-divider" />
            </div>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}

          {/* Trailing Spacer */}
          <div className="projects-spacer" />
        </div>

        {/* Dot Indicators — Desktop (fixed at bottom center of pinned section) */}
        <div className="projects-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`projects-dot ${activeIndex === i ? "active" : ""}`}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ─── Mobile Layout: Native Snap Scroll ─── */}
      <div className="projects-mobile">
        {/* Mobile Header */}
        <div className="projects-mobile-header">
          <span className="projects-intro-label">PORTFOLIO</span>
          <h2 className="projects-intro-heading" style={{ fontSize: "2rem" }}>
            Featured{" "}
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="projects-intro-subtitle">
            A curated selection of projects that showcase my problem-solving
            approach and development craft.
          </p>
          <div className="projects-intro-divider" />
        </div>

        {/* Mobile Scroll Container */}
        <div className="projects-mobile-scroll" onScroll={handleMobileScroll}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              mobile
            />
          ))}
        </div>

        {/* Dot Indicators — Mobile */}
        <div className="projects-dots mobile-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`projects-dot ${activeIndex === i ? "active" : ""}`}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>
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
  mobile = false,
}: {
  project: (typeof projects)[0];
  index: number;
  mobile?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`project-card ${mobile ? "project-card--mobile" : ""}`}
      style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0a0a0a 100%)' }}
    >
      {/* Background image */}
      <img
        src={project.image}
        alt={project.title}
        className="project-card-image"
      />

      {/* Decorative grid overlay */}
      <div className="project-card-grid" />

      {/* Number badge — top right, faded */}
      <span className="project-card-number">{number}</span>

      {/* Tech tags — top left */}
      <div className="project-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-card-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom content */}
      <div className="project-card-bottom">
        <div>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.description}</p>
        </div>

        {/* GitHub icon — bottom right */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-github"
          aria-label={`View ${project.title} on GitHub`}
        >
          <GithubIcon size={20} />
        </a>
      </div>
    </div>
  );
}
