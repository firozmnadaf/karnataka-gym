import http from "http";

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    }).on("error", reject);
  });
}

async function auditMobile() {
  console.log("==================================================");
  console.log("   MOBILE RESPONSIVENESS & CLEANUP AUDIT          ");
  console.log("==================================================");

  const res = await fetchPage("http://localhost:3000/");
  const html = res.body;

  let errors = 0;
  function test(pass, desc) {
    if (pass) {
      console.log(`[PASS] ${desc}`);
    } else {
      console.error(`[FAIL] ${desc}`);
      errors++;
    }
  }

  // 1. 3D Element should be completely removed
  test(!html.includes("Hero3DCore"), "Hero3DCore is not present in bundle");
  test(!html.includes("QUANTUM IRON CORE"), "3D Quantum Core text is removed");
  test(!html.includes("ZERO-GRAVITY MAGNETIC LEVITATION"), "3D telemetry text is removed");

  // 2. Viewport Meta tag
  test(html.includes("viewport"), "Viewport meta tag present");
  test(html.includes("width=device-width"), "Responsive width=device-width enabled");

  // 3. Mobile Conversion Bar
  test(html.includes("mobile-conversion-bar"), "Mobile fixed conversion bar is present");
  test(html.includes("tel:+919902667407"), "Mobile Call action present");
  test(html.includes("wa.me/919902667407"), "Mobile WhatsApp action present");

  // 4. Mobile Menu Drawer
  test(html.includes("mobile-menu-trigger") || html.includes("Open navigation menu"), "Mobile menu trigger button is present");

  // 5. Mobile Programs View
  test(html.includes("programs-mobile-view"), "Mobile programs swipeable view is present");

  // 6. Mobile Gallery View
  test(html.includes("gallery"), "Gallery component is present");

  // 7. Suppress Hydration Warning
  test(html.includes("suppresshydrationwarning") || html.includes("suppressHydrationWarning"), "suppressHydrationWarning is active on body");

  console.log("==================================================");
  console.log(`AUDIT FINISHED: ${errors} errors`);
  console.log("==================================================");

  if (errors > 0) process.exit(1);
}

auditMobile();
