"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RootState } from "@/src/redux/store";
import { updateBookingInfo } from "@/src/redux/features/bookingSlice";

interface BookingInfoData {
  companyName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  companyAddress: string;
}

const BookingInfoForm = ({ nextStep }: { nextStep: () => void }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const storedInfo = useSelector(
    (state: RootState) => state.booking.bookingInfo,
  );
  const stand = useSelector((state: RootState) => state.booking.stand);
  const termsAndConditions = useSelector(
    (state: RootState) => state.booking.termsAndConditions,
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
    });
  }, [storedInfo, reset]);

  const onSubmit = (data: BookingInfoData) => {
    dispatch(updateBookingInfo(data));
    console.log("===== BOOKING INFO SUBMIT =====");
    console.log(
      JSON.stringify(
        {
          stand,
          termsAndConditions,
          bookingInfo: data,
        },
        null,
        2,
      ),
    );
    nextStep();
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
      </div>

      {/* Next button */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mt-8">
        <Button
          onClick={() => router.back()}
          className="px-8"
          variant="outline"
        >
          Back
        </Button>
        <div className="w-full md:w-fit">
          <ButtonGroup fullWidth={true} type="submit" className="px-12.5 ">
            Next
          </ButtonGroup>
        </div>
      </div>
    </form>
  );
};

export default BookingInfoForm;
