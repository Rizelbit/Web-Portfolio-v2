"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

/* ─── Magnetic Button Hook ─── */
function useMagneticHover() {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

/* ─── Animated Word Component ─── */
function AnimatedWord({
  word,
  className,
  delay = 0,
}: {
  word: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
          delay,
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const primaryBtn = useMagneticHover();
  const secondaryBtn = useMagneticHover();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ─── Aurora Animated Background ─── */}
      <div className="aurora-bg absolute inset-0" />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-accent-cyan/[0.05] blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light/[0.04] blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Content ─── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Role badge */}
        <motion.div variants={fadeInUp} className="mb-6 inline-block">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-body text-text-muted sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            Informatics Engineering @ ITB
          </span>
        </motion.div>

        {/* Name — staggered word reveal */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:gap-x-6">
          <AnimatedWord
            word="Reinhard"
            className="text-5xl font-heading font-bold tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl"
            delay={2.0}
          />
          <AnimatedWord
            word="Alfonzo"
            className="text-5xl font-heading font-bold tracking-tight text-accent sm:text-6xl md:text-7xl lg:text-8xl"
            delay={2.15}
          />
        </div>

        {/* Tagline */}
        <motion.p
          className="mx-auto mb-10 max-w-xl text-base font-body leading-relaxed text-text-muted sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Got an idea? Let&apos;s turn it into something worth scrolling for.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary CTA */}
          <button
            ref={primaryBtn.ref}
            onMouseMove={primaryBtn.onMouseMove}
            onMouseLeave={primaryBtn.onMouseLeave}
            onClick={() => scrollTo("#projects")}
            className="group relative cursor-pointer overflow-hidden rounded-full bg-accent px-8 py-3 text-sm font-heading font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </button>

          {/* Secondary CTA */}
          <button
            ref={secondaryBtn.ref}
            onMouseMove={secondaryBtn.onMouseMove}
            onMouseLeave={secondaryBtn.onMouseLeave}
            onClick={() => scrollTo("#contact")}
            className="cursor-pointer rounded-full border border-white/10 bg-white/[0.03] px-8 py-3 text-sm font-heading font-semibold text-text-primary backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* ─── Floating decorative elements ─── */}
        <motion.div
          className="absolute -right-8 top-1/4 hidden lg:block"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass h-20 w-20 rounded-2xl rotate-12 opacity-40" />
        </motion.div>
        <motion.div
          className="absolute -left-4 bottom-1/3 hidden lg:block"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="h-14 w-14 rounded-full border border-accent/20 opacity-30" />
        </motion.div>
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        onClick={() => scrollTo("#about")}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="opacity-50" />
        </motion.div>
      </motion.button>
    </section>
  );
}
