"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";
import { FiGrid } from "react-icons/fi";
import { useGetExhibitionMapQuery } from "@/src/redux/api/exhibition/exhibitionApi";

const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatEventDate = (
  startedAt?: string,
  endedAt?: string,
): React.ReactNode => {
  if (!startedAt || !endedAt) {
    return (
      <>
        Jan 8<sup>th</sup>-9<sup>th</sup> 2027
      </>
    );
  }
  const start = new Date(startedAt);
  const end = new Date(endedAt);

  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const startDay = start.getDate();
  const startSuffix = getOrdinalSuffix(startDay);

  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  const endDay = end.getDate();
  const endSuffix = getOrdinalSuffix(endDay);

  const year = start.getFullYear();

  if (startMonth === endMonth) {
    return (
      <>
        {startMonth} {startDay}
        <sup>{startSuffix}</sup>-{endDay}
        <sup>{endSuffix}</sup> {year}
      </>
    );
  }

  return (
    <>
      {startMonth} {startDay}
      <sup>{startSuffix}</sup> – {endMonth} {endDay}
      <sup>{endSuffix}</sup> {year}
    </>
  );
};

export default function EventDetails() {
  const { data } = useGetExhibitionMapQuery(null);
  const exhibition = data?.data;

  const eventDateTitle = formatEventDate(
    exhibition?.startedAt,
    exhibition?.endedAt,
  );

  const eventCards = [
    {
      icon: CalendarDays,
      title: eventDateTitle,
      subtitle: "Event Date",
    },
    {
      icon: MapPin,
      title: exhibition?.location || "Goffs, Kildare",
      subtitle: "Venue",
    },
    {
      // icon: Squares,
      icon: FiGrid,
      title: "90+",
      subtitle: "Exhibition Stands",
      description: "Across 4 halls",
    },
    {
      icon: Users,
      title: "The Irish Field",
      subtitle: "Supported By",
      description: "2027",
    },
  ];
  return (
    <section className="bg-background padding-default">
      <div className="container">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
            ✦ Event Details
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            ITBA Expo 2027
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
            Where the thoroughbred and equine industry connects, interacts and
            innovates
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {eventCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="relative rounded-xl border border-primary bg-white py-5 text-center shadow-sm flex flex-col justify-center items-center"
              >
                {/* Icon */}
                <div className=" top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-4">
                  <Icon className="h-5.5 w-5.5 text-white" />
                </div>

                <h3 className="text-[28px] font-bold text-[#1C1F23]">
                  {item.title}
                </h3>

                <p className="mt-1 text-accent">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
