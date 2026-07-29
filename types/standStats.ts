export interface StandStats {
  id: string;
  title: string;
  totalStands: number;
  bookedStands: number;
  availableStands: number;
}

export interface StandStatsResponse {
  success: boolean;
  message: string;
  data: StandStats[];
}