import React from "react";
import ReusableSuccessCard from "./ReusableSuccessCard";
import { useSearchParams } from "next/navigation";

const BookingSuccessContent = () => {
  const searchParams = useSearchParams();

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
