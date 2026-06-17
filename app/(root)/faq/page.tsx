import FAQAccordion from "@/components/ui/FAQAccordion";
import { faqData } from "@/data/faqData";
import React from "react";

const FAQPage = () => {
  return (
    <div>
      <section className="max-w-380 h-80 md:h-100 lg:h-120 xl:h-133.75 mx-auto rounded-4xl overflow-hidden flex justify-center items-center bg-[url('/assets/faq.webp')] bg-cover bg-center padding-default relative">
        <div className="bg-black/50 absolute top-0 left-0 w-full h-full contrast-75"></div>
        <div className="container relative  z-10">
          {/* Heading */}
          <div className="flex flex-col items-center mx-auto text-center justify-center max-w-150 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold tracking-tight  leading-8 md:leading-10 lg:leading-16">
              How can we help you?
            </h2>

            <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-xl font-normal text-[#F9F9FF]">
              Welcome to our Help Center! Here, you&apos;ll find answers to
              frequently asked questions, helpful guides, and useful tips to
              assist you in getting the most out of our platform.
            </p>
          </div>
        </div>
      </section>
      {/* content */}
      <div className="container padding-default">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-15">
          {/* left side */}
          <div className="col-span-full lg:col-span-2 ">
            {/* Badge */}
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium border border-[#C25B29] text-[#C25B29] mb-4">
                ✦ FAQ
              </div>
            </div>

            {/* Heading */}
            <div className="">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
                Frequently Asked Questions
              </h2>

              <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
                Everything you need to know about exhibiting at Industry Expo
                2027. Can&apos;t find the answer you&apos;re looking for?
              </p>
            </div>
          </div>

          {/* content - right side */}
          <div className="col-span-full lg:col-span-3">
            <FAQAccordion faqData={faqData} />
            <div className="w-full flex justify-center items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
