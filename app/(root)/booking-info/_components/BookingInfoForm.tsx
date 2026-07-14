"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { CircleX, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { RootState } from "@/src/redux/store";
import { updateBookingInfo } from "@/src/redux/slice/bookingSlice";
import { BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";
import { Plus } from "lucide-react";

interface DocumentEntry {
  id: string;
  name: string;
  file: File | null;
}

interface BookingInfoData {
  companyName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  companyAddress: string;
  submitLater: boolean;
}

const BookingInfoForm = ({ nextStep }: { nextStep: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [documentName, setDocumentName] = useState("");

  // Get stored booking info from Redux
  const storedInfo = useSelector(
    (state: RootState) => state.booking.bookingInfo,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingInfoData>({
    defaultValues: {
      companyName: storedInfo.companyName || "",
      contactName: storedInfo.contactName || "",
      email: storedInfo.email || "",
      phoneNumber: storedInfo.phoneNumber || "",
      companyAddress: storedInfo.companyAddress || "",
      submitLater: false,
    },
  });

  // Update form when storedInfo changes (e.g., after going back)
  useEffect(() => {
    reset({
      companyName: storedInfo.companyName || "",
      contactName: storedInfo.contactName || "",
      email: storedInfo.email || "",
      phoneNumber: storedInfo.phoneNumber || "",
      companyAddress: storedInfo.companyAddress || "",
      submitLater: false,
    });
  }, [storedInfo, reset]);

  const onSubmit = (data: BookingInfoData) => {
    dispatch(updateBookingInfo(data));
    console.log("Booking Info Data:", data);
    nextStep();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setDocuments((prev) => {
        if (prev.length === 0) {
          return [{ id: crypto.randomUUID(), name: file.name, file }];
        }

        const lastEntry = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...lastEntry, file }];
      });
    }
    event.target.value = "";
  };

  const removeDocument = (indexToRemove: number) => {
    setDocuments((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAddDocument = () => {
    const value = documentName.trim();
    if (!value) return;

    setDocuments((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: value, file: null },
    ]);
    setDocumentName("");
    setIsAddingDocument(false);
  };

  const getFileIcon = (file: File | null) => {
    if (!file) {
      return (
        <div className="size-10 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center">
          <Upload className="size-5 text-[#94A3B8]" />
        </div>
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "pdf") {
      return (
        <div className="size-10 rounded-[10px] bg-[#EF4444] flex items-center justify-center text-white">
          <BsFiletypePdf size={20} />
        </div>
      );
    }

    if (extension === "jpg" || extension === "jpeg") {
      return (
        <div className="size-10 rounded-[10px] bg-[#22C55E] flex items-center justify-center text-white">
          <BsFiletypeJpg size={20} />
        </div>
      );
    }

    return (
      <div className="size-10 rounded-[10px] bg-[#7758F6] flex items-center justify-center text-white">
        <BsFiletypePng size={20} />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Company Name */}
        <div>
          <label className="text-lg font-medium" htmlFor="companyName">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter Company Name"
            className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
              errors.companyName ? "border-red-500" : "border-gray-200"
            }`}
            {...register("companyName", {
              required: "Company name is required",
            })}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Contact Name */}
        <div>
          <label className="text-lg font-medium" htmlFor="contactName">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            placeholder="Enter Contact Name"
            className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
              errors.contactName ? "border-red-500" : "border-gray-200"
            }`}
            {...register("contactName", {
              required: "Contact name is required",
            })}
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-lg font-medium" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-lg font-medium mb-2" htmlFor="phoneNumber">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
              errors.phoneNumber ? "border-red-500" : "border-gray-200"
            }`}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\-\s()]{7,20}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="text-lg font-medium" htmlFor="companyAddress">
            Company Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyAddress"
            placeholder="Enter Company Address"
            className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
              errors.companyAddress ? "border-red-500" : "border-gray-200"
            }`}
            {...register("companyAddress", {
              required: "Company address is required",
            })}
          />
          {errors.companyAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyAddress.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div className="col-span-full">
          <div className="flex gap-2 pb-2">
            <label
              className="text-lg font-medium "
              htmlFor="supportingDocument"
            >
              Supporting Documents
            </label>
            <label className="flex items-center gap-2 text-sm text-[#475467] cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                {...register("submitLater")}
              />
              Submit later
            </label>
          </div>
          <div className="md:col-span-2 space-y-3">
            <input
              type="file"
              id="supportingDocument"
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {documents &&
              documents.map((document, index) => (
                <div
                  key={document.id}
                  className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[10px] border border-[#DFE1E7] bg-white p-4"
                >
                  <div className="flex items-center gap-4">
                    {getFileIcon(document.file)}
                    <div>
                      <h4 className="font-medium text-[#1E293B]">
                        {document.name}
                      </h4>
                      <p className="text-[#64748B] mt-1">
                        {document.file
                          ? `${(document.file.size / 1024).toFixed(1)} KB`
                          : "Pending upload"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <span
                      className={`flex items-center gap-2 ${document.file ? "text-[#12B76A]" : "text-[#F04438]"}`}
                    >
                      <span className="size-2 rounded-full bg-current" />
                      {document.file ? "Uploaded" : "Missing"}
                    </span>

                    {!document.file && (
                      <label
                        htmlFor="supportingDocument"
                        className="cursor-pointer text-sm font-medium text-[#0F5EA8]"
                      >
                        Upload
                      </label>
                    )}
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-sm font-medium text-[#F04438] cursor-pointer"
                    >
                 <CircleX />
                    </button>
                  </div>
                </div>
              ))}

            <div className=" mt-2">
              {!isAddingDocument ? (
                <div
                  onClick={() => setIsAddingDocument(true)}
                  className="border border-primary cursor-pointer flex justify-center items-center rounded-[10px] p-3.5"
                >
                  <button
                    type="button"
                    className="flex items-center gap-2 cursor-pointer text-primary font-medium transition-all"
                  >
                    <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
                      <Plus className="size-4" />
                    </div>
                    Add {documents.length > 0 && "Another"} Document Type
                  </button>
                </div>
              ) : (
                <div className="w-full rounded-[10px] border border-[#DFE1E7] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <Input
                      autoFocus
                      value={documentName}
                      placeholder="Enter document name"
                      className="bg-white"
                      onChange={(e) => setDocumentName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddDocument();
                        }

                        if (e.key === "Escape") {
                          setDocumentName("");
                          setIsAddingDocument(false);
                        }
                      }}
                    />

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        className="h-10"
                        onClick={handleAddDocument}
                      >
                        Add
                      </Button>
                      <Button
                        type="button"
                        className="h-10 border-none bg-[#F3F3F5]"
                        variant="secondary"
                        onClick={() => {
                          setDocumentName("");
                          setIsAddingDocument(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => router.back()}
          className="px-8"
          variant="outline"
        >
          Back
        </Button>
        <ButtonGroup type="submit" className="px-12.5">
          Next
        </ButtonGroup>
      </div>
    </form>
  );
};

export default BookingInfoForm;
