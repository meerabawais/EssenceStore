import { NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const user = await getSessionAdmin();
  return NextResponse.json({ user });
}
