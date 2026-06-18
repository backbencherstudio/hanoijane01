// app/booking/_components/PaymentForm.tsx
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/src/redux/store";

interface PaymentFormProps {
  prevStep: () => void;
}

const PaymentForm = ({ prevStep }: PaymentFormProps) => {
  const bookingInfo = useSelector(
    (state: RootState) => state.booking.bookingInfo,
  );
  const { stand, addOns } = useSelector((state: RootState) => state.booking);

  // Compute totals (or reuse selectors)
  // ...

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-3xl font-semibold text-primary">Payment Summary</h2>

      {/* Display booking info */}
      <div className="mt-6 space-y-3 border-b pb-4">
        <h3 className="font-semibold text-lg">Booking Details</h3>
        <p>
          <strong>Company:</strong> {bookingInfo.companyName}
        </p>
        <p>
          <strong>Contact:</strong> {bookingInfo.contactName}
        </p>
        <p>
          <strong>Email:</strong> {bookingInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {bookingInfo.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {bookingInfo.companyAddress}
        </p>
      </div>

      {/* Stand and add-ons summary (reuse from BookingInfoCard) */}
      {/* ... */}

      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline" className="px-8">
          Back
        </Button>
        <Button className="px-8 bg-primary text-white">Pay Now</Button>
      </div>
    </div>
  );
};

export default PaymentForm;
