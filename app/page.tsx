import { getSiteContent } from "@/lib/storage";
import SitePage from "@/components/SitePage";

export const revalidate = 60;

export default async function Home() {
  const content = await getSiteContent();
  return <SitePage content={content} />;
}
