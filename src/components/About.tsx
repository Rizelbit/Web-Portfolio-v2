"use client";

import { motion } from "framer-motion";
import { Code2, BarChart3, Users, ArrowRight, Download } from "lucide-react";
import { featureCards } from "@/lib/data";
import {
  fadeInLeft,
  fadeInUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";

const iconMap = {
  code: Code2,
  barChart: BarChart3,
  users: Users,
};

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-32">
      {/* ─── Wave Divider ─── */}
      <div className="absolute -top-1 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 55C960 40 1056 20 1152 15C1248 10 1344 20 1392 25L1440 30V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
            fill="#080B14"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-heading font-bold text-text-primary sm:text-4xl md:text-5xl">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent-cyan" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ─── Left: Bio ─── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-center"
          >
            <p className="mb-4 text-lg leading-relaxed text-text-muted font-body">
              I&apos;m <span className="text-text-primary font-medium">Reinhard Alfonzo</span>, 
              an Informatics Engineering student at the Institut Teknologi Bandung (ITB), 
              passionate about building impactful software and exploring the world of data.
            </p>
            <p className="mb-8 text-base leading-relaxed text-text-muted font-body">
              My journey spans across full-stack web development, data science, and 
              project leadership. I love crafting elegant solutions to complex problems, 
              whether it&apos;s a hospital management system in C or a beautiful web app 
              with React and Next.js.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-heading font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
              >
                Get In Touch
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm font-heading font-semibold text-text-primary backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.06]"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* ─── Right: Feature Cards ─── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4"
          >
            {featureCards.map((card) => {
              const Icon = iconMap[card.iconName];
              return (
                <motion.div
                  key={card.title}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="glass glass-hover group cursor-pointer rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-heading font-semibold text-text-primary">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-muted font-body">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
