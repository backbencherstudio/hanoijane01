"use client";

import React, { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Upload, X, Signature } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { sections } from "@/data/termsAndConditions";
import { Input } from "@/components/ui/input";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { updateTermsAndConditions } from "@/src/redux/slice/bookingSlice";
import { RootState } from "@/src/redux/store";

interface TermsFormData {
  accepted: boolean;
  signature: FileList | null;
  onBehalfOf: string;
  title: string;
}

const TermsAndConditionsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const storedTerms = useSelector(
    (state: RootState) => state.booking.termsAndConditions,
  );

  const [signaturePreview, setSignaturePreview] = useState<string | null>(
    storedTerms.signature || null,
  );
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TermsFormData>({
    defaultValues: {
      accepted: false,
      signature: null,
      onBehalfOf: storedTerms.onBehalfOf || "",
      title: storedTerms.title || "",
    },
  });

  // Register accepted and signature with custom validators
  register("accepted", {
    validate: (value) =>
      value === true || "You must accept the terms and conditions",
  });
  register("signature", {
    validate: (value) => {
      if (!signaturePreview) return "Signature is required";
      return true;
    },
  });

  const signature = watch("signature");

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("signature", e.target.files as FileList);
      clearErrors("signature");
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeSignature = () => {
    setSignaturePreview(null);
    setValue("signature", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("signature", e.dataTransfer.files as FileList);
      clearErrors("signature");
    }
  }, [setValue, clearErrors]);

  const onSubmit = (data: TermsFormData) => {
    if (!data.accepted) {
      setValue("accepted", false, { shouldValidate: true });
      return;
    }

    if (!signaturePreview) {
      setValue("signature", null, { shouldValidate: true });
      return;
    }

    dispatch(
      updateTermsAndConditions({
        onBehalfOf: data.onBehalfOf,
        title: data.title,
        signature: signaturePreview || "",
        accepted: true,
      }),
    );
    router.push("/booking-info");
  };

  return (
    <section className="padding-default">
      <div className=" container px-4 xl:px-0">
        {/* Header */}
        <div className="text-center pb-8 text-3xl md:text-5xl font-bold text-primary space-y-3 mb-12">
          <h1>ITBA EXPO 2027</h1>
          <h2>Exhibitor Terms & Conditions</h2>
        </div>{" "}
        <div className="">
          <p className="text-lg lg:text-xl font-medium text-[#4A4C56]">
            <span className="text-xl lg:text-2xl font-bold text-[#1C1F23]">
              Venue:
            </span>{" "}
            Goffs, Kill, Co. Kildare
          </p>
          <p className="text-lg lg:text-xl font-medium text-[#4A4C56] mt-2.5">
            <span className="text-xl lg:text-2xl font-bold text-[#1C1F23]">
              Dates:
            </span>{" "}
            Friday 8 January & Saturday 9 January 2027
          </p>
          <p className="text-lg lg:text-xl font-medium text-[#4A4C56] mt-6">
            By booking an exhibition stand through the ITBA online booking
            portal, exhibitors agree to the following Terms & Conditions.
          </p>
        </div>
        {/* Content */}
        <div className="py-8 space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="space-y-3">
              <h3 className="md:text-lg lg:text-xl xl:text-2xl font-bold text-[#1C1F23]">
                {section.id}. {section.title}
              </h3>

              <div className="space-y-2 text-[#4A4C56] text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-relaxed">
                {section.content.map((item, index) =>
                  Array.isArray(item) ? (
                    <ul key={index} className="list-disc pl-6 space-y-2">
                      {item.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <li key={index}>{item}</li>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Footer Acceptance */}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Acceptance Checkbox */}
          <div className="mb-12">
            <h3 className="md:text-lg lg:text-xl xl:text-2xl font-bold text-[#1C1F23] mb-3">
              10. Acceptance
            </h3>
            <div className="flex items-start gap-3">
              <Checkbox
                id="acceptance"
                checked={isAccepted}
                onCheckedChange={(checked) => {
                  setIsAccepted(checked as boolean);
                  setValue("accepted", checked as boolean);
                  clearErrors("accepted");
                }}
                className="mt-1 size-4 lg:size-6"
              />
              <label
                htmlFor="acceptance"
                className="text-[#4A4C56] text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-relaxed cursor-pointer"
              >
                I have read and agree to the ITBA EXPO 2027 Exhibitor Terms &
                Conditions . I understand that stand bookings are non-refundable
                except in exceptional circumstances at the sole discretion of
                ITBA.
              </label>
            </div>
            {errors.accepted && (
              <p className="text-sm text-red-500 mt-2">
                {errors.accepted.message}
              </p>
            )}
          </div>

          {/* Signature Upload */}
          <div>
            <div className="flex items-center gap-5 w-ful mb-5">
              <div className="flex-1">
                <label htmlFor="onBehalfOf" className="text-lg font-medium">
                  On behalf of <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="onBehalfOf"
                  placeholder="On behalf of..."
                  className=" mt-2"
                  {...register("onBehalfOf", {
                    required: "On behalf of is required",
                  })}
                />
                {errors.onBehalfOf && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.onBehalfOf.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="title" className="text-lg font-medium">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Write the title here..."
                  className=" mt-2"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>
            <label className="text-lg font-medium text-text-primary block mb-3">
              <Signature className="inline-block mr-2 size-5" />
              Upload Signature <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleSignatureChange}
            />

            {signaturePreview ? (
              <div className="flex items-center gap-4 p-4 border rounded-xl bg-[#f8f9fa]">
                <div className="relative w-24 h-12 border rounded-lg overflow-hidden bg-white">
                  <Image
                    src={signaturePreview}
                    alt="Signature preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {signature?.[0]?.name || "Signature uploaded"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(signature?.[0]?.size || 0) / 1024 > 1024
                      ? `${((signature?.[0]?.size || 0) / 1024 / 1024).toFixed(2)} MB`
                      : `${((signature?.[0]?.size || 0) / 1024).toFixed(1)} KB`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeSignature}
                  className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            ) : (
              <div
                onClick={triggerFileInput}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full border-2 bg-[#F4F5F7] border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary transition group ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="size-10 text-gray-400 group-hover:text-primary transition" />
                  <p className="text-sm text-gray-500">
                    Drag and drop file here or Choose file
                  </p>
                </div>
              </div>
            )}

            {errors.signature && (
              <p className="text-sm text-red-500 mt-2">
                {errors.signature.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center gap-4 pt-8 lg:pt-12">
            <Button type="button" variant="outline" className="h-11">
              Reject
            </Button>
            <ButtonGroup
              type="submit"
              roundButtonSize="w-11"
              className="h-11 px-8"
            >
              Agree
            </ButtonGroup>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TermsAndConditionsPage;
