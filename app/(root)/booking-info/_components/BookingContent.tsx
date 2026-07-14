"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingInfo from "./BookingInfo";
import BookingInfoCard from "./BookingInfoCard";
import PaymentForm from "./PaymentForm";

const steps = [
  { id: 1, title: "Booking Info" },
  { id: 2, title: "Payment" },
];

export default function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");

  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const [currentStep, setCurrentStep] = useState(
    steps.some((s) => s.id === initialStep) ? initialStep : 1,
  );

  useEffect(() => {
    const paramStep = searchParams.get("step");
    const currentParam = paramStep ? parseInt(paramStep, 10) : 1;
    if (currentParam !== currentStep) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", String(currentStep));
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [currentStep, searchParams, router]);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <section className="w-full bg-[#E5EAEC]">
      <div className="container padding-default">
        <h5 className="text-[2rem] font-semibold text-primary mb-12">{currentStep === 1?"Company information":"Payment  information"}</h5>
        {/* Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
          <div className="col-span-full lg:col-span-2">
            {currentStep === 1 && <BookingInfo nextStep={nextStep} />}
            {currentStep === 2 && <PaymentForm prevStep={prevStep} />}
            {/* {currentStep === 3 && <AddOnsForm nextStep={nextStep} prevStep={prevStep} />} */}
          </div>
          <div className="border">
            <BookingInfoCard />
          </div>
        </div>
      </div>
    </section>
  );
}
