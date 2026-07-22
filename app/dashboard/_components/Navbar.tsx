"use client";

import { Bell, PanelLeftOpen, User } from "lucide-react";
import Image from "next/image";
import DashboardBreadcrumb from "./DashboardBreadcrumb";

type NavbarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const user: {
  name: string;
  image: string;
  company: string;
  email: string;
  phone: string;
  company_address: string;
  password: string;
  document: string[];
} = {
  name: "Jacob Jones",
  image: "/logo.webp",
  company: "The Walt Disney Company",
  email: "jacob@gmail.com",
  phone: "1999999999",
  company_address: "3891 Ranchview Dr. Richardson, California 62639",
  password: "**********",
  document: ["/assets/ita.pdf"],
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  return (
    <div className="h-18 border-b border-gray-300 px-4 lg:px-6 flex items-center justify-between z-501 bg-[#F9FAFB]">
      <div className="flex items-center gap-4 text-text-primary">
        <button onClick={() => setIsOpen(true)} className="lg:hidden">
          <PanelLeftOpen size={20} className="text-accent" />
        </button>

        <div className="font-medium">
            <DashboardBreadcrumb />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          
          <div className="relative size-8 border border-[#DFE1E7] rounded-full flex justify-center items-center">
            <Bell size={16} />
            <div className="size-1.25 bg-[#DF1C41] rounded-full absolute ring-2 ring-[#F9FAFB] top-2 right-2"></div>
          </div>
          <div className="w-px bg-[#DFE1E7] h-6"></div>
          <div className="flex items-center gap-2 space-y-1 justify-center">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                height={32}
                width={32}
                className="object-cover overflow-hidden rounded-full size-8 shrink-0"
              />
            ) : (
              <div className="size-12 rounded-full bg-gray-300 text-gray-600 flex justify-center items-center shrink-0">
                <User size={24} />
              </div>
            )}
            <div className="hidden md:flex flex-col justify-between">
              <p className="text-sm font-semibold text-text-primary">
                {user.name}
              </p>
              <p className="text-sm text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
