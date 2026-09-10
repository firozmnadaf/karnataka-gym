"use client";

import React, { useState, useEffect, useRef } from "react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";
import {
  GOAL_OPTIONS,
  EXPERIENCE_OPTIONS,
  TIME_OPTIONS,
  INTEREST_OPTIONS,
  type GoalOption,
  type ExperienceOption,
  type TimeOption,
  type InterestOption,
  type EnquiryFormData,
  type FormErrors,
  validateEnquiryForm,
  getWhatsAppClickToChatUrl,
  cleanIndianPhoneNumber
} from "@/lib/whatsapp";
import {
  X,
  Check,
  MessageSquare,
  User,
  Phone,
  Calendar,
  Sparkles,
  ArrowRight,
  Loader2,
  Clock,
  Dumbbell
} from "lucide-react";

export default function EnquiryModal() {
  const { isOpen, closeModal, initialData } = useEnquiryModal();

  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    phone: "",
    goal: "",
    experience: "",
    preferredTime: "",
    interestedIn: ["Gym Membership"],
    visitDate: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Today's date in YYYY-MM-DD for datepicker min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  // Initialize or reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        goal: initialData.goal || "",
        experience: initialData.experience || "",
        preferredTime: initialData.preferredTime || "",
        interestedIn:
          initialData.interestedIn && initialData.interestedIn.length > 0
            ? initialData.interestedIn
            : ["Gym Membership"],
        visitDate: initialData.visitDate || "",
        message: initialData.message || ""
      });
      setErrors({});
      setTouched({});
      setSubmitting(false);
      setIsSuccess(false);

      // Lock background scrolling
      document.body.style.overflow = "hidden";

      // Focus first input after slight delay for animation
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 120);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, initialData]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const handleFieldBlur = (field: keyof EnquiryFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateEnquiryForm(formData);
    setErrors(currentErrors);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, spaces, dashes, + for friendly typing, but limit length
    const cleaned = cleanIndianPhoneNumber(val);
    if (cleaned.length <= 10 || val.length <= 15) {
      setFormData((prev) => ({ ...prev, phone: val }));
      if (touched.phone) {
        const errs = validateEnquiryForm({ ...formData, phone: val });
        setErrors((prev) => ({ ...prev, phone: errs.phone }));
      }
    }
  };

  const handleGoalSelect = (goal: GoalOption) => {
    setFormData((prev) => ({ ...prev, goal }));
    setErrors((prev) => ({ ...prev, goal: undefined }));
  };

  const handleExperienceSelect = (experience: ExperienceOption) => {
    setFormData((prev) => ({ ...prev, experience }));
    setErrors((prev) => ({ ...prev, experience: undefined }));
  };

  const handleTimeSelect = (preferredTime: TimeOption) => {
    setFormData((prev) => ({ ...prev, preferredTime }));
    setErrors((prev) => ({ ...prev, preferredTime: undefined }));
  };

  const handleInterestToggle = (interest: InterestOption) => {
    setFormData((prev) => {
      const exists = prev.interestedIn.includes(interest);
      let updated: InterestOption[];
      if (exists) {
        // Prevent deselecting all (require at least 1)
        if (prev.interestedIn.length === 1) {
          updated = prev.interestedIn;
        } else {
          updated = prev.interestedIn.filter((item) => item !== interest);
        }
      } else {
        updated = [...prev.interestedIn, interest];
      }
      return { ...prev, interestedIn: updated };
    });
    setErrors((prev) => ({ ...prev, interestedIn: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      phone: true,
      goal: true,
      experience: true,
      preferredTime: true,
      interestedIn: true
    });

    const validationErrors = validateEnquiryForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to top of modal to display errors
      if (modalCardRef.current) {
        modalCardRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setSubmitting(true);

    // Prepare WhatsApp URL
    const waUrl = getWhatsAppClickToChatUrl(formData);

    // Provide a smooth, premium loading & success transition
    setTimeout(() => {
      setIsSuccess(true);

      setTimeout(() => {
        // Open WhatsApp click-to-chat
        const win = window.open(waUrl, "_blank", "noopener,noreferrer");
        if (!win || win.closed || typeof win.closed === "undefined") {
          // Fallback if popup blocked
          window.location.href = waUrl;
        }

        // Close modal gracefully after launching
        setTimeout(() => {
          setSubmitting(false);
          setIsSuccess(false);
          closeModal();
        }, 1200);
      }, 600);
    }, 500);
  };

  return (
    <div
      className="enquiry-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 3vw, 24px)",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}
    >
      <div
        ref={modalCardRef}
        className="enquiry-modal-card"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "92dvh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "clamp(14px, 2.5vw, 20px)",
          backgroundColor: "#0B0B0E",
          border: "1px solid rgba(225, 6, 0, 0.4)",
          boxShadow:
            "0 30px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(225, 6, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          animation: "modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
      >
        {/* Top Glowing Red Edge Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, #E10600 25%, #FF3B30 50%, #E10600 75%, transparent 100%)",
            zIndex: 10
          }}
        />

        {/* Modal Sticky Header */}
        <div
          style={{
            position: "relative",
            padding: "clamp(18px, 3.5vw, 26px) clamp(18px, 3.5vw, 28px) 16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            backgroundColor: "#0B0B0E",
            zIndex: 5
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: "var(--accent-red)",
                textTransform: "uppercase",
                marginBottom: "6px"
              }}
            >
              <Dumbbell size={14} color="var(--accent-red)" />
              KARNATAKA GYM FITNESS CENTRE
            </div>
            <h2
              id="enquiry-modal-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 4vw, 28px)",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                textTransform: "uppercase"
              }}
            >
              JOINING <span style={{ color: "var(--accent-red)" }}>ENQUIRY</span>
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                marginTop: "4px",
                lineHeight: 1.4
              }}
            >
              Fill in your details below to connect directly with our fitness team on WhatsApp.
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="modal-close-btn"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s ease"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "clamp(18px, 3.5vw, 28px)",
            gap: "22px"
          }}
        >
          {/* General Validation Banner if errors present */}
          {Object.keys(errors).length > 0 && Object.values(touched).some(Boolean) && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                backgroundColor: "rgba(225, 6, 0, 0.12)",
                border: "1px solid rgba(225, 6, 0, 0.4)",
                color: "#FF8580",
                fontSize: "12.5px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span>Please complete the required fields marked below.</span>
            </div>
          )}

          {/* 1. Full Name */}
          <div>
            <label
              htmlFor="enquiry-name"
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#F5F5F2",
                textTransform: "uppercase",
                marginBottom: "8px"
              }}
            >
              FULL NAME <span style={{ color: "var(--accent-red)" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none"
                }}
              >
                <User size={17} />
              </div>
              <input
                ref={nameInputRef}
                id="enquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  if (touched.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                onBlur={() => handleFieldBlur("name")}
                className="form-input"
                style={{
                  width: "100%",
                  padding: "13px 14px 13px 42px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: errors.name && touched.name
                    ? "1px solid #FF3B30"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  fontSize: "14.5px",
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}
              />
            </div>
            {errors.name && touched.name && (
              <p style={{ color: "#FF5247", fontSize: "11.5px", marginTop: "5px" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* 2. Phone Number */}
          <div>
            <label
              htmlFor="enquiry-phone"
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#F5F5F2",
                textTransform: "uppercase",
                marginBottom: "8px"
              }}
            >
              PHONE NUMBER (10-DIGIT MOBILE) <span style={{ color: "var(--accent-red)" }}>*</span>
            </label>
            <div style={{ position: "relative", display: "flex", gap: "8px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#E2E2DF",
                  letterSpacing: "0.04em",
                  userSelect: "none"
                }}
              >
                🇮🇳 +91
              </div>
              <div style={{ position: "relative", flex: 1 }}>
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    pointerEvents: "none"
                  }}
                >
                  <Phone size={17} />
                </div>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={() => handleFieldBlur("phone")}
                  className="form-input"
                  style={{
                    width: "100%",
                    padding: "13px 14px 13px 42px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: errors.phone && touched.phone
                      ? "1px solid #FF3B30"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    fontSize: "14.5px",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.04em",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                />
              </div>
            </div>
            {errors.phone && touched.phone && (
              <p style={{ color: "#FF5247", fontSize: "11.5px", marginTop: "5px" }}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* 3. Your Goal */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}
            >
              <label
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#F5F5F2",
                  textTransform: "uppercase"
                }}
              >
                YOUR GOAL <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Select one
              </span>
            </div>
            <div
              className="chips-grid chips-grid-goals"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: "8px"
              }}
            >
              {GOAL_OPTIONS.map((goal) => {
                const selected = formData.goal === goal;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleGoalSelect(goal)}
                    className="chip-btn"
                    style={{
                      padding: "11px 12px",
                      borderRadius: "8px",
                      border: selected
                        ? "1px solid #E10600"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: selected
                        ? "rgba(225, 6, 0, 0.18)"
                        : "rgba(255, 255, 255, 0.03)",
                      color: selected ? "#FFFFFF" : "#C5C5C2",
                      boxShadow: selected ? "0 0 14px rgba(225, 6, 0, 0.22)" : "none",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      fontWeight: selected ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.18s ease"
                    }}
                  >
                    {selected && <Check size={14} color="#E10600" strokeWidth={3} />}
                    {goal}
                  </button>
                );
              })}
            </div>
            {errors.goal && touched.goal && (
              <p style={{ color: "#FF5247", fontSize: "11.5px", marginTop: "5px" }}>
                {errors.goal}
              </p>
            )}
          </div>

          {/* 4. Experience Level */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}
            >
              <label
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#F5F5F2",
                  textTransform: "uppercase"
                }}
              >
                EXPERIENCE LEVEL <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Select one
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px"
              }}
            >
              {EXPERIENCE_OPTIONS.map((level) => {
                const selected = formData.experience === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleExperienceSelect(level)}
                    className="chip-btn"
                    style={{
                      padding: "11px 12px",
                      borderRadius: "8px",
                      border: selected
                        ? "1px solid #E10600"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: selected
                        ? "rgba(225, 6, 0, 0.18)"
                        : "rgba(255, 255, 255, 0.03)",
                      color: selected ? "#FFFFFF" : "#C5C5C2",
                      boxShadow: selected ? "0 0 14px rgba(225, 6, 0, 0.22)" : "none",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      fontWeight: selected ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.18s ease"
                    }}
                  >
                    {selected && <Check size={14} color="#E10600" strokeWidth={3} />}
                    {level}
                  </button>
                );
              })}
            </div>
            {errors.experience && touched.experience && (
              <p style={{ color: "#FF5247", fontSize: "11.5px", marginTop: "5px" }}>
                {errors.experience}
              </p>
            )}
          </div>

          {/* 5. Preferred Time */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}
            >
              <label
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#F5F5F2",
                  textTransform: "uppercase"
                }}
              >
                PREFERRED WORKOUT TIME <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Select one
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px"
              }}
            >
              {TIME_OPTIONS.map((time) => {
                const selected = formData.preferredTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className="chip-btn"
                    style={{
                      padding: "11px 12px",
                      borderRadius: "8px",
                      border: selected
                        ? "1px solid #E10600"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: selected
                        ? "rgba(225, 6, 0, 0.18)"
                        : "rgba(255, 255, 255, 0.03)",
                      color: selected ? "#FFFFFF" : "#C5C5C2",
                      boxShadow: selected ? "0 0 14px rgba(225, 6, 0, 0.22)" : "none",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      fontWeight: selected ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.18s ease"
                    }}
                  >
                    {selected && <Check size={14} color="#E10600" strokeWidth={3} />}
                    {time}
                  </button>
                );
              })}
            </div>
            {errors.preferredTime && touched.preferredTime && (
              <p style={{ color: "#FF5247", fontSize: "11.5px", marginTop: "5px" }}>
                {errors.preferredTime}
              </p>
            )}
          </div>

          {/* 6. Interested In (Multiple Selection) */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}
            >
              <label
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#F5F5F2",
                  textTransform: "uppercase"
                }}
              >
                INTERESTED IN <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <span style={{ fontSize: "11px", color: "var(--accent-red)" }}>
                Multiple selections allowed
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "8px"
              }}
            >
              {INTEREST_OPTIONS.map((interest) => {
                const isSelected = formData.interestedIn.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className="chip-btn"
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: isSelected
                        ? "1px solid #E10600"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: isSelected
                        ? "rgba(225, 6, 0, 0.22)"
                        : "rgba(255, 255, 255, 0.03)",
                      color: isSelected ? "#FFFFFF" : "#C5C5C2",
                      boxShadow: isSelected ? "0 0 16px rgba(225, 6, 0, 0.25)" : "none",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      transition: "all 0.18s ease"
                    }}
                  >
                    <span>{interest}</span>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "4px",
                        backgroundColor: isSelected ? "#E10600" : "rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.interestedIn && touched.interestedIn && (
              <p style={{ color: "#FF5247", fontSize: "11.5px", marginTop: "5px" }}>
                {errors.interestedIn}
              </p>
            )}
          </div>

          {/* 7. Visit Date Picker (Optional) */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}
            >
              <label
                htmlFor="enquiry-visit-date"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#F5F5F2",
                  textTransform: "uppercase"
                }}
              >
                WHEN WOULD YOU LIKE TO VISIT?
              </label>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Optional
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none"
                }}
              >
                <Calendar size={17} />
              </div>
              <input
                id="enquiry-visit-date"
                name="visitDate"
                type="date"
                min={todayStr}
                value={formData.visitDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, visitDate: e.target.value }))
                }
                className="form-input form-input-date"
                style={{
                  width: "100%",
                  padding: "13px 14px 13px 42px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontFamily: "var(--font-mono)",
                  outline: "none",
                  transition: "border-color 0.2s",
                  colorScheme: "dark"
                }}
              />
            </div>
          </div>

          {/* 8. Message / Questions (Optional) */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}
            >
              <label
                htmlFor="enquiry-message"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#F5F5F2",
                  textTransform: "uppercase"
                }}
              >
                MESSAGE / QUESTIONS
              </label>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Optional
              </span>
            </div>
            <textarea
              id="enquiry-message"
              name="message"
              rows={3}
              placeholder="Tell us anything you'd like to know..."
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="form-input"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                fontSize: "14px",
                fontFamily: "inherit",
                outline: "none",
                resize: "vertical",
                minHeight: "75px",
                transition: "border-color 0.2s, box-shadow 0.2s"
              }}
            />
          </div>

          {/* Sticky/Bottom CTA Action */}
          <div
            style={{
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="btn-modal-submit"
              style={{
                width: "100%",
                minHeight: "52px",
                padding: "14px 24px",
                borderRadius: "6px",
                background: isSuccess
                  ? "linear-gradient(135deg, #00C853 0%, #009624 100%)"
                  : "linear-gradient(135deg, #E10600 0%, #BA0000 100%)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: isSuccess
                  ? "0 8px 30px rgba(0, 200, 83, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                  : "0 10px 32px rgba(225, 6, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: "14.5px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: submitting ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              {submitting ? (
                isSuccess ? (
                  <>
                    <Check size={19} color="#FFFFFF" strokeWidth={3} />
                    <span>PREPARING WHATSAPP...</span>
                  </>
                ) : (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    <span>PROCESSING...</span>
                  </>
                )
              ) : (
                <>
                  <MessageSquare size={18} />
                  <span>CONTINUE TO WHATSAPP</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "11.5px",
                color: "var(--text-muted)",
                lineHeight: 1.4
              }}
            >
              Opens WhatsApp click-to-chat with your pre-filled details. You can review and press Send yourself.
            </p>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .form-input:focus {
          border-color: #E10600 !important;
          box-shadow: 0 0 0 2px rgba(225, 6, 0, 0.25) !important;
        }
        .modal-close-btn:hover {
          background-color: rgba(225, 6, 0, 0.25) !important;
          border-color: #E10600 !important;
          color: #FFFFFF !important;
          transform: rotate(90deg);
        }
        .chip-btn:hover {
          border-color: rgba(225, 6, 0, 0.5) !important;
          background-color: rgba(225, 6, 0, 0.08) !important;
          color: #FFFFFF !important;
        }
        .btn-modal-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #FF1A14 0%, #D60000 100%) !important;
          box-shadow: 0 14px 40px rgba(225, 6, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.45) !important;
          transform: translateY(-1px);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
