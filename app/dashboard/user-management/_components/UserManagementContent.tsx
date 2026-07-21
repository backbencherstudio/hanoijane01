"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import { PenLine, Plus, Trash2, User, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserFilters from "./UserFilters";
import { users, UserData } from "@/data/mock/users";
import CustomTable from "@/components/ui/Table";
import { GoDotFill } from "react-icons/go";
import { Column } from "@/types/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CreateAdminModal from "./CreateAdminModal";

const stateData = [
  {
    title: "Total User",
    value: users.length,
  },
  {
    title: "User",
    value: users.filter((u) => u.role !== "Admin" && u.role !== "Super Admin")
      .length,
  },
  {
    title: "Admin",
    value: users.filter((u) => u.role === "Admin" || u.role === "Super Admin")
      .length,
  },
  {
    title: "Active User",
    value: users.filter((u) => u.status === "Active").length,
  },
  {
    title: "User Banned",
    value: users.filter((u) => u.status === "Banned").length,
  },
];

const UserManagementContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createAdminModalOpen, setCreateAdminModalOpen] = useState(false);

  // Read filter values from URL
  const roleFilter = searchParams.get("role") || "All Roles";
  const statusFilter = searchParams.get("status") || "All Status";

  const [filters, setFilters] = useState({ currentPage: 1, perPageItem: 8 });

  // Check if any filter is active
  const isAnyFilterActive =
    roleFilter !== "All Roles" || statusFilter !== "All Status";

  // Filter data based on URL params
  const filteredData = users.filter((item) => {
    const roleMatch = roleFilter === "All Roles" || item.role === roleFilter;
    const statusMatch =
      statusFilter === "All Status" || item.status === statusFilter;
    return roleMatch && statusMatch;
  });

  const startIndex = (filters.currentPage - 1) * filters.perPageItem;
  const endIndex = startIndex + filters.perPageItem;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / filters.perPageItem);

  const pagination = {
    currentPage: filters.currentPage,
    totalPages,
    totalItems,
    itemsPerPage: filters.perPageItem,
  };

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const handleItemsPerPageChange = (newPerPage: number) => {
    setFilters({ currentPage: 1, perPageItem: newPerPage });
  };

  // Update URL when filter changes
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All Roles" || value === "All Status") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
    // Reset to page 1 when filter changes
    setFilters((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Clear all filters
  const clearFilters = () => {
    const params = new URLSearchParams();
    router.push(`?${params.toString()}`, { scroll: false });
    setFilters((prev) => ({ ...prev, currentPage: 1 }));
  };

  const columns: Column<UserData>[] = [
    {
      header: "User Name",
      headerClassName: "text-left",
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          {row.avatar ? (
            <Image
              src={row.avatar}
              alt={row.username}
              height={10}
              width={10}
              className="shrink-0 size-10 border rounded-full"
            />
          ) : (
            <div className="border size-10 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          )}

          <p>{row.standNum}</p>
        </div>
      ),
      cellClassName: "px-3 py-5 font-medium",
    },
    {
      header: "Email",
      headerClassName: "text-left",
      accessor: "email",
      cellClassName: "px-3 py-5",
    },
    {
      header: "Username",
      accessor: "username",
      cellClassName: "px-3 py-5",
    },
    {
      header: "Stand Type",
      accessor: "standType",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Role",
      accessor: "role",
      render: (value) => {
        const role = value as string;
        const colorMap: Record<string, string> = {
          "Super Admin": "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          Admin: "bg-[#d3e0fb] text-blue-700 border border-[#BED1F9]",
          User: "bg-[#E9E9EA] border border-[#D4DAE3] text-[#777980]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[role] || ""}`}
          >
            {role}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          Active: "bg-[#d1fae5] border border-[#a7f3d0] text-[#065f46]",
          Banned: "bg-[#FDECEE] border border-[#F9C5CA] text-[#EB3D4D]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[status] || ""}`}
          >
            <GoDotFill className="size-3" />
            {status}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Joined Date",
      accessor: "joinedDate",
      cellClassName: "px-3 py-5 text-center whitespace-nowrap",
    },
    {
      header: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-4 ">
          <button className="cursor-pointer">
            <PenLine className="size-5" />
          </button>
          <button className="cursor-pointer">
            <Trash2 className="size-5 text-[#DC3545]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-start">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            User Management
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo 2027, Admin user management
          </p>
        </div>
      </div>

      {/* state cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {stateData.map((state) => (
          <StateCard2
            title={state.title}
            value={state.value}
            key={state.title}
          />
        ))}
      </div>

      {/* content / data table */}
      <div className="bg-white rounded-2xl px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <p className="text-text-primary text-lg font-semibold">
            All Users List
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <UserFilters
              role={roleFilter}
              status={statusFilter}
              onRoleChange={(value) => updateFilter("role", value)}
              onStatusChange={(value) => updateFilter("status", value)}
            />
            {isAnyFilterActive && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2.25 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition whitespace-nowrap"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
            <div className=" w-full md:w-fit">
              <Button
                onClick={() => setCreateAdminModalOpen(true)}
                className="h-11 w-full"
              >
                <Plus size={16} /> Create Admin
              </Button>
            </div>
          </div>
        </div>
        {/* table */}
        <CustomTable
          data={currentData}
          columns={columns}
          showIndex={false}
          indexLabel="SN"
          isLoading={false}
          emptyMessage="No users found"
          pagination={pagination}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <CreateAdminModal isOpen={createAdminModalOpen} onClose={() => setCreateAdminModalOpen(false)} />
    </div>
  );
};

export default UserManagementContent;
