import { getSiteContent } from "@/lib/storage";
import SitePage from "@/components/SitePage";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  const title = content.siteName === "ดวงจันทร์" ? "softcreamzx - vtuber 🌙" : `${content.siteName} - vtuber 🌙`;
  return {
    title,
    description: `${content.siteName} — ${content.tagline}`,
  };
}

export default async function Home() {
  const content = await getSiteContent();
  return <SitePage content={content} />;
}
