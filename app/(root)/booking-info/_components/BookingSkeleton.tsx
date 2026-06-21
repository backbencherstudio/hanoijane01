import { Skeleton } from "@/components/ui/skeleton";

const BookingSkeleton = () => {
  return (
    <section className="w-full bg-[#E5EAEC]">
      <div className="container padding-default">
        {/* Stepper skeleton */}
        <div className="bg-white rounded-xl px-8 py-4">
          <div className="flex items-center w-full gap-0">
            {[1, 2, 3].map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${index === 2 ? "flex-initial" : "flex-1 min-w-0"}`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton className="size-8 sm:size-10 rounded-full" />
                  <Skeleton className="h-6 w-20 hidden sm:block" />
                </div>
                {index !== 2 && (
                  <Skeleton className="h-px flex-1 mx-1 sm:mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Forms skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          <div className="col-span-full lg:col-span-2">
            <div className="border p-6 bg-white rounded-xl">
              <div className="bg-white rounded-xl">
                <Skeleton className="w-27.5 h-22.5 rounded" />
                <Skeleton className="h-8 w-48 mt-5" />
                <Skeleton className="h-6 w-72 mt-3 pb-6 border-b-2" />

                <div className="mt-6 space-y-6">
                  {/* 6 form fields in a grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className={i >= 5 ? "md:col-span-2" : ""}>
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-10 w-full mt-2" />
                      </div>
                    ))}
                    {/* File upload skeleton */}
                    <div className="col-span-full">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-40 w-full rounded-3xl mt-2" />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-8">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right card skeleton */}
          <div className="border">
            <div className="space-y-4">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="bg-primary p-5">
                  <Skeleton className="h-8 w-32 bg-white/20" />
                  <Skeleton className="h-5 w-20 mt-2 bg-white/20" />
                </div>
                <div className="p-5 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 space-y-4 bg-white rounded-lg">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-px w-full" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSkeleton;