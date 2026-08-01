"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { X, Eye, Download } from "lucide-react";
import Image from "next/image";
import customImageLoader from "@/lib/imageLoader";
import { UserAttachment, Attachment } from "@/types/userAttachment";
import { BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";
import JSZip from "jszip";

const FILE_TYPE_TITLES: Record<string, string> = {
  logo: "Company logo",
  bio: "Company bio",
  insurance: "Insurance/license certificate",
  safety: "Health & Safety declaration",
  others: "Other document",
};

interface DocumentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAttachment | null;
}

const DocumentViewModal = ({
  isOpen,
  onClose,
  user,
}: DocumentViewModalProps) => {
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("pdf")) {
      return (
        <div className="size-12 rounded-[10px] bg-[#EF4444] flex items-center justify-center text-white">
          <BsFiletypePdf size={24} />
        </div>
      );
    } else if (mimeType.includes("jpeg") || mimeType.includes("jpg")) {
      return (
        <div className="size-12 rounded-[10px] bg-[#22C55E] flex items-center justify-center text-white">
          <BsFiletypeJpg size={24} />
        </div>
      );
    } else if (mimeType.includes("png")) {
      return (
        <div className="size-12 rounded-[10px] bg-[#7758F6] flex items-center justify-center text-white">
          <BsFiletypePng size={24} />
        </div>
      );
    }
    return (
      <div className="size-12 rounded-[10px] bg-gray-400 flex items-center justify-center text-white">
        <BsFiletypePdf size={24} />
      </div>
    );
  };

  const getFileTypeTitle = (fileType: string | null): string => {
    if (!fileType) return "Other document";
    return FILE_TYPE_TITLES[fileType] || "Other document";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleView = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleDownloadAll = async () => {
    if (!user || user.attachments.length === 0) return;

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

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">User Documents</h2>
        {/* User Info */}
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="relative size-16 rounded-full overflow-hidden border">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
              loader={customImageLoader}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              {user.phoneNumber} • {user.companyName}
            </p>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Attachments ({user.attachments.length})
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {user.attachments.map((attachment: Attachment) => (
              <div
                key={attachment.id}
                className="flex flex-col md:flex-row gap-2 items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {getFileIcon(attachment.mimeType)}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm truncate">
                      {getFileTypeTitle(attachment.fileType)}
                    </h5>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {attachment.fileName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span>{formatFileSize(attachment.byteSize)}</span>
                      <span>•</span>
                      <span>{formatDate(attachment.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(attachment.fileUrl)}
                    className="gap-2"
                  >
                    <Eye size={16} />
                    View
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() =>
                      handleDownload(attachment.fileUrl, attachment.fileName)
                    }
                    className="gap-2"
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download All Button */}
        {user.attachments.length > 0 && (
          <div className="flex justify-end pt-4 border-t">
            <Button
              variant="default"
              onClick={handleDownloadAll}
              className="gap-2 h-9"
            >
              <Download size={16} />
              Download All ({user.attachments.length})
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DocumentViewModal;
