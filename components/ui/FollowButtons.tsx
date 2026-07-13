"use client";

import { motion } from "framer-motion";

interface FollowButtonsProps {
  followUrl: string;
  messageUrl: string;
}

export default function FollowButtons({ followUrl, messageUrl }: FollowButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <motion.a
        href={followUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gradient-to-r from-periwinkle to-violet-glow px-8 py-3 text-sm font-semibold text-moon-white shadow-lg transition-shadow hover:shadow-[0_0_20px_rgba(106,79,194,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Follow
      </motion.a>
      <motion.a
        href={messageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border-2 border-sky-light/40 bg-midnight/40 px-8 py-3 text-sm font-semibold text-sky-light backdrop-blur-sm transition-colors hover:border-sky-light hover:text-moon-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Message
      </motion.a>
    </div>
  );
}
