"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import StandCard from "./StandCard";
import type { Hall, HallStandCategory } from "@/types/stand";
import { truncateWords } from "@/lib/utils";

// ── Slug-based colour map ──────────────────────────────────────────────
// Derived from the original hardcoded scheme, now keyed by the API slug.
const slugStyleMap: Record<
  string,
  { name: string; color: string; standColor: string; shape?: string }
> = {
  // Goffs Complex
  "goffs-complex-standard-size": {
    name: "Standard Size",
    color: "#879953",
    standColor: "#EEF1E3",
  },
  "goffs-complex-premium-6x2": {
    name: "Premium Size (6m x 2m, rectangle)",
    color: "#C69A67",
    standColor: "#F8F2EC",
    shape: "Rectangle",
  },
  "goffs-complex-premium-4x2": {
    name: "Premium Size (4m x 2m, rectangle)",
    color: "#CC1F2F",
    standColor: "#F9E8EA",
    shape: "Rectangle",
  },
  "goffs-complex-premium-4x3.5": {
    name: "Premium Size (4m x 3.5m, corner)",
    color: "#7A45A4",
    standColor: "#EDE3F5",
    shape: "Corner",
  },
  "goffs-complex-small-size": {
    name: "Small Size",
    color: "#2EA7DF",
    standColor: "#E3F2FB",
    shape: "Corner",
  },

  // Marquee
  "marquee-standard-size": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
  "marquee-premium-3x3": {
    name: "Premium Size (3m x 3m, corner)",
    color: "#2138A5",
    standColor: "#E8EBFB",
    shape: "Corner",
  },
  "marquee-premium-3x4": {
    name: "Premium Size (3m x 4m, square)",
    color: "#F23491",
    standColor: "#FDE8F3",
    shape: "Square",
  },
  "marquee-premium-5x2": {
    name: "Premium Size (5m x 2m, rectangle)",
    color: "#FF5722",
    standColor: "#FFECE4",
    shape: "Rectangle",
  },
  "marquee-premium-4x3": {
    name: "Premium Size (4m x 3m, corner)",
    color: "#26B5A8",
    standColor: "#E2F7F5",
    shape: "Corner",
  },

  // Outdoor
  "outdoor-standard-size": {
    name: "Standard Size",
    color: "#E39A2F",
    standColor: "#FDF3E7",
  },
};

// ── Helper: map an API category to the StandCard shape ─────────────────
function toStandCardItem(category: HallStandCategory, index: number) {
  const meta = slugStyleMap[category.slug] ?? {
    name: category.title,
    color: "#999999",
    standColor: "#F0F0F0",
  };

  const stands = category.stands.map((s) => s.standNumber).join(", ");

  return {
    id: index + 1,
    name: truncateWords(category.title, 2),
    color: meta.color,
    standColor: meta.standColor,
    shape: meta.shape,
    size: category.size,
    price: category.totalPrice,
    stands,
  };
}

interface StandCategoryAccordionProps {
  halls: Hall[] | undefined;
}

const StandCategoryAccordion = ({ halls }: StandCategoryAccordionProps) => {
  if (!halls || halls.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={halls[0].title}
      className="space-y-2"
    >
      {halls.map((hall) => (
        <AccordionItem
          key={hall.title}
          value={hall.title}
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
            {hall.title} ({hall.totalStands})
          </AccordionTrigger>

          <AccordionContent className="space-y-1.5 pt-1.5 pb-0">
            {hall.standCategories.map((cat, i) => (
              <StandCard key={cat.slug} stand={toStandCardItem(cat, i)} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StandCategoryAccordion;