"use client";

import React, { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Plus, Trash2, ChevronsUpDown, Check } from "lucide-react";

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
      {/*  Responsive container: full width on mobile, max-width on larger screens */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-text-primary">
            Create New Stand Price
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-6 sm:mt-8 space-y-6 sm:space-y-8"
        >
          {/* Main Info */}
          <div className="bg-[#F8F9FB] rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="space-y-4">
              {/* Stand Name */}
              <div>
                <label className="font-medium">
                  Stand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Standard Stand"
                  className={`placeholder:text-[#777980] placeholder:text-sm rounded-lg px-3 h-12 bg-[#F4F5F7] border w-full mt-2 ${
                    errors.title ? "border-red-500" : "border-gray-200"
                  }`}
                  {...register("title", {
                    required: "Stand name is required",
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter description"
                  className={`placeholder:text-[#777980] placeholder:text-sm rounded-lg p-3 bg-[#F4F5F7] border w-full mt-2 resize-none ${
                    errors.description ? "border-red-500" : "border-gray-200"
                  }`}
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

              {/* Currency & Price Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Currency */}
                <div>
                  <label className="font-medium">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        role="combobox"
                        aria-expanded={open}
                        className="w-full rounded-lg! text-text-primary hover:bg-[#F4F5F7] justify-between bg-[#F4F5F7] border border-[#E8EAEB]! h-12 mt-2"
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
                          const item = currencies.find(
                            (c) => c.value === value,
                          );
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
                  <label className="font-medium">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="200"
                    className={`placeholder:text-[#777980] rounded-lg px-3 h-12 bg-[#F4F5F7] border w-full mt-2 ${
                      errors.price ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
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
          </div>

          {/* VAT */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-text-primary">
              VAT Include
            </h3>
            <Controller
              control={control}
              name="vatIncluded"
              render={({ field }) => (
                <Switch
                  className="cursor-pointer"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
          </div>

          {/* What's Include */}
          <div className="bg-[#F8F9FB] rounded-xl px-4 md:px-8 py-4 md:py-6">
            <div className="mb-3">
              <h3 className="text-lg font-medium text-text-primary">
                What&apos;s Include
              </h3>
              <p className="text-[#4A4C56] mt-2">
                Select features included in this stand package
              </p>
            </div>

            <div className="bg-white border rounded-xl p-4 sm:p-6">
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                  >
                    <input
                      type="text"
                      placeholder="Write here"
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-3"
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
                className="mt-4 border-primary text-primary rounded-lg h-10 w-full sm:w-auto"
              >
                <Plus className="size-4" />
                Add New
              </Button>
            </div>
          </div>

          {/* Footer Buttons - Responsive stacking */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="h-11 text-[#777980] w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-10 h-11 bg-primary text-white w-full sm:w-auto"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateStandPriceModal;