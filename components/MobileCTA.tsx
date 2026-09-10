"use client";

import React from "react";
import { BUSINESS_INFO } from "@/lib/constants";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function MobileCTA() {
  const { openModal } = useEnquiryModal();

  return (
    <aside
      className="mobile-conversion-bar"
      aria-label="Quick contact actions"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        backgroundColor: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderTop: "1px solid var(--border-subtle)",
        display: "grid",
        gridTemplateColumns: "1fr 1.25fr 1fr",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -8px 25px rgba(0, 0, 0, 0.6)"
      }}
    >
      {/* 1. CALL */}
      <a
        href={BUSINESS_INFO.phoneTel}
        aria-label="Call Karnataka Gym"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          height: "var(--mobile-bar-h)",
          color: "var(--text-muted)",
          textDecoration: "none",
          borderRight: "1px solid var(--border-subtle)",
          transition: "background var(--transition-fast)"
        }}
      >
        <Phone size={18} strokeWidth={2.2} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase"
          }}
        >
          CALL
        </span>
      </a>

      {/* 2. WHATSAPP (Visually stands out) */}
      <button
        type="button"
        onClick={() => openModal()}
        aria-label="Chat on WhatsApp with Karnataka Gym"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          height: "var(--mobile-bar-h)",
          backgroundColor: "var(--accent-red)",
          color: "#FFFFFF",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(225, 6, 0, 0.4)",
          position: "relative"
        }}
      >
        <MessageSquare size={19} strokeWidth={2.5} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.10em",
            textTransform: "uppercase"
          }}
        >
          WHATSAPP
        </span>
      </button>

      {/* 3. MAP */}
      <a
        href={BUSINESS_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Directions to Karnataka Gym on Google Maps"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          height: "var(--mobile-bar-h)",
          color: "var(--text-muted)",
          textDecoration: "none",
          borderLeft: "1px solid var(--border-subtle)",
          transition: "background var(--transition-fast)"
        }}
      >
        <MapPin size={18} strokeWidth={2.2} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase"
          }}
        >
          MAP
        </span>
      </a>

      <style jsx>{`
        @media (min-width: 769px) {
          .mobile-conversion-bar {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
