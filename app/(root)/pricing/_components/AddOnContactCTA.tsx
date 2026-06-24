import ButtonGroup from "@/components/ui/ButtonGroup";
import { Mail, Phone } from "lucide-react";
import React from "react";

const AddOnContactCTA = () => {
  return (
    <section className="bg-background padding-default-top">
      <div className="container bg-[url('/assets/contact_cta.webp')] bg-cover bg-center p-15 lg:p-20 rounded-3xl">
        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-165">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-8 md:leading-10 lg:leading-12">
            Enhance Your Stand
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-[#D2D2D5] font-normal">
            Please Contact Higgins Furniture Hire
          </p>
        </div>
        {/* contact info */}
        <div className="mt-6 flex flex-col md:flex-row gap-5 justify-center items-center">
          <div className="bg-[#1f4468] rounded-xl min-w-62">
            <div className="p-5 flex gap-4 text-white ">
              <div className="bg-white text-primary p-2 rounded-full w-fit h-fit shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <h4 className="text-xl font-medium">Email:</h4>
                <p className="font-medium mt-2">hire@higgins.ie</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1f4468] rounded-xl min-w-62">
            <div className="p-5 flex gap-4 text-white ">
              <div className="bg-white text-primary p-2 rounded-full w-fit h-fit shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <h4 className="text-xl font-medium">Tel:</h4>
                <p className="font-medium mt-2">045 526300</p>
              </div>
            </div>
          </div>
        </div>
        {/* cta button */}
        <div className="flex justify-center items-center w-full">
          <ButtonGroup className="bg-white text-primary mt-12 px-6 hover:bg-gray-100">
            Download Form
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};

export default AddOnContactCTA;
