import { useGetOverviewStatsQuery } from "@/src/redux/api/dashboard/dashboardApi";
import { StateData } from "@/types/dashboard";
import { CreditCard, Grid2x2Check, Grid2X2Plus, Grid3x3 } from "lucide-react";
export const useDashboardStats = () => {
  const { data, isLoading: statsLoading } = useGetOverviewStatsQuery();
  const stats = data?.data;
  const stateData: StateData[] = [
    {
      title: "Total Stand",
      value: stats?.totalStands,
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
      value: stats?.bookedStands,
      info: `8 this week`,
      icon: Grid2x2Check,
      bg_color: "bg-[#D79930]",
      bg_color2: "bg-[#F7F4EF]",
      text_color: "text-[#D79930]",
      text_bg_color: "bg-[#F4EBDD]",
      border: "border border-[#ECD7B2]",
    },
    {
      title: "Available Stand",
      value: stats?.availableStands,
      info: `12 available`,
      icon: Grid2X2Plus,
      bg_color: "bg-[#114263]",
      bg_color2: "bg-[#F0F3F5]",
      text_color: "text-[#005697]",
      text_bg_color: "bg-[#D9E5ED]",
      border: "border border-[#ACC0CE]",
    },
    {
      title: "Total Revenue",
      value: `€ ${stats?.totalRevenue}`,
      info: `12 available`,
      icon: CreditCard,
      bg_color: "bg-[#C25B29]",
      bg_color2: "bg-[#F7F4F3]",
      text_color: "text-[#C25B29]",
      text_bg_color: "bg-[#F2E6E0]",
      border: "border border-[#E3BCA9]",
    },
  ];

  return { stateData, statsLoading };
};
