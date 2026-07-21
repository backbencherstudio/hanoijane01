"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDownSFill } from "react-icons/ri";

interface UserFiltersProps {
  role: string;
  status: string;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const roleOptions = ["All Roles", "Super Admin", "Admin", "User"];
const statusOptions = ["All Status", "Active", "Banned"];

const UserFilters = ({
  role,
  status,
  onRoleChange,
  onStatusChange,
}: UserFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {/* Role Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3.5 py-2.25 rounded-lg text-sm text-[#5E5F79] font-medium cursor-pointer border border-[#DCE4E8] bg-white">
            {role} <RiArrowDownSFill size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {roleOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onRoleChange(option)}
              className="cursor-pointer px-3.5 py-2.25"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3.5 py-2.25 rounded-lg text-sm text-[#5E5F79] font-medium cursor-pointer border border-[#DCE4E8] bg-white">
            {status} <RiArrowDownSFill size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onStatusChange(option)}
              className="cursor-pointer px-3.5 py-2.25"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserFilters;
