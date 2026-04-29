"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
} from "lucide-react";

/* Inline SVG brand icons (not available in lucide-react) */
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { contactInfo, socialLinks } from "@/lib/data";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
  viewportOnce,
} from "@/lib/animations";

const contactIcons = {
  email: Mail,
  phone: Phone,
  location: MapPin,
};

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* Placeholder — wire up to an API or email service */
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-32">
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
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="mx-auto max-w-md text-text-muted font-body">
            Have an idea or want to collaborate? Feel free to reach out.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent-cyan" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ─── Left: Contact Info ─── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-center"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-4 mb-8"
            >
              {contactInfo.map((info) => {
                const Icon = contactIcons[info.type];
                const content = (
                  <div className="glass glass-hover group flex cursor-pointer items-center gap-4 rounded-2xl p-5 transition-all duration-300">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-body font-medium uppercase tracking-wider text-text-dim">
                        {info.label}
                      </p>
                      <p className="text-sm font-body font-medium text-text-primary sm:text-base">
                        {info.value}
                      </p>
                    </div>
                    {info.href && (
                      <ArrowUpRight
                        size={16}
                        className="ml-auto shrink-0 text-text-dim transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </div>
                );

                return (
                  <motion.div key={info.type} variants={scaleIn}>
                    {info.href ? (
                      <a href={info.href}>{content}</a>
                    ) : (
                      content
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-body text-text-dim">
                Find me on
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.iconName];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-text-muted transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                      aria-label={link.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Contact Form ─── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-body font-medium text-text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm font-body text-text-primary placeholder-text-dim outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-body font-medium text-text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm font-body text-text-primary placeholder-text-dim outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-body font-medium text-text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm font-body text-text-primary placeholder-text-dim outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-heading font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
                >
                  Send Message
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* ─── Footer ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 border-t border-white/[0.06] pt-8 text-center"
        >
          <p className="text-sm font-body text-text-dim">
            © {new Date().getFullYear()} Reinhard Alfonzo. All rights reserved.
          </p>
          <p className="mt-1 text-xs font-body text-text-dim/60">
            Built with Next.js, TailwindCSS & Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
