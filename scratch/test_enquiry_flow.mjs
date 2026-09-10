import assert from "node:assert";
import {
  validateEnquiryForm,
  buildEnquiryWhatsAppMessage,
  getWhatsAppClickToChatUrl,
  cleanIndianPhoneNumber,
  isValidIndianMobile,
  WHATSAPP_PHONE_NUMBER
} from "../lib/whatsapp.ts";

console.log("=== RUNNING ENQUIRY MODAL & WHATSAPP UNIT TESTS ===");

// 1. Phone validation tests
console.log("\n[1] Testing Indian Phone Cleaning & Validation...");
assert.strictEqual(cleanIndianPhoneNumber("9902667407"), "9902667407");
assert.strictEqual(cleanIndianPhoneNumber("+91 99026 67407"), "9902667407");
assert.strictEqual(cleanIndianPhoneNumber("09902667407"), "9902667407");
assert.strictEqual(cleanIndianPhoneNumber("+91-98765-43210"), "9876543210");

assert.strictEqual(isValidIndianMobile("9902667407"), true);
assert.strictEqual(isValidIndianMobile("8888888888"), true);
assert.strictEqual(isValidIndianMobile("7777777777"), true);
assert.strictEqual(isValidIndianMobile("6666666666"), true);
assert.strictEqual(isValidIndianMobile("5555555555"), false); // Invalid Indian mobile prefix
assert.strictEqual(isValidIndianMobile("990266740"), false); // 9 digits
assert.strictEqual(isValidIndianMobile("99026674071"), false); // 11 digits
console.log("✓ Phone cleaning and validation passed!");

// 2. Form validation tests
console.log("\n[2] Testing Form Validation...");
const emptyForm = {
  name: "",
  phone: "",
  goal: "",
  experience: "",
  preferredTime: "",
  interestedIn: [],
  visitDate: "",
  message: ""
};
const emptyErrors = validateEnquiryForm(emptyForm);
assert(emptyErrors.name, "Should flag missing name");
assert(emptyErrors.phone, "Should flag missing phone");
assert(emptyErrors.goal, "Should flag missing goal");
assert(emptyErrors.experience, "Should flag missing experience");
assert(emptyErrors.preferredTime, "Should flag missing preferred time");
assert(emptyErrors.interestedIn, "Should flag missing interestedIn");
console.log("✓ Empty form correctly rejected with all errors:", Object.keys(emptyErrors));

const validForm = {
  name: "Arjun Kumar",
  phone: "9902667407",
  goal: "Muscle Gain",
  experience: "Intermediate",
  preferredTime: "Morning",
  interestedIn: ["Gym Membership", "Personal Training"],
  visitDate: "2026-09-15",
  message: "Looking for 6-month strength membership and coaching."
};
const validErrors = validateEnquiryForm(validForm);
assert.strictEqual(Object.keys(validErrors).length, 0, "Valid form should have zero errors");
console.log("✓ Valid form passes with 0 errors!");

// 3. WhatsApp Message Formatting Test
console.log("\n[3] Testing WhatsApp Message Generation...");
const generatedMessage = buildEnquiryWhatsAppMessage(validForm);
console.log("Generated Message:\n------------------------------------");
console.log(generatedMessage);
console.log("------------------------------------");

assert(generatedMessage.includes("🏋️ *KARNATAKA GYM FITNESS CENTRE*"), "Must contain header");
assert(generatedMessage.includes("*Name:* Arjun Kumar"), "Must contain Name");
assert(generatedMessage.includes("*Phone:* 9902667407"), "Must contain Phone");
assert(generatedMessage.includes("*Fitness Goal:* Muscle Gain"), "Must contain Goal");
assert(generatedMessage.includes("*Experience:* Intermediate"), "Must contain Experience");
assert(generatedMessage.includes("*Preferred Time:* Morning"), "Must contain Preferred Time");
assert(generatedMessage.includes("*Interested In:* Gym Membership, Personal Training"), "Must contain Interested In");
assert(generatedMessage.includes("*Preferred Visit Date:* 15 Sep") || generatedMessage.includes("*Preferred Visit Date:* 15 Sept 2026"), "Must contain formatted date");
assert(generatedMessage.includes("*Message / Questions:* Looking for 6-month strength membership and coaching."), "Must contain Questions");
assert(generatedMessage.includes("I'm interested in joining Karnataka Gym Fitness Centre."), "Must contain closing CTA");
console.log("✓ WhatsApp message matches requested format exactly!");

// 4. WhatsApp Click-to-Chat URL Test
console.log("\n[4] Testing WhatsApp Click-to-Chat URL Generation...");
const waUrl = getWhatsAppClickToChatUrl(validForm);
console.log("Generated WhatsApp URL:\n", waUrl);
assert(waUrl.startsWith("https://wa.me/919902667407?text="), "Must use official click-to-chat format with 9902667407");
assert(waUrl.includes(encodeURIComponent("🏋️ *KARNATAKA GYM FITNESS CENTRE*")), "Must properly URL-encode message");
console.log("✓ Target phone number is exactly:", WHATSAPP_PHONE_NUMBER);
console.log("✓ URL generation passed!");

console.log("\n ALL UNIT TESTS PASSED SUCCESSFULLY!");
