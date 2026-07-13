"use client";

import GothicArch from "@/components/ui/GothicArch";
import { motion } from "framer-motion";
import Image from "next/image";
import type { ScheduleItem } from "@/lib/types";

interface ScheduleProps {
  schedule: ScheduleItem[];
}

const DEFAULT_VALORANT_ACHIEVEMENTS: ScheduleItem[] = [
  {
    id: "val-1",
    day: "2025",
    time: "👑 Champion",
    title: "VCT Thailand Challengers Split 1",
    description: "อันดับ 1 คว้าแชมป์ระดับประเทศ — Main Duelist (Jett & Reyna) KDA 1.85",
    platform: "Valorant",
  },
  {
    id: "val-2",
    day: "2024",
    time: "🏆 1st Runner-up",
    title: "Valorant Ascension Pacific Invitational",
    description: "รองชนะเลิศอันดับ 1 — ปะทะทีมชั้นนำระดับเอเชียแปซิฟิก",
    platform: "Valorant",
  },
  {
    id: "val-3",
    day: "2024",
    time: "🎯 Top 4 & MVP",
    title: "Thailand Esports Championship 2024",
    description: "ติดอันดับ Top 4 พร้อมรับรางวัล Duelist MVP สูงสุดของทัวร์นาเมนต์",
    platform: "Valorant",
  },
  {
    id: "val-4",
    day: "2023",
    time: "🌟 Champion",
    title: "Valorant Community Cup Season 3",
    description: "แชมป์เปี้ยนทัวร์นาเมนต์ชุมชนยอดผู้เล่น 128 ทีม — Undefeated Run",
    platform: "Valorant",
  },
];

export default function Schedule({ schedule }: ScheduleProps) {
  // If localStorage still holds the old default schedule ('จันทร์'), seamlessly display the new Valorant achievements
  const achievementsList =
    schedule && schedule.length > 0 && schedule[0].day !== "จันทร์"
      ? schedule
      : DEFAULT_VALORANT_ACHIEVEMENTS;

  return (
    <GothicArch id="schedule" showDivider={false}>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="inline-block rounded-full border border-periwinkle/40 bg-periwinkle/15 px-4 py-1 text-xs font-bold tracking-widest text-sky-light uppercase shadow-sm">
          🏆 Esports Career
        </span>
        <h2 className="mt-3 font-display text-3xl text-moon-white md:text-4xl drop-shadow-[0_0_20px_rgba(139,197,255,0.4)]">
          Valorant Achievements
        </h2>
      </motion.div>

      {/* Official VLR Profile Card / Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 flex justify-center"
      >
        <a
          href="https://www.vlr.gg/player/46823/shamour"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full max-w-2xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-500/30 bg-gradient-to-r from-midnight/95 via-red-950/30 to-violet-glow/20 p-5 shadow-[0_4px_25px_rgba(239,68,68,0.2)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-red-400 hover:shadow-[0_0_35px_rgba(239,68,68,0.45)] sm:px-7 sm:py-5"
        >
          <div className="flex items-center gap-4">
            {/* VLR Red Glowing Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-400/50 bg-gradient-to-br from-red-600 via-red-700 to-red-900 font-display text-2xl font-black text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              vlr
            </div>

            {/* Profile Text Details */}
            <div className="flex flex-col text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-xl font-extrabold text-white transition-colors group-hover:text-red-300">
                  shamour
                </span>
                <span className="rounded-md border border-red-500/40 bg-red-600/25 px-2.5 py-0.5 text-[10px] font-black tracking-widest text-red-200 uppercase shadow-sm">
                  ⚡ PRO PLAYER PROFILE
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-sky-light/85 transition-colors group-hover:text-sky-light sm:text-sm">
                Official VLR.gg Competitive Stats, Match History & Tournament Records
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/40 bg-red-600/30 px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-md transition-all duration-300 group-hover:border-red-400 group-hover:bg-red-600 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] sm:w-auto">
            <span>View on VLR.gg</span>
            <span className="text-sm font-black transition-transform duration-300 group-hover:translate-x-1 sm:text-base">↗</span>
          </div>
        </a>
      </motion.div>

      <div className="space-y-4">
        {achievementsList.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
            whileHover={{
              x: 6,
              borderColor: "rgba(169, 198, 236, 0.45)",
              backgroundColor: "rgba(28, 42, 82, 0.8)",
            }}
            className="group flex flex-col gap-4 rounded-2xl border border-sky-light/20 bg-midnight/60 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-[0_4px_28px_rgba(106,79,194,0.45)] sm:flex-row sm:items-center sm:gap-6 cursor-pointer"
          >
            {/* Optional uploaded achievement photo */}
            {item.imageUrl && (
              <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-sky-light/30 shadow-md">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}

            {/* Trophy & Year Badge */}
            <div className="flex min-w-[145px] flex-col items-center justify-center rounded-xl border border-periwinkle/30 bg-gradient-to-br from-periwinkle/30 via-midnight/80 to-violet-glow/20 px-4 py-3 shadow-md transition-all duration-300 group-hover:border-sky-300 group-hover:bg-periwinkle/45 group-hover:shadow-[0_0_18px_rgba(139,197,255,0.5)]">
              <span className="text-sm font-extrabold text-moon-white drop-shadow">
                {item.time}
              </span>
              <span className="mt-0.5 text-xs font-semibold tracking-wider text-sky-light group-hover:text-white">
                Year {item.day}
              </span>
            </div>

            {/* Tournament Details */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-moon-white transition-colors group-hover:text-sky-300">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-sky-light/85 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Game / Tag Badge */}
            <span className="self-start rounded-full border border-violet-glow/40 bg-gradient-to-r from-violet-glow/30 to-periwinkle/20 px-4 py-1.5 text-xs font-bold tracking-wide text-sky-light shadow transition-all duration-300 group-hover:border-sky-light group-hover:from-violet-glow/60 group-hover:to-periwinkle/50 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(106,79,194,0.7)] sm:self-center">
              🎮 {item.platform}
            </span>
          </motion.div>
        ))}
      </div>
    </GothicArch>
  );
}
