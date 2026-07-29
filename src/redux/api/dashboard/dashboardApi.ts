import { baseApi } from "../baseApi";
import {
  GetOverviewChartResponse,
  GetOverviewStatsResponse,
} from "@/types/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewStats: builder.query<GetOverviewStatsResponse, void>({
      query: () => ({
        url: "/admin/overview/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getOverviewChart: builder.query<GetOverviewChartResponse, void>({
      query: () => ({
        url: "/admin/overview/stand-vs-hall",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOverviewStatsQuery, useGetOverviewChartQuery } = dashboardApi;
