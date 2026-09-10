"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { BUSINESS_INFO, NAVIGATION_LINKS } from "@/lib/constants";
import { X, ArrowRight, Phone, MessageSquare, MapPin } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { openModal } = useEnquiryModal();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(20px, 4vw, 36px) var(--pad-x)",
        overflowY: "auto"
      }}
    >
      {/* Top bar inside menu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid var(--border-medium)"
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Karnataka Gym Logo"
              fill
              sizes="40px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "14px",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)"
              }}
            >
              KARNATAKA GYM
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                color: "var(--accent-red)"
              }}
            >
              FITNESS CENTRE
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          style={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-primary)"
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "36px 0"
        }}
      >
        {NAVIGATION_LINKS.map((link, idx) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              color: "var(--text-primary)"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 7vw, 42px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase"
              }}
            >
              {link.label}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <ArrowRight size={18} color="var(--accent-red)" />
            </span>
          </a>
        ))}
      </nav>

      {/* Bottom Quick Contact & Location */}
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}
        >
          <button
            type="button"
            onClick={() => {
              onClose();
              openModal();
            }}
            className="btn btn-primary"
            style={{ fontSize: "12px", padding: "12px 14px", minHeight: "46px", cursor: "pointer" }}
          >
            <MessageSquare size={16} />
            WhatsApp
          </button>
          <a
            href={BUSINESS_INFO.phoneTel}
            className="btn btn-secondary"
            style={{ fontSize: "12px", padding: "12px 14px", minHeight: "46px" }}
          >
            <Phone size={16} />
            Call Gym
          </a>
        </div>

        <a
          href={BUSINESS_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em"
          }}
        >
          <MapPin size={14} color="var(--accent-red)" />
          {BUSINESS_INFO.location}
        </a>
      </div>
    </div>
  );
}
