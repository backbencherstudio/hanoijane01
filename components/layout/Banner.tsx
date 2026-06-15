import React from "react";
import ButtonGroup from "../ui/ButtonGroup";

const Banner = () => {
  const stats = [
    { title: "Stands", value: 200 },
    { title: "Visitors", value: 100 },
    { title: "Companies", value: 200 },
  ];

  return (
    <section className="max-w-380 mx-auto relative">
      <div className="relative h-120 xl:h-183.75 rounded-[32px] w-full overflow-hidden border">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/assets/banner.jpg')] bg-cover bg-center" />

        {/* Oval-shaped radial gradient shadow (centered, soft edge) */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative md:max-w-4/5 lg:max-w-3/5 xl:max-w-195 mx-auto z-10 text-white px-4 text-center flex-1 flex flex-col justify-center items-center h-full">
          <p className="text-[10px] md:text-base xl:text-lg font-bold mb-4 lg:mb-6">
            ITBA Expo 2027 · Supported by The Irish Field
          </p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-[56px] font-bold mb-4">
            Secure Your Exhibition Stand for Industry Expo
          </h1>
          <p className="text-xs lg:text-lg xl:text-xl mb-5 lg:mb-10">
            Browse available exhibition stands, select your preferred location,
            complete bookings online, and manage everything from one platform.
          </p>
          <ButtonGroup>View Floor Map</ButtonGroup>
        </div>
      </div>

      <div className="h-8 md:h-15 lg:h-18 xl:h-22.5"></div>

      {/* Stats box */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-85 md:w-150 lg:w-200 xl:w-300 h-20 md:h-30 lg:h-35 xl:h-45 bg-[url('/assets/texture.webp')] bg-cover bg-center bg-no-repeat rounded-[24px] flex justify-around items-center">
        {stats.map((stat) => (
          <div key={stat.title}>
            <p className="text-sm md:text-xl xl:text-2xl font-bold text-primary flex flex-col lg:flex-row items-center lg:gap-2">
              <span className="text-base md:text-[40px] lg:text-[50px] xl:text-[64px] text-[#D79930] font-bold">
                {stat.value}+
              </span>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
