import http from "http";
import https from "https";
import fs from "fs";
import path from "path";

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

async function runAudit() {
  console.log("==================================================");
  console.log("   KARNATAKA GYM — EXHAUSTIVE FULL-SITE AUDIT    ");
  console.log("==================================================\n");

  let errorCount = 0;
  let warnCount = 0;

  function report(pass, msg, isWarn = false) {
    if (pass) {
      console.log(`[PASS] ${msg}`);
    } else if (isWarn) {
      console.warn(`[WARN] ${msg}`);
      warnCount++;
    } else {
      console.error(`[FAIL] ${msg}`);
      errorCount++;
    }
  }

  // 1. ROUTE TESTS
  console.log("--- 1. Testing Core Endpoints ---");
  const routes = [
    { url: "http://localhost:3000/", name: "Homepage" },
    { url: "http://localhost:3000/robots.txt", name: "Robots.txt" },
    { url: "http://localhost:3000/sitemap.xml", name: "Sitemap.xml" }
  ];

  let homeHtml = "";
  for (const r of routes) {
    try {
      const res = await fetchUrl(r.url);
      report(res.status === 200, `${r.name} returned HTTP ${res.status}`);
      if (r.name === "Homepage") homeHtml = res.body;
      if (r.name === "Robots.txt") {
        report(res.body.includes("User-Agent: *") || res.body.includes("user-agent: *"), "Robots.txt contains User-Agent rule");
      }
      if (r.name === "Sitemap.xml") {
        report(res.body.includes("<urlset") && res.body.includes("karnatakagym.in"), "Sitemap.xml is valid XML format with domain");
      }
    } catch (e) {
      report(false, `${r.name} fetch failed: ${e.message}`);
    }
  }

  // 2. CHECK ALL PUBLIC IMAGES ON DISK & VIA HTTP
  console.log("\n--- 2. Auditing All Image Assets ---");
  const imagesDir = path.resolve("public/images");
  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} items in public/images`);

  for (const file of files) {
    if (fs.statSync(path.join(imagesDir, file)).isFile()) {
      const imgUrl = `http://localhost:3000/images/${file}`;
      try {
        const res = await fetchUrl(imgUrl);
        const size = res.headers["content-length"] || res.body.length;
        report(res.status === 200 && Number(size) > 0, `Image asset /images/${file}: HTTP ${res.status} (${size} bytes)`);
      } catch (e) {
        report(false, `Image asset /images/${file} failed to load: ${e.message}`);
      }
    }
  }

  // 3. INTERNAL ANCHOR NAVIGATION AUDIT
  console.log("\n--- 3. Auditing Section Anchors & IDs ---");
  const requiredAnchors = [
    "experience",
    "programs",
    "women",
    "trainer",
    "gallery",
    "contact"
  ];

  for (const id of requiredAnchors) {
    const hasId = homeHtml.includes(`id="${id}"`);
    report(hasId, `Section anchor id="${id}" exists in DOM`);
  }

  // 4. BUSINESS & CONTACT INFORMATION INTEGRITY
  console.log("\n--- 4. Auditing Business Information & CTAs ---");
  const contactChecks = [
    { label: "Phone Number visible (+91 99026 67407)", check: homeHtml.includes("99026 67407") },
    { label: "Tel link (tel:+919902667407)", check: homeHtml.includes("tel:+919902667407") },
    { label: "WhatsApp Direct Link (wa.me/919902667407)", check: homeHtml.includes("wa.me/919902667407") },
    { label: "Instagram Link (instagram.com/riyaz_gokul)", check: homeHtml.includes("instagram.com/riyaz_gokul") },
    { label: "Google Maps Location (Kalidas Nagar, Hubballi)", check: homeHtml.includes("Kalidas Nagar") && homeHtml.includes("Hubballi") },
    { label: "Trainer Name (Riyaz Gokul)", check: homeHtml.includes("Riyaz Gokul") },
    { label: "Gym Brand (Karnataka Gym)", check: homeHtml.includes("Karnataka Gym") }
  ];

  for (const c of contactChecks) {
    report(c.check, c.label);
  }

  // 5. SEO & JSON-LD STRUCTURED DATA AUDIT
  console.log("\n--- 5. Auditing SEO & Structured Data ---");
  const hasTitle = homeHtml.includes("<title>") && homeHtml.includes("Karnataka Gym");
  report(hasTitle, "Meta title tag is present and branded");

  const hasMetaDesc = homeHtml.includes('name="description"');
  report(hasMetaDesc, "Meta description tag is present");

  const hasJsonLd = homeHtml.includes('type="application/ld+json"');
  report(hasJsonLd, "JSON-LD schema script is present");

  if (hasJsonLd) {
    try {
      const match = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      if (match && match[1]) {
        const schema = JSON.parse(match[1]);
        report(schema["@type"] === "GymOrHealthClub", `Schema @type is '${schema["@type"]}'`);
        report(schema.name === "Karnataka Gym Fitness Centre", `Schema name is '${schema.name}'`);
        report(schema.telephone === "+919902667407", `Schema telephone is '${schema.telephone}'`);
        report(schema.image && schema.image.includes("gym-wide-4k.jpg"), "Schema image uses 4K asset");
      } else {
        report(false, "Could not extract JSON-LD script content");
      }
    } catch (e) {
      report(false, `JSON-LD parsing error: ${e.message}`);
    }
  }

  // 6. HIGH-DEFINITION ASSETS VERIFICATION
  console.log("\n--- 6. Verifying High-Definition / 4K Asset Usage ---");
  const expectedHdAssets = [
    "/images/gym-wide-4k.jpg",
    "/images/gym-floor-4k.jpg",
    "/images/women-4k.jpg",
    "/images/trainer-hd.jpg",
    "/images/member-hd.jpg",
    "/images/strength-machine-hd.jpg",
    "/images/leg-machine-hd.jpg",
    "/images/treadmill-hd.jpg",
    "/images/gym-machines-hd.jpg",
    "/images/exterior-hd.jpg",
    "/images/poster-hd.jpg"
  ];

  for (const asset of expectedHdAssets) {
    const inHtml = homeHtml.includes(asset) || homeHtml.includes(encodeURIComponent(asset));
    report(inHtml, `HD/4K Asset ${asset} is rendered in homepage HTML`);
  }

  // 7. RESPONSIVENESS & CONVERSION ELEMENTS
  console.log("\n--- 7. Mobile Conversion & Accessibility ---");
  report(homeHtml.includes("mobile-conversion-bar") || homeHtml.includes("fixed"), "Mobile conversion bar is implemented");
  report(homeHtml.includes("skip-link"), "Accessible skip link is present");
  report(homeHtml.includes("aria-label"), "ARIA labels are present on interactive sections");

  console.log("\n==================================================");
  console.log(` AUDIT SUMMARY: ${errorCount} ERRORS, ${warnCount} WARNINGS`);
  console.log("==================================================");

  if (errorCount > 0) {
    process.exit(1);
  }
}

runAudit();
