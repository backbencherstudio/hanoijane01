const ReusableSuccessCardSkeleton = () => {
  return (
    <section className="bg-[#E5EAEC] ">
      <div className="container padding-default flex justify-center items-center min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)]">
        <div className="lg:w-200 xl:w-225 bg-white p-4 md:p-8 lg:p-10 xl:p-10 rounded-3xl overflow-hidden flex flex-col items-center animate-pulse">
          {/* Image skeleton */}
          <div className="w-37.5 h-37.5 rounded-full bg-gray-200" />

          {/* Title skeleton */}
          <div className="h-8 w-60 bg-gray-200 rounded mt-5" />

          {/* Subtitle skeleton */}
          <div className="h-6 w-80 bg-gray-200 rounded mt-3" />

          {/* Buttons skeleton */}
          <div className="flex flex-col md:flex-row items-center justify-center  gap-3 mt-8 w-full">
            <div className="h-12 w-32 bg-gray-200 rounded-full" />
            <div className="flex">
              <div className="h-12 w-32 bg-gray-200 rounded-full" />
              <div className="h-12 w-12 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReusableSuccessCardSkeleton;
