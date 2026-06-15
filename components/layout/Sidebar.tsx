"use client";
import { User, X } from "lucide-react";
import { Button } from "../ui/button";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import { UserProp } from "@/types/User";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProp;
}
const links = [
  { label: "Home", href: "/" },
  { label: "Exhibition Map", href: "/exhibition-map" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Booking History", href: "/booking-history" },
  { label: "Notifications", href: "/notifications" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, user }) => {
  const pathname = usePathname();
  return (
    <aside
      className={`
        fixed top-0 left-0 w-full h-screen bg-background flex flex-col 
        transition-transform duration-300 ease-in-out z-999
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="h-20  flex justify-between pl-4 items-center border-b">
        <div>
          <Image
            src="/logo.webp"
            alt="ITBA EXPO The Next 100"
            width={68}
            height={56}
          />
        </div>
        <Button onClick={() => setIsOpen(!isOpen)} variant="ghost">
          <X className="size-6" />
        </Button>
      </div>
      {/* sidebar body */}
      <div className="flex-1 overflow-auto px-4">
        <div className="flex flex-col items-center gap-2  p-4 justify-center">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              height={48}
              width={48}
              className="object-cover overflow-hidden rounded-full size-24"
            />
          ) : (
            <div className="size-24 rounded-full bg-gray-300 text-gray-600 flex justify-center items-center">
              <User size={36} />
            </div>
          )}
          <h3 className="text-2xl font-medium text-center">
            {user?.name ? user?.name : "User"}
          </h3>
          <Link href="/profile">
            <Button className="px-8"><User className="size-5i"/> My Profile</Button>
          </Link>
        </div>

        {/* menu items */}
        <div className="border-t py-8">
          <ul className="flex flex-col gap-8 items-center font-medium text-lg">
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
        </div>
      </div>
      <div className="h-20  flex justify-center items-center border-t">
        <Button variant="outline" className="px-10 ">
          Sign In
        </Button>
        <Button variant="outline" className="px-10 ring-red-500 text-red-500">
          <span className="flex items-center gap-2 ">
            <IoLogInOutline className="size-5" />
            Log Out
          </span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
