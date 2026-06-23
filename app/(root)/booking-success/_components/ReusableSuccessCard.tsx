"use client";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ReusableSuccessCard = ({
  title = "",
  subTitle = "",
}: {
  title: string;
  subTitle: string;
}) => {
  const router = useRouter();
  return (
    <div className="lg:w-200 xl:w-225 bg-white p-4 md:p-8 lg:p-10 xl:p-10 rounded-3xl overflow-hidden flex flex-col items-center">
      <Image
        src="/icons/big-check.svg"
        alt="payment"
        width={150}
        height={150}
      />
      <h2 className="text-2xl lg:text-3xl text-[32px] font-semibold text-primary mt-5 text-center">
        {title}
      </h2>
      <p className="lg:text-lg font-normal text-accent mt-3 text-center">
        {subTitle}
      </p>
      <div className="flex flex-col md:flex-row items-center gap-3 mt-8">
        <Button onClick={() => router.push("/")} variant="outline" className="px-8">
          Go To Home
        </Button>
        <ButtonGroup onClick={() => router.push("/booking-history")} className="px-8">Booking History</ButtonGroup>
      </div>
    </div>
  );
};

export default ReusableSuccessCard;
