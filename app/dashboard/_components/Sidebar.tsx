"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Banknote,
  CalendarRange,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import SidebarSkeleton from "./SidebarSkeleton";
import MenuRender from "./MenuRender.tsx";
import { BsShopWindow } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import LogOutModal from "@/app/(auth)/_components/LogOutModal";

type MenuItem = {
  title: string;
  href?: string;
  query?: Record<string, string>;
  icon?: React.ReactNode;
  children?: MenuItem[];
  matchChildren?: boolean;
};

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Stand Management",
    icon: <BsShopWindow size={18} />,
    children: [
      {
        title: "View All Stands",
        href: "/dashboard/stand-management/stands",
      },
      {
        title: "Stand Price",
        href: "/dashboard/stand-management/stand-price",
      },
    ],
  },
  {
    title: "Booking Management",
    icon: <CalendarRange size={18} />,
    children: [
      {
        title: "All Bookings",
        href: "/dashboard/booking-management",
        query: { status: "all" },
      },
      {
        title: "Booked List",
        href: "/dashboard/booking-management",
        query: { status: "booked" },
      },
      {
        title: "Reserved Booking",
        href: "/dashboard/booking-management",
        query: { status: "reserved" },
      },
      {
        title: "Booking Request",
        href: "/dashboard/booking-management",
        query: { status: "request" },
      },
      {
        title: "Overdue Booking",
        href: "/dashboard/booking-management",
        query: { status: "overdue" },
      },
      {
        title: "Cancel Booking",
        href: "/dashboard/booking-management",
        query: { status: "cancel" },
      },
    ],
  },
  {
    title: "Payment Tracking",
    icon: <Banknote size={18} />,
    children: [
      {
        title: "All Payments",
        href: "/dashboard/payment-tracking",
        query: { status: "all" },
      },
      {
        title: "Paid Payment",
        href: "/dashboard/payment-tracking",
        query: { status: "paid" },
      },
      {
        title: "Pending Payment",
        href: "/dashboard/payment-tracking",
        query: { status: "pending" },
      },
      {
        title: "Overdue Payment",
        href: "/dashboard/payment-tracking",
        query: { status: "overdue" },
      },
    ],
  },
  // {
  //   title: "Document Review",
  //   href: "/document-review",
  //   icon: <FileText size={18} />,
  // },
];

const footerItems: MenuItem[] = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    matchChildren: true,
    icon: <Settings size={18} />,
  },
];

// Separate component that uses usePathname and useSearchParams
function SidebarContent({ isOpen, setIsOpen }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isQueryMatched = (query?: Record<string, string>) => {
    if (!query) return true;
    return Object.entries(query).every(
      ([key, value]) => searchParams.get(key) === value,
    );
  };

  const buildHref = (href: string, query?: Record<string, string>) => {
    if (!query) return href;
    const params = new URLSearchParams(query);
    return `${href}?${params.toString()}`;
  };

  const isParentActive = (item: MenuItem) => {
    return (
      item.children?.some(
        (child) => pathname === child.href && isQueryMatched(child.query),
      ) ?? false
    );
  };

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const activeParents = menuItems
      .filter((item) => isParentActive(item))
      .map((item) => [item.title, true]);
    return Object.fromEntries(activeParents);
  });

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleNavigation = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 bg-black/50 z-40 lg:hidden
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />
      <aside
        className={`
          fixed top-0 left-0
          h-screen w-68
          bg-[#114263]
          text-white
          z-50
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-18 border-b border-gray-500 flex justify-between px-2.5 items-center">
          <Link href="/dashboard">
            <Image
              src="/logo.webp"
              alt="ITBA EXPO The Next 100"
              width={58}
              height={48}
            />
          </Link>
        </div>

        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          <nav className="space-y-2 p-2.5 text-sm font-medium ">
            {menuItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const parentActive = isParentActive(item);

              return (
                <div key={item.title}>
                  {/* Parent Menu */}
                  {hasChildren ? (
                    <div
                      className={`rounded-lg transition-all duration-200 ${
                        parentActive ? "pl-0.5 bg-white" : ""
                      }`}
                    >
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className={`w-full flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 cursor-pointer
                        ${
                          parentActive
                            ? "bg-[#3f6781] text-white"
                            : "bg-[#114263] hover:bg-white/10"
                        }
                      `}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.title}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`transition-all duration-300 ease-in-out ${
                            openMenus[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`rounded-lg transition-all duration-200 ${
                        pathname === item.href ? "pl-0.5 bg-white" : ""
                      }`}
                    >
                      <Link
                        href={item.href!}
                        onClick={handleNavigation}
                        className={`flex items-center gap-2 rounded-lg px-4 py-3 transition-all duration-200
                        ${
                          pathname === item.href
                            ? "bg-[#3f6781] text-white"
                            : "bg-[#114263] hover:bg-[#3f6781]"
                        }
                      `}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </div>
                  )}

                  {/* Children */}
                  {hasChildren && (
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        openMenus[item.title]
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="relative ml-5 pt-4">
                          <div className="absolute left-0 -top-2 bottom-10 w-px bg-white/70" />
                          <div className="space-y-4">
                            {item.children!.map((child) => {
                              const active =
                                pathname === child.href &&
                                isQueryMatched(child.query);

                              return (
                                <div
                                  key={child.title}
                                  className="relative pl-4"
                                >
                                  <div
                                    className="
                                    absolute
                                    left-0
                                    top-1
                                    w-4
                                    h-5
                                    border-l
                                    border-b
                                    border-white/70
                                    rounded-bl-2xl
                                  "
                                  />
                                  <Link
                                    href={buildHref(child.href!, child.query)}
                                    onClick={handleNavigation}
                                    className={`
                                    block rounded-md px-4 py-3 transition-all duration-200
                                    ${active ? "bg-white/10 text-white" : "hover:bg-white/10"}
                                  `}
                                  >
                                    {child.title}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="h-32  border-t border-gray-500 flex flex-col items-start justify-center px-2.5 gap-4">
          <MenuRender menuItems={footerItems} />
          <div className="w-full hover:bg-white rounded-lg hover:pl-0.5 transition-all duration-300">
            <button
              onClick={() => setOpen(true)}
              className="text-sm flex items-center gap-2 py-3 px-4 w-full rounded-lg bg-[#114263] cursor-pointer"
            >
              {" "}
              <IoMdLogOut className="size-4.5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
      <LogOutModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

// Main Sidebar component with Suspense
export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent isOpen={isOpen} setIsOpen={setIsOpen} />
    </Suspense>
  );
}
