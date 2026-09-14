"use client";

import React, { useEffect } from "react";
import ReusableSuccessCard from "./ReusableSuccessCard";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetBooking } from "@/src/redux/features/bookingSlice";
import { usePersistBooking } from "@/hooks/usePersistBooking";

const BookingSuccessContent = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  usePersistBooking();

  // The booking is complete (paid or reserved) — wipe the local booking
  // state (standId, bookingId, signature, accepted ...) so the same user
  // starts the NEXT booking from a completely clean state. This also makes
  // the sessionStorage snapshot clean, so no stale data is ever restored.
  useEffect(() => {
    dispatch(resetBooking());
  }, [dispatch]);

  const paymentOption = searchParams.get("payment_option");
  return (
    <section className="bg-[#E5EAEC] ">
      <div className="container padding-default flex justify-center items-center min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)]">
        {paymentOption === "now" ? (
          <ReusableSuccessCard
            title="Your Stand is Booking Now!"
            subTitle="Your payment has been successful and booking is confirm"
          />
        ) : (
          <ReusableSuccessCard
            title="Your Stand is Reserved Now!"
            subTitle="Your stand has been reserved. Complete payment later to finalize your booking."
          />
        )}
      </div>
    </section>
  );
};

export default BookingSuccessContent;
