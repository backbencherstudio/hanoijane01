"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, FileText, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type MenuItem = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
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
    icon: <LayoutDashboard size={18} />,
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
    title: "Document Review",
    href: "/document-review",
    icon: <FileText size={18} />,
  },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
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
          <div>
            <Link href="/dashboard">
              <Image
                src="/logo.webp"
                alt="ITBA EXPO The Next 100"
                width={58}
                height={48}
              />
            </Link>
          </div>
        </div>

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
                    className={` rounded-lg transition-all duration-200 ${
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
                        <div className="absolute left-0 top-0 bottom-10 w-px bg-white/70" />

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
                                  onClick={handleNavigation}
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
    </>
  );
}
