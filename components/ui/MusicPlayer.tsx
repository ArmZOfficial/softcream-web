"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Song } from "@/lib/types";
import { IMAGE_PATHS } from "@/lib/default-data";

interface MusicPlayerProps {
  playlist: Song[];
}

const LOCKED_VOLUME = 2; // Locked at 2% soft background ambiance volume

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function Equalizer({ playing }: { playing: boolean }) {
  const bars = [0, 1, 2, 3, 4];

  return (
    <div className="flex h-4 items-end gap-[2px]" aria-hidden="true">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-sky-light"
          animate={
            playing
              ? { height: ["4px", "14px", "6px", "12px", "4px"] }
              : { height: "4px" }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer({ playlist }: MusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true); // Autoplay enabled on site load
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const playingRef = useRef(playing);
  const playlistRef = useRef(playlist);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    playlistRef.current = playlist;
  }, [playlist]);

  const current = playlist[currentIndex] || playlist[0];
  const ytId = getYouTubeId(current?.audioUrl || "");

  // Always enforce locked volume (2%)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = LOCKED_VOLUME / 100;
    }
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      ytPlayerRef.current.setVolume(LOCKED_VOLUME);
    }
  }, [currentIndex]);

  // Handle YouTube Iframe Player initialization with Autoplay
  useEffect(() => {
    if (!ytId) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const initYT = () => {
      if (!ytContainerRef.current) return;
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === "function") {
        ytPlayerRef.current.destroy();
      }

      ytPlayerRef.current = new (window as any).YT.Player(ytContainerRef.current, {
        height: "1",
        width: "1",
        videoId: ytId,
        playerVars: {
          autoplay: 1, // Autoplay
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(LOCKED_VOLUME);
            if (playingRef.current) {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            const YTState = (window as any).YT.PlayerState;
            if (event.data === YTState.PLAYING) {
              setPlaying(true);
              if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = setInterval(() => {
                if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
                  const curr = ytPlayerRef.current.getCurrentTime();
                  const dur = ytPlayerRef.current.getDuration();
                  if (dur > 0) setProgress((curr / dur) * 100);
                }
              }, 500);
            } else if (event.data === YTState.PAUSED) {
              setPlaying(false);
              if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            } else if (event.data === YTState.ENDED) {
              setPlaying(false);
              if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
              if (playlistRef.current.length > 1) {
                setCurrentIndex((prev) => (prev + 1) % playlistRef.current.length);
                setPlaying(true);
              }
            }
          },
        },
      });
    };

    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      (window as any).onYouTubeIframeAPIReady = initYT;
    } else if ((window as any).YT.Player) {
      initYT();
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [ytId]);

  // Handle HTML5 Audio time and ended events
  useEffect(() => {
    if (ytId) return;
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      if (playlistRef.current.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % playlistRef.current.length);
        setPlaying(true);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [ytId]);

  // Autoplay fallback handler for strict browser autoplay restrictions
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (playing) {
        if (ytId && ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === "function") {
          ytPlayerRef.current.setVolume(LOCKED_VOLUME);
          ytPlayerRef.current.playVideo();
        } else if (!ytId && audioRef.current && current?.audioUrl) {
          audioRef.current.volume = LOCKED_VOLUME / 100;
          audioRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [ytId, playing, current?.audioUrl]);

  useEffect(() => {
    if (ytId) {
      if (playing && ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === "function") {
        ytPlayerRef.current.setVolume(LOCKED_VOLUME);
        ytPlayerRef.current.playVideo();
      }
      return;
    }
    if (playing && audioRef.current && current?.audioUrl) {
      audioRef.current.volume = LOCKED_VOLUME / 100;
      audioRef.current.play().catch(() => setPlaying(false));
    }
  }, [currentIndex, current?.audioUrl, playing, ytId]);

  const togglePlay = useCallback(() => {
    if (!current?.audioUrl) return;

    if (ytId) {
      if (!ytPlayerRef.current || typeof ytPlayerRef.current.playVideo !== "function") {
        setPlaying(!playing);
        return;
      }
      if (playing) {
        ytPlayerRef.current.pauseVideo();
        setPlaying(false);
      } else {
        ytPlayerRef.current.setVolume(LOCKED_VOLUME);
        ytPlayerRef.current.playVideo();
        setPlaying(true);
      }
    } else {
      if (!audioRef.current) return;
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.volume = LOCKED_VOLUME / 100;
        audioRef.current.play().catch(() => {});
        setPlaying(true);
      }
    }
  }, [playing, current?.audioUrl, ytId]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;

    if (ytId && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
      const dur = ytPlayerRef.current.getDuration();
      if (dur) ytPlayerRef.current.seekTo(pct * dur, true);
    } else if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = pct * audioRef.current.duration;
    }
  };

  if (!current) return null;

  return (
    <>
      {/* Hidden YouTube Iframe Container */}
      <div className="pointer-events-none absolute -left-96 -top-96 h-1 w-1 overflow-hidden opacity-0" aria-hidden="true">
        <div ref={ytContainerRef} />
      </div>

      {/* HTML5 Audio Tag (for MP3/WAV URLs) */}
      {!ytId && current.audioUrl && (
        <audio ref={audioRef} src={current.audioUrl} preload="metadata" autoPlay />
      )}

      <motion.div
        className="fixed right-4 top-4 z-50 w-72"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-sky-light/20 bg-midnight/80 shadow-[0_8px_32px_rgba(28,42,82,0.5)] backdrop-blur-xl">
          {/* Music notes decoration */}
          <Image
            src={IMAGE_PATHS.musicNotes}
            alt=""
            width={40}
            height={40}
            className="pointer-events-none absolute -right-1 -top-1 opacity-50"
            style={{ filter: "brightness(0) invert(1)" }}
            aria-hidden="true"
          />

          <div className="flex items-center gap-3 p-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-sky-light/20">
              <Image
                src={current.coverUrl || IMAGE_PATHS.vtuber}
                alt={current.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-moon-white">
                {current.title}
              </p>
              <p className="truncate text-xs text-sky-light">{current.artist}</p>
              <Equalizer playing={playing} />
            </div>

            <button
              onClick={togglePlay}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-periwinkle text-moon-white shadow-md transition-all hover:scale-105 hover:bg-violet-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
              aria-label={playing ? "Pause" : "Play"}
              disabled={!current.audioUrl}
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="4" height="12" rx="1" />
                  <rect x="9" y="2" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2l10 6-10 6V2z" />
                </svg>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="mx-3 mb-2 h-1 cursor-pointer rounded-full bg-midnight/60"
            onClick={seek}
            role="slider"
            aria-label="Song progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-periwinkle to-violet-glow transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Playlist toggle */}
          {playlist.length > 1 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full border-t border-sky-light/10 py-1.5 text-xs text-sky-light transition-colors hover:text-moon-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
              aria-expanded={expanded}
            >
              {expanded ? "Hide playlist" : `Playlist (${playlist.length})`}
            </button>
          )}

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-sky-light/10"
              >
                {playlist.map((song, i) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setPlaying(true);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-sky-light/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light ${
                      i === currentIndex ? "text-moon-white font-bold" : "text-sky-light/70"
                    }`}
                  >
                    <span className="w-4 text-center">{i === currentIndex && playing ? "♪" : i + 1}</span>
                    <span className="truncate">{song.title}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
