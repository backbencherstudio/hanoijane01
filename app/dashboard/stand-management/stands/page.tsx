import { Suspense } from "react";
import { StandManagementSkeleton } from "./_components/StandManagementSkeleton";
import StandManagementPageContent from "./_components/StandManagementPageContent";

export default function BookingManagementPage() {
  return (
    <Suspense fallback={<StandManagementSkeleton />}>
      <StandManagementPageContent />
    </Suspense>
  );
}
