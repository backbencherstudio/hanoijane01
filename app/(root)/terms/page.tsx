
"use client";

import { sections } from "@/data/termsAndConditions";

const TermsPage = () => {

  return (
    <section className="padding-default">
      <div className=" container px-4 xl:px-0">
        {/* Header */}
        <div className="text-center pb-8 text-3xl md:text-5xl font-bold text-primary space-y-3 mb-12">
          <h1>ITBA EXPO 2027</h1>
          <h2>Exhibitor Terms & Conditions</h2>
        </div>{" "}
        <div className="">
          <p className="text-lg lg:text-xl font-medium text-[#4A4C56]">
            <span className="text-xl lg:text-2xl font-bold text-[#1C1F23]">
              Venue:
            </span>{" "}
            Goffs, Kill, Co. Kildare
          </p>
          <p className="text-lg lg:text-xl font-medium text-[#4A4C56] mt-2.5">
            <span className="text-xl lg:text-2xl font-bold text-[#1C1F23]">
              Dates:
            </span>{" "}
            Friday 8 January & Saturday 9 January 2027
          </p>
          <p className="text-lg lg:text-xl font-medium text-[#4A4C56] mt-6">
            By booking an exhibition stand through the ITBA online booking
            portal, exhibitors agree to the following Terms & Conditions.
          </p>
        </div>
        {/* Content */}
        <div className="py-8 space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="space-y-3">
              <h3 className="md:text-lg lg:text-xl xl:text-2xl font-bold text-[#1C1F23]">
                {section.id}. {section.title}
              </h3>

              <div className="space-y-2 pl-4 text-[#4A4C56] text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-relaxed">
                {section.content.map((item, index) =>
                  Array.isArray(item) ? (
                    <ul key={index} className="list-disc pl-6 space-y-2">
                      {item.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <li key={index} className="">{item}</li>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
