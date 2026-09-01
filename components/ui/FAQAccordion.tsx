"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqData: FAQItem[];
}

export default function FAQAccordion({ faqData }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(2);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {faqData.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-lg transition-all duration-300 ${
              isOpen ? "bg-primary text-white" : "bg-[#F1F6FF] text-text-primary"
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between px-6 py-6 text-left cursor-pointer"
            >
              <h3 className="text-xl font-bold">{item.question}</h3>

              {isOpen ? (
                <Minus className="size-7 shrink-0" />
              ) : (
                <Plus className="size-7 shrink-0" />
              )}
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-lg leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
