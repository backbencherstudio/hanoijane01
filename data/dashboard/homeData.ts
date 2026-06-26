import { CalendarCheck, Grid3x3, LucideIcon } from "lucide-react";
export interface StateData {
  title: string;
  value: number;
  info: string;
  icon: LucideIcon;
  bg_color: string;
  bg_color2: string;
  text_color: string;
  text_bg_color: string;
  border: string;
}

export const stateData: StateData[] = [
  {
    title: "Total Stand",
    value: 5.715,
    info: `12 available`,
    icon: Grid3x3,
    bg_color: "bg-[#199AFB]",
    bg_color2: "bg-[#F0F6FB]",
    text_color: "text-[#199AFB]",
    text_bg_color: "bg-[#D9E7F2]",
    border: "border border-[#98BCD7]",
  },
  {
    title: "Booking Stand",
    value: 93,
    info: `8 this week`,
    icon: CalendarCheck,
    bg_color: "bg-[#D79930]",
    bg_color2: "bg-[#F7F4EF]",
    text_color: "text-[#D79930]",
    text_bg_color: "bg-[#F4EBDD]",
    border: "border border-[#ECD7B2]",
  },
  {
    title: "Total Stand",
    value: 5.715,
    info: `12 available`,
    icon: Grid3x3,
    bg_color: "bg-[#114263]",
    bg_color2: "bg-[#F0F3F5]",
    text_color: "text-[#005697]",
    text_bg_color: "bg-[#D9E5ED]",
    border: "border border-[#ACC0CE]",
  },
  {
    title: "Total Stand",
    value: 5.715,
    info: `12 available`,
    icon: Grid3x3,
    bg_color: "bg-[#C25B29]",
    bg_color2: "bg-[#F7F4F3]",
    text_color: "text-[#C25B29]",
    text_bg_color: "bg-[#F2E6E0]",
    border: "border border-[#E3BCA9]",
  },
];
