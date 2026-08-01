"use client";
import React, { useState, useMemo } from "react";
import { getCurrentOverviewDate } from "@/lib/utils";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserAttachmentsQuery } from "@/src/redux/api/user/userApi";
import DocumentViewModal from "./_components/DocumentViewModal";
import { UserAttachment } from "@/types/userAttachment";
import Image from "next/image";
import customImageLoader from "@/lib/imageLoader";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import JSZip from "jszip";

// Simple SVG placeholder for avatars
const PLACEHOLDER_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23E5E7EB'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='16'%3E👤%3C/text%3E%3C/svg%3E";

const DocumentReview = () => {
  const { year: currentYear, formattedDate } = getCurrentOverviewDate();
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserAttachment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const limit = 8;

  // Debounce search
  const debouncedSearch = useMemo(() => {
    const timer = setTimeout(() => {
      // This will trigger the API call
    }, 1000);
    return search;
  }, [search]);

  const { data, isLoading, isFetching } = useGetUserAttachmentsQuery({
    page,
    limit,
    query: debouncedSearch || undefined,
  });

  const users = data?.data || [];
  const metaData = data?.metaData;

  const pagination = metaData
    ? {
        currentPage: metaData.currentPage,
        totalPages: metaData.totalPages,
        totalItems: metaData.totalItems,
        itemsPerPage: metaData.itemsPerPage,
      }
    : {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: limit,
      };

  const handleViewDocuments = (user: UserAttachment) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDownloadAllFromTable = async (user: UserAttachment) => {
    try {
      const zip = new JSZip();

      // Download all files and add to zip
      for (const attachment of user.attachments) {
        const response = await fetch(attachment.fileUrl);
        const blob = await response.blob();
        zip.file(attachment.fileName, blob);
      }

      // Generate zip file
      const content = await zip.generateAsync({ type: "blob" });

      // Create download link
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${user.name.replace(/\s+/g, "_")}_documents.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download all failed:", error);
    }
  };

  const columns: Column<UserAttachment>[] = [
    {
      header: "SN",
      headerClassName: "text-center",
      render: (_, row, index) => {
        const serialNumber = (pagination.currentPage - 1) * limit + (index + 1);
        return <span className="text-center block">{serialNumber}</span>;
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Avatar",
      headerClassName: "text-center",
      render: (_, row) => {
        const user = row as UserAttachment;

        // Don't render Image component if avatar is empty
        if (!user.avatar || user.avatar.trim() === "") {
          return (
            <div className="flex justify-center">
              <div className="relative size-10 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          );
        }

        return (
          <div className="flex justify-center">
            <div className="relative size-10 rounded-full overflow-hidden border">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
                loader={customImageLoader}
                unoptimized
              />
            </div>
          </div>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Name",
      accessor: "name",
      headerClassName: "text-left",
      cellClassName: "px-3 py-5",
    },
    {
      header: "Email",
      accessor: "email",
      headerClassName: "text-left",
      cellClassName: "px-3 py-5",
    },
    {
      header: "Phone Number",
      accessor: "phoneNumber",
      headerClassName: "text-left",
      cellClassName: "px-3 py-5",
    },
    {
      header: "Company Name",
      accessor: "companyName",
      headerClassName: "text-left",
      cellClassName: "px-3 py-5",
    },
    {
      header: "Action",
      render: (_, row) => {
        const user = row as UserAttachment;
        return (
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => handleViewDocuments(user)}
              className="h-9 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              View Documents
            </Button>
            <Button
              onClick={() => handleDownloadAllFromTable(user)}
              className="rounded-lg h-9"
              variant="outline"
              title="Download all documents as ZIP"
            >
              <Download size={16} />
            </Button>
          </div>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
  ];

  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Document Review
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo {currentYear}, Overview for {formattedDate}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl px-5 py-4 mt-9">
        <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-text-primary text-lg font-semibold ">
            User list with document
          </p>
          {/* Search Input */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#5E5F79]" />
            <input
              type="text"
              placeholder="Search by name, email, company, or file..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3.5 py-2.25 rounded-lg text-sm text-[#5E5F79] font-medium border border-[#DCE4E8] bg-white outline-none focus:border-primary transition w-full sm:w-80"
            />
          </div>
        </div>
        <CustomTable
          data={users}
          columns={columns}
          showIndex={false}
          indexLabel="SN"
          isLoading={isLoading || isFetching}
          emptyMessage="No users found"
          pagination={pagination}
          onPageChange={setPage}
          onItemsPerPageChange={() => {}}
        />
      </div>

      {/* Document View Modal */}
      <DocumentViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default DocumentReview;
