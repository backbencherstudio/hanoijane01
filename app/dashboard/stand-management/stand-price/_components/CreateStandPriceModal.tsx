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

const CreateStandPriceModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateStandPriceModalProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StandPriceFormData>({
    defaultValues: {
      title: "",
      description: "",
      currency: "€",
      price: 0,
      vatIncluded: false,
      includes: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "includes",
  });

  const currency = watch("currency");
  const vatIncluded = watch("vatIncluded");

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: StandPriceFormData) => {
    const payload: StandPriceData = {
      title: data.title,
      description: data.description,
      currency: data.currency,
      price: data.price,
      vatIncluded: data.vatIncluded,
      includes: data.includes
        .map((item: { value: string }) => item.value.trim())
        .filter(Boolean),
    };

    console.log(payload);
    onSubmit?.(payload);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-text-primary text-center">
          Create New Stand Price
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8">
          <div className="bg-[#F9FAFB] p-4 md:py-6 md:px-8">
            {/* Stand Name */}
            <div>
              <label htmlFor="standName" className="font-medium">
                Stand Name <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id="standName"
                placeholder="Standard Stand"
                className={`mt-2 ${errors.title ? "border-red-500" : ""}`}
                {...register("title", { required: "Stand name is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-3">
              <label htmlFor="standDescription" className="font-medium">
                Description <span className="text-red-600">*</span>
              </label>
              <Textarea
                id="standDescription"
                placeholder="Enter Description"
                className={`mt-2 ${errors.description ? "border-red-500" : ""}`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
              {/* Currency - Searchable Combobox */}
              <div>
                <label htmlFor="currency" className="font-medium">
                  Currency <span className="text-red-600">*</span>
                </label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-[#F4F5F7] rounded-lg text-text-primary text-sm border border-gray-200 h-12 mt-2 hover:bg-gray-50"
                    >
                      <span className="truncate">
                        {currency
                          ? currencies.find((c) => c.value === currency)
                              ?.label || currency
                          : "Select currency..."}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command
                      filter={(value, search) => {
                        const item = currencies.find((c) => c.value === value);
                        if (!item) return 0;
                        const searchString =
                          `${item.value} ${item.label}`.toLowerCase();
                        return searchString.includes(search.toLowerCase())
                          ? 1
                          : 0;
                      }}
                    >
                      <CommandInput placeholder="Search currency..." />
                      <CommandList>
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup>
                          {currencies.map((c) => (
                            <CommandItem
                              key={c.value}
                              value={c.value}
                              onSelect={(currentValue) => {
                                setValue("currency", currentValue);
                                setOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currency === c.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {c.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="font-medium">
                  Price <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  className={`mt-2 ${errors.price ? "border-red-500" : ""}`}
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* VAT Include */}
          <div className="py-6 flex items-center justify-between">
            <span className="text-lg font-medium">VAT Include</span>
            <Controller
              control={control}
              name="vatIncluded"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
          </div>

          {/* What's Include */}
          <div className="bg-[#F9FAFB] p-4 md:py-6 md:px-8">
            <h4 className="text-lg font-medium text-text-primary flex items-center gap-2">
              What&apos;s Include <Info size={18} />
            </h4>
            <p className="text-[#4A4C56] mt-2">
              Select features included in this boost package
            </p>

            <div className="mt-2 p-4 md:p-6 bg-white rounded-xl border">
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3">
                    <Input
                      placeholder="Write here"
                      className="flex-1"
                      {...register(`includes.${index}.value`)}
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                        className="shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ value: "" })}
                className="rounded-lg h-10 text-sm mt-3"
              >
                <Plus className="size-4" /> Add More
              </Button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              className="h-10 text-[#777980]"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-10">
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateStandPriceModal;
