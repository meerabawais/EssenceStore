import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export default async function UserDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/account/login?next=/user/dashboard");

  return (
    <div>
      <h4>Welcome back, {user.name}</h4>
      <p>From here you can view your recent orders and manage your profile.</p>
      <div className="mt-4">
        <Link href="/user/orders" className="btn btn-dark me-3">
          View Orders
        </Link>
        <Link href="/user/profile" className="btn btn-outline-dark">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
