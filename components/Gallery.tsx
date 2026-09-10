"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/constants";
import Lightbox from "./Lightbox";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function Gallery() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 45;

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
    if (distance > minSwipeDistance && mobileIndex < GALLERY_ITEMS.length - 1) {
      setMobileIndex((prev) => prev + 1);
    }
    if (distance < -minSwipeDistance && mobileIndex > 0) {
      setMobileIndex((prev) => prev - 1);
    }
  };

  const currentMobileItem = GALLERY_ITEMS[mobileIndex];

  return (
    <section
      id="gallery"
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-secondary)",
        position: "relative",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)"
      }}
    >
      <div className="container">
        {/* Gallery Header (Centered & High-Impact Presentation) */}
        <div
          className="gallery-header"
          style={{
            maxWidth: "860px",
            margin: "0 auto clamp(40px, 7vh, 64px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
          }}
        >
          {/* Subtle Ambient Red Flare behind header */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "420px",
              height: "180px",
              background: "radial-gradient(ellipse, rgba(225, 6, 0, 0.16) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none"
            }}
          />

          {/* Eyebrow Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: "var(--accent-red)",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "100px",
              backgroundColor: "rgba(225, 6, 0, 0.1)",
              border: "1px solid rgba(225, 6, 0, 0.3)",
              marginBottom: "18px",
              boxShadow: "0 0 16px rgba(225, 6, 0, 0.12)"
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "var(--accent-red)",
                boxShadow: "0 0 8px var(--accent-red)"
              }}
            />
            THE FACILITY &bull; PHOTO GALLERY
          </div>

          {/* Headline */}
          <h2
            className="headline-section"
            style={{
              fontSize: "clamp(38px, 6.5vw, 76px)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              marginBottom: "16px",
              textTransform: "uppercase"
            }}
          >
            INSIDE <span className="text-red">THE GYM.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: "#CCCCCC",
              lineHeight: 1.6,
              maxWidth: "600px",
              marginBottom: "22px"
            }}
          >
            Built around movement, energy and people who refuse to stay the same.
          </p>

          {/* Facility Highlights / Filter Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <span className="gallery-badge">⚡ MAIN TRAINING FLOOR</span>
            <span className="gallery-badge">⚡ ISOLATION MACHINES</span>
            <span className="gallery-badge">⚡ CARDIO LINE</span>
            <span className="gallery-badge">⚡ FACILITY EXTERIOR</span>
          </div>

          {/* Symmetrical Center Accent Underline */}
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, transparent, var(--accent-red), transparent)",
              marginTop: "22px",
              boxShadow: "0 0 10px var(--accent-red)",
              borderRadius: "2px"
            }}
          />
        </div>

        {/* ==================================================
            MOBILE VIEW: 1-at-a-time horizontal swipe gallery
            ================================================== */}
        <div
          className="gallery-mobile-slider"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            onClick={() => setLightboxIndex(mobileIndex)}
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid var(--border-medium)",
              position: "relative",
              cursor: "pointer",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Main Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height:
                  currentMobileItem.aspect === "tall"
                    ? "clamp(420px, 110vw, 540px)"
                    : "clamp(280px, 50vw, 380px)",
                backgroundColor: "#0A0A0A",
                borderRadius: "18px 18px 0 0",
                overflow: "hidden"
              }}
            >
              <Image
                src={currentMobileItem.src}
                alt={currentMobileItem.title}
                fill
                loading="lazy"
                sizes="(max-width: 960px) 100vw, 700px"
                style={{
                  objectFit: "cover",
                  borderRadius: "18px 18px 0 0",
                  filter: "brightness(1.03) contrast(1.08) saturate(1.12)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.02) 0%, transparent 50%, rgba(5,5,5,0.55) 100%)"
                }}
              />

              {/* Tap to expand hint */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  backgroundColor: "rgba(5, 5, 5, 0.8)",
                  borderRadius: "2px",
                  padding: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.08em"
                }}
              >
                <Maximize2 size={12} />
                EXPAND
              </div>
            </div>

            {/* Caption */}
            <div style={{ padding: "18px 20px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  marginBottom: "4px"
                }}
              >
                {currentMobileItem.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em"
                }}
              >
                {currentMobileItem.subtitle}
              </p>
            </div>
          </div>

          {/* Controls & Counter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "16px",
              padding: "0 4px"
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "var(--text-primary)"
              }}
            >
              <span style={{ color: "var(--accent-red)" }}>0{mobileIndex + 1}</span> / 0{GALLERY_ITEMS.length}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setMobileIndex((p) => (p > 0 ? p - 1 : GALLERY_ITEMS.length - 1))}
                aria-label="Previous image"
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
                onClick={() => setMobileIndex((p) => (p < GALLERY_ITEMS.length - 1 ? p + 1 : 0))}
                aria-label="Next image"
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
            DESKTOP VIEW: Asymmetrical Editorial Grid
            ================================================== */}
        <div className="gallery-desktop-grid">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "20px",
              gridAutoRows: "270px"
            }}
          >
            {GALLERY_ITEMS.map((item, idx) => {
              // Custom editorial layout:
              // Feature Pair on Top (Rows 1 & 2):
              // - idx 0: Main Training Floor (span 8 cols, span 2 rows - wide panoramic interior)
              // - idx 5: Hubballi Facility Exterior (span 4 cols, span 2 rows - tall 9:16 vertical building rectangle, whole & uncropped)
              // Equipment Showcase on Bottom (Row 3):
              // - idx 1, 2, 3, 4: Pin-Selected, Leg Press, Cardio, Cable Station (span 3 cols each, 1 row)
              let gridColumn = "span 4";
              let gridRow = "span 1";

              if (idx === 0) {
                gridColumn = "1 / span 8";
                gridRow = "1 / span 2";
              } else if (idx === 5) {
                gridColumn = "9 / span 4";
                gridRow = "1 / span 2";
              } else if (idx === 1) {
                gridColumn = "1 / span 3";
                gridRow = "3 / span 1";
              } else if (idx === 2) {
                gridColumn = "4 / span 3";
                gridRow = "3 / span 1";
              } else if (idx === 3) {
                gridColumn = "7 / span 3";
                gridRow = "3 / span 1";
              } else if (idx === 4) {
                gridColumn = "10 / span 3";
                gridRow = "3 / span 1";
              }

              const isExterior = idx === 5;

              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="gallery-card"
                  style={{
                    gridColumn,
                    gridRow,
                    position: "relative",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: "var(--bg-surface)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
                    cursor: "pointer"
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes={
                      isExterior
                        ? "(max-width: 960px) 100vw, 35vw"
                        : idx === 0
                        ? "(max-width: 960px) 100vw, 65vw"
                        : "(max-width: 960px) 100vw, 30vw"
                    }
                    className="gallery-image"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "18px",
                      filter: "brightness(1.03) contrast(1.08) saturate(1.12)",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isExterior
                        ? "linear-gradient(180deg, transparent 65%, rgba(5,5,5,0.85) 100%)"
                        : "linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.82) 100%)",
                      opacity: 0.9,
                      transition: "opacity 0.3s ease"
                    }}
                  />

                  {/* Caption on Hover/Permanent bottom */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 24px",
                      zIndex: 2
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isExterior
                          ? "clamp(20px, 2vw, 26px)"
                          : idx === 0
                          ? "clamp(22px, 2.4vw, 30px)"
                          : "clamp(16px, 1.5vw, 20px)",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        lineHeight: 1.1,
                        color: "#FFFFFF",
                        textTransform: "uppercase"
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

      <style jsx>{`
        .gallery-mobile-slider {
          display: block;
        }
        .gallery-desktop-grid {
          display: none;
        }
        @media (min-width: 960px) {
          .gallery-mobile-slider {
            display: none;
          }
          .gallery-desktop-grid {
            display: block;
          }
        }
        .gallery-card:hover .gallery-image {
          transform: scale(1.04);
          filter: brightness(0.95) contrast(1.15);
        }
        .gallery-card:hover {
          border-color: var(--border-medium);
        }
        .gallery-badge {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 3px;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          color: #D6D6D2;
          text-transform: uppercase;
          transition: all var(--transition-fast);
        }
        .gallery-badge:hover {
          background-color: rgba(225, 6, 0, 0.12);
          border-color: rgba(225, 6, 0, 0.35);
          color: #FFFFFF;
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
