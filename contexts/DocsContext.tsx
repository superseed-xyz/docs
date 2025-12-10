"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type DocsSection = "chain" | "protocol" | null;

interface DocsContextType {
  section: DocsSection;
  setSection: (section: DocsSection) => void;
}

const DocsContext = createContext<DocsContextType | undefined>(undefined);

export function DocsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [section, setSectionState] = useState<DocsSection>(null);

  // Determine section from pathname
  useEffect(() => {
    if (pathname?.startsWith("/chain")) {
      setSectionState("chain");
      if (typeof window !== "undefined") {
        localStorage.setItem("docs-section", "chain");
      }
    } else if (pathname?.startsWith("/protocol")) {
      setSectionState("protocol");
      if (typeof window !== "undefined") {
        localStorage.setItem("docs-section", "protocol");
      }
    } else {
      // Try to restore from localStorage if on home page
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("docs-section");
        if (saved === "chain" || saved === "protocol") {
          setSectionState(saved);
        }
      }
    }
  }, [pathname]);

  const setSection = (newSection: DocsSection) => {
    setSectionState(newSection);
    if (typeof window !== "undefined") {
      if (newSection) {
        localStorage.setItem("docs-section", newSection);
      } else {
        localStorage.removeItem("docs-section");
      }
    }
  };

  return (
    <DocsContext.Provider value={{ section, setSection }}>
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error("useDocs must be used within a DocsProvider");
  }
  return context;
}

