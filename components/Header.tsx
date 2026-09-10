"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BUSINESS_INFO, NAVIGATION_LINKS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import { Menu, MessageSquare } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function Header() {
  const { openModal } = useEnquiryModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          backgroundColor: scrolled ? "rgba(5, 5, 5, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "clamp(64px, 8vh, 80px)"
          }}
        >
          {/* Logo & Brand Name */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none"
            }}
            aria-label="Karnataka Gym Fitness Centre - Home"
          >
            <div
              style={{
                position: "relative",
                width: 42,
                height: 42,
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 0 16px rgba(225, 6, 0, 0.25)"
              }}
            >
              <Image
                src="/images/logo.jpg"
                alt="Karnataka Gym Logo"
                fill
                sizes="42px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(15px, 2vw, 17px)",
                  letterSpacing: "-0.03em",
                  color: "#F5F5F2",
                  lineHeight: 1.1
                }}
              >
                KARNATAKA GYM
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9.5px",
                  letterSpacing: "0.18em",
                  color: "#E10600",
                  fontWeight: 700,
                  lineHeight: 1
                }}
              >
                FITNESS CENTRE
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav"
            style={{
              display: "none",
              alignItems: "center",
              gap: "32px"
            }}
            aria-label="Main Navigation"
          >
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="desktop-nav-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "var(--text-muted)",
                  transition: "color var(--transition-fast)"
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action / Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Desktop WhatsApp CTA */}
            <button
              type="button"
              onClick={() => openModal()}
              className="desktop-nav-cta btn btn-primary"
              style={{
                display: "none",
                padding: "10px 20px",
                minHeight: "42px",
                fontSize: "12.5px",
                cursor: "pointer"
              }}
            >
              <MessageSquare size={15} />
              WHATSAPP
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="mobile-menu-trigger"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              style={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)"
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        <style jsx>{`
          .desktop-nav-link:hover {
            color: #F5F5F2 !important;
          }
          @media (min-width: 960px) {
            .desktop-nav {
              display: flex !important;
            }
            .desktop-nav-cta {
              display: inline-flex !important;
            }
            .mobile-menu-trigger {
              display: none !important;
            }
          }
        `}</style>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
