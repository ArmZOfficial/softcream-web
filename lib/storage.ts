import { promises as fs } from "fs";
import path from "path";
import { defaultContent, CONTENT_KEY } from "./default-data";
import type { SiteContent } from "./types";
import siteContentJson from "../data/site-content.json";

const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "site-content.json");

function isKvConfigured(): boolean {
  return !!(
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
    (process.env.KV_URL && process.env.KV_TOKEN)
  );
}

async function getKv() {
  if (!isKvConfigured()) return null;
  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.KV_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_TOKEN;

    if (url && !process.env.KV_REST_API_URL) process.env.KV_REST_API_URL = url;
    if (token && !process.env.KV_REST_API_TOKEN) process.env.KV_REST_API_TOKEN = token;

    const vercelKv = await import("@vercel/kv");
    if (url && token && vercelKv.createClient) {
      return vercelKv.createClient({ url, token });
    }
    return vercelKv.kv;
  } catch (err) {
    console.error("Failed to load @vercel/kv:", err);
    return null;
  }
}

async function readLocal(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    // If filesystem read fails on Vercel Serverless, return the statically bundled JSON
    return (siteContentJson as SiteContent) || null;
  }
}

async function writeLocal(content: SiteContent): Promise<void> {
  try {
    await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
    await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (err) {
    console.warn("Write local failed (expected on Vercel Serverless read-only filesystem):", err);
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const kvInstance = await getKv();
  if (kvInstance) {
    try {
      const data = await kvInstance.get<SiteContent>(CONTENT_KEY);
      if (data) return data;
    } catch (error) {
      console.error("KV read error, falling back:", error);
    }
  }

  const local = await readLocal();
  if (local) return local;

  return (siteContentJson as SiteContent) || defaultContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const kvInstance = await getKv();
  if (kvInstance) {
    await kvInstance.set(CONTENT_KEY, content);
    return;
  }

  if (process.env.VERCEL === "1" || process.env.VERCEL_ENV) {
    throw new Error("ยังไม่ได้เชื่อมต่อฐานข้อมูล Vercel KV / Upstash Redis กรุณาเพิ่ม Redis Storage ใน Vercel Dashboard → Storage เพื่อให้สามารถบันทึกข้อมูลบน Production ได้");
  }

  await writeLocal(content);
}

export async function resetSiteContent(): Promise<SiteContent> {
  await saveSiteContent(defaultContent);
  return defaultContent;
}
