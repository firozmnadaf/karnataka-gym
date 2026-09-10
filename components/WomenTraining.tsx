"use client";

import React from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function WomenTraining() {
  const { openModal } = useEnquiryModal();

  return (
    <section
      id="women"
      className="women-section section-spacing"
      aria-label="Women's Training at Karnataka Gym"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-primary)"
      }}
    >
      <div className="container">
        {/* Rounded Campaign Showcase Frame */}
        <div
          style={{
            position: "relative",
            minHeight: "clamp(600px, 80vh, 840px)",
            display: "flex",
            alignItems: "flex-end",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid var(--border-medium)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)"
          }}
        >
          {/* Background Campaign Image in 4K */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, borderRadius: "24px", overflow: "hidden" }}>
            <Image
              src="/images/women-4k.jpg"
              alt="Women Strength Training at Karnataka Gym Hubballi"
              fill
              priority
              quality={95}
              sizes="(max-width: 1480px) 100vw, 1440px"
              style={{
                objectFit: "cover",
                objectPosition: "center 25%",
                borderRadius: "24px",
                filter: "brightness(0.82) contrast(1.1)"
              }}
            />

            {/* Cinematic Multi-stop Dark & Vignette Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.45) 40%, rgba(5,5,5,0.88) 85%, #050505 100%)"
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.1) 70%, rgba(5,5,5,0.65) 100%)"
              }}
            />

            {/* Atmospheric Red Glow */}
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                left: "-5%",
                width: "50vw",
                height: "50vw",
                maxWidth: "500px",
                background: "radial-gradient(circle, rgba(225, 6, 0, 0.22) 0%, transparent 70%)",
                filter: "blur(90px)",
                pointerEvents: "none"
              }}
            />

            {/* Grain overlay */}
            <div className="grain-overlay" />
          </div>

          {/* Campaign Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              padding: "clamp(60px, 10vh, 100px) clamp(24px, 5vw, 60px)",
              width: "100%"
            }}
          >
            <div
              className="women-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "36px",
                alignItems: "flex-end"
              }}
            >
              {/* Left Column: Headlines & CTA */}
              <div style={{ maxWidth: "680px" }}>
                <div className="eyebrow" style={{ color: "#E0E0DC" }}>
                  DEDICATED WOMEN&apos;S TRAINING
                </div>

                <h2 className="headline-section" style={{ marginBottom: "clamp(16px, 2.5vh, 24px)" }}>
                  BUILT <br />
                  <span className="text-red">FOR</span> <br />
                  HER.
                </h2>

                <p
                  style={{
                    fontSize: "clamp(16px, 2vw, 19px)",
                    lineHeight: 1.6,
                    color: "#E5E5E2",
                    maxWidth: "520px",
                    marginBottom: "clamp(24px, 4vh, 36px)",
                    fontWeight: 400
                  }}
                >
                  A focused training environment where women can build{" "}
                  <strong style={{ color: "#FFFFFF" }}>strength, confidence and consistency</strong>.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    openModal({
                      goal: "General Fitness",
                      interestedIn: ["Ladies Gym"]
                    })
                  }
                  className="btn btn-primary btn-mobile-full"
                  style={{ maxWidth: "340px", fontSize: "14px", borderRadius: "10px", cursor: "pointer" }}
                >
                  <MessageSquare size={17} />
                  ENQUIRE NOW
                  <ArrowRight size={17} className="btn-icon" />
                </button>
              </div>

              {/* Right Column / Pillars: Side Information */}
              <div
                className="women-pillars"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  maxWidth: "420px"
                }}
              >
                {[
                  { title: "CONFIDENCE", desc: "Train without hesitation in a respectful, dedicated environment." },
                  { title: "STRENGTH", desc: "Structured coaching tailored for real physical capability and posture." },
                  { title: "PROGRESS", desc: "Sustainable workout routines designed for lifelong health and fitness." }
                ].map((pillar) => (
                  <div
                    key={pillar.title}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(10, 10, 10, 0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid var(--border-medium)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "var(--accent-red)",
                          display: "inline-block"
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "16px",
                          letterSpacing: "0.04em",
                          color: "var(--text-primary)",
                          textTransform: "uppercase"
                        }}
                      >
                        {pillar.title}
                      </span>
                    </div>
                    <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.45 }}>
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 960px) {
          .women-grid {
            grid-template-columns: 1.3fr 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
