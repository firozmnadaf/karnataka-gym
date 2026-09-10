"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { PROGRAMS_DATA, BUSINESS_INFO } from "@/lib/constants";
import { ArrowRight, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function Programs() {
  const { openModal } = useEnquiryModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < PROGRAMS_DATA.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PROGRAMS_DATA.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < PROGRAMS_DATA.length - 1 ? prev + 1 : 0));
  };

  const activeProgram = PROGRAMS_DATA[activeIndex];

  return (
    <section
      id="programs"
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-secondary)",
        position: "relative",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)"
      }}
    >
      {/* Centered Red Atmospheric Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(850px, 90vw)",
          height: "360px",
          background: "radial-gradient(ellipse at center, rgba(225, 6, 0, 0.14) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Centered High-Level Editorial Header */}
        <div
          className="programs-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "920px",
            margin: "0 auto clamp(36px, 6vh, 64px) auto"
          }}
        >
          {/* Eyebrow Pill Badge */}
          <div
            className="programs-eyebrow-pill"
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
            <span>PROGRAMS &bull; TAILORED PATHWAYS</span>
          </div>

          {/* Section Headline */}
          <h2
            className="headline-section programs-headline"
            style={{
              textAlign: "center",
              margin: "0 auto clamp(16px, 2.5vh, 22px) auto",
              maxWidth: "960px",
              lineHeight: 1.02,
              letterSpacing: "-0.01em"
            }}
          >
            YOUR{" "}
            <span
              className="text-red"
              style={{
                position: "relative",
                display: "inline-block",
                textShadow: "0 0 40px rgba(225, 6, 0, 0.45)"
              }}
            >
              MISSION.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              lineHeight: 1.6,
              color: "#A3A3A3",
              maxWidth: "640px",
              margin: "0 auto clamp(22px, 3vh, 30px) auto",
              fontWeight: 400
            }}
          >
            Choose your goal.{" "}
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
              Then show up for it.
            </span>{" "}
            Precision-engineered training protocols designed for real physical transformation.
          </p>

          {/* Interactive Program Filter Pills */}
          <div
            className="program-pill-selectors"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              maxWidth: "800px"
            }}
          >
            {PROGRAMS_DATA.map((prog, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={prog.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 18px",
                    borderRadius: "12px",
                    backgroundColor: isSelected ? "rgba(225, 6, 0, 0.16)" : "rgba(22, 22, 22, 0.7)",
                    border: isSelected ? "1px solid var(--accent-red-bright)" : "1px solid rgba(255, 255, 255, 0.10)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    color: isSelected ? "#FFFFFF" : "#A8A8A8",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isSelected ? "0 0 20px rgba(225, 6, 0, 0.3)" : "none"
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: isSelected ? "var(--accent-red-bright)" : "#555"
                    }}
                  />
                  <span>{prog.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            MOBILE VIEW: Swipeable Large Cards (visible on mobile/tablet < 1024px)
            ================================================== */}
        <div
          className="programs-mobile-view"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={mobileContainerRef}
        >
          {/* Active Card */}
          <div
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "18px",
              border: "1px solid var(--border-medium)",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Card Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(260px, 45vw, 360px)",
                borderRadius: "18px 18px 0 0",
                overflow: "hidden"
              }}
            >
              <Image
                src={activeProgram.image}
                alt={activeProgram.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                loading="lazy"
                quality={95}
                style={{
                  objectFit: "cover",
                  borderRadius: "18px 18px 0 0",
                  filter: "brightness(1.05) contrast(1.08) saturate(1.15)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.02) 0%, transparent 45%, rgba(5,5,5,0.45) 75%, rgba(5,5,5,0.88) 100%)"
                }}
              />
              {/* Number Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  backgroundColor: "rgba(5, 5, 5, 0.85)",
                  border: "1px solid var(--border-medium)",
                  padding: "4px 10px",
                  borderRadius: "2px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--accent-red)"
                }}
              >
                {activeProgram.tag}
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: "clamp(20px, 5vw, 28px)" }}>
              <h3
                className="headline-card"
                style={{
                  marginBottom: "12px",
                  color: "var(--text-primary)"
                }}
              >
                {activeProgram.title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                  marginBottom: "24px"
                }}
              >
                {activeProgram.description}
              </p>

              {/* Card Action Link */}
              <button
                type="button"
                onClick={() => {
                  const goalMap: Record<string, any> = {
                    STRENGTH: "Strength",
                    MUSCLE: "Muscle Gain",
                    "FAT LOSS": "Weight Loss",
                    WOMEN: "General Fitness"
                  };
                  const selectedGoal = goalMap[activeProgram.tag] || "General Fitness";
                  const interestedIn = activeProgram.tag === "WOMEN" ? ["Ladies Gym"] : ["Gym Membership"];
                  openModal({ goal: selectedGoal, interestedIn: interestedIn as any });
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer"
                }}
              >
                <span>ENQUIRE ABOUT {activeProgram.title}</span>
                <ArrowRight size={16} color="var(--accent-red)" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Controls & Counter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
              padding: "0 4px"
            }}
          >
            {/* Progress indicator */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "var(--text-primary)"
              }}
            >
              <span style={{ color: "var(--accent-red)" }}>0{activeIndex + 1}</span> / 0{PROGRAMS_DATA.length}
            </div>

            {/* Prev / Next Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Program"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "2px",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-medium)",
                  color: "var(--text-primary)"
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Program"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "2px",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-medium)",
                  color: "var(--text-primary)"
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================
            DESKTOP VIEW: Split interactive list & preview
            ================================================== */}
        <div className="programs-desktop-view">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "50px",
              alignItems: "stretch"
            }}
          >
            {/* Left: Program List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {PROGRAMS_DATA.map((prog, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <div
                    key={prog.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveIndex(idx);
                      }
                    }}
                    style={{
                      padding: "24px 28px",
                      borderRadius: "14px",
                      backgroundColor: isSelected ? "var(--bg-surface-elevated)" : "var(--bg-surface)",
                      border: isSelected ? "1px solid var(--accent-red)" : "1px solid var(--border-subtle)",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                      position: "relative"
                    }}
                  >
                    {/* Active side indicator */}
                    {isSelected && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "3px",
                          backgroundColor: "var(--accent-red)"
                        }}
                      />
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px"
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          color: isSelected ? "var(--accent-red)" : "var(--text-muted)"
                        }}
                      >
                        {prog.tag}
                      </span>
                      <ArrowRight
                        size={18}
                        style={{
                          transform: isSelected ? "translateX(4px)" : "none",
                          color: isSelected ? "var(--accent-red)" : "var(--text-dim)",
                          transition: "transform var(--transition-fast)"
                        }}
                      />
                    </div>

                    <h3
                      className="headline-card"
                      style={{
                        color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                        marginBottom: "8px",
                        fontSize: "28px"
                      }}
                    >
                      {prog.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.55,
                        color: isSelected ? "#D5D5D2" : "var(--text-muted)"
                      }}
                    >
                      {prog.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right: Interactive Large Preview */}
            <div
              style={{
                position: "sticky",
                top: "120px"
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "560px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-surface)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)"
                }}
              >
              <Image
                key={activeProgram.image}
                src={activeProgram.image}
                alt={activeProgram.title}
                fill
                priority
                quality={95}
                sizes="50vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "20px",
                  filter: "brightness(1.06) contrast(1.08) saturate(1.18)",
                  transition: "opacity 0.4s ease"
                }}
              />

              {/* Luminous subtle gradient only at bottom for text legibility */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.02) 0%, transparent 45%, rgba(5,5,5,0.45) 75%, rgba(5,5,5,0.9) 100%)"
                }}
              />

              {/* Subtle top athletic edge highlight */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  zIndex: 3,
                  background: "linear-gradient(90deg, transparent 0%, var(--accent-red) 50%, transparent 100%)"
                }}
              />

              {/* Bottom Preview Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "32px",
                  left: "32px",
                  right: "32px",
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    color: "var(--accent-red)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "6px"
                  }}
                >
                  {activeProgram.focus}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "36px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    marginBottom: "16px"
                  }}
                >
                  {activeProgram.title}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const goalMap: Record<string, any> = {
                      STRENGTH: "Strength",
                      MUSCLE: "Muscle Gain",
                      "FAT LOSS": "Weight Loss",
                      WOMEN: "General Fitness"
                    };
                    const selectedGoal = goalMap[activeProgram.tag] || "General Fitness";
                    const interestedIn = activeProgram.tag === "WOMEN" ? ["Ladies Gym"] : ["Gym Membership"];
                    openModal({ goal: selectedGoal, interestedIn: interestedIn as any });
                  }}
                  className="btn btn-primary"
                  style={{ padding: "12px 22px", fontSize: "12.5px", cursor: "pointer" }}
                >
                  <MessageSquare size={16} />
                  START {activeProgram.title} MISSION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        .programs-desktop-view {
          display: none;
        }
        .programs-mobile-view {
          display: block;
        }
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
        @media (min-width: 1024px) {
          .programs-desktop-view {
            display: block;
          }
          .programs-mobile-view {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
