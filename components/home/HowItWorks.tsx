import Image from "next/image";
import React from "react";

type Steps = {
  icon: string;
  title: string;
  subtitle: string;
};

const HowItWorks = () => {
  const steps: Steps[] = [
    {
      icon: "/icons/MagnifyinGlass.svg",
      title: "Browse Available Stands",
      subtitle:
        "Explore the interactive floor plan. Filter by hall, size, and price. View real-time stand availability across all exhibition zones.",
    },
    {
      icon: "/icons/MagnifyinGlass.svg",
      title: "Select Your Stand",
      subtitle:
        "Click any available stand to view full details, dimensions, pricing, location advantages, and neighbouring exhibitors.",
    },
    {
      icon: "/icons/MagnifyinGlass.svg",
      title: "Complete Payment",
      subtitle:
        "Review your booking, upload required documents, and complete your payment securely. Receive instant confirmation via email.",
    },
    {
      icon: "/icons/Peoples.svg",
      title: "Join the Exhibition",
      subtitle:
        "Access your exhibitor dashboard to manage your stand, track setup deadlines, and coordinate with the event team.",
    },
  ];
  return (
    <section className="bg-[#FEFAF5] padding-default">
      <div className="container">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
            ✦ How It Works
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
            Book Your Stand in 4 Simple Steps
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
            From browsing to exhibiting , our streamlined platform handles every
            step of the stand booking process.
          </p>
        </div>
        {/* content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-15 lg:gap-20 mt-12">
          {/* left side */}
          <div className="relative h-125 md:h-280">
            <Image
              src="/assets/how-it-works/how_it_works_1.png"
              className="w-2/3"
              alt="how_it_works"
              width={448}
              height={595}
            />

            <Image
              src="/assets/how-it-works/how_it_works_2.png"
              className="absolute top-50 md:top-120 lg:top-80 xl:top-100 right-0 w-2/3"
              alt="how_it_works"
              width={381}
              height={474}
            />
          </div>
          {/* right side */}
          <div className="space-y-4 md:space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-primary rounded-xl pl-1">
                <div className="rounded-xl bg-[#e5eaec] p-6">
                  <div className=" bg-primary size-16 flex justify-center items-center rounded mb-6 lg:mb-8">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={28}
                      height={28}
                    />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-text-primary mb-2 lg:mb-3">
                    {idx + 1 + 1}.{step.title}
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-accent font-normal">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
