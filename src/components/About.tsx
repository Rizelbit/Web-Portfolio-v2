"use client";

import { useRef, useEffect, useState } from "react";
import { Download, ArrowDown } from "lucide-react";
import ProfileCard from "./ProfileCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════
   Register GSAP ScrollTrigger plugin (once)
   ═══════════════════════════════════════════════ */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════
   SplitWords — wraps each word in a span for animation
   ═══════════════════════════════════════════════ */
function SplitWords({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <>
      {children.split(" ").map((word, i) => (
        <span
          key={i}
          className={`about-word ${className}`}
          style={{ display: "inline-block" }}
        >
          {word}&nbsp;
        </span>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════
   About Section — Cinematic Pinned Scroll Sequence
   ═══════════════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    if (!section || !pinned) return;

    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    /* Respect reduced motion */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      /* Show all scenes in their final state */
      const allEls = section.querySelectorAll(
        ".about-word, .about-scene-line, .about-stat, .about-cv-pill, .about-scroll-nudge, .about-portrait-card"
      );
      gsap.set(allEls, { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" });

      /* On reduced motion: show only scene 4 (final) */
      if (!mobile) {
        gsap.set([scene1Ref.current, scene2Ref.current, scene3Ref.current], {
          opacity: 0,
          display: "none",
        });
        gsap.set(scene4Ref.current, { opacity: 1 });
      }
      return;
    }

    if (mobile) {
      /* ─── MOBILE: Simple scroll-triggered reveals ─── */
      const ctx = gsap.context(() => {
        /* Scene 1 words */
        const s1Words = scene1Ref.current?.querySelectorAll(".about-word");
        if (s1Words?.length) {
          gsap.set(s1Words, { opacity: 0, y: 30, filter: "blur(4px)" });
          gsap.to(s1Words, {
            opacity: 1, y: 0, filter: "blur(0px)",
            stagger: 0.08, duration: 0.6, ease: "power3.out",
            scrollTrigger: {
              trigger: scene1Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        /* Scene 2 lines */
        const s2Lines = scene2Ref.current?.querySelectorAll(".about-scene-line");
        if (s2Lines?.length) {
          gsap.set(s2Lines, { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40), y: 20 });
          gsap.to(s2Lines, {
            opacity: 1, x: 0, y: 0,
            stagger: 0.15, duration: 0.7, ease: "power3.out",
            scrollTrigger: {
              trigger: scene2Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        /* Scene 3 lines */
        const s3Lines = scene3Ref.current?.querySelectorAll(".about-scene-line");
        if (s3Lines?.length) {
          gsap.set(s3Lines, { opacity: 0, y: 30 });
          gsap.to(s3Lines, {
            opacity: 1, y: 0,
            stagger: 0.12, duration: 0.6, ease: "power3.out",
            scrollTrigger: {
              trigger: scene3Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        /* Scene 4 elements */
        const s4Words = scene4Ref.current?.querySelectorAll(".about-word");
        const s4Stats = scene4Ref.current?.querySelectorAll(".about-stat");
        const s4Cv = scene4Ref.current?.querySelector(".about-cv-pill");
        const s4Nudge = scene4Ref.current?.querySelector(".about-scroll-nudge");
        const s4Portrait = scene4Ref.current?.querySelector(".about-portrait-card");

        if (s4Words?.length) {
          gsap.set(s4Words, { opacity: 0, y: 30 });
          gsap.to(s4Words, {
            opacity: 1, y: 0,
            stagger: 0.05, duration: 0.6, ease: "power3.out",
            scrollTrigger: {
              trigger: scene4Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        [s4Stats, [s4Cv], [s4Nudge], [s4Portrait]].forEach((els) => {
          const filtered = Array.from(els || []).filter(Boolean);
          if (filtered.length) {
            gsap.set(filtered, { opacity: 0, y: 30 });
            gsap.to(filtered, {
              opacity: 1, y: 0,
              stagger: 0.1, duration: 0.6, ease: "power3.out",
              scrollTrigger: {
                trigger: scene4Ref.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      }, section);

      return () => ctx.revert();
    }

    /* ═══════════════════════════════════════════════
       DESKTOP: Pinned Cinematic Scroll Sequence
       ═══════════════════════════════════════════════ */
    const ctx = gsap.context(() => {
      /* All 4 scenes overlaid — start with scene 1 visible */
      gsap.set(scene1Ref.current, { opacity: 1 });
      gsap.set(scene2Ref.current, { opacity: 0 });
      gsap.set(scene3Ref.current, { opacity: 0 });
      gsap.set(scene4Ref.current, { opacity: 0 });

      /* Scene 1: Set initial word states */
      const s1Words = scene1Ref.current?.querySelectorAll(".about-word");
      if (s1Words?.length) {
        gsap.set(s1Words, { opacity: 0, y: 60, filter: "blur(6px)" });
      }

      /* Scene 2: Set initial line states */
      const s2Lines = scene2Ref.current?.querySelectorAll(".about-scene-line");
      if (s2Lines?.length) {
        gsap.set(s2Lines, { opacity: 0, x: (i) => (i % 2 === 0 ? -80 : 80), y: 20 });
      }
      const s2Accents = scene2Ref.current?.querySelectorAll(".about-accent");
      if (s2Accents?.length) {
        gsap.set(s2Accents, { color: "#F8FAFC" });
      }

      /* Scene 3: Set initial states */
      const s3Lines = scene3Ref.current?.querySelectorAll(".about-scene-line");
      const s3Bg = scene3Ref.current?.querySelector(".about-bg-text");
      if (s3Lines?.length) {
        gsap.set(s3Lines, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
      }
      if (s3Bg) {
        gsap.set(s3Bg, { opacity: 0, y: 100 });
      }

      /* Scene 4: Set initial states */
      const s4Words = scene4Ref.current?.querySelectorAll(".about-word");
      const s4Stats = scene4Ref.current?.querySelectorAll(".about-stat");
      const s4Cv = scene4Ref.current?.querySelector(".about-cv-pill");
      const s4Nudge = scene4Ref.current?.querySelector(".about-scroll-nudge");
      const s4Portrait = scene4Ref.current?.querySelector(".about-portrait-card");

      if (s4Words?.length) gsap.set(s4Words, { opacity: 0, y: 40 });
      if (s4Stats?.length) gsap.set(s4Stats, { opacity: 0, y: 20, x: -20 });
      if (s4Cv) gsap.set(s4Cv, { opacity: 0, scale: 0.9 });
      if (s4Nudge) gsap.set(s4Nudge, { opacity: 0, y: 20 });
      if (s4Portrait) gsap.set(s4Portrait, { opacity: 0, x: 120, scale: 0.85 });

      /* ─── Master timeline spanning the full pin ─── */
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pinned,
          scrub: 1,
          start: "top top",
          end: "+=4500",
          anticipatePin: 0.5,
        },
      });

      /* ═══ SCENE 1: "I build things that matter" ═══ */
      /* Words reveal (0 → 0.15) */
      if (s1Words?.length) {
        masterTl.to(
          s1Words,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.02,
            duration: 0.15,
            ease: "power3.out",
          },
          0
        );
      }
      /* Hold scene 1 (0.15 → 0.22) then exit */
      masterTl.to(
        scene1Ref.current,
        {
          scale: 0.85,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.08,
          ease: "power2.in",
        },
        0.22
      );

      /* ═══ SCENE 2: "Full-stack engineering..." ═══ */
      /* Fade in scene 2 container */
      masterTl.to(
        scene2Ref.current,
        { opacity: 1, duration: 0.04 },
        0.25
      );
      /* Lines enter with stagger */
      if (s2Lines?.length) {
        masterTl.to(
          s2Lines,
          {
            opacity: 1,
            x: 0,
            y: 0,
            stagger: 0.03,
            duration: 0.12,
            ease: "power3.out",
          },
          0.27
        );
      }
      /* Accent color flash */
      if (s2Accents?.length) {
        masterTl.to(
          s2Accents,
          {
            color: "#7C3AED",
            stagger: 0.03,
            duration: 0.06,
            ease: "power2.out",
          },
          0.32
        );
      }
      /* Hold then exit */
      masterTl.to(
        scene2Ref.current,
        {
          opacity: 0,
          y: -60,
          duration: 0.08,
          ease: "power2.in",
        },
        0.47
      );

      /* ═══ SCENE 3: "Informatics Engineering..." ═══ */
      masterTl.to(
        scene3Ref.current,
        { opacity: 1, duration: 0.04 },
        0.50
      );
      /* Clip-path reveal lines */
      if (s3Lines?.length) {
        masterTl.to(
          s3Lines,
          {
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            stagger: 0.03,
            duration: 0.12,
            ease: "power3.out",
          },
          0.52
        );
      }
      /* Parallax background text */
      if (s3Bg) {
        masterTl.to(
          s3Bg,
          { opacity: 0.04, y: -40, duration: 0.25, ease: "none" },
          0.50
        );
      }
      /* Hold then exit */
      masterTl.to(
        scene3Ref.current,
        {
          opacity: 0,
          scale: 1.05,
          filter: "blur(6px)",
          duration: 0.08,
          ease: "power2.in",
        },
        0.72
      );

      /* ═══ SCENE 4: Final Landing Layout ═══ */
      masterTl.to(
        scene4Ref.current,
        { opacity: 1, duration: 0.06 },
        0.75
      );
      /* Editorial heading words */
      if (s4Words?.length) {
        masterTl.to(
          s4Words,
          {
            opacity: 1,
            y: 0,
            stagger: 0.015,
            duration: 0.12,
            ease: "power3.out",
          },
          0.77
        );
      }
      /* Stats stagger */
      if (s4Stats?.length) {
        masterTl.to(
          s4Stats,
          {
            opacity: 1,
            y: 0,
            x: 0,
            stagger: 0.02,
            duration: 0.08,
            ease: "power2.out",
          },
          0.82
        );
      }
      /* CV pill */
      if (s4Cv) {
        masterTl.to(
          s4Cv,
          {
            opacity: 1,
            scale: 1,
            duration: 0.08,
            ease: "back.out(1.7)",
          },
          0.86
        );
      }
      /* Scroll nudge */
      if (s4Nudge) {
        masterTl.to(
          s4Nudge,
          {
            opacity: 0.6,
            y: 0,
            duration: 0.06,
            ease: "power2.out",
          },
          0.90
        );
      }
      /* Portrait card — elastic spring in */
      if (s4Portrait) {
        masterTl.to(
          s4Portrait,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.18,
            ease: "elastic.out(1, 0.5)",
          },
          0.78
        );
      }


    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      {/* Grain texture overlay */}
      <div className="about-grain" aria-hidden="true" />

      <div ref={pinnedRef} className="about-pinned">
        {/* ═══ SCENE 1 — Who I Am ═══ */}
        <div ref={scene1Ref} className="about-scene about-scene-center">
          <div className="about-scene-content">
            <h2 className="about-s1-text">
              <span className="about-s1-line">
                <SplitWords>I build things</SplitWords>
              </span>
              <span className="about-s1-line about-s1-line-accent">
                <SplitWords>that matter.</SplitWords>
              </span>
            </h2>
          </div>
        </div>

        {/* ═══ SCENE 2 — What I Do ═══ */}
        <div ref={scene2Ref} className="about-scene about-scene-center">
          <div className="about-scene-content">
            <p className="about-scene-line about-s2-line">
              <span className="about-accent">Full-stack</span> engineering.
            </p>
            <p className="about-scene-line about-s2-line">
              <span className="about-accent">Data</span> science.
            </p>
            <p className="about-scene-line about-s2-line">
              Systems that <span className="about-accent">think.</span>
            </p>
          </div>
        </div>

        {/* ═══ SCENE 3 — Where I'm From ═══ */}
        <div ref={scene3Ref} className="about-scene about-scene-center">
          {/* Parallax background text */}
          <span className="about-bg-text" aria-hidden="true">
            ITB
          </span>
          <div className="about-scene-content">
            <p className="about-scene-line about-s3-line">
              Informatics Engineering
            </p>
            <p className="about-scene-line about-s3-line about-s3-institution">
              Institut Teknologi Bandung
            </p>
            <p className="about-scene-line about-s3-line about-s3-location">
              Bandung, Indonesia 🇮🇩
            </p>
          </div>
        </div>

        {/* ═══ SCENE 4 — Final Landing ═══ */}
        <div ref={scene4Ref} className="about-scene about-scene-final">
          {/* ─── Left Column (60%) ─── */}
          <div className="about-s4-left">
            {/* Editorial heading */}
            <h2 className="about-s4-heading">
              <span className="about-s4-heading-line">
                <SplitWords>Got an idea?</SplitWords>
              </span>
              <span className="about-s4-heading-line">
                <SplitWords>Let&apos;s build something</SplitWords>
              </span>
              <span className="about-s4-heading-line about-s4-heading-accent">
                <SplitWords>worth scrolling for.</SplitWords>
              </span>
            </h2>

            {/* Stats */}
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-number">5+</span>
                <span className="about-stat-label">Projects built</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">1</span>
                <span className="about-stat-label">Years of software development</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">1</span>
                <span className="about-stat-label">
                  Goal: Software that solves real problems
                </span>
              </div>
            </div>

            {/* CV Download Pill */}
            <a
              href="/cv.pdf"
              download
              className="about-cv-pill"
            >
              <div className="about-cv-pill-border" />
              <Download size={18} className="about-cv-icon" />
              <span className="about-cv-text">Download CV — PDF</span>
            </a>

            {/* Scroll nudge */}
            <a href="#skills" className="about-scroll-nudge">
              <span>See what I&apos;ve built</span>
              <ArrowDown size={17} />
            </a>
          </div>

          {/* ─── Right Column (45%) — ProfileCard ─── */}
          <div className="about-s4-right">
            <div className="about-portrait-card">
              <ProfileCard
                name=""
                title=""
                avatarUrl="/smilepixelated.png"
                enableTilt={true}
                enableMobileTilt={true}
                behindGlowColor="rgba(139, 92, 246, 0.6)"
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)"
                showUserInfo={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
