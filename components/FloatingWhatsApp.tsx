"use client";

import React, { useState, useEffect } from "react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";
import { MessageSquare } from "lucide-react";

export default function FloatingWhatsApp() {
  const { openModal } = useEnquiryModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after initial scroll or 1.5 seconds
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(() => setVisible(true), 1500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="floating-whatsapp-wrap"
      style={{
        position: "fixed",
        right: "clamp(16px, 3vw, 28px)",
        bottom: "clamp(20px, 3.5vw, 32px)",
        zIndex: 75,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animation: "floatEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}
    >
      <button
        type="button"
        onClick={() => openModal()}
        aria-label="Enquire on WhatsApp - Karnataka Gym Fitness Centre"
        className="floating-whatsapp-btn"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 18px",
          borderRadius: "50px",
          backgroundColor: "#E10600",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#FFFFFF",
          boxShadow:
            "0 10px 30px rgba(225, 6, 0, 0.55), 0 0 20px rgba(225, 6, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
          cursor: "pointer",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative"
        }}
      >
        {/* Pulsing indicator ring */}
        <span className="pulse-ring" />

        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MessageSquare size={18} strokeWidth={2.4} />
        </div>

        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12.5px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1
            }}
          >
            ENQUIRE NOW
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9.5px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.2,
              marginTop: "2px"
            }}
          >
            WHATSAPP CHAT
          </div>
        </div>
      </button>

      <style jsx>{`
        @keyframes floatEnter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 54px;
          border: 2px solid rgba(225, 6, 0, 0.6);
          animation: ringPulse 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          pointer-events: none;
        }
        @keyframes ringPulse {
          0% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }
        .floating-whatsapp-btn:hover {
          transform: translateY(-3px) scale(1.03);
          background-color: #FF1A14 !important;
          box-shadow: 0 16px 45px rgba(225, 6, 0, 0.75), 0 0 30px rgba(225, 6, 0, 0.45) !important;
        }
        @media (max-width: 768px) {
          /* On mobile, MobileCTA bar handles quick actions at bottom; hide floating button to prevent overlap */
          .floating-whatsapp-wrap {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
