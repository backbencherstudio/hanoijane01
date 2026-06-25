import { Skeleton } from "@/components/ui/skeleton";

export const BookingManagementSkeleton = () => {
  return (
    <div>
      {/* Heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-3" />
        </div>
      </div>

      {/* State cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>

      {/* Table area */}
      <div className="bg-white rounded-2xl px-5 py-4">
        <div className="flex flex-col justify-between items-center lg:items-start gap-4 mb-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex flex-wrap items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-20 rounded-lg" />
            ))}
          </div>
        </div>
        {/* Table skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-full rounded" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};