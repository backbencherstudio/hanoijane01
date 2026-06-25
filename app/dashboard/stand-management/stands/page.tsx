import { Suspense } from "react";
import StandManagementPageContent from "./_components/StandManagementPageContent";
import { StandManagementSkeleton } from "./_components/StandManagementSkeleton";

export default function BookingManagementPage() {
  return (
    <Suspense fallback={<StandManagementSkeleton />}>
      <StandManagementPageContent />
    </Suspense>
  );
}
