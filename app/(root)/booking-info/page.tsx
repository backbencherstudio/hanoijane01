"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingInfo from "./_components/BookingInfo";
import BookingInfoCard from "./_components/BookingInfoCard";
import AddOnsForm from "./_components/AddOnsForm";
import PaymentForm from "./_components/PaymentForm";

const steps = [
  { id: 1, title: "Booking Info" },
  { id: 2, title: "Adds On" },
  { id: 3, title: "Payment" },
];

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");

  // Initialize currentStep from URL or default to 1
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const [currentStep, setCurrentStep] = useState(
    steps.some((s) => s.id === initialStep) ? initialStep : 1,
  );

  // Sync URL with current step (only if it changed)
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
        {/* Stepper */}
        <div className="bg-white rounded-xl px-8 py-4">
          <div className="flex items-center w-full gap-0">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.id}
                  className={`
                    flex items-center
                    ${isLast ? "flex-initial" : "flex-1 min-w-0"}
                  `}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Step Circle */}
                    <div
                      className={`
                        size-8 sm:size-10 rounded-full flex items-center justify-center
                        font-semibold transition-all shrink-0 text-sm sm:text-base
                        ${
                          isActive || isCompleted
                            ? "bg-[#D89B29] text-white"
                            : "bg-[#E8DDCB] text-[#8E8E93]"
                        }
                      `}
                    >
                      {step.id}
                    </div>

                    {/* Step Title (hidden on mobile) */}
                    <h3
                      className={`
                        text-base sm:text-xl font-medium truncate hidden sm:block
                        ${isActive || isCompleted ? "text-primary" : "text-[#8E8E93]"}
                      `}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Connector Line – only if NOT the last step */}
                  {!isLast && (
                    <div
                      className={`
                        h-px flex-1 mx-1 sm:mx-2
                        ${currentStep > step.id ? "bg-[#D89B29]" : "bg-[#D9D9D9]"}
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          <div className="col-span-full lg:col-span-2">
            {currentStep === 1 && <BookingInfo nextStep={nextStep} />}

            {currentStep === 2 && (
              <AddOnsForm nextStep={nextStep} prevStep={prevStep} />
            )}

            {currentStep === 3 && <PaymentForm prevStep={prevStep} />}
          </div>
          <div className="border">
            <BookingInfoCard />
          </div>
        </div>
      </div>
    </section>
  );
}
