import React from "react";
import ButtonGroup from "../ui/ButtonGroup";

const ContactCTA = () => {
  return (
    <section className="bg-background padding-default">
      <div className="container bg-[url('/assets/contact_cta.webp')] bg-cover bg-center py-15 lg:py-20 rounded-3xl">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#316BFF] px-4 py-1.5 font-medium text-[#316BFF] mb-4">
            ✦ Platform Features
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-165">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-8 md:leading-10 lg:leading-12">
            Reserve Your Exhibition Space Today
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-[#D2D2D5] font-normal">
            Don&apos;t miss your opportunity to exhibit at the region&apos;s
            premier industry event. Stands are filling up fast, secure your
            space before the booking deadline of January 30, 2027.
          </p>
        </div>
        {/* cta button */}
        <div className="flex justify-center items-center w-full">
          <ButtonGroup pathName="/contact" className="bg-white text-primary mt-12 px-6 hover:bg-gray-100">
            {" "}
            Contact Organizer
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
