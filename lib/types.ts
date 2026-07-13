export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  title: string;
  description: string;
  platform: string;
  imageUrl?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface AboutData {
  bio: string;
  birthday: string;
  height: string;
  personality: string;
  likes: string[];
  dislikes: string[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface DecorationToggles {
  butterflies: boolean;
  sparkles: boolean;
  dust: boolean;
  moon: boolean;
  floatingElements: boolean;
}

export interface SiteContent {
  siteName: string;
  tagline: string;
  hero: {
    followUrl: string;
    messageUrl: string;
    characterImage: string;
    characterImageAlt: string;
  };
  about: AboutData;
  socials: SocialLink[];
  playlist: Song[];
  schedule: ScheduleItem[];
  gallery: GalleryImage[];
  theme: ThemeColors;
  backgroundImage: string;
  decorations: DecorationToggles;
}
