import { kv } from "@vercel/kv";
import { promises as fs } from "fs";
import path from "path";
import { defaultContent, CONTENT_KEY } from "./default-data";
import type { SiteContent } from "./types";

const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "site-content.json");

function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function readLocal(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

async function writeLocal(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function getSiteContent(): Promise<SiteContent> {
  if (isKvConfigured()) {
    try {
      const data = await kv.get<SiteContent>(CONTENT_KEY);
      if (data) return data;
    } catch (error) {
      console.error("KV read error, falling back:", error);
    }
  }

  const local = await readLocal();
  if (local) return local;

  return defaultContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (isKvConfigured()) {
    await kv.set(CONTENT_KEY, content);
    return;
  }

  await writeLocal(content);
}

export async function resetSiteContent(): Promise<SiteContent> {
  await saveSiteContent(defaultContent);
  return defaultContent;
}
