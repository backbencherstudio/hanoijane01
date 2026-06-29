"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// -------------------------------------------
// Friendly route names
// -------------------------------------------
const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",

  settings: "Settings",
  "my-profile": "My Profile",
  "password-security": "Password & Security",
  notification: "Notification",
  "event-setting": "Event Setting",

  "stand-management": "Stand Management",
  stands: "View All Stands",
  "stand-price": "Stand Price",

  "booking-management": "Booking Management",
  "payment-tracking": "Payment Tracking",
  "document-review": "Document Review",
};

// -------------------------------------------
// Format URL if not found in breadcrumbMap
// -------------------------------------------
const formatLabel = (segment: string) =>
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function DashboardBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => ({
    href: "/" + segments.slice(0, index + 1).join("/"),
    label: breadcrumbMap[segment] ?? formatLabel(segment),
  }));

  const showEllipsis = breadcrumbs.length > 2;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* ================================
            MOBILE
            Dashboard > ... > Current Page
        ================================= */}
        <div className="flex md:hidden items-center">
          {/* First */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={breadcrumbs[0].href}>{breadcrumbs[0].label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {showEllipsis ? (
            <>
              <BreadcrumbSeparator />

              {/* Dropdown */}
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <BreadcrumbEllipsis className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                      {breadcrumbs
                        .slice(1, breadcrumbs.length - 1)
                        .map((item) => (
                          <DropdownMenuItem key={item.href} asChild>
                            <Link href={item.href}>{item.label}</Link>
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              {/* Current page */}
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {breadcrumbs[breadcrumbs.length - 1].label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              {breadcrumbs.slice(1).map((item, index) => {
                const isLast = index === breadcrumbs.slice(1).length - 1;

                return (
                  <div key={item.href} className="flex items-center">
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* ================================
            DESKTOP
            Show every breadcrumb
        ================================= */}
        <div className="hidden md:flex items-center">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={item.href} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator> <span className="font-semibold px-1 text-lg">/</span></BreadcrumbSeparator>}
              </div>
            );
          })}
        </div>
      </BreadcrumbList>
    </Breadcrumb>
  );
}