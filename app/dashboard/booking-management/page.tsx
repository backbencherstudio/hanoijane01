import { Suspense } from "react";
import { BookingManagementSkeleton } from "./_components/BookingManagementSkeleton";
import BookingManagementPageContent from "./_components/BookingManagementPageContent";

export default function BookingManagementPage() {
  return (
    <Suspense fallback={<BookingManagementSkeleton />}>
      <BookingManagementPageContent />
    </Suspense>
  );
}
