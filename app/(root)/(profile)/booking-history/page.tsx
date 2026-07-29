"use client";
import React, { useState } from "react";
import BookingCancelModal from "./_components/BookingCancelModal";
import BookingCancelSuccessModal from "./_components/BookingCancelSuccessModal";
import BookingCard from "./_components/BookingCard";
import { useRouter } from "next/navigation";
import { useGetUserBookingQuery } from "@/src/redux/api/booking/bookingApi";
import { UserBooking } from "@/types/booking.types";
import Pagination from "@/components/ui/Pagination";
import SkeletonWrapper from "@/components/ui/SkeletonWrapper";
import BookingCardSkeleton from "./_components/BookingCardSkeleton";
import EventStartEnd from "@/components/exhibition-map/EventStartEnd";

const ITEMS_PER_PAGE = 4;

const BookingHistoryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(
    null,
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(ITEMS_PER_PAGE);

  const { data, isLoading, isError } = useGetUserBookingQuery({ page, limit });
  const bookings = data?.data ?? [];
  const meta = data?.meta_data;

  const handleCancel = (booking: UserBooking) => {
    setSelectedBooking(booking);
    setIsOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="bg-white md:p-4 rounded-xl">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-[32px] text-primary font-semibold flex items-center">
          Personal Information
        </h1>
        <p className="lg:text-lg text-accent mt-2 lg:mt-3 pb-6 border-b-2">
          Mange your Bookings
        </p>
      </div>
      <div
        id="scroll-to-top"
        className="bg-primary/5 p-2 md:p-5 rounded-xl mt-6 space-y-6 scroll-to-top"
      >
        <div className="px-4 py-5.5 bg-primary text-white font-semibold text-lg flex justify-center items-center rounded-lg">
          <EventStartEnd/>
        </div>
      </div>

      {/* cards */}
      {isLoading ? (
        <SkeletonWrapper
          skeletonItem={<BookingCardSkeleton />}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
          quantity={4}
        />
      ) : isError ? (
        <div className="mt-6 p-5 text-center bg-red-50 border border-red-200 rounded-lg text-red-600">
          Failed to load bookings. Please try again.
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-6 p-5 text-center bg-gray-50 border border-gray-200 rounded-lg text-accent">
          No bookings found.
        </div>
      ) : (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 mt-6">
          {bookings.map((stand) => (
            <BookingCard
              key={stand.id}
              stand={stand}
              onCancel={() => handleCancel(stand)}
              onViewMap={() => {
                router.push("/exhibition-map");
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            totalItems={meta.totalItems}
            itemsPerPage={meta.itemsPerPage}
            itemsPerPageOptions={[4, 8, 12]}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            scrollOnChange
            scrollTargetId="scroll-to-top"
          />
        </div>
      )}

      <BookingCancelModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultStand={selectedBooking?.standTitle ?? ""}
        defaultStatus={selectedBooking?.status ?? ""}
        onSubmit={(data) => {
          console.log("Cancellation data:", data);
          // Handle cancellation
          setCancelOpen(true);
        }}
      />
      <BookingCancelSuccessModal
        isOpen={cancelOpen}
        onClose={() => setCancelOpen(false)}
      />
    </div>
  );
};

export default BookingHistoryPage;
