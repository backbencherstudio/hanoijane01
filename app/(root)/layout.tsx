import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background ">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-1">{children}</main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default layout;
