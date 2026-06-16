import { CalendarDays, MapPin, Users } from "lucide-react";
import { FiGrid } from "react-icons/fi";

const eventCards = [
  {
    icon: CalendarDays,
    title: "March 14–17",
    subtitle: "Event Date",
    description: "2027",
  },
  {
    icon: MapPin,
    title: "Dubai WTC",
    subtitle: "Venue",
    description: "World Trade Centre",
  },
  {
    // icon: Squares,
    icon: FiGrid,
    title: "200+",
    subtitle: "Exhibition Stands",
    description: "Across 4 halls",
  },
  {
    icon: Users,
    title: "March 14–17",
    subtitle: "Event Date",
    description: "2027",
  },
];

export default function EventDetails() {
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
            Industry Expo 2027
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
            The region&apos;s premier B2B exhibition, connecting buyers,
            suppliers, and innovators.
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
                <div className=" top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Icon className="h-5.5 w-5.5 text-white" />
                </div>

                <h3 className="text-[28px] font-bold text-[#1C1F23]">
                  {item.title}
                </h3>

                <p className="mt-2 text-accent">{item.subtitle}</p>

                <p className="mt-2 text-sm text-[#94A3B8]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
