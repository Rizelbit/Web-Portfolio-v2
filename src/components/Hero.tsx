"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

/* ═══════════════════════════════════════════════
   Tagline phrases for the typewriter cycle
   ═══════════════════════════════════════════════ */
const PHRASES = [
  "Half imagination, half precision.",
  "Software Engineer · Data Scientist · Problem Solver",
  "I turn ideas into interactive experiences.",
];

const TYPE_SPEED = 50;
const DELETE_SPEED = 30;
const HOLD_DURATION = 2500;

/* ═══════════════════════════════════════════════
   Split a string into per-character spans (preserves spaces).
   Each <span> has a wrapping mask so chars can rise from below.
   ═══════════════════════════════════════════════ */
function SplitChars({
  text,
  className = "",
  charClass = "",
}: {
  text: string;
  className?: string;
  charClass?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="hero-char-mask" aria-hidden="true">
          <span className={`hero-char ${charClass}`}>
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  /* ─── Refs ─── */
  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const scrollRotorRef = useRef<SVGGElement>(null);

  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);

  /* ─── Typewriter state ─── */
  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typewriterStarted, setTypewriterStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ─── Smooth scroll util ─── */
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ═══════════════════════════════════════════════
     GSAP load animations + aurora orbits
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReduced);

    if (prefersReduced) {
      // Show final state immediately, prefill typewriter with first phrase.
      // setTimeout(0) defers setState past the effect body to satisfy
      // react-hooks/set-state-in-effect.
      const t = setTimeout(() => setDisplayText(PHRASES[0]), 0);
      const finalEls = section.querySelectorAll(
        ".hero-greeting, .hero-name, .hero-tagline, .hero-badge, .hero-buttons, .hero-scroll-indicator, .hero-char"
      );
      gsap.set(finalEls, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      /* ─── Aurora orbs — independent infinite drifts ─── */
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 140,
          y: 90,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -160,
          y: -110,
          duration: 32,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          scale: 1.25,
          x: 60,
          y: -40,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /* ─── Load sequence ─── */
      // Greeting (0s)
      if (greetingRef.current) {
        gsap.from(greetingRef.current, {
          y: 20,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Name characters (0.3s)
      const chars = nameRef.current?.querySelectorAll(".hero-char");
      if (chars && chars.length) {
        gsap.set(nameRef.current, { perspective: 800 });
        gsap.from(chars, {
          y: 80,
          opacity: 0,
          rotateX: 90,
          stagger: 0.04,
          duration: 0.9,
          delay: 0.3,
          ease: "power4.out",
        });
      }

      // Tagline (0.9s)
      if (taglineRef.current) {
        gsap.from(taglineRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          delay: 0.9,
          ease: "power3.out",
          onComplete: () => setTypewriterStarted(true),
        });
      }

      // Badge (1.1s)
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          delay: 1.1,
          ease: "power3.out",
        });
      }

      // Buttons (1.3s)
      if (buttonsRef.current) {
        gsap.from(buttonsRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          delay: 1.3,
          ease: "power3.out",
        });
      }

      // Scroll indicator (1.6s)
      if (scrollIndicatorRef.current) {
        gsap.from(scrollIndicatorRef.current, {
          opacity: 0,
          scale: 0.7,
          duration: 0.7,
          delay: 1.6,
          ease: "back.out(1.6)",
        });
      }

      // Continuous rotation on the SVG text rotor
      if (scrollRotorRef.current) {
        gsap.to(scrollRotorRef.current, {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* ═══════════════════════════════════════════════
     Typewriter tick — every transition runs via setTimeout
     so no setState is invoked synchronously in the effect body.
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (!typewriterStarted || reducedMotion) return;

    const phrase = PHRASES[phraseIdx];
    let timeoutMs: number;
    let action: () => void;

    if (!isDeleting && displayText === phrase) {
      timeoutMs = HOLD_DURATION;
      action = () => setIsDeleting(true);
    } else if (isDeleting && displayText === "") {
      timeoutMs = 0;
      action = () => {
        setIsDeleting(false);
        setPhraseIdx((p) => (p + 1) % PHRASES.length);
      };
    } else {
      timeoutMs = isDeleting ? DELETE_SPEED : TYPE_SPEED;
      action = () =>
        setDisplayText((current) =>
          isDeleting
            ? phrase.substring(0, current.length - 1)
            : phrase.substring(0, current.length + 1)
        );
    }

    const t = setTimeout(action, timeoutMs);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, phraseIdx, typewriterStarted, reducedMotion]);

  /* ═══════════════════════════════════════════════
     Magnetic buttons — global mousemove, 80px radius
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const noHover = window.matchMedia("(hover: none)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (noHover || prefersReduced) return;

    const RADIUS = 80;
    const STRENGTH = 0.35;
    const targets: Array<{ el: HTMLButtonElement; active: boolean }> = [];
    if (primaryBtnRef.current)
      targets.push({ el: primaryBtnRef.current, active: false });
    if (secondaryBtnRef.current)
      targets.push({ el: secondaryBtnRef.current, active: false });

    const handleMove = (e: MouseEvent) => {
      targets.forEach((t) => {
        const rect = t.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS) {
          t.active = true;
          gsap.to(t.el, {
            x: dx * STRENGTH,
            y: dy * STRENGTH,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else if (t.active) {
          t.active = false;
          gsap.to(t.el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ═══════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════ */
  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ─── Aurora orbs ─── */}
      <div className="hero-aurora" aria-hidden="true">
        <div ref={orb1Ref} className="hero-orb hero-orb--1" />
        <div ref={orb2Ref} className="hero-orb hero-orb--2" />
        <div ref={orb3Ref} className="hero-orb hero-orb--3" />
      </div>

      {/* ─── Grain overlay ─── */}
      <div className="hero-grain" aria-hidden="true" />

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        {/* Greeting */}
        <span ref={greetingRef} className="hero-greeting">
          Hi, I&apos;m
        </span>

        {/* Name — split chars */}
        <h1 ref={nameRef} className="hero-name" aria-label="Reinhard Alfonzo">
          <SplitChars text="Reinhard" />
          <span className="hero-name-space" aria-hidden="true">
            {" "}
          </span>
          <SplitChars text="Alfonzo" charClass="hero-char--accent" />
        </h1>

        {/* Tagline — typewriter */}
        <div ref={taglineRef} className="hero-tagline" aria-live="polite">
          <span className="hero-tagline-text">{displayText}</span>
          <span className="hero-tagline-cursor" aria-hidden="true">
            |
          </span>
        </div>

        {/* Role badge */}
        <div ref={badgeRef} className="hero-badge">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-body text-text-muted sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            Informatics Engineering @ ITB
          </span>
        </div>

        {/* CTA buttons */}
        <div
          ref={buttonsRef}
          className="hero-buttons flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            ref={primaryBtnRef}
            onClick={() => scrollTo("#projects")}
            className="hero-btn hero-btn--primary"
          >
            <span className="relative z-10">View My Work</span>
          </button>
          <button
            ref={secondaryBtnRef}
            onClick={() => scrollTo("#contact")}
            className="hero-btn hero-btn--secondary"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* ─── Rotating circular scroll indicator ─── */}
      <button
        ref={scrollIndicatorRef}
        onClick={() => scrollTo("#about")}
        className="hero-scroll-indicator"
        aria-label="Scroll down"
      >
        <svg viewBox="0 0 100 100" className="hero-scroll-svg">
          <defs>
            <path
              id="hero-scroll-circle"
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="none"
            />
          </defs>
          <g ref={scrollRotorRef} className="hero-scroll-rotor">
            <text className="hero-scroll-text">
              <textPath href="#hero-scroll-circle" startOffset="0">
                SCROLL DOWN · SCROLL DOWN · SCROLL DOWN ·
              </textPath>
            </text>
          </g>
        </svg>
        <ArrowDown size={18} className="hero-scroll-arrow" />
      </button>
    </section>
  );
}
