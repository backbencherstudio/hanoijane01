"use client";

import { Skeleton } from "@/components/ui/skeleton";

const LoginFormSkeleton = () => {
  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-118">
      {/* Header */}
      <div className="text-center">
        <Skeleton className="h-9 w-52 mx-auto" />
        <Skeleton className="h-5 w-72 mx-auto mt-3" />
        <Skeleton className="h-5 w-56 mx-auto mt-2" />
      </div>

      <div className="mt-6 space-y-5">
        {/* Email */}
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Password */}
        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-sm" />
            <Skeleton className="h-4 w-28" />
          </div>

          <Skeleton className="h-4 w-28" />
        </div>

        {/* Sign In Button */}
        <Skeleton className="h-12 w-full rounded-full mt-3" />
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

export default LoginFormSkeleton;
