"use client";

import React from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";
import { ArrowRight, MessageSquare, Phone, MapPin, Navigation } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function FinalCTA() {
  const { openModal } = useEnquiryModal();

  return (
    <section
      id="contact"
      className="final-cta-section"
      aria-label="Join Karnataka Gym"
      style={{
        position: "relative",
        minHeight: "clamp(600px, 80vh, 840px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
        borderTopLeftRadius: "clamp(24px, 4vw, 40px)",
        borderTopRightRadius: "clamp(24px, 4vw, 40px)"
      }}
    >
      {/* Background Image with Dark Atmospheric Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderTopLeftRadius: "clamp(24px, 4vw, 40px)",
          borderTopRightRadius: "clamp(24px, 4vw, 40px)",
          overflow: "hidden"
        }}
      >
        <Image
          src="/images/poster-hd.jpg"
          alt="Karnataka Gym Training Atmosphere"
          fill
          quality={95}
          loading="lazy"
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderTopLeftRadius: "clamp(24px, 4vw, 40px)",
            borderTopRightRadius: "clamp(24px, 4vw, 40px)",
            filter: "brightness(0.38) contrast(1.15)"
          }}
        />

        {/* Cinematic Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.7) 40%, rgba(5,5,5,0.92) 85%, #050505 100%)"
          }}
        />

        {/* Subtle Red Atmospheric Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "55vw",
            height: "55vw",
            maxWidth: "600px",
            background: "radial-gradient(circle, rgba(225, 6, 0, 0.28) 0%, transparent 70%)",
            filter: "blur(100px)",
            pointerEvents: "none"
          }}
        />

        <div className="grain-overlay" />
      </div>

      {/* Content Container */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "clamp(70px, 10vh, 110px)",
          paddingBottom: "clamp(70px, 10vh, 110px)"
        }}
      >
        <div
          className="cta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(36px, 6vw, 64px)",
            alignItems: "center"
          }}
        >
          {/* Main Headline & Actions */}
          <div style={{ maxWidth: "720px" }}>
            <div className="eyebrow">GET STARTED</div>

            <h2
              className="headline-section"
              style={{
                marginBottom: "clamp(20px, 3vh, 28px)",
                fontSize: "clamp(42px, 10vw, 92px)",
                lineHeight: 0.88
              }}
            >
              READY <br />
              <span className="text-red">TO BEGIN?</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(16px, 2.2vw, 20px)",
                lineHeight: 1.55,
                color: "#E2E2DF",
                maxWidth: "520px",
                marginBottom: "clamp(28px, 4.5vh, 40px)",
                fontWeight: 400
              }}
            >
              Stop waiting for the perfect time. <br />
              <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>
                Walk through the door.
              </strong>
            </p>

            {/* Action Buttons */}
            <div
              className="cta-actions-group"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                maxWidth: "480px"
              }}
            >
              <button
                type="button"
                onClick={() => openModal()}
                className="btn btn-primary btn-mobile-full"
                style={{ fontSize: "14px", cursor: "pointer" }}
              >
                <MessageSquare size={18} />
                WHATSAPP US
                <ArrowRight size={17} className="btn-icon" />
              </button>

              <a
                href={BUSINESS_INFO.phoneTel}
                className="btn btn-secondary btn-mobile-full"
                style={{ fontSize: "14px" }}
              >
                <Phone size={17} />
                CALL THE GYM
              </a>
            </div>
          </div>

          {/* Location & Directions Card */}
          <div
            className="cta-location-card"
            style={{
              padding: "clamp(32px, 5vw, 44px)",
              borderRadius: "20px",
              backgroundColor: "rgba(14, 14, 14, 0.93)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(225, 6, 0, 0.38)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.9), 0 0 45px rgba(225, 6, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
              maxWidth: "520px",
              position: "relative",
              overflow: "hidden",
              transition: "all var(--transition-fast)"
            }}
          >
            {/* Top Glowing Red Edge Accent with Center Flare */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, transparent 0%, #E10600 30%, #FF3B30 50%, #E10600 70%, transparent 100%)"
              }}
            />

            {/* Atmospheric Red Flare in Corner */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(225, 6, 0, 0.28) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none"
              }}
            />

            {/* Header Status Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  color: "var(--accent-red)",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(225, 6, 0, 0.12)",
                  border: "1px solid rgba(225, 6, 0, 0.35)",
                  boxShadow: "0 0 14px rgba(225, 6, 0, 0.15)"
                }}
              >
                <span className="live-pulse-dot" />
                VISIT OUR FACILITY
              </div>

              {/* Live Status Pill */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#00E676",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(0, 230, 118, 0.08)",
                  border: "1px solid rgba(0, 230, 118, 0.28)"
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00E676", boxShadow: "0 0 6px #00E676" }} />
                OPEN 7 DAYS
              </div>
            </div>

            {/* Two-Tone Brand Title */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.4vw, 38px)",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "16px",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                textTransform: "uppercase"
              }}
            >
              KARNATAKA GYM <br />
              <span style={{ color: "var(--accent-red)" }}>FITNESS CENTRE</span>
            </h3>

            {/* Key Facility Highlights */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              <span className="facility-pill">⚡ HUBBALLI</span>
              <span className="facility-pill">⚡ 5:30 AM — 10:00 PM</span>
              <span className="facility-pill">⚡ PRO FLOOR</span>
            </div>

            {/* Interactive Information Blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "26px" }}>
              {/* Location Row */}
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="facility-info-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 18px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all var(--transition-fast)",
                  textDecoration: "none"
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(225, 6, 0, 0.26) 0%, rgba(225, 6, 0, 0.08) 100%)",
                    border: "1px solid rgba(225, 6, 0, 0.45)",
                    boxShadow: "0 0 18px rgba(225, 6, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <MapPin size={22} color="var(--accent-red)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      color: "var(--accent-red)",
                      textTransform: "uppercase",
                      marginBottom: "3px"
                    }}
                  >
                    FACILITY LOCATION
                  </div>
                  <div style={{ fontSize: "16.5px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.35 }}>
                    {BUSINESS_INFO.location}
                  </div>
                </div>
                <ArrowRight size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} className="row-arrow" />
              </a>

              {/* Phone Row */}
              <a
                href={BUSINESS_INFO.phoneTel}
                className="facility-info-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 18px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all var(--transition-fast)",
                  textDecoration: "none"
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(225, 6, 0, 0.26) 0%, rgba(225, 6, 0, 0.08) 100%)",
                    border: "1px solid rgba(225, 6, 0, 0.45)",
                    boxShadow: "0 0 18px rgba(225, 6, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <Phone size={22} color="var(--accent-red)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      color: "var(--accent-red)",
                      textTransform: "uppercase",
                      marginBottom: "3px"
                    }}
                  >
                    DIRECT ACCESS DESK
                  </div>
                  <div
                    style={{
                      fontSize: "19px",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.03em"
                    }}
                  >
                    {BUSINESS_INFO.phone}
                  </div>
                </div>
                <ArrowRight size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} className="row-arrow" />
              </a>
            </div>

            {/* Glowing Solid Red Direction Button */}
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-facility-directions"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                width: "100%",
                padding: "18px 28px",
                borderRadius: "4px",
                background: "linear-gradient(135deg, #E10600 0%, #BA0000 100%)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "0 10px 30px rgba(225, 6, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                fontWeight: 900,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                textDecoration: "none"
              }}
            >
              <Navigation size={18} color="#FFFFFF" />
              GET MAP &amp; DIRECTIONS
              <ArrowRight size={18} color="#FFFFFF" className="btn-dir-arrow" style={{ transition: "transform 0.2s ease" }} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .live-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-red);
          box-shadow: 0 0 10px var(--accent-red);
          display: inline-block;
          animation: livePulse 1.8s infinite ease-in-out;
        }
        @keyframes livePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 0 10px var(--accent-red);
          }
          50% {
            transform: scale(1.4);
            opacity: 0.7;
            box-shadow: 0 0 18px var(--accent-red);
          }
        }
        .facility-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 3px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E2DF;
          text-transform: uppercase;
        }
        .facility-info-row:hover {
          background-color: rgba(225, 6, 0, 0.08) !important;
          border-color: rgba(225, 6, 0, 0.35) !important;
          transform: translateX(4px);
        }
        .facility-info-row:hover .row-arrow {
          color: var(--accent-red) !important;
          transform: translateX(3px);
        }
        .btn-facility-directions:hover {
          background: linear-gradient(135deg, #FF1A14 0%, #D60000 100%) !important;
          box-shadow: 0 16px 45px rgba(225, 6, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.45) !important;
          transform: translateY(-2px);
        }
        .btn-facility-directions:hover .btn-dir-arrow {
          transform: translateX(4px);
        }
        .cta-location-card:hover {
          border-color: rgba(225, 6, 0, 0.55) !important;
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.9), 0 0 55px rgba(225, 6, 0, 0.25) !important;
        }
        @media (min-width: 641px) {
          .cta-actions-group {
            flex-direction: row !important;
          }
        }
        @media (min-width: 1024px) {
          .cta-grid {
            grid-template-columns: 1.2fr 1fr !important;
            gap: 80px !important;
          }
        }
      `}</style>
    </section>
  );
}
