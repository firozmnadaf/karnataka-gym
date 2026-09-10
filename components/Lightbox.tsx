"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function Lightbox({ currentIndex, onClose, onSelectIndex }: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const isOpen = currentIndex !== null;
  const currentItem = currentIndex !== null ? GALLERY_ITEMS[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onSelectIndex(currentIndex > 0 ? currentIndex - 1 : GALLERY_ITEMS.length - 1);
      } else if (e.key === "ArrowRight") {
        onSelectIndex(currentIndex < GALLERY_ITEMS.length - 1 ? currentIndex + 1 : 0);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, onClose, onSelectIndex]);

  if (!isOpen || !currentItem || currentIndex === null) return null;

  const minSwipeDist = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > minSwipeDist) {
      // swipe left -> next
      onSelectIndex(currentIndex < GALLERY_ITEMS.length - 1 ? currentIndex + 1 : 0);
    } else if (dist < -minSwipeDist) {
      // swipe right -> prev
      onSelectIndex(currentIndex > 0 ? currentIndex - 1 : GALLERY_ITEMS.length - 1);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Lightbox"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(5, 5, 5, 0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(16px, 3vw, 32px)"
      }}
    >
      {/* Top Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          width: "100%"
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            letterSpacing: "0.14em",
            color: "var(--text-muted)",
            fontWeight: 700
          }}
        >
          <span style={{ color: "var(--accent-red)" }}>0{currentIndex + 1}</span> / 0{GALLERY_ITEMS.length}
        </div>

        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid var(--border-medium)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            cursor: "pointer",
            transition: "background var(--transition-fast)"
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image Area with Prev / Next Buttons */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "12px 0"
        }}
      >
        {/* Prev Arrow */}
        <button
          onClick={() =>
            onSelectIndex(currentIndex > 0 ? currentIndex - 1 : GALLERY_ITEMS.length - 1)
          }
          aria-label="Previous Image"
          style={{
            position: "absolute",
            left: "10px",
            zIndex: 10,
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "rgba(10, 10, 10, 0.8)",
            border: "1px solid var(--border-medium)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            cursor: "pointer"
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Arrow */}
        <button
          onClick={() =>
            onSelectIndex(currentIndex < GALLERY_ITEMS.length - 1 ? currentIndex + 1 : 0)
          }
          aria-label="Next Image"
          style={{
            position: "absolute",
            right: "10px",
            zIndex: 10,
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "rgba(10, 10, 10, 0.8)",
            border: "1px solid var(--border-medium)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            cursor: "pointer"
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Center Container for Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            maxHeight: "75vh",
            maxWidth: "1200px",
            borderRadius: "18px",
            overflow: "hidden"
          }}
        >
          <Image
            src={currentItem.src}
            alt={currentItem.title}
            fill
            sizes="95vw"
            priority
            style={{
              objectFit: "contain",
              borderRadius: "18px"
            }}
          />
        </div>
      </div>

      {/* Bottom Caption & Subtitle */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "12px",
          borderTop: "1px solid var(--border-subtle)",
          zIndex: 10
        }}
      >
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 800,
            color: "#FFFFFF",
            textTransform: "uppercase",
            marginBottom: "4px"
          }}
        >
          {currentItem.title}
        </h4>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
            letterSpacing: "0.08em"
          }}
        >
          {currentItem.subtitle}
        </p>
      </div>
    </div>
  );
}
