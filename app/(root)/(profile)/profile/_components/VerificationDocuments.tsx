"use client";

import { ChangeEvent, useRef, useState } from "react";

import DocumentItem from "./DocumentItem";
import VerificationProgress from "./VerificationProgress";
import AddDocumentType from "./AddDocumentType";
import { VerificationDocument } from "@/types/profile";
import { useGetMeQuery, useUploadAttachmentMutation } from "@/src/redux/api/auth/authApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";

const FILE_TYPE_TITLES: Record<string, string> = {
  logo: "Company logo",
  bio: "Company bio",
  insurance: "Insurance/license certificate",
  safety: "Health & Safety declaration",
  others: "Other document",
};

const ALL_FILE_TYPES = [
  { value: "logo", label: "Company logo" },
  { value: "bio", label: "Company bio" },
  { value: "insurance", label: "Insurance/license certificate" },
  { value: "safety", label: "Health & Safety declaration" },
  { value: "others", label: "Other document" },
];

const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileTypeFromMime = (mimeType: string): VerificationDocument["fileType"] => {
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType === "image/jpeg" || mimeType === "image/jpg") return "jpg";
  if (mimeType === "image/png") return "png";
  return "pdf";
};

const VerificationDocuments = () => {
  const { data: meData } = useGetMeQuery();
  const [uploadAttachment, { isLoading: isUploading }] = useUploadAttachmentMutation();

  const [pendingDocumentId, setPendingDocumentId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const attachments = meData?.data?.attachments ?? [];

  const documents: VerificationDocument[] = attachments.map((att) => ({
    id: att.id,
    title: FILE_TYPE_TITLES[att.fileType] ?? att.fileType,
    fileName: att.fileName,
    fileSize: formatFileSize(att.byteSize),
    fileType: getFileTypeFromMime(att.mimeType),
    status: "uploaded" as const,
    filePath: att.filePath,
    byteSize: att.byteSize,
  }));

  const existingFileTypes = new Set(attachments.map((att) => att.fileType));

  const availableFileTypes = ALL_FILE_TYPES.filter((option) => {
    if (option.value === "others") return true;
    return !existingFileTypes.has(option.value);
  });

  const openFilePicker = (id: string) => {
    setPendingDocumentId(id);
    window.setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleUpload = (id: string) => {
    openFilePicker(id);
  };

  const handleReplace = (id: string) => {
    openFilePicker(id);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !pendingDocumentId) {
      event.target.value = "";
      return;
    }

    try {
      const existingAttachment = attachments.find(
        (att) => att.id === pendingDocumentId
      );
      const fileType = existingAttachment?.fileType ?? "others";

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileType", fileType);
      formData.append("attachmentId", pendingDocumentId);

      await uploadAttachment(formData).unwrap();

      toast.success("Document uploaded successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to upload document"));
    } finally {
      setPendingDocumentId(null);
      event.target.value = "";
    }
  };

  const handleAddDocument = async ({ fileType, file }: { fileType: string; file: File }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", fileType);

      await uploadAttachment(formData).unwrap();

      toast.success("Document uploaded successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to upload document"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <VerificationProgress documents={documents} />

      {/* Documents */}
      <div>
        <div className="space-y-4">
          {documents.map((document) => (
            <DocumentItem
              key={document.id}
              document={document}
              isEditing
              isUploading={isUploading && pendingDocumentId === document.id}
              onUpload={handleUpload}
              onReplace={handleReplace}
            />
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Add new document */}
        <div className="mt-6">
        <AddDocumentType
          onAdd={handleAddDocument}
          availableFileTypes={availableFileTypes}
        />
        </div>
      </div>
    </div>
  );
};

export default VerificationDocuments;