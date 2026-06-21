"use client";

import { Suspense } from "react";
import { usePersistBooking } from "@/hooks/usePersistBooking";
import BookingContent from "./_components/BookingContent";
import BookingSkeleton from "./_components/BookingSkeleton";

export default function BookingPage() {
  usePersistBooking();

  return (
    <Suspense fallback={<BookingSkeleton />}>
      <BookingContent />
    </Suspense>
  );
}
