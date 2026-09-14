"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  useGetAdminBookingDetailsQuery,
  useAcceptBookingMutation,
  useRejectBookingMutation,
} from "@/src/redux/api/booking/bookingApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
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
  REJECTED: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
  REFUNDED: "bg-[#EBF2FD] border border-[#C5D9F7] text-[#2A6BCA]",
};

const BookingDetailsModal = ({
  isOpen,
  onClose,
  bookingId,
}: BookingDetailsModalProps) => {
  const [acceptBooking, { isLoading: isAccepting }] = useAcceptBookingMutation();
  const [rejectBooking, { isLoading: isRejecting }] = useRejectBookingMutation();
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectingFlow, setIsRejectingFlow] = useState(false);

  const handleClose = () => {
    // Reset any in-progress reject flow so reopening the modal starts clean
    setIsRejectingFlow(false);
    setRejectReason("");
    onClose();
  };

  const { data, isLoading, isError } = useGetAdminBookingDetailsQuery(
    bookingId as string,
    {
      skip: !bookingId || !isOpen,
    },
  );

  const booking = data?.data;

  const handleAccept = async () => {
    if (!booking) return;
    try {
      await acceptBooking(booking.id).unwrap();
      toast.success(
        `Booking for stand ${booking.standNumber || ""} accepted successfully`,
      );
      handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to accept the booking"));
    }
  };

  const startRejectFlow = () => {
    setRejectReason("");
    setIsRejectingFlow(true);
  };

  const cancelRejectFlow = () => {
    setIsRejectingFlow(false);
    setRejectReason("");
  };

  const handleReject = async () => {
    if (!booking) return;
    const reason = rejectReason.trim();
    if (!reason) {
      toast.error("Please write a reason for rejecting this booking");
      return;
    }
    try {
      await rejectBooking({ bookingId: booking.id, reason }).unwrap();
      toast.success(
        `Booking for stand ${booking.standNumber || ""} rejected successfully`,
      );
      setIsRejectingFlow(false);
      handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to reject the booking"));
    }
  };

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
          <div className="mt-6 w-full">
            {isRejectingFlow ? (
              /* Reject reason input — the reject API requires a reason */
              <div className="space-y-3">
                <label
                  htmlFor="reject-reason"
                  className="block text-sm font-medium text-text-primary"
                >
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Write the reason for rejecting this booking..."
                  rows={3}
                  maxLength={500}
                  className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm text-[#1C1F23] placeholder:text-[#777980] focus:border-gray-300 focus:outline-none resize-none"
                />
                <div className="flex items-center gap-4 justify-center md:justify-end">
                  <Button
                    variant="outline"
                    className="h-11 font-medium"
                    onClick={cancelRejectFlow}
                    disabled={isAccepting || isRejecting}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="h-11 font-medium bg-[#EB3D4D] hover:bg-[#d63241] text-white"
                    onClick={handleReject}
                    disabled={isAccepting || isRejecting}
                  >
                    {isRejecting ? "Rejecting..." : "Confirm Reject"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 justify-center md:justify-end w-full">
                <Button
                  variant="outline"
                  className="h-11 font-medium text-[#EB3D4D] border-[#FBD8DB] hover:bg-[#FEECEE] hover:text-[#EB3D4D]"
                  onClick={startRejectFlow}
                  disabled={isAccepting || isRejecting}
                >
                  Reject
                </Button>
                <Button
                  className="h-11 font-medium"
                  onClick={handleAccept}
                  disabled={isAccepting || isRejecting}
                >
                  {isAccepting ? "Approving..." : "Approve"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;