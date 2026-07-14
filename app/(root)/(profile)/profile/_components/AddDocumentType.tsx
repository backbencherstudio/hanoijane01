"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddDocumentTypeProps {
  onAdd: (name: string) => void;
}

const AddDocumentType = ({ onAdd }: AddDocumentTypeProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [documentName, setDocumentName] = useState("");

  const handleAdd = () => {
    const value = documentName.trim();

    if (!value) return;

    onAdd(value);

    setDocumentName("");
    setIsAdding(false);
  };

  const handleCancel = () => {
    setDocumentName("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <div
        onClick={() => setIsAdding(true)}
        className="border border-primary cursor-pointer flex justify-center items-center rounded-[10px] p-3.5"
      >
        <button className="flex items-center gap-2 cursor-pointer text-primary font-medium  transition-all">
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
            <Plus className="size-4" />
          </div>
          Add Another Document Type
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-[#DFE1E7]  p-4">
      
      <div className="flex items-center gap-4 justify-center">
        <Input
          autoFocus
          value={documentName}
          placeholder="Enter document name"
          className=" bg-white"
          onChange={(e) => setDocumentName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }

            if (e.key === "Escape") {
              handleCancel();
            }
          }}
        />

        <div className=" flex justify-end gap-3">
          <Button type="button" className="h-10" onClick={handleAdd}>
            
            Add
          </Button>
          <Button type="button" className="h-10 border-none bg-[#F3F3F5]" variant="secondary"  onClick={handleCancel}>
            
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentType;
