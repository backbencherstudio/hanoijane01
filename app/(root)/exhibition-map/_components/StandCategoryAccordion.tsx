"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import StandCard from "./StandCard";
import { standCategories } from "@/data/exhibition-map/standCategories";

const StandCategoryAccordion = () => {
  return (
    <Accordion
  type="single"
  collapsible
  defaultValue={standCategories[0].title}
  className="space-y-2"
>
  {standCategories.map((category) => (
    <AccordionItem
      key={category.id}
      value={category.title}
      className="border-none"
    >
      <AccordionTrigger
        className="
          h-14.5
          rounded-[10px]
          border
          border-[#D8DEE6]
          bg-[#F4F8FC]
          px-4
          py-0
          flex
          items-center
          cursor-pointer
          font-medium
          text-[#4A4C56]
          hover:no-underline
          [&>svg]:size-5
          [&>svg]:text-[#1F2A44]
        "
      >
        {category.title} ({category.count})
      </AccordionTrigger>

      <AccordionContent className="space-y-1.5 pt-1.5 pb-0">
        {category.types.map((item) => (
          <StandCard
            key={item.id}
            stand={item}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
  );
};

export default StandCategoryAccordion;