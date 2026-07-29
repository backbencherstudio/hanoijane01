import { Skeleton } from "@/components/ui/skeleton";

const StateCardSkeleton = () => {
  return (
    <div className="bg-gray-200 rounded-xl pl-1 animate-pulse">
      <div className="bg-white p-4 rounded-xl flex justify-between">
        <div className="flex-1">
          {/* Title */}
          <Skeleton className="h-4 w-24" />

          {/* Value */}
          <Skeleton className="h-8 w-20 mt-3" />

          {/* Info badge */}
          {/* <Skeleton className="h-6 w-28 rounded-[5px] mt-5" /> */}
        </div>

        {/* Icon */}
        <Skeleton className="w-9 h-9 rounded-md" />
      </div>
    </div>
  );
};

export default StateCardSkeleton;