"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import ButtonGroup from "../ui/ButtonGroup";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const pathname = usePathname();

  const user = {
    name: "Jacob Jones",
    email: "exhibitors@industryexpo2027.com",
    image: "",
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Exhibition Map", href: "/exhibition-map" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <section className="border">
      <div className="container flex justify-between items-center h-20 xl:h-24">
        <div>
          <Image
            src="/logo.webp"
            alt="ITBA EXPO The Next 100"
            width={68}
            height={56}
          />
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
          <Button variant="outline" className="px-10 hidden md:block">
            Sign Up
          </Button>
          <ButtonGroup>Book a Stand</ButtonGroup>
          <Button className="w-13 h-13 xl:hidden" variant="ghost">
            <HiOutlineMenuAlt3 className="size-6" />
          </Button>
        </div>
        {/* user dropdown */}
        <div>
         <ProfileDropdown user={user}/> 
        </div>
      </div>
    </section>
  );
};

export default Navbar;
