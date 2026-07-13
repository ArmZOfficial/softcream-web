"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_PATHS } from "@/lib/default-data";
import { whiteFilter } from "@/lib/utils";

interface ButterflyProps {
  index: number;
  src?: string;
}

function Butterfly({ index, src }: ButterflyProps) {
  const duration = 18 + (index % 5) * 4;
  const delay = index * 2.5;
  const size = 40 + (index % 3) * 20;
  const topStart = 10 + (index * 13) % 70;

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top: `${topStart}%` }}
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{
        x: ["-10vw", "110vw"],
        opacity: [0, 0.8, 0.8, 0],
        y: [0, -30, 20, -15, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ scaleX: [1, 0.85, 1, 0.9, 1], rotate: [-5, 5, -3, 3, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src || IMAGE_PATHS.butterflies}
          alt=""
          width={size}
          height={size}
          className="opacity-70"
        />
      </motion.div>
    </motion.div>
  );
}

interface ButterfliesProps {
  enabled?: boolean;
  count?: number;
}

export default function Butterflies({ enabled = true, count = 5 }: ButterfliesProps) {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <Butterfly key={i} index={i} />
      ))}
    </div>
  );
}
