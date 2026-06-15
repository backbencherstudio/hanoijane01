import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // adjust import path as needed

interface User {
  name: string;
  image: string;
  email: string;
}

interface ProfileDropdownProps {
  user: User;
  onLogout?: () => void; // optional callback for logout
}

const ProfileDropdown = ({ user, onLogout }: ProfileDropdownProps) => {
  const handleLogout = () => {
    // Add your logout logic here (clear tokens, redirect, etc.)
    if (onLogout) onLogout();
    console.log("User logged out");
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                height={48}
                width={48}
                className="object-cover overflow-hidden rounded-full size-12"
              />
            ) : (
              <div className="size-12 rounded-full bg-gray-300 text-gray-600 flex justify-center items-center">
                <User size={24} />
              </div>
            )}
            <BiSolidDownArrow className="text-gray-400 text-xs" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/booking-history" className="cursor-pointer">
              Booking History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/notifications" className="cursor-pointer">
              Notifications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;