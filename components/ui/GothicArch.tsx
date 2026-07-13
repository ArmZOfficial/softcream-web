"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { IMAGE_PATHS } from "@/lib/default-data";
import { whiteFilter } from "@/lib/utils";

interface GothicArchProps {
  children: ReactNode;
  id?: string;
  className?: string;
  showDivider?: boolean;
  variant?: "arch" | "rounded";
}

export default function GothicArch({
  children,
  id,
  className = "",
  showDivider = true,
  variant = "rounded",
}: GothicArchProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`relative mx-auto w-full max-w-5xl px-4 py-16 md:px-8 ${className}`}
      initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Section frame (rounded rectangle / สี่เหลี่ยมขอบมน) */}
      <div
        className={`relative overflow-hidden border border-sky-light/20 bg-midnight/60 shadow-[0_0_60px_rgba(106,79,194,0.15)] backdrop-blur-md rounded-[28px]`}
      >
        {/* Subtle glassmorphic top glow overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-glow/15 via-transparent to-transparent opacity-70" />

        {/* Floral corners */}
        <Image
          src={IMAGE_PATHS.floral}
          alt=""
          width={120}
          height={120}
          className="pointer-events-none absolute -left-4 -top-4 opacity-60"
          aria-hidden="true"
        />
        <Image
          src={IMAGE_PATHS.floral}
          alt=""
          width={100}
          height={100}
          className="pointer-events-none absolute -right-4 -top-4 scale-x-[-1] opacity-60"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 px-6 py-12 md:px-12">{children}</div>
      </div>

      {/* Section divider motif */}
      {showDivider && (
        <div className="mt-8 flex justify-center">
          <motion.div
            animate={reducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Image
              src={IMAGE_PATHS.moonButterfly}
              alt=""
              width={80}
              height={40}
              className="opacity-70"
              style={{ filter: whiteFilter }}
            />
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
