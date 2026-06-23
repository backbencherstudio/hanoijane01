"use client";
import React, { useEffect, useRef } from "react";
import {
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (value: number) => void;
  className?: string;
  scrollOnChange?: boolean;
  scrollTargetId?: string;
  scrollBehavior?: "smooth" | "auto";
  scrollOffset?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions = [1, 2, 3, 5, 8, 10],
  onPageChange,
  onItemsPerPageChange,
  className = "",
  scrollOnChange = false,
  scrollTargetId = "scroll-to-top",
  scrollBehavior = "smooth",
  scrollOffset = 0,
}) => {
  const prevPageRef = useRef(currentPage);

  const scrollToTarget = () => {
    if (!scrollOnChange) return;
    requestAnimationFrame(() => {
      const targetElement = document.getElementById(scrollTargetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - scrollOffset;
        window.scrollTo({ top: offsetPosition, behavior: scrollBehavior });
      } else {
        window.scrollTo({ top: scrollOffset, behavior: scrollBehavior });
      }
    });
  };

  useEffect(() => {
    if (prevPageRef.current !== currentPage && scrollOnChange) {
      scrollToTarget();
    }
    prevPageRef.current = currentPage;
  }, [currentPage, scrollOnChange]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    onItemsPerPageChange?.(Number(value));
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-4 ${className}`}
    >
      {/* Left: Items info + Shadcn dropdown */}
      <div className="text-sm text-[#5E5F79] dark:text-gray-400 flex justify-center lg:justify-start gap-1">
        Showing{" "}
        <span className="font-medium text-[#5E5F79] dark:text-white">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-medium text-[#5E5F79] dark:text-white">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-[#5E5F79] dark:text-white">
          {totalItems}
        </span>{" "}
        items
      </div>

      {/* Shadcn Select for items per page */}
      <div className="flex border w-fit mx-auto rounded-lg items-center justify-center text-sm font-medium text-[#5E5F79]">
        <span className="whitespace-nowrap px-4">Per page</span>
        <div className="h-8 border-l"></div>
        <Select
          value={String(itemsPerPage)}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder={itemsPerPage} />
          </SelectTrigger>
          <SelectContent className="">
            {itemsPerPageOptions.map((option) => (
              <SelectItem
                className="cursor-pointer hover:bg-gray-50!"
                key={option}
                value={String(option)}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right: Pagination buttons */}
      <div className="flex items-center justify-center lg:justify-end gap-1">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 flex justify-center items-center border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="First page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 hidden md:flex justify-center items-center border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center rounded-lg overflow-hidden border border-gray-300">
          {getPageNumbers().map((page, index) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                h-8 min-w-8 px-2
                ${index !== 0 ? "border-l border-gray-300" : ""}
                ${
                  currentPage === page
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }
                cursor-pointer transition-colors
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 hidden md:flex justify-center items-center border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 flex justify-center items-center border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
