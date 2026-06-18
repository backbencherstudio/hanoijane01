import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { addOns } from "@/data/addOns";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
interface AddOnsProps {
  nextStep: () => void;
  prevStep: () => void;
}
const AddOnsForm = ({ nextStep, prevStep }: AddOnsProps) => {
  return (
    <div>
      <div className="lg:col-span-2 border p-6 bg-white rounded-xl">
        <div className="bg-white rounded-xl">
          <Image src="/logo.webp" alt="logo" width={110} height={90} />
          <h2 className="text-[32px] font-semibold text-primary mt-5">
            Optional Add-ons
          </h2>
          <p className="lg:text-lg font-normal text-[#4A4C56] mt-3 pb-6 border-b-2">
            Enhance your stand. All add-ons can also be purchased later from
            your dashboard.
          </p>
          <div className="mt-6">
            <div className="space-y-5">
              {addOns.map((add, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-5 border border-gray-300 rounded-xl"
                  >
                    <div className="flex items-center">
                <input type="checkbox" className="size-6 cursor-pointer" />
                      <div className="bg-primary size-11 rounded-lg flex justify-center items-center ml-3">
                        <Image
                          src={add.icon}
                          alt="icon"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="ml-5">
                        <h2 className="text-xl lg:text-2xl text-text-primary font-semibold mb-1">
                          {add.name}
                        </h2>
                        <h2 className="lg:text-lg text-[#777980]">
                          {add.description}
                        </h2>
                      </div>
                    </div>
                    <div className="space-y-1 flex flex-col items-end ">
                      <p className="text-xl lg:text-2xl font-semibold text-text-primary ">
                        ${add.price}/{add.unit}
                      </p>
                      <div className="flex w-fit border border-gray-300 rounded-md items-center overflow-hidden justify-between">
                        <button className="hover:bg-gray-100 p-2 cursor-pointer">
                          <Plus />
                        </button>
                        <p className="px-2">1</p>
                        <button className="hover:bg-gray-100 p-2 cursor-pointer">
                          <Minus />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-6">
              <Button onClick={prevStep} className="px-8" variant="outline">
                Back
              </Button>
              <ButtonGroup onClick={nextStep} type="submit" className="px-12.5">
                Next
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnsForm;
