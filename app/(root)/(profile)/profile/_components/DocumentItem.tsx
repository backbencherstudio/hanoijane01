"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VerificationDocument } from "@/types/profile";
import { Upload } from "lucide-react";
import { BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";

interface DocumentItemProps {
  document: VerificationDocument;
  isEditing?: boolean;
  onUpload?: (id: string) => void;
  onReplace?: (id: string) => void;
}

const DocumentItem = ({
  document,
  isEditing = false,
  onUpload,
  onReplace,
}: DocumentItemProps) => {
  const getFileIcon = () => {
    switch (document.fileType) {
      case "pdf":
        return (
          <div className="size-10 rounded-[10px] bg-[#EF4444] flex items-center justify-center text-white">
            <BsFiletypePdf size={20} />
          </div>
        );

      case "jpg":
        return (
          <div className="size-10 rounded-[10px] bg-[#22C55E] flex items-center justify-center text-white">
            <BsFiletypeJpg size={20} />
          </div>
        );

      case "png":
      default:
        return (
          <div className="size-10 rounded-[10px] bg-[#7758F6] flex items-center justify-center text-white">
            <BsFiletypePng size={20} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[10px] border border-[#DFE1E7] bg-white p-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        {document.status === "uploaded" ? (
          getFileIcon()
        ) : (
          <div className="size-10 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center">
            <Upload className="size-5 text-[#94A3B8]" />
          </div>
        )}

        <div>
          <h4 className="font-medium text-[#1E293B]">{document.title}</h4>

          {document.status === "uploaded" ? (
            <p className="text-[#64748B] ">
              {document.fileName} • {document.fileSize}
            </p>
          ) : (
            <p className="text-[#64748B] mt-1">PDF or PNG, up to 5 MB</p>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-between md:justify-end gap-4">
        <span
          className={cn(
            " flex items-center gap-2",
            document.status === "uploaded"
              ? "text-[#12B76A]"
              : "text-[#F04438]",
          )}
        >
          <span className="size-2 rounded-full bg-current" />
          {document.status === "uploaded" ? "Uploaded" : "Missing"}
        </span>

        {isEditing && (
          <Button
            variant={document.status === "uploaded" ? "secondary" : "default"}
            className={`${document.status === "uploaded" ? "bg-[#F3F3F5] text-[#16233A]" : ""} min-w-24 font-medium h-9 rounded-[8px]`}
            onClick={() =>
              document.status === "uploaded"
                ? onReplace?.(document.id)
                : onUpload?.(document.id)
            }
          >
            {document.status === "uploaded" ? "Replace" : "Upload"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentItem;
