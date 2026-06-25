import { ChevronRight, User, CalendarClock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidDownArrow } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoLogInOutline } from "react-icons/io5";
import { ProfileDropdownProps } from "@/types/User";
import { FaCreditCard } from "react-icons/fa";

const ProfileDropdown = ({ user, onLogout }: ProfileDropdownProps) => {
  const handleLogout = () => {
    if (onLogout) onLogout();
    console.log("User logged out");
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 shrink-0">
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
        <DropdownMenuContent
          align="end"
          className="w-80 md:w-87.5 p-5 mt-3.25 xl:mt-5"
        >
          <DropdownMenuLabel>
            <div className="flex items-center gap-2 space-y-1">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  height={48}
                  width={48}
                  className="object-cover overflow-hidden rounded-full size-12 shrink-0"
                />
              ) : (
                <div className="size-12 rounded-full bg-gray-300 text-gray-600 flex justify-center items-center shrink-0">
                  <User size={24} />
                </div>
              )}
              <div className="flex flex-col justify-between">
                <p className="text-xl font-medium text-black">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer py-3 rounded-none border-b font-medium text-base flex justify-between items-center hover:bg-gray-200!"
            asChild
          >
            <Link href="/profile">
              <span className="flex items-center gap-2">
                <User className="size-5" />
                My Profile
              </span>
              <ChevronRight size={16} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer py-3 rounded-none border-b font-medium text-base flex justify-between items-center hover:bg-gray-200!"
            asChild
          >
            <Link href="/booking-history">
              <span className="flex items-center gap-2">
                <CalendarClock className="size-5" />
                Booking History
              </span>
              <ChevronRight size={16} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer py-3 rounded-none border-b font-medium text-base flex justify-between items-center hover:bg-gray-200!"
            asChild
          >
            <Link href="/transaction-history">
              <span className="flex items-center gap-2">
                <FaCreditCard className="size-5" />
                Transaction-history
              </span>
              <ChevronRight size={16} />
            </Link>
          </DropdownMenuItem>

          {/* <DropdownMenuItem
            className="cursor-pointer py-3 rounded-none border-b font-medium text-base flex justify-between items-center hover:bg-gray-200!"
            asChild
          >
            <Link href="/notifications">
              <span className="flex items-center gap-2">
                <Bell className="size-5" />
                Notifications
              </span>
              <ChevronRight size={16} />
            </Link>
          </DropdownMenuItem> */}

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer py-3 rounded-none font-medium text-base flex justify-between items-center text-red-600 hover:text-red-700! hover:bg-red-200!"
          >
            <span className="flex items-center gap-2">
              <IoLogInOutline className="size-5 " />
              Log Out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
