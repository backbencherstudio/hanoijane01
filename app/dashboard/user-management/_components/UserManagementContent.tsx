"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import { PenLine, Plus, Trash2, User, X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserFilters from "./UserFilters";
import CustomTable from "@/components/ui/Table";
import { GoDotFill } from "react-icons/go";
import { Column } from "@/types/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CreateAdminModal from "./CreateAdminModal";
import DeleteUserModal from "./DeleteUserModal";
import UpdateAdminModal from "./UpdateAdminModal";
import {
  useGetUserStatsQuery,
  useGetUserListQuery,
} from "@/src/redux/api/user/userApi";
import { Skeleton } from "@/components/ui/skeleton";
import { UserListItem } from "@/types/userList";
import { getCurrentOverviewDate } from "@/lib/utils";

const UserManagementContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createAdminModalOpen, setCreateAdminModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);

  // Get current date for display
  const { year: currentYear, formattedDate } = getCurrentOverviewDate();

  const {
    data: userStats,
    isLoading: isStatsLoading,
    refetch: refetchStats,
  } = useGetUserStatsQuery();

  const stateData = userStats?.data
    ? [
        { title: "Total User", value: userStats.data.totalUser },
        { title: "Active User", value: userStats.data.activeUser },
        { title: "Inactive User", value: userStats.data.inactiveUser },
        { title: "User Banned", value: userStats.data.bannedUser },
      ]
    : [];

  // Read filter values from URL
  const searchFilter = searchParams.get("search") || "";
  const typeFilter = searchParams.get("type") || "All Roles";
  const statusFilter = searchParams.get("status") || "All Status";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const limitParam = parseInt(searchParams.get("limit") || "8", 10);

  // Build API query params
  const apiParams = useMemo(
    () => ({
      page: pageParam,
      limit: limitParam,
      ...(searchFilter ? { search: searchFilter } : {}),
      ...(typeFilter !== "All Roles" ? { type: typeFilter } : {}),
      ...(statusFilter !== "All Status"
        ? { status: statusFilter.toUpperCase() }
        : {}),
    }),
    [pageParam, limitParam, searchFilter, typeFilter, statusFilter],
  );

  const {
    data: userListData,
    isLoading: isUserListLoading,
    isFetching: isUserListFetching,
    refetch: refetchUserList,
  } = useGetUserListQuery(apiParams);

  const currentData = userListData?.data || [];
  const metaData = userListData?.metaData;

  const pagination = metaData
    ? {
        currentPage: metaData.currentPage,
        totalPages: metaData.totalPages,
        totalItems: metaData.totalItems,
        itemsPerPage: metaData.itemsPerPage,
      }
    : {
        currentPage: 1,
        totalPages: currentData.length > 0 ? 1 : 1,
        totalItems: currentData.length,
        itemsPerPage: 8,
      };

  // Check if any filter is active
  const isAnyFilterActive =
    searchFilter !== "" ||
    typeFilter !== "All Roles" ||
    statusFilter !== "All Status";

  // Update URL when filter changes
  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "All Roles" || value === "All Status") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      // Reset to page 1 when filter changes
      params.set("page", "1");
      const newUrl = `?${params.toString()}`;
      // Only push if URL actually changed
      if (newUrl !== `?${searchParams.toString()}`) {
        router.push(newUrl, { scroll: false });
      }
    },
    [router, searchParams],
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    const newUrl = `?${params.toString()}`;
    // Only push if URL actually changed
    if (newUrl !== `?${searchParams.toString()}`) {
      router.push(newUrl, { scroll: false });
    }
  }, [router, searchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      const newUrl = `?${params.toString()}`;
      // Only push if URL actually changed
      if (newUrl !== `?${searchParams.toString()}`) {
        router.push(newUrl, { scroll: false });
      }
    },
    [router, searchParams],
  );

  const handleItemsPerPageChange = useCallback(
    (newPerPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("limit", newPerPage.toString());
      params.set("page", "1");
      const newUrl = `?${params.toString()}`;
      // Only push if URL actually changed
      if (newUrl !== `?${searchParams.toString()}`) {
        router.push(newUrl, { scroll: false });
      }
    },
    [router, searchParams],
  );

  const columns: Column<UserListItem>[] = [
    {
      header: "User Name",
      headerClassName: "text-left",
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          {row.avatar_url ? (
            <Image
              src={row.avatar_url}
              alt={row.name}
              height={10}
              width={10}
              className="shrink-0 size-10 border rounded-full"
            />
          ) : (
            <div className="border size-10 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          )}
          <p>{row.name}</p>
        </div>
      ),
      cellClassName: "px-3 py-3 font-medium",
    },
    {
      header: "Email",
      headerClassName: "text-left",
      accessor: "email",
      cellClassName: "px-3 py-3",
    },
    {
      header: "Phone",
      headerClassName: "text-left",
      accessor: "phoneNumber",
      cellClassName: "px-3 py-3",
    },
    {
      header: "Role",
      accessor: "type",
      render: (value) => {
        const role = value as string;
        const colorMap: Record<string, string> = {
          admin: "bg-[#d3e0fb] text-blue-700 border border-[#BED1F9]",
          user: "bg-[#E9E9EA] border border-[#D4DAE3] text-[#777980]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[role] || ""}`}
          >
            {role}
          </span>
        );
      },
      cellClassName: "px-3 py-3 text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          ACTIVE: "bg-[#E7ECDE] border border-[#DBE2CE] text-[#859E5A]",
          INACTIVE: "bg-[#DFDFE4] border border-[#CFCFD7] text-[#5E5F79]",
          BANDED: "bg-[#FDECEE] border border-[#F9C5CA] text-[#EB3D4D]",
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
      cellClassName: "px-3 py-3 text-center",
    },
    {
      header: "Joined Date",
      accessor: "createdAt",
      render: (value) => {
        const date = value as string;
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
      cellClassName: "px-3 py-3 text-center whitespace-nowrap",
    },
    {
      header: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-4 ">
          <button
            onClick={() => {
              setSelectedUser(row);
              setUpdateUserModalOpen(true);
            }}
            className="cursor-pointer"
          >
            <PenLine className="size-5" />
          </button>
          <button
            onClick={() => {
              setSelectedUser(row);
              setDeleteUserModalOpen(true);
            }}
            className="cursor-pointer"
          >
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
            Industry Expo {currentYear}, Overview for {formattedDate}
          </p>
        </div>
      </div>

      {/* state cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {isStatsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 space-y-3 border"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))
          : stateData.map((state) => (
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
              role={typeFilter}
              status={statusFilter}
              search={searchFilter}
              onRoleChange={updateFilter.bind(null, "type")}
              onStatusChange={updateFilter.bind(null, "status")}
              onSearchChange={updateFilter.bind(null, "search")}
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
          isLoading={isUserListLoading || isUserListFetching}
          emptyMessage="No users found"
          pagination={pagination}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <CreateAdminModal
        isOpen={createAdminModalOpen}
        onClose={() => setCreateAdminModalOpen(false)}
        onSuccess={() => {
          refetchStats();
          refetchUserList();
        }}
      />
      <UpdateAdminModal
        isOpen={updateUserModalOpen}
        onClose={() => {
          setUpdateUserModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSuccess={() => {
          refetchUserList();
          refetchStats();
        }}
      />
      <DeleteUserModal
        isOpen={deleteUserModalOpen}
        onClose={() => {
          setDeleteUserModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={() => {
          setDeleteUserModalOpen(false);
          setSelectedUser(null);
        }}
        userId={selectedUser?.id || ""}
        username={selectedUser?.name || ""}
        onSuccess={() => {
          refetchUserList();
          refetchStats();
        }}
      />
    </div>
  );
};

export default UserManagementContent;
