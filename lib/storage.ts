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

function isSupabaseConfigured(): boolean {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key);
}

async function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  try {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(url, key);
  } catch (err) {
    console.error("Failed to load @supabase/supabase-js:", err);
    return null;
  }
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
  const supabase = await getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("key", CONTENT_KEY)
        .single();
      if (data?.data) {
        return data.data as SiteContent;
      }
      if (error && error.code !== "PGRST116" && error.code !== "42P01") {
        console.error("Supabase read error:", error);
      }
    } catch (err) {
      console.error("Supabase read exception:", err);
    }
  }

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
  const supabase = await getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key: CONTENT_KEY, data: content }, { onConflict: "key" });
    if (error) {
      if (error.code === "42P01" || error.message?.includes("does not exist") || error.message?.includes("could not find table")) {
        throw new Error(
          "ยังไม่ได้สร้างตารางใน Supabase กรุณาไปที่ Supabase Dashboard → SQL Editor แล้วรันคำสั่ง: CREATE TABLE IF NOT EXISTS site_content (key text PRIMARY KEY, data jsonb);"
        );
      }
      throw new Error(`Supabase Save Error: ${error.message}`);
    }
    return;
  }

  const kvInstance = await getKv();
  if (kvInstance) {
    await kvInstance.set(CONTENT_KEY, content);
    return;
  }

  if (process.env.VERCEL === "1" || process.env.VERCEL_ENV) {
    throw new Error("ยังไม่ได้เชื่อมต่อฐานข้อมูล กรุณาตั้งค่า Supabase (SUPABASE_URL และ SUPABASE_SERVICE_ROLE_KEY) หรือ Vercel KV เพื่อให้สามารถบันทึกข้อมูลบน Production ได้");
  }

  await writeLocal(content);
}

export async function resetSiteContent(): Promise<SiteContent> {
  await saveSiteContent(defaultContent);
  return defaultContent;
}
