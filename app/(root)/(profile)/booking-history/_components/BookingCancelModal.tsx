"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ButtonGroup from "@/components/ui/ButtonGroup";

interface BookingCancelFormData {
  exhibitorName: string;
  email: string;
  stand: string;
  bookingStatus: string;
  cancelReason: string;
}

interface BookingCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStand?: string;
  defaultStatus?: string;
  onSubmit?: (data: BookingCancelFormData) => void;
}

const BookingCancelModal = ({
  isOpen,
  onClose,
  defaultStand = "A05",
  defaultStatus = "Booked",
  onSubmit,
}: BookingCancelModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingCancelFormData>({
    defaultValues: {
      exhibitorName: "",
      email: "",
      stand: defaultStand,
      bookingStatus: defaultStatus,
      cancelReason: "",
    },
  });

  const handleFormSubmit = (data: BookingCancelFormData) => {
    console.log("Cancel Request Data:", data);
    if (onSubmit) onSubmit(data);
    // Close modal after submission
    onClose();
    // Reset form
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-primary">Welcome Back</h1>
          <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
            Appears on your booking confirmation and exhibitor badge.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Exhibitor Name */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="text-lg font-medium" htmlFor="exhibitorName">
                Exhibitor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="exhibitorName"
                placeholder="Enter Your Name"
                className={`placeholder:text-[#777980] rounded-lg p-2.5 bg-gray-50 border w-full mt-1 ${
                  errors.exhibitorName ? "border-red-500" : "border-gray-200"
                }`}
                {...register("exhibitorName", {
                  required: "Exhibitor name is required",
                })}
              />
              {errors.exhibitorName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.exhibitorName.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="text-lg font-medium" htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className={`placeholder:text-[#777980] rounded-lg p-2.5 bg-gray-50 border w-full mt-1 ${
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Stand - read-only */}
            <div>
              <label className="text-lg font-medium" htmlFor="stand">
                Stand
              </label>
              <input
                type="text"
                id="stand"
                disabled
                className="rounded-lg p-2.5 bg-gray-200 border border-gray-200 w-full mt-1 text-gray-700 cursor-not-allowed"
                {...register("stand")}
              />
            </div>

            {/* Booking Status - read-only */}
            <div>
              <label className="text-lg font-medium" htmlFor="bookingStatus">
                Booking status
              </label>
              <input
                type="text"
                id="bookingStatus"
                disabled
                className="rounded-lg p-2.5 bg-gray-200 border border-gray-200 w-full mt-1 text-gray-700 cursor-not-allowed"
                {...register("bookingStatus")}
              />
            </div>
          </div>

          {/* Cancel Reason */}
          <div>
            <label className="text-lg font-medium" htmlFor="cancelReason">
              Cancel Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cancelReason"
              rows={4}
              placeholder="Write here..."
              className={`placeholder:text-[#777980] rounded-lg p-2.5 bg-gray-50 border w-full mt-1 resize-none ${
                errors.cancelReason ? "border-red-500" : "border-gray-200"
              }`}
              {...register("cancelReason", {
                required: "Cancel reason is required",
                minLength: {
                  value: 10,
                  message: "Please provide at least 10 characters",
                },
              })}
            />
            {errors.cancelReason && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cancelReason.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <ButtonGroup
              type="submit"
              className="px-6 text-white"
            >
              Request Submit
            </ButtonGroup>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingCancelModal;
