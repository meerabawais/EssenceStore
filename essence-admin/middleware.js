import { NextResponse } from "next/server";

const TOKEN_COOKIE = "essence_token";

// This only checks that *a* session cookie is present, as a fast redirect for
// signed-out visitors. Middleware runs on the Edge runtime, which can't run
// jsonwebtoken (needs Node's crypto), so it can't verify the token or role
// here. The real check — valid signature and role === "ADMIN" — happens in
// app/(dashboard)/layout.js via getSessionAdmin(), which runs in Node.js.
export function middleware(request) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// basePath ("/admin") is applied automatically by Next.js on top of these
// matcher patterns and on request.nextUrl.pathname, so both are written
// without the "/admin" prefix here.
export const config = {
  matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
