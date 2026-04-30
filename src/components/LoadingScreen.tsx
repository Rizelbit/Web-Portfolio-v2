"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   Loading Screen — Dark Mode Cinematic Entrance
   Architecture: reference Loading.tsx pattern
   Colors: portfolio design system (#080B14 bg, #7C3AED accent)
   ═══════════════════════════════════════════════ */

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const chainStartedRef = useRef(false);
  const [screenOut, setScreenOut] = useState(false);

  /* ─── Simulated loading progress ─── */
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      if (p <= 50) {
        p += Math.round(Math.random() * 5) + 1;
      } else {
        p += Math.round(Math.random() * 3) + 1;
      }
      if (p > 100) p = 100;
      setPercent(p);
      if (p >= 100) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  /* ─── Chained dismiss: 100% → Welcome → Expand → Gone ─── */
  useEffect(() => {
    if (percent < 100 || chainStartedRef.current) return;
    chainStartedRef.current = true;

    // Step 1: Show "Welcome" text + chevron (loaded = true)
    const t1 = setTimeout(() => setLoaded(true), 400);

    // Step 2: Trigger expand-out immediately after — minimal dead time
    const t2 = setTimeout(() => setClicked(true), 1400);
    const t25 = setTimeout(() => setScreenOut(true), 2700);

    // Step 3: Fully dismiss after expand animation completes
    const t3 = setTimeout(() => setDismissed(true), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t25);
      clearTimeout(t3);
    };
  }, [percent]);

  /* ─── Lock body scroll while loading ─── */
  useEffect(() => {
    if (!dismissed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [dismissed]);

  /* ─── Mouse tracking for hover glow ─── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { currentTarget: target } = e;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  if (dismissed) return null;

  return (
    <>
      {/* Header bar — fades out when clicked */}
      <div className={`loading-header ${screenOut ? "loading-header-out" : ""}`}>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, i) => (
                <div className="loaderGame-line" key={i} />
              ))}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>

      {/* Main loading screen — fades out when clicked */}
      <div className={`loading-screen ${screenOut ? "loading-screen-out" : ""}`}>
        {/* Background marquee */}
        <div className="loading-marquee" aria-hidden="true">
          <div className="loading-marquee-track">
            <span>Software Engineer</span>
            <span>Full-Stack Developer</span>
            <span>Software Engineer</span>
            <span>Full-Stack Developer</span>
            <span>Software Engineer</span>
            <span>Full-Stack Developer</span>
          </div>
        </div>

        {/* Interactive loading button */}
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover" />
          <div
            className={`loading-button ${loaded ? "loading-complete" : ""}`}
          >
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box" />
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
            <div className="loading-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
