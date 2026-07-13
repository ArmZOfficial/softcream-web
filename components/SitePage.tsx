import type { SiteContent } from "@/lib/types";
import SiteBackground from "@/components/ui/SiteBackground";
import ColorPalette from "@/components/ui/ColorPalette";
import ThemeProvider from "@/components/ui/ThemeProvider";
import ImageProtection from "@/components/ui/ImageProtection";
import MusicPlayer from "@/components/ui/MusicPlayer";
import SocialDock from "@/components/ui/SocialDock";
import DustParticles from "@/components/animations/DustParticles";
import Butterflies from "@/components/animations/Butterflies";
import Sparkles from "@/components/animations/Sparkles";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Schedule from "@/components/sections/Schedule";
import Gallery from "@/components/sections/Gallery";
import Socials, { Footer } from "@/components/sections/Socials";
import AdminGearButton from "@/components/ui/AdminGearButton";

interface SitePageProps {
  content: SiteContent;
}

export default function SitePage({ content }: SitePageProps) {
  return (
    <>
      <ImageProtection />
      <SiteBackground backgroundImage={content.backgroundImage} />
      <ThemeProvider theme={content.theme} />
      <ColorPalette
        primary={content.theme.primary}
        secondary={content.theme.secondary}
        accent={content.theme.accent}
      />
      <MusicPlayer playlist={content.playlist} />

      {content.decorations.dust && <DustParticles enabled />}
      {content.decorations.butterflies && <Butterflies enabled count={5} />}
      {content.decorations.sparkles && <Sparkles enabled />}

      <main className="relative z-10">
        <Hero content={content} />
        <About about={content.about} />
        <Gallery images={content.gallery} />
        <Schedule schedule={content.schedule} />
        <Socials socials={content.socials} />
        <Footer siteName={content.siteName} />
      </main>

      <SocialDock socials={content.socials} variant="hero" />
      <AdminGearButton />
    </>
  );
}
