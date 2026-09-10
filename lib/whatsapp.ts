export const WHATSAPP_PHONE_NUMBER = "9902667407";
export const WHATSAPP_COUNTRY_CODE = "91";

export const GOAL_OPTIONS = [
  "Weight Loss",
  "Muscle Gain",
  "Strength",
  "General Fitness",
  "Bodybuilding",
  "Other"
] as const;

export type GoalOption = (typeof GOAL_OPTIONS)[number];

export const EXPERIENCE_OPTIONS = [
  "Beginner",
  "Intermediate",
  "Experienced"
] as const;

export type ExperienceOption = (typeof EXPERIENCE_OPTIONS)[number];

export const TIME_OPTIONS = [
  "Morning",
  "Afternoon",
  "Evening"
] as const;

export type TimeOption = (typeof TIME_OPTIONS)[number];

export const INTEREST_OPTIONS = [
  "Gym Membership",
  "Personal Training",
  "Ladies Gym"
] as const;

export type InterestOption = (typeof INTEREST_OPTIONS)[number];

export interface EnquiryFormData {
  name: string;
  phone: string;
  goal: GoalOption | "";
  experience: ExperienceOption | "";
  preferredTime: TimeOption | "";
  interestedIn: InterestOption[];
  visitDate: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  goal?: string;
  experience?: string;
  preferredTime?: string;
  interestedIn?: string;
}

/**
 * Strips formatting, whitespace, and country code/leading zeros from phone input
 * to extract a clean 10-digit Indian mobile number.
 */
export function cleanIndianPhoneNumber(rawPhone: string): string {
  const digitsOnly = rawPhone.replace(/\D/g, "");
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    return digitsOnly.slice(2);
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    return digitsOnly.slice(1);
  }
  return digitsOnly;
}

/**
 * Validates 10-digit Indian mobile number (must start with 6, 7, 8, or 9).
 */
export function isValidIndianMobile(cleanPhone: string): boolean {
  return /^[6-9]\d{9}$/.test(cleanPhone);
}

/**
 * Validates the entire enquiry form.
 * Returns errors object; if empty, the form is valid.
 */
export function validateEnquiryForm(data: EnquiryFormData): FormErrors {
  const errors: FormErrors = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = "Please enter your full name.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const cleanedPhone = cleanIndianPhoneNumber(data.phone);
  if (!cleanedPhone) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidIndianMobile(cleanedPhone)) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
  }

  if (!data.goal) {
    errors.goal = "Please select your primary fitness goal.";
  }

  if (!data.experience) {
    errors.experience = "Please select your experience level.";
  }

  if (!data.preferredTime) {
    errors.preferredTime = "Please select your preferred workout time.";
  }

  if (!data.interestedIn || data.interestedIn.length === 0) {
    errors.interestedIn = "Please select at least one interest.";
  }

  return errors;
}

/**
 * Formats a date string (YYYY-MM-DD) to a reader-friendly format, e.g. "15 Sep 2026".
 */
export function formatFriendlyDate(dateStr: string): string {
  if (!dateStr) return "Not specified";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}

/**
 * Builds the exact formatted WhatsApp message requested by Karnataka Gym.
 */
export function buildEnquiryWhatsAppMessage(data: EnquiryFormData): string {
  const cleanedPhone = cleanIndianPhoneNumber(data.phone) || data.phone.trim();
  const interestedInText =
    data.interestedIn.length > 0 ? data.interestedIn.join(", ") : "Gym Membership";
  const visitDateText = data.visitDate ? formatFriendlyDate(data.visitDate) : "Flexible / To be discussed";
  const questionsText = data.message.trim() ? data.message.trim() : "None";

  const lines = [
    "🏋️ *KARNATAKA GYM FITNESS CENTRE*",
    "*New Joining Enquiry*",
    "━━━━━━━━━━━━━━━━",
    `*Name:* ${data.name.trim()}`,
    `*Phone:* ${cleanedPhone}`,
    `*Fitness Goal:* ${data.goal || "General Fitness"}`,
    `*Experience:* ${data.experience || "Beginner"}`,
    `*Preferred Time:* ${data.preferredTime || "Morning"}`,
    `*Interested In:* ${interestedInText}`,
    `*Preferred Visit Date:* ${visitDateText}`,
    `*Message / Questions:* ${questionsText}`,
    "━━━━━━━━━━━━━━━━",
    "I'm interested in joining Karnataka Gym Fitness Centre. Please contact me regarding membership and visit details."
  ];

  return lines.join("\n");
}

/**
 * Generates the official WhatsApp click-to-chat URL with the formatted message.
 */
export function getWhatsAppClickToChatUrl(data: EnquiryFormData): string {
  const message = buildEnquiryWhatsAppMessage(data);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;
}
