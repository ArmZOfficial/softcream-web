"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  helperText?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  helperText = "PNG หรือ WebP ขนาดไม่เกิน 5MB",
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("ขนาดไฟล์ใหญ่เกินไป (ไม่ควรเกิน 10MB)");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
        }
      } else {
        const data = await res.json();
        setError(data.error || "อัปโหลดไม่สำเร็จ");
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการอัปโหลด");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2 rounded-xl border border-gray-800/80 bg-gray-900/40 p-4">
      <label className="block text-xs font-semibold text-sky-400">{label}</label>

      {/* Manual URL input field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/vtuber.png หรือ https://..."
        className="w-full rounded-lg border border-gray-700 bg-gray-800/80 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none"
      />

      {/* Thumbnail preview and Upload button */}
      <div className="mt-3 flex items-center gap-4 pt-1">
        {/* Thumbnail Preview Box */}
        <div className="relative flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-700/80 bg-gray-800/90 shadow-inner">
          {value ? (
            <Image
              src={value}
              alt="Preview"
              fill
              unoptimized
              className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-[10px] text-gray-500">No Image</span>
          )}
        </div>

        {/* Upload Button Box */}
        <div className="flex flex-col items-start gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp, image/gif"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-900/50 px-4 py-1.5 text-xs font-semibold text-sky-200 shadow-sm backdrop-blur-sm transition-all hover:border-sky-400 hover:bg-sky-600 hover:text-white active:scale-95 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <svg className="h-3.5 w-3.5 animate-spin text-sky-300" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="text-sky-300">กำลังอัปโหลด...</span>
              </>
            ) : (
              <span>เลือกรูปใหม่</span>
            )}
          </button>

          <p className="text-[11px] font-normal text-sky-300/60">{helperText}</p>
          {error && <p className="text-[11px] font-medium text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}
