"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ForgotPasswordFormSkeleton = () => {
  return (
    <div className="w-full rounded-2xl bg-white p-6 md:w-118">
      {/* Header */}
      <div className="text-center">
        <Skeleton className="mx-auto h-9 w-56 rounded-md" />
        <Skeleton className="mx-auto mt-4 h-4 w-full max-w-80 rounded-md" />
        <Skeleton className="mx-auto mt-2 h-4 w-72 rounded-md" />
      </div>

      {/* Form */}
      <div className="mt-6">
        <Skeleton className="h-5 w-32 rounded-md" />

        <Skeleton className="mt-2 h-12 w-full rounded-lg" />

        <Skeleton className="mt-8 h-12 w-full rounded-full" />
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-center gap-2">
        <Skeleton className="h-4 w-40 rounded-md" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </div>
  );
};

export default ForgotPasswordFormSkeleton;