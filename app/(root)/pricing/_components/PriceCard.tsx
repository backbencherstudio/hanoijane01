import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

interface PriceCardProps {
  standPackage: {
    title: string;
    description: string;
    price: number;
    priceLabel: string;
    includes: string[];
  };
}
const PriceCard = ({ standPackage }: PriceCardProps) => {
  return (
    <div className="bg-[#DDE6F3] rounded-xl p-6 flex flex-col justify-between group border border-white hover:border-primary">
      <div>
        <div className="flex items-center gap-2.5">
          <Image src="/icons/lovely.svg" alt="lovely" width={32} height={32} />
          <h2 className="text-2xl font-semibold text-primary">
            {standPackage.title}
          </h2>
        </div>
        <p className="text-sm font-normal text-accent mt-1">
          {standPackage.description}
        </p>
        <p className="text-[40px] font-semibold text-text-primary mt-8">
          ${standPackage.price}
        </p>
        <span className="text-[#4A4C56] font-medium mt-2.5">
          Event (excl. VAT)
        </span>
        <p className="text-lg font-semibold text-[#4A4C56] mt-10">
          {`What's Include:`}
        </p>
        <ul className="mt-4 space-y-4">
          {standPackage.includes.map((item: string, idx: number) => (
            <li className="text-primary flex items-center gap-2" key={idx}>
              <IoCheckmarkCircle size={24} />{" "}
              <span className="text-[#4A4C56] text-sm font-normal">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* button */}
      <div className="mt-6 flex justify-center items-center">
        <Button className="w-full bg-[#DDE6F3] border border-primary  text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
          Reserve This Stand{" "}
        </Button>
      </div>
    </div>
  );
};

export default PriceCard;
