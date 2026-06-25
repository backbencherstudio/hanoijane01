import { Suspense } from "react";
import PaymentTrackingPageContent from "./_components/PaymentTrackingPageContent";
import { PaymentTrackingSkeleton } from "./_components/PaymentTrackingSkeleton";

export default function BookingManagementPage() {
  return (
    <Suspense fallback={<PaymentTrackingSkeleton />}>
      <PaymentTrackingPageContent />
    </Suspense>
  );
}
