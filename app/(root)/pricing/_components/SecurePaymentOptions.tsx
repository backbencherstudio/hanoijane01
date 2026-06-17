import { Info } from "lucide-react";
import Image from "next/image";
import React from "react";

const paymentOptions = [
  {
    icon: "/icons/addOns/payment.svg",
    title: "Full Payment",
    description:
      "Pay the full stand fee upfront and receive a 5% early-payment discount on your booking.",
    info: "Pay the full stand fee upfront and receive a 5% early-payment discount on your booking.",
  },
  {
    icon: "/icons/addOns/payment.svg",
    title: "Payment Later",
    description:
      "50% deposit to confirm your booking. Remaining balance due 60 days before the event date.",
    info: "Booking confirmed immediately upon deposit.",
  },
];

const SecurePaymentOptions = () => {
  return (
    <section className="bg-[#F5F5FD] padding-default ">
      <div className="container">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
            ✦ Secure Payment Options
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
            Flexible Ways to Pay
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
            All payments processed securely. PCI-compliant. Bank transfer or
            card accepted.
          </p>
        </div>
        {/* content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {paymentOptions.map((paymentOption, idx) => (
          <div
            key={idx}
            className="bg-primary/10 px-4 py-5 rounded-xl border border-gray-300 hover:border-primary transition-all duration-200"
          >
            <div className="bg-primary size-11 rounded-lg flex justify-center items-center">
              <Image
                src={paymentOption.icon}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-semibold text-text-primary py-4 border-b border-gray-300">
                {paymentOption.title}
              </h4>
              <p className="font-medium text-[#4A4C56] py-4">
                {paymentOption.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary bg-black/10 p-2 rounded-lg">
              <Info size={14} />
              <p className="text-sm ">{paymentOption.info}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default SecurePaymentOptions;
