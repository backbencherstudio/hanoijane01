import React from "react";

const ExhibitionMapPageHeadline = () => {
  return (
    <div>
      {/* Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
          ✦ Interactive Floor Plan
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
          ITBA Expo Floor Map
        </h2>

        <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
          Hover over any stand to view details. Click to begin booking.
        </p>
      </div>
    </div>
  );
};

export default ExhibitionMapPageHeadline;
