"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ParticleCanvas from "./ui/ParticleCanvas";

const PHRASES = [
  "Half imagination, half precision.",
  "Software Engineer · Data Scientist · Problem Solver",
  "I turn ideas into interactive experiences.",
];

const TYPE_SPEED = 50;
const DELETE_SPEED = 30;
const HOLD_DURATION = 2500;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);



  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typewriterStarted, setTypewriterStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReduced);

    if (prefersReduced) {
      const t = setTimeout(() => setDisplayText(PHRASES[0]), 0);
      const finalEls = section.querySelectorAll(
        ".hero-greeting, .hero-name, .hero-name-word, .hero-tagline, .hero-badge, .hero-buttons, .hero-scroll-indicator"
      );
      gsap.set(finalEls, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0% 0 0)",
        filter: "blur(0px)",
      });
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
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

      // Name word-by-word clip-path reveal (0.3s)
      const words = nameRef.current?.querySelectorAll(".hero-name-word");
      if (words?.length) {
        gsap.set(words, { y: 60, clipPath: "inset(0 100% 0 0)" });
        gsap.to(words, {
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          stagger: 0.15,
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
          y: 10,
          duration: 0.7,
          delay: 1.6,
          ease: "power3.out",
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

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



  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ParticleCanvas background */}
      <ParticleCanvas />

      {/* Grain overlay */}
      <div className="hero-grain" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="hero-name-group">
          {/* Greeting */}
          <span ref={greetingRef} className="hero-greeting">
            Hi, I&apos;m
          </span>

          {/* Name — word-by-word clip reveal */}
          <h1
            ref={nameRef}
            className="hero-name"
            aria-label="Reinhard Alfonzo"
          >
            <span className="hero-name-mask">
              <span className="hero-name-word">Reinhard</span>
            </span>
            <span className="hero-name-space"> </span>
            <span className="hero-name-mask">
              <span className="hero-name-word hero-name-word--accent">
                Alfonzo
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-center-stack">
          {/* Tagline — typewriter */}
          <div ref={taglineRef} className="hero-tagline" aria-live="polite">
            <span className="hero-tagline-text">{displayText}</span>
            <span className="hero-tagline-cursor" aria-hidden="true">
              |
            </span>
          </div>

          {/* Status badge */}
          <div ref={badgeRef} className="hero-badge">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-body text-text-muted sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Available for Work
            </span>
          </div>

          {/* CTA buttons */}
          <div
            ref={buttonsRef}
            className="hero-buttons flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="hero-btn hero-btn--primary"
            >
              <span className="relative z-10">View My Work →</span>
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="hero-btn hero-btn--secondary"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Text-only scroll indicator */}
      <button
        ref={scrollIndicatorRef}
        onClick={() => scrollTo("#about")}
        className="hero-scroll-indicator"
        aria-label="Scroll down"
      >
        <span className="hero-scroll-text-label">SCROLL DOWN</span>
      </button>
    </section>
  );
}
