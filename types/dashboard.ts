import { LucideIcon } from "lucide-react";

export interface OverviewStats {
  totalStands: number;
  bookedStands: number;
  availableStands: number;
  totalRevenue: number;
}
export interface OverviewChart {
  hallId: string;
  hallTitle: string;
  totalStands: number;
  bookedStands: number;
  availableStands: number;
}

export interface GetOverviewStatsResponse {
  success: boolean;
  message: string;
  data: OverviewStats;
}
export interface GetOverviewChartResponse {
  success: boolean;
  message: string;
  data: OverviewChart[];
}

export interface StateData {
  title: string;
  value: number | string | undefined;
  info: string;
  icon: LucideIcon;
  bg_color: string;
  bg_color2: string;
  text_color: string;
  text_bg_color: string;
  border: string;
}
