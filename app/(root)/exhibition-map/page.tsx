import React from "react";

const ExhibitionMapPage = () => {
  return (
    <div>
      {/* banner section */}
      <section className="max-w-380 h-80 md:h-100 lg:h-120 xl:h-133.75 mx-auto rounded-4xl overflow-hidden flex justify-center items-center bg-[url('/assets/exhibition-map-banner.webp')] bg-cover bg-center padding-default relative">
        <div className="bg-black/50 absolute top-0 left-0 w-full h-full contrast-75"></div>
        <div className="container relative  z-10">
          {/* Heading */}
          <div className="flex flex-col items-center mx-auto text-center justify-center max-w-150 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold tracking-tight  leading-8 md:leading-10 lg:leading-12">
              Exhibition Floor Map
            </h2>

            <p className="mx-auto mt-2 lg:mt-4 md:text-lg lg:text-xl font-normal">
              Browse available exhibition stands, select your preferred
              location, complete bookings online, and manage everything from one
              platform.
            </p>
          </div>
        </div>
      </section>
      {/* content section */}
      <section className="bg-[#E5EAEC] padding-default">
        <div className="container">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
              ✦ Interactive Floor Plan
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
              Exhibition Floor Map
            </h2>

            <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
              Hover over any stand to view details. Click to begin booking.
            </p>
          </div>

          {/* footer */}
          <div className="lg:text-lg font-semibold text-primary mt-12 py-5.5 bg-primary/10 w-full text-center rounded-lg border border-primary p-4">
            March 14–17, 2027 · Booking deadline: Jan 30, 2027
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExhibitionMapPage;
