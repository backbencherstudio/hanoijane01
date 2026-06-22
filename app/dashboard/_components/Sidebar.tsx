"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, FileText, LayoutDashboard } from "lucide-react";
import { useState } from "react";

type MenuItem = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Booking Management",
    icon: <LayoutDashboard size={18} />,
    children: [
      {
        title: "Booked List",
        href: "/dashboard/bookings/booked",
      },
      {
        title: "Reserved Booking",
        href: "/dashboard/bookings/reserved",
      },
      {
        title: "Booking Request",
        href: "/dashboard/bookings/request",
      },
      {
        title: "Overdue Booking",
        href: "/dashboard/bookings/overdue",
      },
      {
        title: "Cancel Booking",
        href: "/dashboard/bookings/cancelled",
      },
    ],
  },
  {
    title: "Document Review",
    href: "/document-review",
    icon: <FileText size={18} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isParentActive = (item: MenuItem) => {
    return item.children?.some((child) => pathname === child.href) ?? false;
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

  return (
    <aside className="w-68 min-h-screen bg-[#114263] text-white">
      <div className="h-18 border-b border-gray-500" />

      <nav className="space-y-2 p-2.5 text-sm font-medium">
        {menuItems.map((item) => {
          const hasChildren = !!item.children?.length;
          const parentActive = isParentActive(item);

          return (
            <div key={item.title}>
              {/* Parent Menu */}
              {hasChildren ? (
                <div
                  className={` rounded-lg transition-all duration-200 ${
                    parentActive ? "pl-1 bg-white" : ""
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
                  className={` rounded-lg transition-all duration-200 ${
                    pathname === item.href ? "pl-1 bg-white" : ""
                  }`}
                >
                  <Link
                    href={item.href!}
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
                  className={`
                    grid transition-all duration-300 ease-in-out
                    ${
                      openMenus[item.title]
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="relative ml-5">
                      {/* Main vertical line */}
                      <div className="absolute left-0 top-0 bottom-11 w-px bg-white/70" />

                      <div className="space-y-4">
                        {item.children!.map((child) => {
                          const active = pathname === child.href;

                          return (
                            <div key={child.title} className="relative pl-4">
                              {/* Curve */}
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
                                href={child.href!}
                                className={`block rounded-md px-4 py-3 transition-all duration-200
                                  ${
                                    active
                                      ? "bg-white/10 text-white"
                                      : "hover:bg-white/10"
                                  }
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
    </aside>
  );
}
