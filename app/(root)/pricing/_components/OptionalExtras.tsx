import { addOns } from "@/data/addOns";
import React from "react";
import AddOnCard from "./AddOnCard";

const OptionalExtras = () => {
  return (
    <section className="bg-[#f9f8f7] padding-default ">
      <div className="container">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
            ✦ Optional Extras
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
            Enhance Your Stand
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
            Add services to your booking at any time from your Exhibitor
            Dashboard.
          </p>
        </div>
        {/* content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {addOns.map((add) => (
            <AddOnCard key={add.id} add={add} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptionalExtras;
