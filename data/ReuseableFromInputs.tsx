"use client";

import React, { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Plus, Trash2, ChevronsUpDown, Check, Info } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { currencies } from "@/data/dashboard/currencies";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface StandPriceFormData {
  title: string;
  description: string;
  currency: string;
  price: number;
  vatIncluded: boolean;
  includes: Array<{ value: string }>;
}

export interface StandPriceData {
  title: string;
  description: string;
  currency: string;
  price: number;
  vatIncluded: boolean;
  includes: string[];
}

interface CreateStandPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: StandPriceData) => void;
}

const ReuseableFromInputs = ({
  isOpen,
  onClose,
}: CreateStandPriceModalProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-text-primary text-center">
          Create New Stand Price
        </h1>
        <form className="  mt-8">
          <div className="bg-[#F9FAFB] p-4 md:py-6 md:px-8">
            {/* stand name */}
            <div>
              <label htmlFor="standName" className="font-medium">
                Stand Name <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id="standName"
                placeholder="Standard Stand"
                className=" mt-2"
              />
            </div>
            {/* description */}
            <div className="mt-3">
              <label htmlFor="standDescription" className="font-medium">
                Description <span className="text-red-600">*</span>
              </label>
              <Textarea
                id="standDescription"
                placeholder="Enter Description"
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
              {/* currency */}
              <div>
                <label htmlFor="currency" className="font-medium">
                  Currency <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  id="currency"
                  placeholder="Standard Stand"
                  className=" mt-2"
                />
              </div>
              {/* price */}
              <div>
                <label htmlFor="price" className="font-medium">
                  Price <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  id="price"
                  placeholder="Standard Stand"
                  className=" mt-2"
                />
              </div>
            </div>
          </div>
          <div className="py-6 flex items-center justify-between">
            <span className="text-lg font-medium">VAT Include</span>
            <Switch />
          </div>
          <div className="bg-[#F9FAFB] p-4 md:py-6 md:px-8 ">
            <h4 className="text-lg font-medium text-text-primary flex items-center gap-2">
              What&apos;s Include <Info size={18} />
            </h4>
            <p className="text-[#4A4C56] mt-2">
              Select features included in this boost package
            </p>
            <div className="mt-2 p-4 md:p-6 bg-white rounded-xl border">
              <Input placeholder="Write here" />
              <Button
                variant="outline"
                className="rounded-lg h-10 text-sm mt-3"
              >
                <Plus /> Add More
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button className="h-10" variant="secondary">
              Cancel
            </Button>
            <Button className="h-10">Create</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReuseableFromInputs;
