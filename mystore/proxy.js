import { NextResponse } from "next/server";
import { verifyToken, TOKEN_COOKIE } from "@/lib/auth";

// Proxy (formerly "middleware") always runs on the Node.js runtime, so
// verifying the JWT signature here is safe. This is a fast, DB-free check;
// the authoritative check (DB-backed, via getSessionUser()) still happens in
// each /user/* page as defense-in-depth.
export function proxy(request) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const payload = token && verifyToken(token);

  if (!payload || payload.role !== "USER") {
    const loginUrl = new URL("/account/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
