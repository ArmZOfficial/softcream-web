"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { IMAGE_PATHS } from "@/lib/default-data";
import { whiteFilter } from "@/lib/utils";

interface MoonGlowProps {
  enabled?: boolean;
  className?: string;
}

export default function MoonGlow({ enabled = true, className = "" }: MoonGlowProps) {
  const reducedMotion = useReducedMotion();

  if (!enabled) return null;

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-full bg-sky-light/30 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={IMAGE_PATHS.moon}
          alt=""
          width={80}
          height={80}
          className="relative z-10 drop-shadow-[0_0_20px_rgba(169,198,236,0.6)]"
          style={{ filter: whiteFilter }}
        />
      </motion.div>
    </div>
  );
}
