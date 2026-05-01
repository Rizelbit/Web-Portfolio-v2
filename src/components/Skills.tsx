"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { skills } from "@/lib/data";
import { fadeInUp, viewportOnce } from "@/lib/animations";

/* Split skills into two rows for opposite-direction marquees */
const midpoint = Math.ceil(skills.length / 2);
const row1 = skills.slice(0, midpoint);
const row2 = skills.slice(midpoint);

function SkillPill({
  name,
  color,
  icon: Icon,
}: {
  name: string;
  color: string;
  icon: IconType;
}) {
  return (
    <div className="glass group mx-2 flex shrink-0 cursor-pointer items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300 hover:scale-105 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-lg">
      <Icon size={20} style={{ color }} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
      <span className="whitespace-nowrap text-sm font-body font-medium text-text-primary">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof skills;
  reverse?: boolean;
}) {
  return (
    <div
      className="group flex overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`flex shrink-0 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={{ width: "max-content" }}
      >
        {/* 4 copies — translateX(-50%) loops through 2, ensuring no gap at any viewport */}
        {(["a", "b", "c", "d"] as const).flatMap((key) =>
          items.map((skill, i) => <SkillPill key={`${key}-${i}`} {...skill} />)
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 text-3xl font-heading font-bold text-text-primary sm:text-4xl md:text-5xl">
            Skills & <span className="text-accent-cyan">Tools</span>
          </h2>
          <p className="mx-auto max-w-md text-text-muted font-body">
            Technologies I work with — constantly learning, always building.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-cyan to-accent" />
        </motion.div>
      </div>

      {/* Full-width marquee (no max-width constraint) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8 }}
        className="space-y-3"
      >
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </motion.div>
    </section>
  );
}
