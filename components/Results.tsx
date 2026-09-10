"use client";

import React from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function Results() {
  const { openModal } = useEnquiryModal();

  return (
    <section
      className="section-spacing"
      aria-label="Member dedication and training results"
      style={{
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="container">
        <div
          className="results-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(36px, 6vw, 64px)",
            alignItems: "center"
          }}
        >
          {/* Left Column: Member Photography */}
          <div
            className="results-photo-card"
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(360px, 55vh, 600px)",
                borderRadius: "20px",
                overflow: "hidden"
              }}
            >
              <Image
                src="/images/member-hd.jpg"
                alt="Member Training at Karnataka Gym Hubballi"
                fill
                quality={95}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 550px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 25%",
                  borderRadius: "20px",
                  filter: "contrast(1.06) brightness(1.03) saturate(1.1)"
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.02) 0%, transparent 45%, rgba(5,5,5,0.45) 100%)"
                }}
              />

            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="results-copy">
            <div className="eyebrow">THE COMMITMENT</div>

            <h2 className="headline-section" style={{ marginBottom: "20px" }}>
              SHOW <br />
              <span className="text-red">UP.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(16px, 2.2vw, 20px)",
                lineHeight: 1.6,
                color: "#E5E5E2",
                maxWidth: "520px",
                marginBottom: "32px",
                fontWeight: 400
              }}
            >
              Your transformation doesn&apos;t start with motivation. <br />
              <strong style={{ color: "#FFFFFF", fontWeight: 700 }}>
                It starts with one decision.
              </strong>
            </p>

            <button
              type="button"
              onClick={() => openModal()}
              className="btn btn-primary btn-mobile-full"
              style={{ maxWidth: "340px", fontSize: "14px", cursor: "pointer" }}
            >
              <MessageSquare size={17} />
              MAKE THAT DECISION
              <ArrowRight size={17} className="btn-icon" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .results-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 80px !important;
          }
        }
      `}</style>
    </section>
  );
}
