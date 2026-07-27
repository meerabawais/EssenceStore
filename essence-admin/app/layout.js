"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
import Topbar from "@/components/admin/Topbar/Topbar";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body>
        <Sidebar isOpen={isSidebarOpen} />

        <main
          style={{
            marginLeft: isSidebarOpen ? "270px" : "0",
            transition: "0.3s",
          }}
        >
          <Topbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {children}
        </main>
      </body>
    </html>
  );
}