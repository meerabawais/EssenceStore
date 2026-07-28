"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/user/dashboard", label: "Dashboard" },
  { href: "/user/orders", label: "My Orders" },
  { href: "/user/profile", label: "Profile" },
];

export default function UserNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/account/login");
  };

  return (
    <div className="list-group mb-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`list-group-item list-group-item-action${
            pathname === link.href ? " active" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
      <button
        type="button"
        className="list-group-item list-group-item-action text-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
