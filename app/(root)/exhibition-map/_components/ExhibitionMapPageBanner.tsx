import React from 'react';

const ExhibitionMapPageBanner= () => {
    return (
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
    );
};

export default ExhibitionMapPageBanner;