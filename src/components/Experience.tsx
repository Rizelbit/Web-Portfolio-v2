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
    role: "Computational Thinking Course Assistant",
    company: "Comlabs-USDI ITB",
    year: "2025",
    description:
      "Engineered and optimized high-performance, responsive web interfaces for the ARKAVIDIA official website using Next.js and Tailwind CSS, translating complex Figma designs into scalable, SEO-friendly implementations.",
    type: "contract" as const,
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "ARKAVIDIA",
    year: "2025",
    description:
      "Guided over 100 students through algorithmic problem-solving while evaluating submissions, providing technical feedback, and supporting hands-on learning in computational thinking.",
    type: "contract" as const,
  },
  {
    id: 3,
    role: "Head of Performance",
    company: "Wispril HMIF ITB 2026",
    year: "2026",
    description:
      "Led the creative direction of HMIF ITB’s graduation performance by developing concepts, music, and choreography for a large-scale stage production.",
    type: "contract" as const,
  },
];

const badgeLabels: Record<string, string> = {
  contract: "Contract",
  internship: "Internship",
  current: "Current",
};

/* ═══════════════════════════════════════════════
   Experience Section — 3-Column Horizontal Timeline
   ═══════════════════════════════════════════════ */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineGlowRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Respect reduced motion */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const allEls = section.querySelectorAll(
        ".experience-heading, .experience-dot, .experience-left, .experience-right, .experience-line, .experience-line-glow"
      );
      gsap.set(allEls, { opacity: 1, y: 0, x: 0, scale: 1, scaleY: 1 });
      return;
    }

    /* ═══ GSAP Context ═══ */
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

      /* ─── Line glow highlight ─── */
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

      /* ─── Left, Right columns + Dots ─── */
      leftRefs.current.forEach((left, i) => {
        if (!left) return;
        const right = rightRefs.current[i];
        const dot = dotRefs.current[i];
        const segment = segmentRefs.current[i];

        /* Left column — slides in from the left */
        gsap.set(left, { opacity: 0, x: -60 });
        gsap.to(left, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: segment,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        /* Right column — slides in from the right */
        if (right) {
          gsap.set(right, { opacity: 0, x: 60 });
          gsap.to(right, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: segment,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }

        /* Dot — scale pop-in */
        if (dot) {
          gsap.set(dot, { opacity: 0, scale: 0 });
          gsap.to(dot, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: segment,
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

      {/* 3-column timeline */}
      <div className="experience-timeline">
        {/* Continuous vertical line in the center */}
        <div ref={lineRef} className="experience-line" aria-hidden="true" />
        <div
          ref={lineGlowRef}
          className="experience-line-glow"
          aria-hidden="true"
        />

        {/* Segments */}
        {experiences.map((exp, i) => {
          const isNow = exp.year === "NOW";

          return (
            <div
              key={exp.id}
              ref={(el) => { segmentRefs.current[i] = el; }}
              className="experience-segment"
            >
              {/* Left column — Role + Company + Year + Badge */}
              <div
                ref={(el) => { leftRefs.current[i] = el; }}
                className="experience-left"
              >
                <h3 className="experience-role">{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <span
                  className={`experience-year ${isNow ? "experience-year-now" : ""}`}
                >
                  {exp.year}
                </span>
                <span
                  className={`experience-badge ${
                    exp.type === "contract" ? "experience-badge-current" : ""
                  }`}
                >
                  {badgeLabels[exp.type]}
                </span>
              </div>

              {/* Center column — Dot (line is absolute behind) */}
              <div className="experience-center">
                <div
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className={`experience-dot ${isNow ? "experience-dot-now" : ""}`}
                />
              </div>

              {/* Right column — Description only */}
              <div
                ref={(el) => { rightRefs.current[i] = el; }}
                className="experience-right"
              >
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
