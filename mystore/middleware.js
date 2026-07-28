import { NextResponse } from "next/server";

const TOKEN_COOKIE = "essence_token";

export function middleware(request) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/account/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
