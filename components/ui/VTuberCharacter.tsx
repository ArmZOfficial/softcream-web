"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { IMAGE_PATHS } from "@/lib/default-data";

interface VTuberCharacterProps {
  primaryImage: string;
  altImage: string;
}

export default function VTuberCharacter({ primaryImage, altImage }: VTuberCharacterProps) {
  const [useAlt, setUseAlt] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);

  // Automatic Slideshow Timer (Crossfade every 5 seconds when not paused/hovered)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setUseAlt((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div
      className="vtuber-character relative cursor-pointer select-none"
      onClick={() => setUseAlt(!useAlt)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={(e) => e.preventDefault()}
      aria-label="VTuber character — automatic slideshow portrait (click to toggle pose)"
      role="img"
    >
      {/* Outer Glow behind frame */}
      <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-b from-violet-glow/40 via-periwinkle/20 to-transparent blur-3xl" />

      {/* Elegant Full-Bleed Portrait Frame Card (Static box — no scaling or moving so it never pixelates) */}
      <div
        className={`relative aspect-[3/4] w-[min(88vw,420px)] overflow-hidden rounded-[36px] border-2 transition-all duration-500 bg-midnight backdrop-blur-md ${
          isHovered
            ? "border-sky-300 shadow-[0_0_45px_rgba(139,197,255,0.6)]"
            : "border-sky-light/40 shadow-[0_16px_56px_rgba(28,42,82,0.85)]"
        }`}
      >
        {/* Top corner floral accents */}
        <div className="pointer-events-none absolute -left-2 -top-2 z-20 h-20 w-20 opacity-85 drop-shadow">
          <Image
            src={IMAGE_PATHS.floral}
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
            draggable={false}
          />
        </div>
        <div className="pointer-events-none absolute -right-2 -top-2 z-20 h-20 w-20 scale-x-[-1] opacity-85 drop-shadow">
          <Image
            src={IMAGE_PATHS.floral}
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
            draggable={false}
          />
        </div>

        {/* Automatic Slideshow Crossfade + Inner Floating & Hover Zoom */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={useAlt ? "alt" : "primary"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: reducedMotion ? 0 : [0, -12, 0],
              scale: isHovered ? 1.08 : 1.03,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.6, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={useAlt ? altImage : primaryImage}
              alt="VTuber character"
              fill
              priority
              className="pointer-events-none select-none object-cover object-top"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Transparent protective shield overlay */}
        <div
          className="absolute inset-0 z-30"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Inner vignette mist bars along all 4 sides so zero cut lines can ever be seen during crossfade */}
        <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_56px_rgba(10,14,30,0.85)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-midnight via-midnight/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-midnight via-midnight/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-midnight via-midnight/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-midnight via-midnight/60 to-transparent" />

        {/* Slide Indicators (Clickable dots to jump to Official vs Casual) */}
        <div className="pointer-events-auto absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setUseAlt(false);
            }}
            aria-label="Official Art"
            title="Official Art"
            className={`h-2 rounded-full transition-all duration-500 ${
              !useAlt
                ? "w-7 bg-sky-light shadow-[0_0_12px_rgba(139,197,255,0.9)]"
                : "w-2 bg-moon-white/35 hover:bg-moon-white/70"
            }`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setUseAlt(true);
            }}
            aria-label="Casual Look"
            title="Casual Look"
            className={`h-2 rounded-full transition-all duration-500 ${
              useAlt
                ? "w-7 bg-sky-light shadow-[0_0_12px_rgba(139,197,255,0.9)]"
                : "w-2 bg-moon-white/35 hover:bg-moon-white/70"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
