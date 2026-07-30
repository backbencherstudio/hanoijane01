export interface UserStats {
  totalUser: number;
  activeUser: number;
  inactiveUser: number;
  bannedUser: number;
}

export interface GetUserStatsResponse {
  success: boolean;
  message: string;
  data: UserStats;
}