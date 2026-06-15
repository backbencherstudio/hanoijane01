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
      <div className="relative h-183.75 rounded-[32px] w-full overflow-hidden">
        <Image
          src="/assets/banner.jpg"
          alt="banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="h-22.5"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-300 h-45 bg-[url('/assets/texture.webp')] bg-cover bg-center bg-no-repeat rounded-[24px] flex justify-around items-center">
        {stats.map((stat) => (
          <div key={stat.title}>
            <p className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-[64px] text-[#D79930] font-bold">
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
