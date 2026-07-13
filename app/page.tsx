import { getSiteContent } from "@/lib/storage";
import SitePage from "@/components/SitePage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  return <SitePage content={content} />;
}
