"use client";

import Link from "next/link";

export default function AdminGearButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/admin"
        aria-label="เข้าสู่ระบบจัดการเนื้อหา (Admin CMS)"
        title="เข้าสู่ระบบจัดการเนื้อหา (Admin CMS)"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-sky-light/30 bg-midnight/80 text-sky-light shadow-[0_4px_20px_rgba(28,42,82,0.8)] backdrop-blur-xl transition-all duration-500 hover:rotate-90 hover:scale-110 hover:border-sky-light hover:bg-periwinkle hover:text-moon-white hover:shadow-[0_0_24px_rgba(139,197,255,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 transition-transform duration-500 group-hover:rotate-180"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Link>
    </div>
  );
}
