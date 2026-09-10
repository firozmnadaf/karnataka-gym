"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { EnquiryFormData } from "@/lib/whatsapp";

interface EnquiryModalContextValue {
  isOpen: boolean;
  initialData: Partial<EnquiryFormData>;
  openModal: (data?: Partial<EnquiryFormData>) => void;
  closeModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null);

export function EnquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<EnquiryFormData>>({});

  const openModal = useCallback((data?: Partial<EnquiryFormData>) => {
    setInitialData(data || {});
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EnquiryModalContext.Provider value={{ isOpen, initialData, openModal, closeModal }}>
      {children}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx) {
    throw new Error("useEnquiryModal must be used within an EnquiryModalProvider");
  }
  return ctx;
}
