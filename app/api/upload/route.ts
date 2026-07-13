import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
    }

    const ext = path.extname(file.name) || ".png";
    const fileName = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 6)}${ext}`;

    // 1. If Vercel Blob is configured (BLOB_READ_WRITE_TOKEN exists in environment variables)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(fileName, file, { access: "public" });
        return NextResponse.json({ url: blob.url });
      } catch (blobError) {
        console.error("Vercel Blob upload failed, falling back:", blobError);
      }
    }

    // 2. Try saving to local filesystem (public/images/) for local development / self-hosting
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "images");

    try {
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      return NextResponse.json({ url: `/images/${fileName}` });
    } catch (fsError) {
      console.warn("Could not save file locally, falling back to data URL:", fsError);
      // 3. Ultimate Fallback: Return Base64 Data URL if filesystem is read-only and no Blob storage configured
      const dataUrl = `data:${file.type || "image/png"};base64,${buffer.toString("base64")}`;
      return NextResponse.json({ url: dataUrl });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
