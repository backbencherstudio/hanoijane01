"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import ButtonGroup from "../ui/ButtonGroup";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ProfileDropdown from "./ProfileDropdown";
import Sidebar from "./Sidebar";
import { useState } from "react";
import AuthModal from "@/app/(auth)/_components/AuthModal";
import LogOutModal from "@/app/(auth)/_components/LogOutModal";
import { useGetMeQuery } from "@/src/redux/api/auth/authApi";

const Navbar = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetMeQuery(null);
  const user = data?.data;
  console.log("Navbar User:", user);

  const links = [
    { label: "Home", href: "/" },
    { label: "Exhibition Map", href: "/exhibition-map" },
    // { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <section className="bg-[#fbfbfd]">
      <div className="container flex justify-between items-center h-20 xl:h-24">
        <div>
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="ITBA EXPO The Next 100"
              width={68}
              height={56}
            />
          </Link>
        </div>

        <ul className="hidden xl:flex gap-8 items-center font-medium text-lg">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? "text-primary " : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          {!user && isLoading && (
            <Link href="/sign-in">
              <Button variant="outline" className="px-10 hidden md:block">
                Sign In
              </Button>
            </Link>
          )}

          <ButtonGroup fullWidth={false} pathName="/exhibition-map">
            Book a Stand
          </ButtonGroup>
          <div className="hidden md:block">
            {user && (
              <ProfileDropdown
                onLogout={() => setLogOutModalOpen(true)}
                user={user}
              />
            )}
          </div>
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className=" px-0 h-13 xl:hidden"
            variant="ghost"
          >
            <HiOutlineMenuAlt3 className="size-6" />
          </Button>
        </div>
        {/* user dropdown */}
      </div>

      {/* sidebar */}
      <Sidebar user={user} setIsOpen={setSidebarOpen} isOpen={sidebarOpen} />
      <AuthModal open={isOpen} setOpen={setIsOpen} />
      <LogOutModal
        isOpen={logOutModalOpen}
        onClose={() => setLogOutModalOpen(false)}
      />
    </section>
  );
};

export default Navbar;
