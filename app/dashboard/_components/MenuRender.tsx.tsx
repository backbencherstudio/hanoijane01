// components/layout/MenuRender.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

type MenuItem = {
  title: string;
  href?: string;
  query?: Record<string, string>;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

interface MenuRenderProps {
  menuItems: MenuItem[];
}

const MenuRender = ({ menuItems }: MenuRenderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper: check if query matches
  const isQueryMatched = (query?: Record<string, string>) => {
    if (!query) return true;
    return Object.entries(query).every(
      ([key, value]) => searchParams.get(key) === value
    );
  };

  // Helper: build href with query string
  const buildHref = (href: string, query?: Record<string, string>) => {
    if (!query) return href;
    const params = new URLSearchParams(query);
    return `${href}?${params.toString()}`;
  };

  // Check if a parent menu is active (any child is active)
  const isParentActive = (item: MenuItem) => {
    return (
      item.children?.some(
        (child) => pathname === child.href && isQueryMatched(child.query)
      ) ?? false
    );
  };

  // State: which menus are open
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const activeParents = menuItems
      .filter((item) => isParentActive(item))
      .map((item) => [item.title, true]);
    return Object.fromEntries(activeParents);
  });

  // Toggle a menu open/closed
  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Close sidebar on navigation (for mobile)
  const handleNavigation = () => {
    // This is optional – you can pass a setIsOpen callback from parent if needed.
    // For now we do nothing.
  };

  return (
    <div className="space-y-2 text-sm font-medium w-full">
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
                    {/* Vertical line */}
                    <div className="absolute left-0 -top-2 bottom-10 w-px bg-white/70" />
                    <div className="space-y-4">
                      {item.children!.map((child) => {
                        const active =
                          pathname === child.href &&
                          isQueryMatched(child.query);

                        return (
                          <div key={child.title} className="relative pl-4">
                            {/* Connector curve */}
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
    </div>
  );
};

export default MenuRender;