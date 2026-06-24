"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BookingCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingCancelSuccessModal = ({
  isOpen,
  onClose,
}: BookingCancelModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className=" bg-white px-4 md:px-8 lg:px-10 xl:px-10 rounded-3xl overflow-hidden flex flex-col items-center">
        <Image
          src="/icons/big-check.svg"
          alt="payment"
          width={150}
          height={150}
          className="w-25 lg:w-37.5"
        />
        <h2 className="text-2xl lg:text-3xl xl:text-[32px] font-semibold text-primary mt-5 text-center">
          Booking Cancel Request submit
        </h2>
        <p className="text-sm lg:text-lg font-normal text-accent mt-3 text-center">
          Your payment has been successful and booking is confirm
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 mt-8">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="px-8"
          >
            Go To Home
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingCancelSuccessModal;
