"use client";

import { motion } from "framer-motion";
import type { SocialLink } from "@/lib/types";

export const iconMap: Record<string, React.ReactNode> = {
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  ),
  twitch: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M11.6 11.2h2V6.5h-2v4.7zm4.9 0h2V6.5h-2v4.7zM4.5 0L1 3.5v17H6v3.5l3.5-3.5h5.5L22 12.5V0H4.5zm15 11.5l-3 3h-5l-3 3v-3H6V2h13.5v9.5z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18.2 2.25h3.4l-7.4 8.46L22.8 21.75h-6.8l-5.3-6.93-6.07 6.93H1.3l7.9-9.03L1.2 2.25h6.97l4.79 6.33 5.24-6.33zm-1.2 17.52h1.88L7.08 4.13H5.04l11.96 15.64z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1s.7.9.9 1.5c.2.5.4 1.1.4 2.4 0 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.5s-.9.7-1.5.9c-.5.2-1.1.4-2.4.4-1.3 0-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1s-.7-.9-.9-1.5c-.2-.5-.4-1.1-.4-2.4 0-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.5s.9-.7 1.5-.9c.5-.2 1.1-.4 2.4-.4 1.3 0 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 0.1 5.7.1 4.8.3 4 .6c-.8.3-1.5.7-2.2 1.4C1.1 2.7.7 3.4.4 4.2.1 5 .0 5.9 0 7.2 0 8.5 0 8.9 0 12s0 3.5.1 4.8c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.3 1.1 20.6.7 19.8.4 19 .1 18.1 0 16.8 0 15.5 0 15.1 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.5a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" />
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.3 3.4A19.8 19.8 0 0 0 15.5 2a13 13 0 0 0-.6 1.2 18.3 18.3 0 0 0-5.8 0A12.4 12.4 0 0 0 7.5 2 19.7 19.7 0 0 0 2.7 3.4 20.6 20.6 0 0 0 .1 16.4a19.9 19.9 0 0 0 6 3 14.9 14.9 0 0 0 1.3-2.1 12.9 12.9 0 0 1-2-.9l.5-.4a14.6 14.6 0 0 0 12.4 0l.5.4a12.8 12.8 0 0 1-2 1 14.9 14.9 0 0 0 1.2 2 19.9 19.9 0 0 0 6-3 20.5 20.5 0 0 0-2.6-13zM8.7 13.5c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1 2 1 2.1 2-.9 2.1-2 2.1zm6.6 0c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1 2 1 2.1 2-.9 2.1-2 2.1z" />
    </svg>
  ),
};

interface SocialDockProps {
  socials: SocialLink[];
  variant?: "hero" | "section";
}

export default function SocialDock({ socials, variant = "hero" }: SocialDockProps) {
  const isHero = variant === "hero";

  if (!isHero) {
    return (
      <motion.nav
        className="flex items-center justify-center gap-3.5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        aria-label="Social links"
      >
        {socials
          .filter((social) => social.icon !== "instagram" && social.platform.toLowerCase() !== "instagram")
          .map((social, i) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-periwinkle/25 text-sky-light transition-colors duration-300 hover:bg-periwinkle hover:text-moon-white hover:shadow-[0_0_15px_rgba(139,197,255,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            aria-label={social.platform}
          >
            {iconMap[social.icon] || (
              <span className="text-xs font-bold">{social.platform[0]}</span>
            )}
          </motion.a>
        ))}
      </motion.nav>
    );
  }

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
      <motion.nav
        className="pointer-events-auto flex items-center gap-3.5 rounded-full border border-sky-light/30 bg-midnight/80 px-5 py-2.5 shadow-[0_8px_32px_rgba(28,42,82,0.85)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        aria-label="Social links"
      >
        {socials
          .filter((social) => social.icon !== "instagram" && social.platform.toLowerCase() !== "instagram")
          .map((social, i) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-periwinkle/25 text-sky-light transition-colors duration-300 hover:bg-periwinkle hover:text-moon-white hover:shadow-[0_0_15px_rgba(139,197,255,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light cursor-pointer"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
            aria-label={social.platform}
          >
            {iconMap[social.icon] || (
              <span className="text-xs font-bold">{social.platform[0]}</span>
            )}
          </motion.a>
        ))}
      </motion.nav>
    </div>
  );
}
