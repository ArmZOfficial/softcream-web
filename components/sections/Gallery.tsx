"use client";

import Image from "next/image";
import GothicArch from "@/components/ui/GothicArch";
import { motion } from "framer-motion";
import { IMAGE_PATHS } from "@/lib/default-data";
import type { GalleryImage } from "@/lib/types";

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <GothicArch id="gallery">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center font-display text-3xl text-moon-white md:text-4xl"
      >
        Gallery
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="gallery-item group relative select-none cursor-pointer"
            data-protected-image="true"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Butterfly border frame */}
            <div className="pointer-events-none absolute -inset-3 z-0 opacity-40 transition-opacity duration-500 group-hover:opacity-85">
              <Image
                src={IMAGE_PATHS.butterflyBorder}
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
                draggable={false}
              />
            </div>

            <div className="relative z-10 overflow-hidden rounded-2xl border border-sky-light/30 bg-gradient-to-b from-midnight/80 via-midnight/60 to-midnight/90 shadow-[0_8px_32px_rgba(28,42,82,0.6)] backdrop-blur-md transition-all duration-500 group-hover:border-sky-300 group-hover:shadow-[0_12px_45px_rgba(139,197,255,0.45)]">
              <div
                className="relative aspect-[3/4] overflow-hidden p-3"
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* Ambient Blurred Backdrop */}
                <Image
                  src={img.src}
                  alt=""
                  fill
                  className="pointer-events-none scale-125 select-none object-cover opacity-30 blur-2xl transition-transform duration-700 group-hover:scale-150"
                  draggable={false}
                  aria-hidden="true"
                />

                {/* Main Artwork (Full Contain + 360-deg Edge Feathering) */}
                <div
                  className="relative h-full w-full overflow-hidden rounded-xl"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 92% 90% at 50% 45%, black 68%, transparent 98%)",
                    maskImage:
                      "radial-gradient(ellipse 92% 90% at 50% 45%, black 68%, transparent 98%)",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="pointer-events-none select-none object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>

                {/* 4-side mist fade bars to eliminate straight cropped lines on sides and bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-midnight via-midnight/70 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-midnight via-midnight/60 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-midnight via-midnight/60 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-midnight via-midnight/50 to-transparent" />

                {/* Transparent protective shield overlay to block IDM / right-click saving */}
                <div
                  className="absolute inset-0 z-20 cursor-default"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              {img.caption && (
                <p className="border-t border-sky-light/10 bg-midnight/60 p-3 text-center text-sm font-semibold text-moon-white drop-shadow">
                  {img.caption}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </GothicArch>
  );
}
