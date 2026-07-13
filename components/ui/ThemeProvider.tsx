"use client";

import { useEffect } from "react";
import type { ThemeColors } from "@/lib/types";

interface ThemeProviderProps {
  theme: ThemeColors;
}

export default function ThemeProvider({ theme }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--periwinkle", theme.primary);
    root.style.setProperty("--sky-light", theme.secondary);
    root.style.setProperty("--violet-glow", theme.accent);
  }, [theme]);

  return null;
}
