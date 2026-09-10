"use client";

import React from "react";
import Image from "next/image";
import { BUSINESS_INFO, NAVIGATION_LINKS } from "@/lib/constants";
import { MessageSquare, Instagram, MapPin, ArrowUp, Phone, Clock, ArrowRight } from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export default function Footer() {
  const { openModal } = useEnquiryModal();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        paddingTop: "clamp(80px, 12vh, 140px)",
        paddingBottom: "clamp(48px, 8vh, 80px)",
        overflow: "hidden"
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Massive Outlined Brand Wordmark Banner */}
        <div
          className="footer-brand-watermark"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 9.5vw, 150px)",
            fontWeight: 900,
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            textTransform: "uppercase",
            marginBottom: "clamp(36px, 6vh, 80px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.16)",
            userSelect: "none",
            maxWidth: "100%",
            overflow: "hidden"
          }}
        >
          KARNATAKA GYM
        </div>

        {/* Rich Expanded 4-Column Editorial Grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(36px, 5vw, 64px)",
            marginBottom: "clamp(60px, 9vh, 90px)"
          }}
        >
          {/* Column 1: Brand & Facility Identity */}
          <div className="footer-col-brand" style={{ maxWidth: "480px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div
                style={{
                  position: "relative",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid rgba(225, 6, 0, 0.4)",
                  boxShadow: "0 0 20px rgba(225, 6, 0, 0.2)",
                  flexShrink: 0
                }}
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Karnataka Gym Crest"
                  fill
                  sizes="60px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "20px",
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    letterSpacing: "0.01em"
                  }}
                >
                  KARNATAKA GYM
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    color: "var(--accent-red)",
                    fontWeight: 700
                  }}
                >
                  FITNESS CENTRE
                </div>
              </div>
            </div>

            {/* Tagline */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.4vw, 30px)",
                fontWeight: 900,
                letterSpacing: "0.01em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                lineHeight: 1.15,
                marginBottom: "16px"
              }}
            >
              BUILD YOUR BODY. <br />
              <span className="text-red">BUILD YOUR LEGACY.</span>
            </h3>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                color: "#A0A09C",
                marginBottom: "24px",
                maxWidth: "420px"
              }}
            >
              Hubballi&apos;s dedicated fitness centre for genuine strength, physique transformation, and lifelong discipline. No gimmicks, just daily work.
            </p>

            {/* Location Pill */}
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                borderRadius: "3px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-medium)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all var(--transition-fast)"
              }}
              className="footer-badge"
            >
              <MapPin size={15} color="var(--accent-red)" />
              {BUSINESS_INFO.location}
            </a>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.4vw, 28px)",
                fontWeight: 900,
                letterSpacing: "0.03em",
                color: "var(--accent-red)",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}
            >
              NAVIGATION
            </div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
            >
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-nav-link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#DDDDDD",
                      transition: "all var(--transition-fast)"
                    }}
                  >
                    <ArrowRight size={16} className="nav-arrow" style={{ opacity: 0, transform: "translateX(-4px)", transition: "all 0.2s ease" }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Facility Schedule */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.4vw, 28px)",
                fontWeight: 900,
                letterSpacing: "0.03em",
                color: "var(--accent-red)",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}
            >
              TRAINING HOURS
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: "4px",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.2vw, 24px)",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: "var(--accent-red)",
                    textTransform: "uppercase",
                    marginBottom: "6px"
                  }}
                >
                  <Clock size={20} color="var(--accent-red)" style={{ flexShrink: 0 }} />
                  MON — SAT
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "15px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "#E0E0DC",
                    lineHeight: 1.4
                  }}
                >
                  5:30 AM — 10:00 PM
                </div>
              </div>

              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: "4px",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.2vw, 24px)",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    marginBottom: "6px"
                  }}
                >
                  <Clock size={20} color="#A0A09C" style={{ flexShrink: 0 }} />
                  SUNDAY
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "15px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "#E0E0DC",
                    lineHeight: 1.4
                  }}
                >
                  6:00 AM — 12:00 PM
                </div>
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#A0A09C",
                  lineHeight: 1.5,
                  marginTop: "2px"
                }}
              >
                Personal Training &amp; Strength Floor open 7 days a week.
              </div>
            </div>
          </div>

          {/* Column 4: Direct Access & Socials */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.4vw, 28px)",
                fontWeight: 900,
                letterSpacing: "0.03em",
                color: "var(--accent-red)",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}
            >
              DIRECT ACCESS
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={() => openModal()}
                className="footer-cta-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 20px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(225, 6, 0, 0.08)",
                  border: "1px solid rgba(225, 6, 0, 0.35)",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  transition: "all var(--transition-fast)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <MessageSquare size={24} color="var(--accent-red)" style={{ flexShrink: 0 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 2.2vw, 24px)",
                        fontWeight: 900,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        lineHeight: 1.15,
                        marginBottom: "4px"
                      }}
                    >
                      WhatsApp
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: "#E0E0DC",
                        lineHeight: 1.4
                      }}
                    >
                      Start Joining Enquiry
                    </div>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--accent-red)" style={{ flexShrink: 0 }} />
              </button>

              {/* Instagram Button */}
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 20px",
                  borderRadius: "4px",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-medium)",
                  color: "#FFFFFF",
                  transition: "all var(--transition-fast)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Instagram size={24} color="var(--accent-red)" style={{ flexShrink: 0 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 2.2vw, 24px)",
                        fontWeight: 900,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        lineHeight: 1.15,
                        marginBottom: "4px"
                      }}
                    >
                      Instagram
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "15px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: "#E0E0DC",
                        lineHeight: 1.4
                      }}
                    >
                      @riyaz_gokul
                    </div>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              </a>

              {/* Call Link */}
              <a
                href={BUSINESS_INFO.phoneTel}
                className="footer-cta-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 20px",
                  borderRadius: "4px",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-medium)",
                  color: "#FFFFFF",
                  transition: "all var(--transition-fast)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Phone size={24} color="var(--accent-red)" style={{ flexShrink: 0 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 2.2vw, 24px)",
                        fontWeight: 900,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        lineHeight: 1.15,
                        marginBottom: "4px"
                      }}
                    >
                      Direct Call
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "15px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: "#E0E0DC",
                        lineHeight: 1.4
                      }}
                    >
                      {BUSINESS_INFO.phone}
                    </div>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          className="footer-bottom-wrap"
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
              textAlign: "center",
              lineHeight: 1.6
            }}
          >
            © {currentYear} KARNATAKA GYM FITNESS CENTRE. ALL RIGHTS RESERVED. <br />
            <span style={{ color: "#E0E0DC", fontWeight: 600 }}>
              MADE FOR PEOPLE WHO SHOW UP. • HUBBALLI, KARNATAKA
            </span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="btn-back-to-top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#FFFFFF",
              textTransform: "uppercase",
              padding: "12px 20px",
              borderRadius: "3px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-surface)",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            BACK TO TOP
            <ArrowUp size={15} color="var(--accent-red)" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          padding-bottom: calc(var(--mobile-bar-h, 62px) + env(safe-area-inset-bottom, 0px) + 36px);
        }
        .footer-nav-link:hover {
          color: #FFFFFF !important;
          transform: translateX(4px);
        }
        .footer-nav-link:hover .nav-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
          color: var(--accent-red);
        }
        .footer-cta-card:hover {
          border-color: var(--accent-red) !important;
          background-color: rgba(225, 6, 0, 0.12) !important;
          transform: translateY(-2px);
        }
        .footer-badge:hover {
          border-color: var(--accent-red) !important;
          color: #FFFFFF !important;
        }
        .btn-back-to-top:hover {
          background-color: var(--accent-red) !important;
          border-color: var(--accent-red-bright) !important;
          color: #FFFFFF !important;
          transform: translateY(-2px);
        }
        .btn-back-to-top:hover :global(svg) {
          color: #FFFFFF !important;
        }
        @media (min-width: 900px) {
          .site-footer {
            padding-bottom: clamp(60px, 8vh, 90px) !important;
          }
          .footer-grid {
            grid-template-columns: 1.3fr 0.7fr 1.15fr 1.25fr !important;
          }
          .footer-bottom-wrap {
            flex-direction: row !important;
            text-align: left;
          }
          .footer-bottom-wrap > div {
            text-align: left !important;
          }
        }
      `}</style>
    </footer>
  );
}

