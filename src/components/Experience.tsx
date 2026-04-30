"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════
   Register GSAP ScrollTrigger plugin (once)
   ═══════════════════════════════════════════════ */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════
   Inline Experience Data
   ═══════════════════════════════════════════════ */
const experiences = [
  {
    id: 1,
    role: "Position In Company",
    company: "Company Name",
    year: "20XX",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim labore sit non ipsum temporibus quidem, deserunt eaque officiis mollitia ratione suscipit repellat.",
    type: "work" as const,
  },
  {
    id: 2,
    role: "Position In Company",
    company: "Company Name",
    year: "20XX",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim labore sit non ipsum temporibus quidem, deserunt eaque officiis mollitia ratione suscipit repellat.",
    type: "internship" as const,
  },
  {
    id: 3,
    role: "Position In Company",
    company: "Company Name",
    year: "NOW",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim labore sit non ipsum temporibus quidem, deserunt eaque officiis mollitia ratione suscipit repellat.",
    type: "current" as const,
  },
];

const badgeLabels: Record<string, string> = {
  work: "Work",
  internship: "Internship",
  current: "Current",
};

/* ═══════════════════════════════════════════════
   Experience Section — GSAP Vertical Timeline
   ═══════════════════════════════════════════════ */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineGlowRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Respect reduced motion */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      /* Show everything in final state */
      const allEls = section.querySelectorAll(
        ".experience-heading, .experience-dot, .experience-card, .experience-line, .experience-line-glow"
      );
      gsap.set(allEls, { opacity: 1, y: 0, x: 0, scale: 1, scaleY: 1 });
      return;
    }

    /* ═══ GSAP Context — same pattern as Projects.tsx ═══ */
    const ctx = gsap.context(() => {
      /* ─── Section heading ─── */
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 40 });
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      /* ─── Timeline line — scaleY from 0 → 1 ─── */
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0 });
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.8,
          },
        });
      }

      /* ─── Line glow highlight — follows scroll with slight delay ─── */
      if (lineGlowRef.current) {
        gsap.set(lineGlowRef.current, { scaleY: 0 });
        gsap.to(lineGlowRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 85%",
            scrub: 1.2,
          },
        });
      }

      /* ─── Cards + Dots — alternating left/right motion ─── */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dot = dotRefs.current[i];

        /* Alternate direction: even index → from left, odd → from right */
        const fromX = i % 2 === 0 ? -80 : 80;

        /* Card animation — alternating slide direction */
        gsap.set(card, { opacity: 0, x: fromX, y: 30 });
        gsap.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        /* Dot animation — scale pop-in synced with card */
        if (dot) {
          gsap.set(dot, { opacity: 0, scale: 0 });
          gsap.to(dot, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience-section">
      {/* Section heading */}
      <h2 ref={headingRef} className="experience-heading">
        My <span>Experience</span>
      </h2>

      {/* Timeline container */}
      <div className="experience-timeline">
        {/* Animated vertical line — sits BEHIND cards */}
        <div ref={lineRef} className="experience-line" aria-hidden="true" />
        {/* Glow highlight overlay on the line */}
        <div
          ref={lineGlowRef}
          className="experience-line-glow"
          aria-hidden="true"
        />

        {/* Segments: dot → connector → card */}
        {experiences.map((exp, i) => {
          const isNow = exp.year === "NOW";

          return (
            <div
              key={exp.id}
              ref={(el) => { segmentRefs.current[i] = el; }}
              className="experience-segment"
            >
              {/* Dot */}
              <div
                ref={(el) => { dotRefs.current[i] = el; }}
                className={`experience-dot ${isNow ? "experience-dot-now" : ""}`}
              />

              {/* Connector */}
              <div className="experience-connector" aria-hidden="true" />

              {/* Card */}
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                className="experience-card"
              >
                {/* Year badge — faded top-right */}
                <span
                  className={`experience-year ${isNow ? "experience-year-now" : ""}`}
                  aria-hidden="true"
                >
                  {exp.year}
                </span>

                {/* Content */}
                <h3 className="experience-role">{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-description">{exp.description}</p>

                {/* Type badge */}
                <span
                  className={`experience-badge ${
                    exp.type === "current" ? "experience-badge-current" : ""
                  }`}
                >
                  {badgeLabels[exp.type]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
