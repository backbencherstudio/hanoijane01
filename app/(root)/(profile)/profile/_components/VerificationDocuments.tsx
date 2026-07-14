"use client";

import { useState } from "react";

import DocumentItem from "./DocumentItem";
import VerificationProgress from "./VerificationProgress";
import AddDocumentType from "./AddDocumentType";
import { VerificationDocument } from "@/types/profile";
import { verificationDocuments } from "@/data/mock/profileData";


const VerificationDocuments = () => {
  const [documents, setDocuments] =
    useState<VerificationDocument[]>(verificationDocuments);

  // Upload
  const handleUpload = (id: string) => {
    console.log("Upload:", id);

    /**
     * TODO:
     * Open upload modal
     * or
     * Open file picker
     */
  };

  // Replace
  const handleReplace = (id: string) => {
    console.log("Replace:", id);

    /**
     * TODO:
     * Open upload modal
     */
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
      <VerificationProgress
        documents={documents}
      />

      {/* Documents */}
      <div >
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

        {/* Add new document */}
        <div className="mt-6">
          <AddDocumentType
            onAdd={handleAddDocument}
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationDocuments;