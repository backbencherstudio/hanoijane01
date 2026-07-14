"use client";

import { VerificationDocument } from "@/types/profile";

interface VerificationProgressProps {
  documents: VerificationDocument[];
}

const VerificationProgress = ({
  documents,
}: VerificationProgressProps) => {
  const uploadedCount = documents.filter(
    (doc) => doc.status === "uploaded"
  ).length;

  const totalDocuments = documents.length;

  return (
    <div className="flex items-center gap-3 rounded-[10px] bg-[#EEF4FF] p-3">
      {/* Progress Circle */}
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border-[4px] border-primary bg-white">
        <span className="text-[10px] font-bold text-primary">
          {uploadedCount}/{totalDocuments}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className=" font-medium text-text-primary">
          Upload your company documents
        </h3>

        <p className="text-sm text-[#64748B]">
          Upload your Health &amp; Safety declaration to finish verification
        </p>
      </div>
    </div>
  );
};

export default VerificationProgress;