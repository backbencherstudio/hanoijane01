"use client";
import React, { useState } from "react";
import BookingCancelModal from "./_components/BookingCancelModal";
import BookingCancelSuccessModal from "./_components/BookingCancelSuccessModal";
import BookingCard from "./_components/BookingCard";

export const standBookings = [
  {
    id: "A03",
    standName: "Stand A03",
    standCategory: "Goff Complex",
    standLabel: "Block A Standard Stand",
    status: "Booked",
    type: "Premium 1 Size",
    size: "(3m × 3m)",
    area: "Rectangle",
    price: 3000,
    event: "ITBA EXPO The NEXT 100",
    date: "14-16 March 2027",
    canAddOn: true,
  },
  {
    id: "B12",
    standName: "Stand B12",
    standCategory: "Goff Complex",
    standLabel: "Block B Premium Stand",
    status: "Booked",
    type: "Premium 1 Size",
    size: "(6m × 3m)",
    area: "Corner",
    price: 2000,
    event: "ITBA EXPO The NEXT 100",
    date: "14-16 March 2027",
    canAddOn: true,
    paymentDeadline: "31 January 2027",
  },
];

const BookingHistoryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
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
      <div className="bg-primary/5 p-2 md:p-5 rounded-xl mt-6 space-y-6">
        <p className="px-4 py-5.5 bg-primary text-white font-semibold text-lg flex justify-center items-center rounded-lg">
          March 14–17, 2027 · Booking deadline: Jan 30, 2027{" "}
        </p>
      </div>
      {/* cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {standBookings.map((stand) => (
          <BookingCard
            key={stand.id}
            stand={stand}
            onCancel={() => setIsOpen(true)}
            onViewMap={() => {
              console.log("View map:", stand.id);
            }}
          />
        ))}
      </div>
      

      <BookingCancelModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultStand="A05"
        defaultStatus="Booked"
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
