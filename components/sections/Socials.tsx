"use client";

import Image from "next/image";
import GothicArch from "@/components/ui/GothicArch";
import SocialDock from "@/components/ui/SocialDock";
import { IMAGE_PATHS } from "@/lib/default-data";
import { whiteFilter } from "@/lib/utils";
import type { SocialLink } from "@/lib/types";

interface SocialsProps {
  socials: SocialLink[];
}

export default function Socials({ socials }: SocialsProps) {
  return (
    <GothicArch id="socials" variant="rounded">
      <h2 className="mb-8 text-center font-display text-3xl text-moon-white md:text-4xl">
        Connect
      </h2>

      <SocialDock socials={socials} variant="section" />

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-sky-light/20 bg-midnight/40 px-6 py-2 text-sm text-sky-light transition-colors hover:border-periwinkle hover:text-moon-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light"
          >
            {social.platform}
          </a>
        ))}
      </div>
    </GothicArch>
  );
}

interface FooterProps {
  siteName: string;
}

export function Footer({ siteName }: FooterProps) {
  return (
    <footer className="relative pt-16 pb-36 text-center">
      <Image
        src={IMAGE_PATHS.moonDreamcatcher}
        alt=""
        width={120}
        height={60}
        className="mx-auto mb-6 opacity-50"
        style={{ filter: whiteFilter }}
        aria-hidden="true"
      />

      <p className="text-sm font-medium tracking-wide text-sky-light/80">
        &copy; 2026 made by <span className="font-semibold text-moon-white drop-shadow-[0_0_8px_rgba(139,197,255,0.6)]">ArmZ</span>
      </p>

      <a
        href="#"
        className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-sky-light/25 bg-midnight/70 px-5 py-2 text-xs font-medium text-sky-light shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-light hover:bg-periwinkle hover:text-moon-white hover:shadow-[0_0_18px_rgba(139,197,255,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light cursor-pointer"
      >
        <span>Back to top</span>
        <span className="font-bold">↑</span>
      </a>
    </footer>
  );
}
