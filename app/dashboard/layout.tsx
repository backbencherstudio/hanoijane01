"use client";

import { useState } from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import { useSocketNotification } from "@/hooks/useSocketNotification";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize socket connection for real-time notifications
  useSocketNotification();

  return (
    <div className="h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="lg:ml-68 h-screen flex flex-col">
        <Navbar setIsOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 lg:px-6 ">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
