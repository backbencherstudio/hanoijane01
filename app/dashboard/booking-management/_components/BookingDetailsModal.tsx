"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import React from "react";
import { useGetAdminBookingDetailsQuery } from "@/src/redux/api/booking/bookingApi";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string | null;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const colorMap: Record<string, string> = {
  BOOKED: "bg-green-100 border border-green-200 text-green-700",
  PENDING: "bg-[#FBF5EB] border border-[#EDCEBF] text-[#D79930]",
  CANCELED: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
  REFUNDED: "bg-[#EBF2FD] border border-[#C5D9F7] text-[#2A6BCA]",
};

const BookingDetailsModal = ({
  isOpen,
  onClose,
  bookingId,
}: BookingDetailsModalProps) => {
  const handleClose = () => {
    onClose();
  };

  const { data, isLoading, isError } = useGetAdminBookingDetailsQuery(
    bookingId as string,
    {
      skip: !bookingId || !isOpen,
    },
  );

  const booking = data?.data;

  const status = booking?.status || "";
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="md:w-120 lg:w-150 xl:w-182.5">
        <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-text-primary">
          Booking Details
        </h1>

        {isLoading ? (
          <div className="bg-[#F9FAFB] px-5 py-6 mt-6 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center"
              >
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-40 rounded" />
              </div>
            ))}
          </div>
        ) : isError || !booking ? (
          <div className="bg-[#F9FAFB] px-5 py-6 mt-6">
            <p className="text-red-500 text-center">
              Failed to load booking details. Please try again.
            </p>
          </div>
        ) : (
          <div className="bg-[#F9FAFB] px-5 py-6 mt-6 space-y-4">
            {/* Booking Status */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Booking Status</p>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[status] || ""}`}
              >
                {formattedStatus || "N/A"}
              </span>
            </div>

            {/* Stand Number */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Stand Number</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.standNumber || "N/A"}
              </p>
            </div>

            {/* Hall */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Hall</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.hall || "N/A"}
              </p>
            </div>

            {/* Category */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Category</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.category || "N/A"}
              </p>
            </div>

            {/* Price */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Price</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                €{booking.price || 0}
              </p>
            </div>

            {/* Event */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Event</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.event || "N/A"}
              </p>
            </div>

            {/* Exhibitor */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Exhibitor</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.exhibitor || "N/A"}
              </p>
            </div>

            {/* Contact Name */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Contact Name</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.contactName || "N/A"}
              </p>
            </div>

            {/* Email */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Email</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.email || "N/A"}
              </p>
            </div>

            {/* Booking Date */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Booking Date</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.bookingDate ? formatDate(booking.bookingDate) : "N/A"}
              </p>
            </div>

            {/* Payment Status */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Payment Status</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                {booking.paymentStatus
                  ? booking.paymentStatus.charAt(0).toUpperCase() +
                    booking.paymentStatus.slice(1).toLowerCase()
                  : "N/A"}
              </p>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center">
              <p className="text-[#4A4C56] font-medium">Total Amount</p>
              <p className="text-[#4A4C56] font-semibold text-lg">
                €{booking.totalAmount || 0}
              </p>
            </div>
          </div>
        )}

        {booking?.status === "PENDING" && (
          <div className="mt-6 flex items-center gap-4 justify-center md:justify-end w-full">
            <Button variant="outline" className="h-11 font-medium">
              Reject
            </Button>
            <Button className="h-11 font-medium">Approve</Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;