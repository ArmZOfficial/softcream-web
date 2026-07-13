"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_PATHS } from "@/lib/default-data";
import { whiteFilter } from "@/lib/utils";

interface SparkleItem {
  src: string;
  top: string;
  left: string;
  size: number;
  delay: number;
}

const sparkleItems: SparkleItem[] = [
  { src: IMAGE_PATHS.sparkles, top: "12%", left: "8%", size: 60, delay: 0 },
  { src: IMAGE_PATHS.sparkles3, top: "25%", left: "85%", size: 40, delay: 1.2 },
  { src: IMAGE_PATHS.sparkles, top: "45%", left: "15%", size: 45, delay: 2.4 },
  { src: IMAGE_PATHS.sparkles3, top: "60%", left: "75%", size: 35, delay: 0.8 },
  { src: IMAGE_PATHS.sparkles, top: "78%", left: "40%", size: 50, delay: 1.8 },
  { src: IMAGE_PATHS.sparkles3, top: "35%", left: "55%", size: 30, delay: 3.0 },
];

interface SparklesProps {
  enabled?: boolean;
}

export default function Sparkles({ enabled = true }: SparklesProps) {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[2]" aria-hidden="true">
      {sparkleItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: item.top, left: item.left }}
          animate={{
            opacity: [0.2, 0.9, 0.3, 0.8, 0.2],
            scale: [0.7, 1.1, 0.85, 1.05, 0.7],
          }}
          transition={{
            duration: 3 + (i % 3),
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={item.src}
            alt=""
            width={item.size}
            height={item.size}
            style={{ filter: whiteFilter }}
          />
        </motion.div>
      ))}
    </div>
  );
}
