import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ResetPasswordFormSkeleton = () => {
    return (
        <div className="w-full rounded-2xl bg-white p-6 md:w-118">
            <div className="text-center">
              <Skeleton className="mx-auto h-9 w-52 rounded-md" />
              <Skeleton className="mx-auto mt-4 h-4 w-full max-w-80 rounded-md" />
              <Skeleton className="mx-auto mt-2 h-4 w-72 rounded-md" />
            </div>
            <div className="mt-8 space-y-5">
              <div className="flex flex-col items-center">
                <Skeleton className="h-5 w-36 rounded-md" />
                <Skeleton className="mt-4 h-10 w-56 rounded-md" />
              </div>
              <div>
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="mt-2 h-12 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="mt-2 h-12 w-full rounded-lg" />
              </div>
            </div>
            <Skeleton className="mt-8 h-12 w-full rounded-full" />
            <div className="mt-6 flex justify-center gap-2">
              <Skeleton className="h-4 w-48 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          </div>
    );
};

export default ResetPasswordFormSkeleton;