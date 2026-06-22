"use client";

import { useState } from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f9fafb]">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 min-w-0">
        <Navbar setIsOpen={setSidebarOpen} />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;