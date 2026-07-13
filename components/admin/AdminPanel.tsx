"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/types";
import ImageUploadField from "@/components/admin/ImageUploadField";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

const FIXED_SOCIALS = [
  { id: "1", platform: "YouTube", icon: "youtube", label: "YouTube URL" },
  { id: "2", platform: "Twitch", icon: "twitch", label: "Twitch URL" },
  { id: "3", platform: "X", icon: "x", label: "X (Twitter) URL" },
  { id: "5", platform: "Discord", icon: "discord", label: "Discord URL" },
];

interface AdminPanelProps {
  initialContent: SiteContent;
}

export default function AdminPanel({ initialContent }: AdminPanelProps) {
  const [content, setContent] = useState<SiteContent>(() => {
    if (initialContent.schedule && initialContent.schedule[0]?.day === "จันทร์") {
      return {
        ...initialContent,
        schedule: [
          {
            id: "val-1",
            day: "2025",
            time: "👑 Champion",
            title: "VCT Thailand Challengers Split 1",
            description: "อันดับ 1 คว้าแชมป์ระดับประเทศ — Main Duelist (Jett & Reyna) KDA 1.85",
            platform: "Valorant",
            imageUrl: "",
          },
          {
            id: "val-2",
            day: "2024",
            time: "🏆 1st Runner-up",
            title: "Valorant Ascension Pacific Invitational",
            description: "รองชนะเลิศอันดับ 1 — ปะทะทีมชั้นนำระดับเอเชียแปซิฟิก",
            platform: "Valorant",
            imageUrl: "",
          },
          {
            id: "val-3",
            day: "2024",
            time: "🎯 Top 4 & MVP",
            title: "Thailand Esports Championship 2024",
            description: "ติดอันดับ Top 4 พร้อมรับรางวัล Duelist MVP สูงสุดของทัวร์นาเมนต์",
            platform: "Valorant",
            imageUrl: "",
          },
          {
            id: "val-4",
            day: "2023",
            time: "🌟 Champion",
            title: "Valorant Community Cup Season 3",
            description: "แชมป์เปี้ยนทัวร์นาเมนต์ชุมชนยอดผู้เล่น 128 ทีม — Undefeated Run",
            platform: "Valorant",
            imageUrl: "",
          },
        ],
      };
    }
    return initialContent;
  });

  useEffect(() => {
    if (initialContent.schedule && initialContent.schedule[0]?.day === "จันทร์") {
      fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      }).catch(() => {});
    }
  }, [initialContent, content]);

  const [tab, setTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = useCallback(async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage("Saved successfully!");
      } else {
        setMessage("Save failed.");
      }
    } catch {
      setMessage("Save failed.");
    }
    setSaving(false);
  }, [content]);

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.reload();
  };

  const reset = async () => {
    if (!confirm("Reset all content to defaults?")) return;
    const res = await fetch("/api/content/reset", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setContent(data);
      setMessage("Reset to defaults.");
    }
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "about", label: "About" },
    { id: "playlist", label: "Music" },
    { id: "schedule", label: "Achievements (ผลงานแข่ง)" },
    { id: "theme", label: "Theme" },
    { id: "decorations", label: "Decorations" },
  ];

  const inputClass =
    "w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none";
  const labelClass = "mb-1 block text-xs font-medium text-gray-400";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 bg-gray-950/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">Admin — ดวงจันทร์ CMS</h1>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-950/40 px-3.5 py-1.5 text-xs font-medium text-sky-300 transition-all hover:bg-sky-500/20 hover:text-white"
          >
            <span>← กลับไปหน้าหลัก</span>
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800"
          >
            Reset
          </button>
          <button
            onClick={logout}
            className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-900/30"
          >
            Logout
          </button>
        </div>
      </header>

      {message && (
        <div className="mx-6 mt-4 rounded-lg bg-green-900/40 px-4 py-2 text-sm text-green-300">
          {message}
        </div>
      )}

      <div className="flex">
        <nav className="sticky top-16 hidden h-[calc(100vh-4rem)] w-48 shrink-0 flex-col gap-1 border-r border-gray-800 p-4 md:flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                tab === t.id ? "bg-blue-600/30 text-blue-300" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
          <a
            href="/"
            target="_blank"
            className="mt-auto rounded-lg px-3 py-2 text-sm text-gray-500 hover:text-gray-300"
          >
            View Site →
          </a>
        </nav>

        <div className="flex-1 p-6">
          {/* Mobile tabs */}
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value)}
            className="mb-6 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm md:hidden"
          >
            {tabs.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          {tab === "general" && (
            <div className="space-y-4 max-w-lg">
              <div>
                <label className={labelClass}>Site Name</label>
                <input
                  className={inputClass}
                  value={content.siteName}
                  onChange={(e) => setContent({ ...content, siteName: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  className={inputClass}
                  value={content.tagline}
                  onChange={(e) => setContent({ ...content, tagline: e.target.value })}
                />
              </div>
              <ImageUploadField
                label="Character Image (primary)"
                value={content.hero.characterImage}
                onChange={(newValue) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, characterImage: newValue },
                  })
                }
              />

              <ImageUploadField
                label="Character Image (alt)"
                value={content.hero.characterImageAlt}
                onChange={(newValue) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, characterImageAlt: newValue },
                  })
                }
              />

              <div className="pt-4 border-t border-gray-800">
                <h3 className="mb-3 text-sm font-semibold text-sky-400">Social Connect Links (แสดงบน Hero Section & Dock)</h3>
                <div className="space-y-3.5">
                  {FIXED_SOCIALS.map((fixed) => {
                    const currentSocial = content.socials.find((s) => s.icon === fixed.icon) || {
                      id: fixed.id,
                      platform: fixed.platform,
                      url: "",
                      icon: fixed.icon,
                    };

                    return (
                      <div key={fixed.icon} className="rounded-lg border border-gray-700/80 bg-gray-900/60 p-3 space-y-1.5">
                        <label className="flex items-center justify-between text-xs font-medium">
                          <span className="text-sky-300 font-semibold">{fixed.platform}</span>
                          <span className="text-gray-500">{fixed.label}</span>
                        </label>
                        <input
                          className={inputClass}
                          placeholder={`https://${fixed.icon === "x" ? "x.com" : fixed.icon + ".com"}/...`}
                          value={currentSocial.url}
                          onChange={(e) => {
                            const newUrl = e.target.value;
                            const updatedSocials = FIXED_SOCIALS.map((f) => {
                              if (f.icon === fixed.icon) {
                                return { id: f.id, platform: f.platform, url: newUrl, icon: f.icon };
                              }
                              const existing = content.socials.find((s) => s.icon === f.icon);
                              return existing || { id: f.id, platform: f.platform, url: "", icon: f.icon };
                            });
                            setContent({ ...content, socials: updatedSocials });
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === "about" && (
            <div className="space-y-4 max-w-lg">
              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  className={`${inputClass} h-32`}
                  value={content.about.bio}
                  onChange={(e) =>
                    setContent({ ...content, about: { ...content.about, bio: e.target.value } })
                  }
                />
              </div>
              {(["birthday", "height", "personality"] as const).map((field) => (
                <div key={field}>
                  <label className={labelClass}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    className={inputClass}
                    value={content.about[field]}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, [field]: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
              <div>
                <label className={labelClass}>Likes (comma-separated)</label>
                <input
                  className={inputClass}
                  value={content.about.likes.join(", ")}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        likes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Dislikes (comma-separated)</label>
                <input
                  className={inputClass}
                  value={content.about.dislikes.join(", ")}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        dislikes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                />
              </div>
            </div>
          )}

          {tab === "playlist" && (
            <div className="space-y-4 max-w-lg">
              {content.playlist.map((song, i) => (
                <div key={song.id} className="rounded-lg border border-gray-700 p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Song #{i + 1}</span>
                    <button
                      onClick={() =>
                        setContent({
                          ...content,
                          playlist: content.playlist.filter((s) => s.id !== song.id),
                        })
                      }
                      className="text-xs text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  {(["title", "artist", "audioUrl"] as const).map((field) => (
                    <input
                      key={field}
                      className={inputClass}
                      placeholder={field}
                      value={song[field]}
                      onChange={(e) => {
                        const playlist = [...content.playlist];
                        playlist[i] = { ...song, [field]: e.target.value };
                        setContent({ ...content, playlist });
                      }}
                    />
                  ))}
                  <ImageUploadField
                    label="Cover Image (coverUrl)"
                    value={song.coverUrl}
                    onChange={(newUrl) => {
                      const playlist = [...content.playlist];
                      playlist[i] = { ...song, coverUrl: newUrl };
                      setContent({ ...content, playlist });
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  setContent({
                    ...content,
                    playlist: [
                      ...content.playlist,
                      { id: generateId(), title: "", artist: "", audioUrl: "", coverUrl: "" },
                    ],
                  })
                }
                className="rounded-lg border border-dashed border-gray-600 px-4 py-2 text-sm text-gray-400"
              >
                + Add Song
              </button>
            </div>
          )}

          {tab === "schedule" && (
            <div className="space-y-4 max-w-lg">
              <p className="text-xs text-gray-400">
                จัดการผลงานแข่งขัน / ทัวร์นาเมนต์ (Valorant Achievements & Esports Career)
              </p>
              {content.schedule.map((item, i) => (
                <div key={item.id} className="rounded-lg border border-gray-700 p-4 space-y-3 bg-gray-900/50">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-sm font-semibold text-blue-300">Achievement #{i + 1}</span>
                    <button
                      onClick={() =>
                        setContent({
                          ...content,
                          schedule: content.schedule.filter((s) => s.id !== item.id),
                        })
                      }
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <label className={labelClass}>ปี / วันที่แข่ง (day e.g., 2025)</label>
                    <input
                      className={inputClass}
                      value={item.day || ""}
                      onChange={(e) => {
                        const schedule = [...content.schedule];
                        schedule[i] = { ...item, day: e.target.value };
                        setContent({ ...content, schedule });
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>รางวัล / อันดับ (time e.g., 👑 Champion, 🏆 1st Runner-up)</label>
                    <input
                      className={inputClass}
                      value={item.time || ""}
                      onChange={(e) => {
                        const schedule = [...content.schedule];
                        schedule[i] = { ...item, time: e.target.value };
                        setContent({ ...content, schedule });
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>ชื่อทัวร์นาเมนต์ (title e.g., VCT Thailand Challengers Split 1)</label>
                    <input
                      className={inputClass}
                      value={item.title || ""}
                      onChange={(e) => {
                        const schedule = [...content.schedule];
                        schedule[i] = { ...item, title: e.target.value };
                        setContent({ ...content, schedule });
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>รายละเอียด / บทบาททีม (description e.g., Main Duelist KDA 1.85)</label>
                    <input
                      className={inputClass}
                      value={item.description || ""}
                      onChange={(e) => {
                        const schedule = [...content.schedule];
                        schedule[i] = { ...item, description: e.target.value };
                        setContent({ ...content, schedule });
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>เกม / แท็ก (platform e.g., Valorant)</label>
                    <input
                      className={inputClass}
                      value={item.platform || ""}
                      onChange={(e) => {
                        const schedule = [...content.schedule];
                        schedule[i] = { ...item, platform: e.target.value };
                        setContent({ ...content, schedule });
                      }}
                    />
                  </div>

                  <ImageUploadField
                    label="รูปภาพทัวร์นาเมนต์ / ถ้วยรางวัล (imageUrl - Optional)"
                    value={item.imageUrl || ""}
                    onChange={(newUrl) => {
                      const schedule = [...content.schedule];
                      schedule[i] = { ...item, imageUrl: newUrl };
                      setContent({ ...content, schedule });
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  setContent({
                    ...content,
                    schedule: [
                      ...content.schedule,
                      {
                        id: generateId(),
                        day: "2026",
                        time: "👑 Champion",
                        title: "New Valorant Tournament",
                        description: "รายละเอียดผลงาน / ตำแหน่งที่เล่น",
                        platform: "Valorant",
                        imageUrl: "",
                      },
                    ],
                  })
                }
                className="w-full rounded-lg border border-dashed border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-300 hover:border-blue-400 hover:text-white transition-colors"
              >
                + Add Achievement (เพิ่มผลงานแข่งขัน)
              </button>
            </div>
          )}

          {tab === "theme" && (
            <div className="space-y-4 max-w-lg">
              {(["primary", "secondary", "accent"] as const).map((key) => (
                <div key={key}>
                  <label className={labelClass}>{key.charAt(0).toUpperCase() + key.slice(1)} Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={content.theme[key]}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          theme: { ...content.theme, [key]: e.target.value },
                        })
                      }
                      className="h-10 w-10 cursor-pointer rounded border-0"
                    />
                    <input
                      className={inputClass}
                      value={content.theme[key]}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          theme: { ...content.theme, [key]: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <ImageUploadField
                label="Background Image"
                value={content.backgroundImage}
                onChange={(newValue) => setContent({ ...content, backgroundImage: newValue })}
              />
            </div>
          )}

          {tab === "decorations" && (
            <div className="space-y-3 max-w-lg">
              {(
                Object.entries(content.decorations) as [keyof SiteContent["decorations"], boolean][]
              ).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 rounded-lg border border-gray-700 p-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        decorations: { ...content.decorations, [key]: e.target.checked },
                      })
                    }
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
