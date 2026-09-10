"use client";

import React from "react";
import { EnquiryModalProvider } from "@/context/EnquiryModalContext";
import EnquiryModal from "@/components/EnquiryModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EnquiryModalProvider>
      {children}
      <EnquiryModal />
      <FloatingWhatsApp />
    </EnquiryModalProvider>
  );
}
