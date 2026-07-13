"use client";

import Image from "next/image";
import GothicArch from "@/components/ui/GothicArch";
import { motion } from "framer-motion";
import { IMAGE_PATHS } from "@/lib/default-data";
import { whiteFilter } from "@/lib/utils";
import type { AboutData } from "@/lib/types";

interface AboutProps {
  about: AboutData;
}

export default function About({ about }: AboutProps) {
  return (
    <GothicArch id="about">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-display text-3xl text-moon-white md:text-4xl"
          >
            About
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 leading-relaxed text-sky-light/90"
          >
            {about.bio}
          </motion.p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: "Birthday", value: about.birthday, colSpan: false },
              { label: "Height", value: about.height, colSpan: false },
              { label: "Personality", value: about.personality, colSpan: true },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{
                  y: -3,
                  borderColor: "rgba(169, 198, 236, 0.4)",
                  backgroundColor: "rgba(28, 42, 82, 0.75)",
                }}
                className={`rounded-2xl border border-sky-light/10 bg-midnight/40 p-4 shadow-md transition-all duration-300 cursor-pointer ${
                  stat.colSpan ? "col-span-2" : ""
                }`}
              >
                <span className="text-gold-accent font-medium">{stat.label}</span>
                <p className="mt-1 font-semibold text-moon-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="mx-auto"
          >
            <Image
              src={IMAGE_PATHS.catButterfly}
              alt=""
              width={200}
              height={200}
              className="opacity-80 transition-opacity duration-300 hover:opacity-100"
              style={{ filter: whiteFilter }}
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              borderColor: "rgba(169, 198, 236, 0.35)",
              backgroundColor: "rgba(28, 42, 82, 0.75)",
            }}
            className="rounded-2xl border border-sky-light/10 bg-midnight/40 p-4 shadow-md transition-all duration-300"
          >
            <span className="text-gold-accent font-medium">Likes</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {about.likes.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ scale: 1.12, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="rounded-full bg-periwinkle/25 px-3.5 py-1 text-xs font-medium text-sky-light shadow-sm transition-colors hover:bg-periwinkle hover:text-white cursor-pointer"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              borderColor: "rgba(169, 198, 236, 0.35)",
              backgroundColor: "rgba(28, 42, 82, 0.75)",
            }}
            className="rounded-2xl border border-sky-light/10 bg-midnight/40 p-4 shadow-md transition-all duration-300"
          >
            <span className="text-gold-accent font-medium">Dislikes</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {about.dislikes.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ scale: 1.12, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="rounded-full bg-violet-glow/25 px-3.5 py-1 text-xs font-medium text-sky-light/80 shadow-sm transition-colors hover:bg-violet-glow hover:text-white cursor-pointer"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </GothicArch>
  );
}
