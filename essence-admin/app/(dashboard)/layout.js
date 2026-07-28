import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/auth";
import DashboardShell from "@/components/admin/DashboardShell";

export default async function DashboardLayout({ children }) {
  const admin = await getSessionAdmin();
  if (!admin) redirect("/login");

  return <DashboardShell>{children}</DashboardShell>;
}
