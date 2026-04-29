"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const firstName = "Reinhard";
  const lastName = "Alfonzo";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-cyan/5" />

          <div className="relative flex flex-col items-center gap-2">
            {/* First name */}
            <motion.div className="flex overflow-hidden">
              {firstName.split("").map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  className="text-4xl font-heading font-bold text-text-primary sm:text-5xl md:text-6xl"
                  initial={{ y: 80, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: i * 0.06,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Last name */}
            <motion.div className="flex overflow-hidden">
              {lastName.split("").map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  className="text-4xl font-heading font-bold text-accent sm:text-5xl md:text-6xl"
                  initial={{ y: 80, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: 0.5 + i * 0.06,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-6 h-0.5 w-24 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
