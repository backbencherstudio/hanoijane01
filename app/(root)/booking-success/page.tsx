"use client";
import { Suspense } from "react";
import ReusableSuccessCard from "./_components/ReusableSuccessCard";
import { useSearchParams } from "next/navigation";
import ReusableSuccessCardSkeleton from "./_components/ReusableSuccessCardSkeleton";

const BookingSuccessPage = () => {
  const searchParams = useSearchParams();

  const paymentOption = searchParams.get("payment_option");

  console.log(paymentOption);

  return (
    <Suspense fallback={<ReusableSuccessCardSkeleton />}>
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
    </Suspense>
  );
};

export default BookingSuccessPage;
