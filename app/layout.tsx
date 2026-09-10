import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import IntroAnimation from "@/components/IntroAnimation";

import Providers from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505"
};

export const metadata: Metadata = {
  title: "Karnataka Gym Fitness Centre | Premium Gym in Hubballi",
  description:
    "Karnataka Gym Fitness Centre in Hubballi, Karnataka — strength training, muscle building, fat loss and dedicated women's training.",
  keywords: [
    "Karnataka Gym",
    "Gym in Hubballi",
    "Karnataka Gym Hubballi",
    "Fitness Centre Hubballi",
    "Kalidas Nagar Gym",
    "Riyaz Gokul Trainer",
    "Women Fitness Hubballi",
    "Strength Training Hubballi"
  ],
  authors: [{ name: "Karnataka Gym Fitness Centre" }],
  creator: "Karnataka Gym",
  metadataBase: new URL("https://karnatakagym.in"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://karnatakagym.in",
    siteName: "Karnataka Gym Fitness Centre",
    title: "Karnataka Gym Fitness Centre | Premium Gym in Hubballi",
    description:
      "Karnataka Gym Fitness Centre in Hubballi, Karnataka — strength training, muscle building, fat loss and dedicated women's training.",
    images: [
      {
        url: "/images/gym-wide-4k.jpg",
        width: 1200,
        height: 630,
        alt: "Karnataka Gym Fitness Centre Hubballi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Karnataka Gym Fitness Centre | Premium Gym in Hubballi",
    description:
      "Hubballi's premier training space for discipline, strength, and transformation.",
    images: ["/images/gym-wide-4k.jpg"]
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GymOrHealthClub",
    "name": "Karnataka Gym Fitness Centre",
    "image": "https://karnatakagym.in/images/gym-wide-4k.jpg",
    "logo": "https://karnatakagym.in/images/logo.jpg",
    "description":
      "Karnataka Gym Fitness Centre in Hubballi, Karnataka — strength training, muscle building, fat loss and dedicated women's training.",
    "telephone": "+919902667407",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kalidas Nagar",
      "addressLocality": "Hubballi",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 15.3647,
      "longitude": 75.124
    },
    "url": "https://karnatakagym.in",
    "sameAs": [
      "https://www.instagram.com/riyaz_gokul/",
      "https://wa.me/919902667407"
    ],
    "priceRange": "$$"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Accessible skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Short intro splash */}
        <IntroAnimation />

        <Providers>
          {/* Persistent Header */}
          <Header />

          {/* Main Content */}
          <main id="main-content">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Mobile-only Bottom Conversion Bar */}
          <MobileCTA />
        </Providers>
      </body>
    </html>
  );
}
