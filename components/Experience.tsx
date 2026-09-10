"use client";

import React from "react";
import Image from "next/image";
import { Zap, ShieldCheck, Sparkles } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Centered Red Atmospheric Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(850px, 90vw)",
          height: "380px",
          background: "radial-gradient(ellipse at center, rgba(225, 6, 0, 0.16) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Centered High-Level Editorial Header */}
        <div
          className="experience-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "980px",
            margin: "0 auto clamp(36px, 6vh, 60px) auto"
          }}
        >
          {/* Eyebrow Pill Badge */}
          <div
            className="experience-eyebrow-pill"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(225, 6, 0, 0.08)",
              border: "1px solid rgba(225, 6, 0, 0.32)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#F5F5F2",
              marginBottom: "clamp(18px, 2.5vh, 26px)",
              boxShadow: "0 0 25px rgba(225, 6, 0, 0.18)"
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "var(--accent-red-bright)",
                boxShadow: "0 0 10px var(--accent-red-bright)",
                display: "inline-block"
              }}
            />
            <span>EXPERIENCE &bull; THE TRAINING FLOOR</span>
          </div>

          {/* Section Headline — Centered & High Impact */}
          <h2
            className="headline-section experience-headline"
            style={{
              textAlign: "center",
              margin: "0 auto clamp(16px, 2.5vh, 22px) auto",
              maxWidth: "960px",
              lineHeight: 1.02,
              letterSpacing: "-0.01em"
            }}
          >
            THIS IS WHERE <br className="break-desktop" />
            <span
              className="text-red"
              style={{
                position: "relative",
                display: "inline-block",
                textShadow: "0 0 40px rgba(225, 6, 0, 0.45)"
              }}
            >
              THE WORK
            </span>{" "}
            BEGINS.
          </h2>

          {/* Luxury Narrative Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              lineHeight: 1.6,
              color: "#A3A3A3",
              maxWidth: "660px",
              margin: "0 auto clamp(20px, 3vh, 28px) auto",
              fontWeight: 400
            }}
          >
            Step into Hubballi&apos;s most focused iron space. Competition-grade free weights,
            biomechanical resistance machines, and an environment built strictly for discipline.
          </p>

          {/* High-Level Feature Chips */}
          <div
            className="experience-chips"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              maxWidth: "800px"
            }}
          >
            {[
              { icon: Zap, label: "HEAVY IRON UP TO 40KG" },
              { icon: ShieldCheck, label: "BIOMECHANICAL STATIONS" },
              { icon: Sparkles, label: "AIR-CONDITIONED & CLEAN" }
            ].map((chip, idx) => (
              <div
                key={idx}
                className="chip-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(22, 22, 22, 0.75)",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "#D4D4D0",
                  textTransform: "uppercase"
                }}
              >
                <chip.icon size={13} style={{ color: "var(--accent-red-bright)" }} />
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* High-Level Visual Showcase Card */}
        <div
          className="experience-visual-card-wrap"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1360px",
            margin: "0 auto"
          }}
        >
          {/* Subtle Ambient Card Glow */}
          <div
            style={{
              position: "absolute",
              inset: "-15px",
              background: "radial-gradient(circle at 50% 50%, rgba(225, 6, 0, 0.16) 0%, transparent 65%)",
              filter: "blur(50px)",
              pointerEvents: "none",
              zIndex: 0
            }}
          />

          <div
            className="experience-visual-card"
            style={{
              position: "relative",
              width: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.85), 0 0 40px rgba(225, 6, 0, 0.12)",
              zIndex: 1
            }}
          >
            {/* Tactical Viewfinder Corner Accents */}
            <div style={{ position: "absolute", top: 16, left: 16, width: 14, height: 14, borderTop: "2px solid rgba(225,6,0,0.85)", borderLeft: "2px solid rgba(225,6,0,0.85)", zIndex: 3, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 16, right: 16, width: 14, height: 14, borderTop: "2px solid rgba(225,6,0,0.85)", borderRight: "2px solid rgba(225,6,0,0.85)", zIndex: 3, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 16, left: 16, width: 14, height: 14, borderBottom: "2px solid rgba(225,6,0,0.85)", borderLeft: "2px solid rgba(225,6,0,0.85)", zIndex: 3, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 16, right: 16, width: 14, height: 14, borderBottom: "2px solid rgba(225,6,0,0.85)", borderRight: "2px solid rgba(225,6,0,0.85)", zIndex: 3, pointerEvents: "none" }} />

            {/* Responsive aspect ratio container */}
            <div
              className="experience-media-container"
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(380px, 60vh, 700px)",
                borderRadius: "24px",
                overflow: "hidden"
              }}
            >
              <Image
                src="/images/gym-floor-4k.jpg"
                alt="Karnataka Gym Training Floor in 4K"
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 95vw, 1360px"
                className="experience-image"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 50%",
                  borderRadius: "24px",
                  filter: "brightness(1.02) contrast(1.08) saturate(1.15)",
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              />

              {/* Multi-layer gradient overlays for cinematic mood */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.42) 0%, rgba(5,5,5,0.08) 35%, rgba(5,5,5,0.2) 65%, rgba(5,5,5,0.82) 100%)",
                  pointerEvents: "none"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 50%, transparent 45%, rgba(5,5,5,0.45) 100%)",
                  pointerEvents: "none"
                }}
              />

              {/* HUD Badge: Top Left Live Status */}
              <div
                style={{
                  position: "absolute",
                  top: "clamp(18px, 3vw, 26px)",
                  left: "clamp(18px, 3vw, 26px)",
                  zIndex: 2,
                  backgroundColor: "rgba(8, 8, 8, 0.84)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    boxShadow: "0 0 10px #22c55e"
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#F5F5F2",
                    textTransform: "uppercase"
                  }}
                >
                  LIVE &bull; TRAINING GROUND
                </span>
              </div>

              {/* HUD Badge: Top Right 4K Tag */}
              <div
                className="top-right-badge"
                style={{
                  position: "absolute",
                  top: "clamp(18px, 3vw, 26px)",
                  right: "clamp(18px, 3vw, 26px)",
                  zIndex: 2,
                  backgroundColor: "rgba(8, 8, 8, 0.84)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(225, 6, 0, 0.4)",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 20px rgba(225, 6, 0, 0.18)"
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-red-bright)"
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#FFFFFF",
                    textTransform: "uppercase"
                  }}
                >
                  4K ULTRA-HD FACILITY
                </span>
              </div>

              {/* HUD Glass Plate: Bottom Left */}
              <div
                style={{
                  position: "absolute",
                  bottom: "clamp(18px, 3vw, 28px)",
                  left: "clamp(18px, 3vw, 28px)",
                  zIndex: 2,
                  maxWidth: "min(440px, calc(100% - 36px))",
                  backgroundColor: "rgba(8, 8, 8, 0.84)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "clamp(14px, 2.2vw, 22px)",
                  borderRadius: "16px",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.7)"
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 3vw, 30px)",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    lineHeight: 1.05,
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    marginBottom: "6px"
                  }}
                >
                  NO EXCUSES. <br />
                  <span style={{ color: "var(--accent-red-bright)" }}>JUST DISCIPLINE.</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#A3A3A3",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                  }}
                >
                  ENGINEERED FOR PROGRESS &bull; KALIDAS NAGAR, HUBBALLI
                </div>
              </div>

              {/* HUD Spec Badge: Bottom Right */}
              <div
                className="floor-specs-badge"
                style={{
                  position: "absolute",
                  bottom: "clamp(18px, 3vw, 28px)",
                  right: "clamp(18px, 3vw, 28px)",
                  zIndex: 2,
                  backgroundColor: "rgba(8, 8, 8, 0.84)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "12px 18px",
                  borderRadius: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  textAlign: "right"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.04em"
                  }}
                >
                  3,000+ SQ FT
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "#8A8A8A",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase"
                  }}
                >
                  DEDICATED IRON FLOOR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseDot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.3);
          }
        }
        .pulse-dot {
          animation: pulseDot 2s infinite ease-in-out;
        }
        .experience-visual-card:hover .experience-image {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          .break-desktop {
            display: none;
          }
          .floor-specs-badge {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .top-right-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
