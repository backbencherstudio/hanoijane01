"use client";

import { useState, useRef } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";

interface FileTypeOption {
  value: string;
  label: string;
}

interface AddDocumentTypeProps {
  onAdd: (data: { fileType: string; file: File }) => void;
  availableFileTypes: FileTypeOption[];
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") {
    return (
      <div className="size-10 rounded-[10px] bg-[#EF4444] flex items-center justify-center text-white">
        <BsFiletypePdf size={20} />
      </div>
    );
  }
  if (ext === "jpg" || ext === "jpeg") {
    return (
      <div className="size-10 rounded-[10px] bg-[#22C55E] flex items-center justify-center text-white">
        <BsFiletypeJpg size={20} />
      </div>
    );
  }
  if (ext === "png") {
    return (
      <div className="size-10 rounded-[10px] bg-[#7758F6] flex items-center justify-center text-white">
        <BsFiletypePng size={20} />
      </div>
    );
  }
  return (
    <div className="size-10 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center">
      <Upload className="size-5 text-[#94A3B8]" />
    </div>
  );
};

const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
};

const AddDocumentType = ({ onAdd, availableFileTypes }: AddDocumentTypeProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!fileType || !file) return;

    onAdd({ fileType, file });

    setFileType("");
    setFile(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setFileType("");
    setFile(null);
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <div
        onClick={() => setIsAdding(true)}
        className="border border-primary cursor-pointer flex justify-center items-center rounded-[10px] p-3.5"
      >
        <button className="flex items-center gap-2 cursor-pointer text-sm md:text-base text-primary font-medium  transition-all">
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
            <Plus className="size-4" />
          </div>
          Add Another Document
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-[#DFE1E7] p-4">
      <div className="flex flex-col gap-4">
        {/* File preview row */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            {file ? (
              <>
                {getFileIcon(file.name)}
                <div>
                  <h4 className="font-medium text-[#1E293B]">{file.name}</h4>
                  <p className="text-[#64748B]">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="ml-auto text-[#64748B] hover:text-[#1E293B] cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col lg:flex-row lg:justify-start text-center lg:text-left p-2 items-center gap-4 cursor-pointer flex-1 border border-dashed rounded-lg justify-center py-2"
              >
                <div className="size-10 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center">
                  <Upload className="size-5 text-[#94A3B8]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1E293B]">Choose File</h4>
                  <p className="text-[#64748B] text-sm mt-1">PDF, JPG or PNG, up to 5 MB</p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* Category dropdown + actions */}
        <div className="flex flex-col lg:flex-row items-center gap-4 justify-end">
          <Select value={fileType} onValueChange={setFileType}>
            <SelectTrigger className="bg-white w-full cursor-pointer">
              <SelectValue placeholder="Select attachment category" />
            </SelectTrigger>
            <SelectContent>
              {availableFileTypes.map((option) => (
                <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              className="h-10"
              onClick={handleAdd}
              disabled={!fileType || !file}
            >
              Add
            </Button>
            <Button
              type="button"
              className="h-10 border-none bg-[#F3F3F5]"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentType;
