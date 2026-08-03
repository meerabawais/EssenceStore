import { NextResponse } from "next/server";
import { verifyToken, TOKEN_COOKIE } from "@/lib/auth";

// Proxy (formerly "middleware") always runs on the Node.js runtime, so
// verifying the JWT signature and role here is safe. This is a fast, DB-free
// check; the authoritative check (DB-backed, via getSessionAdmin()) still
// happens in app/(dashboard)/layout.js as defense-in-depth.
export function proxy(request) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const payload = token && verifyToken(token);

  if (!payload || payload.role !== "ADMIN") {
    // request.nextUrl is basePath-aware, unlike a plain `new URL(..., request.url)`
    // (which would produce a bare "/login" that 404s once basePath is stripped).
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// basePath ("/admin") is applied automatically by Next.js on top of this
// matcher pattern and on request.nextUrl.pathname, so it's written without
// the "/admin" prefix here.
export const config = {
  matcher: [
    "/((?!api|login|_next/static|_next/image|favicon.ico).*)",
  ],
};