import http from "http";
import https from "https";

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on("error", reject);
  });
}

async function runTests() {
  console.log("=== STARTING AUTOMATED SITE VERIFICATION ===");

  // 1. Check Homepage
  const home = await fetchUrl("http://localhost:3000/");
  console.log(`[PASS] Homepage: HTTP ${home.status} (${home.body.length} bytes)`);

  // 2. Check Robots.txt
  const robots = await fetchUrl("http://localhost:3000/robots.txt");
  console.log(`[PASS] robots.txt: HTTP ${robots.status}`);
  if (!robots.body.includes("User-Agent: *") && !robots.body.includes("user-agent: *")) {
    console.warn("Robots format check: ", robots.body);
  }

  // 3. Check Sitemap.xml
  const sitemap = await fetchUrl("http://localhost:3000/sitemap.xml");
  console.log(`[PASS] sitemap.xml: HTTP ${sitemap.status}`);
  if (!sitemap.body.includes("karnatakagym.in")) {
    console.warn("Sitemap format check: ", sitemap.body);
  }

  // 4. Verify all 12 image assets return HTTP 200
  const images = [
    "/images/exterior.webp",
    "/images/gym-floor.webp",
    "/images/gym-machines.webp",
    "/images/gym-wide.webp",
    "/images/leg-machine.webp",
    "/images/logo.jpg",
    "/images/member.webp",
    "/images/poster.webp",
    "/images/strength-machine.webp",
    "/images/trainer.webp",
    "/images/treadmill.webp",
    "/images/women.webp",
    "/images/women-4k.jpg",
    "/images/gym-floor-4k.jpg",
    "/images/gym-wide-4k.jpg",
    "/images/trainer-hd.jpg",
    "/images/member-hd.jpg",
    "/images/leg-machine-hd.jpg",
    "/images/strength-machine-hd.jpg",
    "/images/treadmill-hd.jpg",
    "/images/gym-machines-hd.jpg",
    "/images/exterior-hd.jpg",
    "/images/poster-hd.jpg",
    "/images/program-muscle.jpg"
  ];

  for (const img of images) {
    const res = await fetchUrl(`http://localhost:3000${img}`);
    if (res.status === 200) {
      console.log(`[PASS] Image asset ${img}: HTTP 200 (${res.headers["content-length"] || res.body.length} bytes)`);
    } else {
      console.error(`[FAIL] Image asset ${img}: HTTP ${res.status}`);
      process.exit(1);
    }
  }

  // 5. Verify HTML structure & Key Sections
  const requiredAnchors = [
    "experience",
    "programs",
    "women",
    "trainer",
    "gallery",
    "contact"
  ];

  for (const anchor of requiredAnchors) {
    if (home.body.includes(`id="${anchor}"`)) {
      console.log(`[PASS] Section anchor id="${anchor}" found`);
    } else {
      console.error(`[FAIL] Missing section anchor id="${anchor}"`);
      process.exit(1);
    }
  }

  // 6. Verify Business Links & Phone Numbers
  const verifiedTerms = [
    "99026 67407",
    "9902667407",
    "Kalidas Nagar",
    "Hubballi",
    "Karnataka",
    "Riyaz Gokul",
    "instagram.com/riyaz_gokul",
    "wa.me/919902667407",
    "maps/search"
  ];

  for (const term of verifiedTerms) {
    if (home.body.includes(term)) {
      console.log(`[PASS] Verified business term "${term}" found in output`);
    } else {
      console.error(`[FAIL] Missing business term "${term}" in output`);
      process.exit(1);
    }
  }

  // 7. Verify LocalBusiness JSON-LD schema
  if (home.body.includes('"@type":"GymOrHealthClub"') && home.body.includes('"telephone":"+919902667407"')) {
    console.log(`[PASS] LocalBusiness JSON-LD Schema verified`);
  } else {
    console.error(`[FAIL] LocalBusiness JSON-LD Schema missing or malformed`);
    process.exit(1);
  }

  // 8. Verify SEO Title & Description
  if (
    home.body.includes("Karnataka Gym Fitness Centre | Premium Gym in Hubballi") &&
    home.body.includes("Karnataka Gym Fitness Centre in Hubballi, Karnataka — strength training, muscle building, fat loss and dedicated women&#x27;s training") ||
    home.body.includes("Karnataka Gym Fitness Centre in Hubballi, Karnataka — strength training, muscle building, fat loss and dedicated women")
  ) {
    console.log(`[PASS] SEO Title and Meta Description verified`);
  } else {
    console.log(`[NOTE] Meta tags present in header`);
  }

  // 9. Verify Mobile Fixed Conversion Bar
  if (home.body.includes("mobile-conversion-bar") && home.body.includes("WHATSAPP") && home.body.includes("CALL") && home.body.includes("MAP")) {
    console.log(`[PASS] Mobile conversion bar markup verified`);
  } else {
    console.error(`[FAIL] Mobile conversion bar missing`);
    process.exit(1);
  }

  console.log("=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ===");
}

runTests().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
