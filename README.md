# ดวงจันทร์ — VTuber Personal Website

> คืนพระจันทร์สีน้ำเงินในมหาวิหารดอกไม้ — Dreamy blue VTuber personal site with admin CMS

## Features

- **Dreamy Gothic Theme** — Blue-moon cathedral aesthetic with butterflies, sparkles, and dust particles
- **Animated Hero** — VTuber character with float animation, pose switching, and mouse parallax
- **Floating Music Player** — Persistent widget with playlist, equalizer, and progress bar
- **Full Admin CMS** — Edit all content at `/admin` without redeploying
- **Responsive** — Mobile-friendly with keyboard focus and `prefers-reduced-motion` support
- **Vercel Ready** — Deploy out-of-the-box with KV/Upstash for persistent storage

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file and set your admin password
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, [http://localhost:3000/admin](http://localhost:3000/admin) for CMS.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ADMIN_PASSWORD` | Yes | Password for `/admin` login |
| `KV_REST_API_URL` | Production | Upstash Redis REST URL (from Vercel Storage) |
| `KV_REST_API_TOKEN` | Production | Upstash Redis REST token |

Without KV credentials, content saves to `data/site-content.json` locally (works for dev, not on Vercel).

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add **Redis** integration from [Vercel Marketplace](https://vercel.com/marketplace?category=storage&search=redis)
4. Set `ADMIN_PASSWORD` in Environment Variables
5. Deploy

```bash
vercel deploy
```

## Admin CMS

Navigate to `/admin` and log in with your `ADMIN_PASSWORD`. You can edit:

- Site name, tagline, hero URLs and character images
- About section (bio, birthday, likes/dislikes)
- Social links
- Music playlist (title, artist, audio URL, cover)
- Schedule/events
- Gallery images
- Theme colors and background image
- Toggle decorative animations on/off

Changes save instantly — the front page revalidates every 60 seconds (ISR).

## Image Assets

Place your images in `/public/images/` using the exact filenames from the spec. Replace files without changing code:

```
public/images/
  bg.png                          — Gothic cathedral background
  vtuber.png / vtuber2.png        — Character poses
  Moon_Computer_Icons_PNG-...     — Moon icon (auto-inverted to white)
  mq__blue__butterfly__...        — Flying butterflies (keep color)
  ... (see spec for full list)
```

**Black-line PNGs** are automatically inverted to white via CSS filter. **Colored PNGs** (butterflies, flowers) keep their original colors.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Vercel KV / Upstash Redis (production) or local JSON (dev)
- Jose (JWT session for admin auth)

## Project Structure

```
app/
  page.tsx              — Home page (ISR, fetches CMS data)
  admin/page.tsx        — Admin CMS
  api/content/route.ts  — GET/PUT site content
  api/auth/route.ts     — Admin login/logout
components/
  animations/           — Butterflies, Sparkles, Dust, Moon
  sections/             — Hero, About, Gallery, Schedule, Socials
  ui/                   — GothicArch, MusicPlayer, SocialDock, etc.
  admin/                — AdminPanel, AdminLogin
lib/
  types.ts              — TypeScript interfaces
  default-data.ts       — Default content + image paths
  storage.ts            — KV/local JSON storage layer
  auth.ts               — JWT session management
public/images/          — All image assets
```

## License

Private — for VTuber personal use.
