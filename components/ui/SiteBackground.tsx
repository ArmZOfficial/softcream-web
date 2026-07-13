"use client";

import { useEffect, useState } from "react";

interface SiteBackgroundProps {
  backgroundImage: string;
}

export default function SiteBackground({ backgroundImage }: SiteBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const parallaxOffset = reducedMotion ? 0 : scrollY * 0.15;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-[-5%] bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(10px) saturate(0.85) brightness(0.6)",
          transform: "scale(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-gothic-gradient" />
    </div>
  );
}
