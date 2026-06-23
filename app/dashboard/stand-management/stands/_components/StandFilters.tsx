"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface StandFiltersProps {
  type: string;
  block: string;
  status: string;
  onTypeChange: (value: string) => void;
  onBlockChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const typeOptions = ["All types", "Standard", "Double", "Outdoor"];
const blockOptions = ["All Block", "A", "B", "C", "D", "E"];
const statusOptions = ["All Status", "Available", "Reserved", "Booked"];

const StandFilters = ({
  type,
  block,
  status,
  onTypeChange,
  onBlockChange,
  onStatusChange,
}: StandFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {/* Type Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3.5 py-3 rounded-lg text-sm text-[#5E5F79] font-medium cursor-pointer border border-[#DCE4E8] bg-white">
            {type} <ChevronDown size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {typeOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onTypeChange(option)}
              className="cursor-pointer px-3.5 py-3"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Block Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3.5 py-3 rounded-lg text-sm text-[#5E5F79] font-medium cursor-pointer border border-[#DCE4E8] bg-white">
            {block} <ChevronDown size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {blockOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onBlockChange(option)}
              className="cursor-pointer px-3.5 py-3"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3.5 py-3 rounded-lg text-sm text-[#5E5F79] font-medium cursor-pointer border border-[#DCE4E8] bg-white">
            {status} <ChevronDown size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onStatusChange(option)}
              className="cursor-pointer px-3.5 py-3"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StandFilters;