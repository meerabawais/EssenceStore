"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
import Topbar from "@/components/admin/Topbar/Topbar";

export default function DashboardShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />

      <main
        style={{
          marginLeft: isSidebarOpen ? "270px" : "0",
          transition: "0.3s",
        }}
      >
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {children}
      </main>
    </>
  );
}
