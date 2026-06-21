"use client";
import { Suspense } from "react";
import ReusableSuccessCardSkeleton from "./_components/ReusableSuccessCardSkeleton";
import BookingSuccessContent from "./_components/BookingSuccessContent";

const BookingSuccessPage = () => {
  return (
    <Suspense fallback={<ReusableSuccessCardSkeleton />}>
      <BookingSuccessContent />
    </Suspense>
  );
};

export default BookingSuccessPage;
