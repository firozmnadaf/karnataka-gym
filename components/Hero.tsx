"use client";

import React from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";
import { ArrowRight, ChevronDown, MessageSquare } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function Hero() {
  const { openModal } = useEnquiryModal();

  return (
    <section
      className="hero-section"
      aria-label="Welcome to Karnataka Gym"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
        borderBottomLeftRadius: "clamp(20px, 4vw, 40px)",
        borderBottomRightRadius: "clamp(20px, 4vw, 40px)"
      }}
    >
      {/* Hero Background Image with priority */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderBottomLeftRadius: "clamp(20px, 4vw, 40px)",
          borderBottomRightRadius: "clamp(20px, 4vw, 40px)",
          overflow: "hidden"
        }}
      >
        <Image
          src="/images/gym-wide-4k.jpg"
          alt="Karnataka Gym Training Floor in 4K"
          fill
          priority
          quality={95}
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            transform: "scale(1.02)",
            borderBottomLeftRadius: "clamp(20px, 4vw, 40px)",
            borderBottomRightRadius: "clamp(20px, 4vw, 40px)",
            filter: "brightness(0.74) contrast(1.12)"
          }}
        />

        {/* Cinematic Multi-stop Vertical & Horizontal Gradients */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5, 5, 5, 0.65) 0%, rgba(5, 5, 5, 0.28) 35%, rgba(5, 5, 5, 0.82) 78%, #050505 100%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(5, 5, 5, 0.75) 0%, rgba(5, 5, 5, 0.38) 45%, rgba(5, 5, 5, 0.1) 75%, rgba(5, 5, 5, 0.45) 100%)"
          }}
        />

        {/* Subtle Red Atmospheric Glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            maxWidth: "600px",
            maxHeight: "600px",
            background: "radial-gradient(circle, rgba(225, 6, 0, 0.22) 0%, transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none"
          }}
        />

        {/* Film grain texture */}
        <div className="grain-overlay" />
      </div>

      {/* Hero Content Container */}
      <div
        className="container hero-content-wrap"
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "clamp(90px, 14vh, 160px)",
          paddingBottom: "clamp(40px, 7vh, 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <div style={{ maxWidth: "860px" }}>
          {/* Eyebrow */}
          <div className="eyebrow" style={{ color: "#D1D1CE" }}>
            HUBBALLI&apos;S PREMIER TRAINING SPACE
          </div>

          {/* Impactful Editorial Headline */}
          <h1 className="headline-hero" style={{ marginBottom: "clamp(16px, 2.8vh, 24px)" }}>
            BUILD <br />
            <span className="text-outlined" style={{ color: "transparent" }}>
              YOUR
            </span>{" "}
            <br />
            <span className="text-red">LEGACY.</span>
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 20px)",
              lineHeight: 1.55,
              color: "#C5C5C2",
              maxWidth: "520px",
              marginBottom: "clamp(24px, 4vh, 36px)",
              fontWeight: 400
            }}
          >
            Not just a gym. <br />
            <span style={{ color: "#F5F5F2", fontWeight: 600 }}>
              A place where discipline becomes identity.
            </span>
          </p>

          {/* CTAs: Full-width on mobile */}
          <div
            className="hero-cta-group"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "500px"
            }}
          >
            <button
              type="button"
              onClick={() => openModal()}
              className="btn btn-primary btn-mobile-full"
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              <MessageSquare size={18} />
              START YOUR JOURNEY
              <ArrowRight size={17} className="btn-icon" />
            </button>

            <a
              href="#experience"
              className="btn btn-secondary btn-mobile-full"
              style={{ fontSize: "13.5px" }}
            >
              EXPLORE THE GYM
            </a>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div
          className="scroll-indicator"
          style={{
            marginTop: "clamp(28px, 4.5vh, 48px)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.14em",
            textTransform: "uppercase"
          }}
        >
          <span>SCROLL TO DISCOVER</span>
          <ChevronDown size={14} className="bounce-subtle" color="var(--accent-red)" />
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 641px) {
          .hero-cta-group {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-content-wrap {
            padding-bottom: 80px !important;
          }
        }
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        .bounce-subtle {
          animation: subtleBounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
