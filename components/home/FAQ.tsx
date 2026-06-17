import React from "react";
import ButtonGroup from "../ui/ButtonGroup";
import FAQAccordion from "../ui/FAQAccordion";
import { faqData } from "@/data/faqData";

const FAQ = () => {
  return (
    <section className="bg-background padding-default">
      <div className="container">
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
            {/* cta button */}
            <ButtonGroup className="mt-8 px-6 hidden lg:flex">
              View More FAQ
            </ButtonGroup>
          </div>

          {/* content - right side */}
          <div className="col-span-full lg:col-span-3">
            <FAQAccordion faqData={faqData} />
            <div className="w-full flex justify-center items-center">
            <ButtonGroup className="mt-12 px-6 lg:hidden">
              View More FAQ
            </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
