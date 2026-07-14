"use client";

import { ChangeEvent, useRef, useState } from "react";

import DocumentItem from "./DocumentItem";
import VerificationProgress from "./VerificationProgress";
import AddDocumentType from "./AddDocumentType";
import { VerificationDocument } from "@/types/profile";
import { verificationDocuments } from "@/data/mock/profileData";

const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
};

const VerificationDocuments = () => {
  const [documents, setDocuments] =
    useState<VerificationDocument[]>(verificationDocuments);
  const [pendingDocumentId, setPendingDocumentId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !pendingDocumentId) {
      event.target.value = "";
      return;
    }

    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    const nextFileType: VerificationDocument["fileType"] =
      fileExtension === "pdf"
        ? "pdf"
        : fileExtension === "png"
          ? "png"
          : fileExtension === "jpg" || fileExtension === "jpeg"
            ? "jpg"
            : "pdf";

    setDocuments((prev) =>
      prev.map((document) =>
        document.id === pendingDocumentId
          ? {
              ...document,
              fileName: selectedFile.name,
              fileSize: formatFileSize(selectedFile.size),
              fileType: nextFileType,
              status: "uploaded",
            }
          : document,
      ),
    );

    setPendingDocumentId(null);
    event.target.value = "";
  };

  // Add Custom Document
  const handleAddDocument = (name: string) => {
    setDocuments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: name,
        status: "missing",
        fileType: "pdf",
      },
    ]);
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
          <AddDocumentType onAdd={handleAddDocument} />
        </div>
      </div>
    </div>
  );
};

export default VerificationDocuments;