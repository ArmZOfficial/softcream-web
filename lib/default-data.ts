import type { SiteContent } from "./types";

export const IMAGE_PATHS = {
  bg: "/images/bg.png",
  vtuber: "/images/vtuber.png",
  vtuber2: "/images/vtuber2.png",
  example: "/images/example.jfif",
  moon: "/images/moon-icon.png",
  sparkles: "/images/sparkles.png",
  sparkles3: "/images/sparkles3.png",
  moonDreamcatcher: "/images/moon-dreamcatcher.png",
  moonButterfly: "/images/moon-butterfly.png",
  catButterfly: "/images/cat-butterfly.png",
  musicNotes: "/images/music-notes.png",
  floral: "/images/floral.png",
  butterflies: "/images/butterflies.png",
  butterflyBorder: "/images/butterfly-border.png",
} as const;

export const defaultContent: SiteContent = {
  siteName: "softcreamzx",
  tagline: "Stars can't shine without darkness",
  hero: {
    followUrl: "https://twitter.com",
    messageUrl: "https://discord.com",
    characterImage: IMAGE_PATHS.vtuber,
    characterImageAlt: IMAGE_PATHS.vtuber2,
  },
  about: {
    bio: "สวัสดีค่ะ~ ดวงจันทร์เอง เป็น VTuber ที่ชอบร้องเพลง เล่นเกม และคุยกับทุกคนในยามค่ำคืน มาพบกันที่มหาวิหารแห่งความฝันกันนะคะ ✨",
    birthday: "14 กรกฎาคม",
    height: "158 cm",
    personality: "อ่อนโยน ขี้อาย ชอบผีเสื้อและดวงดาว",
    likes: ["ร้องเพลง", "ผีเสื้อ", "ดอกไม้", "คืนพระจันทร์", "ชา"],
    dislikes: ["เสียงดัง", "ตื่นเช้า", "แมลง"],
  },
  socials: [
    { id: "1", platform: "YouTube", url: "https://youtube.com", icon: "youtube" },
    { id: "2", platform: "Twitch", url: "https://twitch.tv", icon: "twitch" },
    { id: "3", platform: "X", url: "https://x.com", icon: "x" },
    { id: "5", platform: "Discord", url: "https://discord.gg/wMk64S8vms", icon: "discord" },
  ],
  playlist: [
    {
      id: "1",
      title: "chiikawa",
      artist: '[no copyright music] " chiikawa " cute vlog music',
      audioUrl: "https://youtu.be/nI6hOktKvkk",
      coverUrl: IMAGE_PATHS.vtuber,
    },
    {
      id: "2",
      title: "hamstar",
      artist: "[no copyright music] 'hamstar' cute vlog music",
      audioUrl: "https://www.youtube.com/watch?v=qiV05AkEeZw",
      coverUrl: IMAGE_PATHS.vtuber2,
    },
  ],
  schedule: [
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
  ],
  gallery: [
    { id: "1", src: IMAGE_PATHS.vtuber, alt: "ดวงจันทร์ — ท่าหลัก", caption: "Official Art" },
    { id: "2", src: IMAGE_PATHS.vtuber2, alt: "ดวงจันทร์ — ท่าเล่น", caption: "Casual Look" },
  ],
  theme: {
    primary: "#5B7FC4",
    secondary: "#A9C6EC",
    accent: "#6A4FC2",
  },
  backgroundImage: IMAGE_PATHS.bg,
  decorations: {
    butterflies: true,
    sparkles: true,
    dust: true,
    moon: true,
    floatingElements: true,
  },
};

export const CONTENT_KEY = "site-content";
