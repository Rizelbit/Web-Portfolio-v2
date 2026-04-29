"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { experiences } from "@/lib/data";
import {
  fadeInUp,
  timelineLeft,
  timelineRight,
  viewportOnce,
} from "@/lib/animations";

const typeIcons = {
  work: Briefcase,
  internship: GraduationCap,
  organization: Users,
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-heading font-bold text-text-primary sm:text-4xl md:text-5xl">
            My <span className="text-accent">Experience</span>
          </h2>
          <p className="mx-auto max-w-md text-text-muted font-body">
            A timeline of my professional journey and leadership roles.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent-cyan" />
        </motion.div>

        {/* ─── Timeline ─── */}
        <div className="relative">
          {/* Glowing vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent md:left-1/2 md:-translate-x-px">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 w-px bg-accent shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
          </div>

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const Icon = typeIcons[exp.type];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={isLeft ? timelineLeft : timelineRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 z-10 md:left-1/2 md:-translate-x-1/2">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-accent shadow-[0_0_12px_rgba(124,58,237,0.5)]">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Spacer for mobile dot */}
                  <div className="w-12 shrink-0 md:hidden" />

                  {/* Card — takes half width on desktop */}
                  <div
                    className={`flex-1 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="glass glass-hover group cursor-pointer rounded-2xl p-6 transition-all duration-300">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="text-xs font-body font-medium uppercase tracking-wider text-accent">
                            {exp.type === "work"
                              ? "Work"
                              : exp.type === "internship"
                              ? "Internship"
                              : "Organization"}
                          </span>
                          <p className="text-xs text-text-dim font-body">
                            {exp.period}
                          </p>
                        </div>
                      </div>

                      <h3 className="mb-1 text-lg font-heading font-semibold text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="mb-3 text-sm font-body font-medium text-accent-light">
                        {exp.organization}
                      </p>
                      <p className="text-sm leading-relaxed text-text-muted font-body">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty half on desktop */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
