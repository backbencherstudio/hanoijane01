import Image from "next/image";
import React from "react";

const Banner = () => {
  const stats = [
    { title: "Stands", value: 200 },
    { title: "Visitors", value: 100 },
    { title: "Companies", value: 200 },
  ];
  return (
    <section className="max-w-380 mx-auto relative">
      <div className="relative h-120 xl:h-183.75 rounded-[32px] w-full overflow-hidden">
        <Image
          src="/assets/banner.jpg"
          alt="banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="h-8 sm:h-10 md:h-15 lg:h-18  xl:h-22.5"></div>

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
