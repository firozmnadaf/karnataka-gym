"use client";

import React from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";
import { ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function Trainer() {
  const { openModal } = useEnquiryModal();
  const { trainer } = BUSINESS_INFO;

  return (
    <section
      id="trainer"
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-secondary)",
        position: "relative",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden"
      }}
    >
      <div className="container">
        {/* Eyebrow */}
        <div className="eyebrow">COACHING</div>

        <div
          className="trainer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(32px, 6vw, 64px)",
            alignItems: "center"
          }}
        >
          {/* Mobile layout requirement: Large trainer portrait first! */}
          <div
            className="trainer-portrait-wrapper"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "540px",
              margin: "0 auto",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(380px, 58vh, 620px)",
                borderRadius: "20px",
                overflow: "hidden"
              }}
            >
              <Image
                src="/images/trainer-hd.jpg"
                alt="Riyaz Gokul - Certified Fitness Trainer at Karnataka Gym"
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 100vw, 540px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  borderRadius: "20px",
                  filter: "contrast(1.05) brightness(0.96)"
                }}
              />

              {/* Atmospheric subtle vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(5,5,5,0.85) 100%)"
                }}
              />

              {/* Floating verified badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  backgroundColor: "rgba(5, 5, 5, 0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--border-medium)",
                  padding: "6px 14px",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <CheckCircle2 size={15} color="var(--accent-red)" />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    color: "#F5F5F2",
                    fontWeight: 700
                  }}
                >
                  {trainer.title}
                </span>
              </div>
            </div>
          </div>

          {/* Trainer Editorial Profile & Copy */}
          <div className="trainer-details">
            <div
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "var(--accent-red)",
                textTransform: "uppercase",
                marginBottom: "12px"
              }}
            >
              {trainer.title}
            </div>

            <h2 className="headline-section" style={{ marginBottom: "20px" }}>
              RIYAZ <br />
              <span className="text-red">GOKUL.</span>
            </h2>

            {/* Philosophy quote */}
            <blockquote
              style={{
                borderLeft: "2px solid var(--accent-red)",
                paddingLeft: "20px",
                margin: "0 0 28px 0",
                fontSize: "clamp(16px, 2.2vw, 20px)",
                lineHeight: 1.55,
                color: "#E2E2DF",
                fontStyle: "italic"
              }}
            >
              &ldquo;{trainer.quote}&rdquo;
            </blockquote>

            {/* Spec breakdown table/grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "14px",
                marginBottom: "32px",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "20px"
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    color: "var(--text-muted)",
                    marginBottom: "4px"
                  }}
                >
                  ROLE
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "var(--text-primary)"
                  }}
                >
                  {trainer.role}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    color: "var(--text-muted)",
                    marginBottom: "4px"
                  }}
                >
                  SPECIALITY
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "var(--text-primary)"
                  }}
                >
                  {trainer.speciality}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    color: "var(--text-muted)",
                    marginBottom: "4px"
                  }}
                >
                  APPROACH
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "var(--accent-red-bright)"
                  }}
                >
                  {trainer.approach}
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <button
              type="button"
              onClick={() =>
                openModal({
                  interestedIn: ["Personal Training"]
                })
              }
              className="btn btn-primary btn-mobile-full"
              style={{ maxWidth: "340px", fontSize: "13.5px", cursor: "pointer" }}
            >
              <MessageSquare size={17} />
              TALK TO THE TRAINER
              <ArrowRight size={17} className="btn-icon" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .trainer-grid {
            grid-template-columns: 1fr 1.1fr !important;
            gap: 80px !important;
          }
        }
      `}</style>
    </section>
  );
}
