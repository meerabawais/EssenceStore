// Client-side fetch() calls use string paths, which basePath does NOT
// auto-rewrite (unlike next/link, next/image, and router.push). Any fetch
// to this app's own API routes must be prefixed explicitly, or it resolves
// against the gateway's root (mystore) instead of essence-admin.
export const API_BASE = "/admin";
