"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDownSFill } from "react-icons/ri";
import { Search } from "lucide-react";
import { toTitleCase } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

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
  const [localSearch, setLocalSearch] = useState(search);

  // Use the search prop directly as the input value
  // localSearch is used only for the debounce effect
  const inputValue = useMemo(() => {
    // If search prop matches what we last sent, use localSearch (for debouncing)
    // Otherwise use the search prop (external change from URL)
    return search;
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#5E5F79]" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={inputValue}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-9 pr-3.5 py-2.25 rounded-lg text-sm text-[#5E5F79] font-medium border border-[#DCE4E8] bg-white outline-none focus:border-primary transition w-56"
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
              {toTitleCase(option)}
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
