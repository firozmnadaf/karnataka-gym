import http from "node:http";

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function run() {
  console.log("Fetching http://localhost:3000 ...");
  const { status, body } = await fetchPage("http://localhost:3000");

  console.log(`Response status: ${status}`);
  if (status !== 200) {
    throw new Error(`Expected 200, got ${status}`);
  }

  // 1. Verify Justdial is NOT mentioned
  if (body.toLowerCase().includes("justdial")) {
    throw new Error("Found Justdial in response body, must be removed!");
  }
  console.log("✓ No Justdial references found in DOM");

  // 2. Verify all CTA buttons now have button elements instead of raw wa.me direct links
  const rawJoinLinks = (body.match(/href="https:\/\/wa\.me\/919902667407\?text=Hi/g) || []).length;
  console.log(`Raw direct WhatsApp join links in HTML: ${rawJoinLinks} (expected 0)`);
  if (rawJoinLinks > 0) {
    throw new Error(`Found ${rawJoinLinks} unconverted raw WhatsApp links!`);
  }
  console.log("✓ All WhatsApp links converted to Enquiry Modal triggers!");

  // 3. Verify Karnataka Gym brand and title
  if (!body.includes("KARNATAKA GYM")) {
    throw new Error("Missing Karnataka Gym brand name");
  }
  console.log("✓ Brand Karnataka Gym verified");

  // 4. Verify Floating WhatsApp or Mobile conversion bar
  if (!body.includes("mobile-conversion-bar")) {
    throw new Error("Missing mobile conversion bar");
  }
  console.log("✓ Mobile conversion bar verified");

  console.log("\n ALL DOM INTEGRATION CHECKS PASSED!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
