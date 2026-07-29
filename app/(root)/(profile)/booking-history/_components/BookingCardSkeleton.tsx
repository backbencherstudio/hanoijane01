import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BookingCardSkeleton = () => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="bg-[#005697] p-5 h-24" />

      {/* Body */}
      <div className="space-y-4 px-5 py-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-36" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-6 flex gap-4 justify-between">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default BookingCardSkeleton;