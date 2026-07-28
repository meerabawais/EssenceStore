"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/basePath";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_BASE}/api/auth/logout`, { method: "POST" }).finally(() => {
      router.replace("/login");
      router.refresh();
    });
  }, [router]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <p>Logging out...</p>
    </div>
  );
}
