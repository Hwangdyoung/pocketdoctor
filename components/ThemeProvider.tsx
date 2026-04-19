"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Ensure hydration match by rendering children immediately
  return <>{children}</>;
}
