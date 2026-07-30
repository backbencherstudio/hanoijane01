"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDownSFill } from "react-icons/ri";

interface StandFiltersProps {
  hall: string;
  category: string;
  status: string;
  onHallChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const hallOptions = ["All Halls", "Goffs Complex", "Marquee", "Outdoor"];
const categoryOptions = [
  "All Categories",
  "Standard Size",
  "Premium Size 1",
  "Premium Size 2",
  "Premium Size 3",
  "Premium Size A",
  "Premium Size B",
  "Premium Size C",
  "Premium Size D",
  "Small Size",
];
const statusOptions = ["All Status", "Available", "Booked"];

const StandFilters = ({
  hall,
  category,
  status,
  onHallChange,
  onCategoryChange,
  onStatusChange,
}: StandFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {/* Hall Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3.5 py-2.25 rounded-lg text-sm text-[#5E5F79] font-medium cursor-pointer border border-[#DCE4E8] bg-white">
            {hall} <RiArrowDownSFill size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {hallOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onHallChange(option)}
              className="cursor-pointer px-3.5 py-2.25"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Category Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3.5 py-2.25 rounded-lg text-sm text-[#5E5F79] font-medium cursor-pointer border border-[#DCE4E8] bg-white">
            {category} <RiArrowDownSFill size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {categoryOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onCategoryChange(option)}
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

export default StandFilters;