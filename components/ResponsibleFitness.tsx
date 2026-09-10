"use client";

import React from "react";

export default function ResponsibleFitness() {
  return (
    <section
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        borderBottom: "1px solid var(--border-subtle)"
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            textAlign: "center",
            padding: "clamp(20px, 4vh, 40px) 0"
          }}
        >
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            RESPONSIBLE FITNESS
          </div>

          <h2
            className="headline-section"
            style={{
              marginBottom: "clamp(24px, 4vh, 36px)",
              fontSize: "clamp(36px, 8vw, 76px)",
              lineHeight: 0.92
            }}
          >
            STRONG PEOPLE. <br />
            <span className="text-red">BETTER PLANET.</span>
          </h2>

          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 21px)",
              lineHeight: 1.65,
              color: "#C5C5C2",
              maxWidth: "680px",
              margin: "0 auto",
              fontWeight: 400
            }}
          >
            Fitness should build a stronger future too. We believe in creating a cleaner,
            more responsible training culture — one workout at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
