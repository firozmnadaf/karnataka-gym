"use client";

import React from "react";

const WORDS = [
  "DISCIPLINE",
  "STRENGTH",
  "CONSISTENCY",
  "CONFIDENCE",
  "COMMUNITY",
  "PROGRESS"
];

export default function Marquee() {
  // Render duplicate arrays to make the marquee seamless and infinite
  const stream = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <div
      className="marquee-wrapper"
      aria-hidden="true"
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "clamp(14px, 2vh, 20px) 0",
        position: "relative",
        userSelect: "none"
      }}
    >
      <div className="animate-marquee">
        {stream.map((word, idx) => (
          <div
            key={idx}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(24px, 4vw, 48px)",
              paddingRight: "clamp(24px, 4vw, 48px)"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(18px, 3.2vw, 30px)",
                letterSpacing: "0.08em",
                color: idx % 2 === 0 ? "#E0E0DC" : "var(--accent-red)",
                textTransform: "uppercase"
              }}
            >
              {word}
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--border-strong)",
                display: "inline-block"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
