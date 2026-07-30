"use client";

import { Skeleton } from "@/components/ui/skeleton";

const RegisterFormSkeleton = () => {
  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-120 lg:w-150 xl:w-183.25 lg:pb-4">
      {/* Header */}
      <div className="text-center">
        <Skeleton className="h-9 w-64 mx-auto" />
        <Skeleton className="h-5 w-72 mx-auto mt-3" />
        <Skeleton className="h-5 w-56 mx-auto mt-2" />
      </div>

      <div className="my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              {/* Label */}
              <Skeleton className="h-5 w-32 mb-2" />

              {/* Input */}
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center items-center w-full">
        <Skeleton className="h-12 w-full rounded-full" />
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

export default RegisterFormSkeleton;