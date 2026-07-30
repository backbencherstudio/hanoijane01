import { Suspense } from "react";
import { StandManagementSkeleton } from "./_components/StandManagementSkeleton";
import StandManagementPageContent from "./_components/StandManagementPageContent";

export default function StandManagementPage() {
  return (
    <Suspense fallback={<StandManagementSkeleton />}>
      <StandManagementPageContent />
    </Suspense>
  );
}
