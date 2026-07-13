"use client";

import Image from "next/image";
import MoonGlow from "@/components/animations/MoonGlow";
import { iconMap } from "@/components/ui/SocialDock";
import VTuberCharacter from "@/components/ui/VTuberCharacter";
import { motion } from "framer-motion";
import { IMAGE_PATHS } from "@/lib/default-data";
import { whiteFilter } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface HeroProps {
  content: SiteContent;
}

export default function Hero({ content }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-24 md:flex-row md:justify-between md:px-8">
        {/* Left content */}
        <div className="flex max-w-xl flex-col items-start gap-6 text-left">
          <MoonGlow enabled={content.decorations.moon} className="relative mb-2" />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-5xl font-extrabold leading-tight text-moon-white md:text-7xl"
            style={{
              WebkitTextStroke: "2px var(--color-periwinkle, #5B7FC4)",
              paintOrder: "stroke fill",
              textShadow: "0 0 40px rgba(106, 79, 194, 0.3)",
            }}
          >
            {content.siteName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-accent text-lg italic text-sky-light/90 md:text-xl"
          >
            &ldquo;{content.tagline}&rdquo;
          </motion.p>

          {/* Social Connect Dock (Replaced Follow & Message buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-2 flex flex-wrap items-center gap-3.5 w-full"
          >
            {content.socials
              .filter((social) => social.icon !== "instagram" && social.platform.toLowerCase() !== "instagram")
              .map((social) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                title={social.platform}
                whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-sky-light/30 bg-midnight/60 text-sky-light shadow-[0_4px_16px_rgba(28,42,82,0.6)] backdrop-blur-md transition-colors duration-300 hover:border-sky-light hover:bg-periwinkle hover:text-moon-white hover:shadow-[0_0_20px_rgba(139,197,255,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
              >
                {iconMap[social.icon] || (
                  <span className="text-xs font-bold">{social.platform[0]}</span>
                )}
              </motion.a>
            ))}
          </motion.div>

          {/* Decorative moon-butterfly motif */}
          {content.decorations.floatingElements && (
            <Image
              src={IMAGE_PATHS.moonButterfly}
              alt=""
              width={100}
              height={50}
              className="mt-4 opacity-60"
              style={{ filter: whiteFilter }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Right — VTuber character cutout */}
        <div className="relative flex-shrink-0">
          <VTuberCharacter
            primaryImage={content.hero.characterImage}
            altImage={content.hero.characterImageAlt}
          />
        </div>
      </div>
    </section>
  );
}
