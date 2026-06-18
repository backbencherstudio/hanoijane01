"use client";

import { useState } from "react";
import BookingInfo from "./_components/BookingInfo";

const steps = [
  {
    id: 1,
    title: "Booking Info",
  },
  {
    id: 2,
    title: "Adds On",
  },
  {
    id: 3,
    title: "Payment",
  },
];

function BookingInfoForm({ nextStep }: { nextStep: () => void }) {
  return (
    <div>
      Booking Info Form
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

function AddOnsForm({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div>
      Add Ons Form
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

function PaymentForm({ prevStep }: { prevStep: () => void }) {
  return (
    <div>
      Payment Form
      <button onClick={prevStep}>Back</button>
    </div>
  );
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

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
        <div className="mt-10">
          {currentStep === 1 && <BookingInfo nextStep={nextStep} />}

          {currentStep === 2 && (
            <AddOnsForm nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 3 && <PaymentForm prevStep={prevStep} />}
        </div>
      </div>
    </section>
  );
}
