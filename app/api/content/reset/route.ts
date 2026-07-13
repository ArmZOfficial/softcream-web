import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { resetSiteContent } from "@/lib/storage";

export async function POST() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await resetSiteContent();
  return NextResponse.json(content);
}
