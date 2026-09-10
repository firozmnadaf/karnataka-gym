"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroAnimation() {
  const [visible, setVisible] = useState<boolean>(false);
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro = sessionStorage.getItem("kg_intro_played_v2");

    if (prefersReducedMotion || hasSeenIntro) {
      return;
    }

    setVisible(true);

    // Fade out after 850ms (strictly < 1 second total)
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 750);

    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("kg_intro_played_v2", "true");
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Welcome to Karnataka Gym"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        transition: "opacity 0.28s ease-out, transform 0.28s ease-out",
        opacity: fading ? 0 : 1,
        transform: fading ? "scale(1.03)" : "scale(1)"
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 20px",
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid rgba(225, 6, 0, 0.45)",
            boxShadow: "0 0 35px rgba(225, 6, 0, 0.3)"
          }}
        >
          <Image
            src="/images/logo.jpg"
            alt="Karnataka Gym Crest"
            fill
            sizes="72px"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 6vw, 36px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#F5F5F2",
            lineHeight: 1
          }}
        >
          KARNATAKA GYM
        </h1>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(10px, 2.5vw, 12px)",
            letterSpacing: "0.22em",
            color: "#E10600",
            fontWeight: 700,
            textTransform: "uppercase",
            marginTop: 10
          }}
        >
          HUBBALLI • KARNATAKA
        </p>
      </div>
    </div>
  );
}
