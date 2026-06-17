import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AddOnCardProps {
  add: {
    icon: string;
    title: string;
    description: string;
    price: number;
    unit: string;
  };
}

const AddOnCard = ({ add }: AddOnCardProps) => {
  return (
    <div className="bg-white px-4 py-5 rounded-xl flex  gap-4 border border-white hover:border-primary transition-all duration-200">
      <div className="bg-primary size-11 rounded-lg flex justify-center items-center">
        <Image src={add.icon} alt="icon" width={20} height={20} />
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-text-primary">{add.title}</h4>
        <p className="font-medium text-[#4A4C56]">{add.description}</p>
        <div className="mt-5 w-full flex justify-between items-center">
          <p className="text-lg font-semibold text-text-primary">
            +${add.price}/{add.unit}
          </p>
          <Button variant="outline" className="text-primary hover:text-primary h-9">
            Add <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddOnCard;
