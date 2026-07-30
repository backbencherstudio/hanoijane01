import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { bookingManagementData } from "@/data/dashboard/bookingManagementData";
import React from "react";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string | null;
}

const BookingDetailsModal = ({
  isOpen,
  onClose,
  bookingId,
}: BookingDetailsModalProps) => {
  const handleClose = () => {
    onClose();
  };

  const standData = bookingManagementData.find(
    (pkg) => pkg.bookingId === bookingId,
  );

  const colorMap: Record<string, string> = {
    booked: "bg-green-100 border border-green-200 text-green-700",
    reserved: "bg-[#F9EFEA] border border-[#EDCEBF] text-[#C25B29]",
    request: "bg-[#EBF2FD] border border-[#C5D9F7] text-[#2A6BCA]",
    overdue: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
    cancel: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
  };

  // Safely get status
  const status = standData?.status || "";
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="md:w-120 lg:w-150 xl:w-182.5">
        <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-text-primary">
          Booking Details
        </h1>
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

          {/* Stand Name */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Stand Name</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.standNo || "N/A"}
            </p>
          </div>

          {/* Stand Type */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Stand Type</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.standType || "N/A"}
            </p>
          </div>

          {/* Block */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Block</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.block || "N/A"}
            </p>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Price</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              €{standData?.price || 0}
            </p>
          </div>

          {/* Event */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Event</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.event || "N/A"}
            </p>
          </div>

          {/* Exhibitor */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Exhibitor</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.exhibitor || "N/A"}
            </p>
          </div>

          {/* Contact Name */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Contact Name</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.contactName || "N/A"}
            </p>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Email</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.email || "N/A"}
            </p>
          </div>

          {/* Booking Date */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Booking Date</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.bookingDate || "N/A"}
            </p>
          </div>

          {/* Payment Status */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Payment Status</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.paymentStatus || "N/A"}
            </p>
          </div>

          {/* Booking Deadline */}
          <div className="flex justify-between items-center">
            <p className="text-[#4A4C56] font-medium">Booking Deadline</p>
            <p className="text-[#4A4C56] font-semibold text-lg">
              {standData?.bookingDeadline || "N/A"}
            </p>
          </div>
        </div>
        {standData?.status === "request" && (
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
