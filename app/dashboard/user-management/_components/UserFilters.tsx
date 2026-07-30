"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDownSFill } from "react-icons/ri";
import { Search } from "lucide-react";

interface UserFiltersProps {
  role: string;
  status: string;
  search: string;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const roleOptions = ["All Roles", "admin", "user"];
const statusOptions = ["All Status", "Active", "Inactive", "Banned"];

const UserFilters = ({
  role,
  status,
  search,
  onRoleChange,
  onStatusChange,
  onSearchChange,
}: UserFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#5E5F79]" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-3.5 py-2.25 rounded-lg text-sm text-[#5E5F79] font-medium border border-[#DCE4E8] bg-white outline-none focus:border-[#8B5CF6] transition w-56"
        />
      </div>

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
