"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const links = [
    { label: "My Profile", href: "/dashboard/settings/my-profile" },
    {
      label: "Password & Security",
      href: "/dashboard/settings/password-security",
    },
    { label: "Notification", href: "/dashboard/settings/notification" },
    { label: "Event Setting", href: "/dashboard/settings/event-setting" },
  ];
  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Settings
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Manage your profile, security, notifications and event
            configuration.
          </p>
        </div>
      </div>
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-6 mt-6">
        <div className="w-full lg:col-span-2 ">
          <ul className="sticky top-0 h-fit bg-white rounded-2xl overflow-hidden p-4 lg:p-6 flex flex-col gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.label} href={link.href}>
                  <li
                    className={`text-sm lg:text-xl font-medium py-2 px-3 cursor-pointer transition-all duration-300 rounded-lg ${isActive ? "bg-primary/5 text-primary hover:bg-primary/4 border border-[#DFE1E7]" : "hover:bg-primary/5 text-[#5E5F79] border border-white"}`}
                  >
                    {link.label}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="col-span-full lg:col-span-3 xl:col-span-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
