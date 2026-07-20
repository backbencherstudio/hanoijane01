"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import StandCard from "./StandCard";
import { standManagementData } from "@/data/exhibition-map/standManagementData";

const typeMetaMap: Record<
  string,
  { name: string; color: string; standColor: string; shape?: string }
> = {
  // Goff Complex
  "goff-standard": {
    name: "Standard Size",
    color: "#879953",
    standColor: "#EEF1E3",
  },
  "goff-premium-1": {
    name: "Premium 1 Size",
    color: "#C69A67",
    standColor: "#F8F2EC",
    shape: "Rectangle",
  },
  "goff-premium-2": {
    name: "Premium 2 Size",
    color: "#CC1F2F",
    standColor: "#F9E8EA",
    shape: "Rectangle",
  },
  "goff-premium-3": {
    name: "Premium 3 Size",
    color: "#7A45A4",
    standColor: "#EDE3F5",
    shape: "Corner",
  },
  "goff-small": {
    name: "Small Size",
    color: "#2EA7DF",
    standColor: "#E3F2FB",
    shape: "Corner",
  },

  // Marquee
  "marquee-standard": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
  "marquee-premium-a": {
    name: "Premium A Size",
    color: "#2138A5",
    standColor: "#E8EBFB",
    shape: "Corner",
  },
  "marquee-premium-b": {
    name: "Premium B Size",
    color: "#F23491",
    standColor: "#FDE8F3",
    shape: "Square",
  },
  "marquee-premium-c": {
    name: "Premium C Size",
    color: "#FF5722",
    standColor: "#FFECE4",
    shape: "Rectangle",
  },
  "marquee-premium-d": {
    name: "Premium D Size",
    color: "#26B5A8",
    standColor: "#E2F7F5",
    shape: "Corner",
  },

  // Outdoor
  "outdoor-1": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
  "outdoor-2": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
  "outdoor-3": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
  "outdoor-4": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
  "outdoor-5": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
  "outdoor-6": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
};

const StandCategoryAccordion = () => {
  const accordionData = Object.entries(
    Object.groupBy(standManagementData, (s) => s.category)
  ).map(([category, stands], index) => {
    const types = Object.entries(
      Object.groupBy(stands!, (s) => s.standTypeKey)
    ).map(([key, items], i) => {
      const meta = typeMetaMap[key];
      return {
        id: i + 1,
        name: meta?.name ?? key,
        color: meta?.color ?? "#999999",
        standColor: meta?.standColor ?? "#F0F0F0",
        shape: meta?.shape,
        size: items![0].size,
        price: items![0].price,
        stands: items!.map((s) => s.stand_no).join(", "),
      };
    });

    return {
      id: index + 1,
      title: category,
      count: stands!.length,
      types,
    };
  });

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={accordionData[0].title}
      className="space-y-2"
    >
      {accordionData.map((category) => (
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
              <StandCard key={item.id} stand={item} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StandCategoryAccordion;