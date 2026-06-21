"use client";
import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RootState } from "@/src/redux/store";
import { updateBookingInfo } from "@/src/redux/slice/bookingSlice";

interface BookingInfoData {
  companyName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  companyAddress: string;
  companyLicense: FileList | null;
}

const BookingInfoForm = ({ nextStep }: { nextStep: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  // Get stored booking info from Redux
  const storedInfo = useSelector(
    (state: RootState) => state.booking.bookingInfo,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookingInfoData>({
    defaultValues: {
      companyName: storedInfo.companyName || "",
      contactName: storedInfo.contactName || "",
      email: storedInfo.email || "",
      phoneNumber: storedInfo.phoneNumber || "",
      companyAddress: storedInfo.companyAddress || "",
      companyLicense: null,
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
      companyLicense: null,
    });
  }, [storedInfo, reset]);

  const onSubmit = (data: BookingInfoData) => {
    // Save data to Redux (exclude file)
    const { companyLicense, ...textData } = data;
    dispatch(updateBookingInfo(textData));
    // Here you could also handle the file upload separately
    console.log("Booking Info Data:", data);
    // Proceed to next step
    nextStep();
  };

  const selectedFile = watch("companyLicense")?.[0] || null;

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

        {/* File Upload - Custom styled */}
        <div className="col-span-full">
          <label className="text-lg font-medium pb-2" htmlFor="companyLicense">
            Company License
          </label>
          <div className=" md:col-span-2 ">
            <input
              type="file"
              id="companyLicense"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setValue("companyLicense", files);
                }
                // If user cancels, do nothing – keep existing file
              }}
            />

            <label
              htmlFor="companyLicense"
              className="
              flex flex-col items-center justify-center
              border border-dashed border-[#0F5EA8]
              bg-[#F5F5F5]
              rounded-3xl
       py-6.5
              cursor-pointer
              transition-all
              hover:bg-[#F0F0F0]
              mt-2
            "
            >
              <div className="size-20 rounded-full bg-[#D9E4EC] flex items-center justify-center mb-6">
                <UploadCloud className="text-primary" size={34} />
              </div>
              <h3 className="text-xl font-medium text-center text-text-primary">
                Upload your Company License
              </h3>
              <p className="mt-2 text-[#777980] text-center">
                Supported format: JPG/PNG (up to 5 mb)
              </p>
              <div className="mt-8 border border-primary rounded-full px-10 py-3 text-primary font-medium">
                Choose File
              </div>
            </label>

            {/* Preview section */}
            {selectedFile && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center gap-4">
                {selectedFile.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Clear the file input
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                    setValue("companyLicense", null);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {errors.companyLicense && (
              <p className="text-red-500 text-sm mt-2">
                {errors.companyLicense.message}
              </p>
            )}
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
        <ButtonGroup fullWidth={true} type="submit" className="px-12.5">
          Next
        </ButtonGroup>
      </div>
    </form>
  );
};

export default BookingInfoForm;
