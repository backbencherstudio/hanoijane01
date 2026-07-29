import { baseApi } from "../baseApi";
import type { StandStatsResponse } from "@/types/standStats";

export const exhibitionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExhibitionMap: builder.query({
      query: () => ({
        url: "/exhibition/latest-one",
        method: "GET",
      }),
      providesTags: ["Exhibition", "Booking"],
    }),
    getExhibitionStand: builder.query({
      query: (standId) => ({
        url: `/exhibition/stand/${standId}`,
        method: "GET",
      }),
      providesTags: ["Stand"],
    }),
    getAdminExhibition: builder.query({
      query: () => ({
        url: "/admin/exhibition/latest-one",
        method: "GET",
      }),
      providesTags: ["Exhibition"],
    }),
    getStandStats: builder.query<StandStatsResponse, null>({
      query: () => ({
        url: "/admin/exhibition/stands/stats",
        method: "GET",
      }),
      providesTags: ["Stand"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExhibitionMapQuery,
  useGetExhibitionStandQuery,
  useGetAdminExhibitionQuery,
  useGetStandStatsQuery,
} = exhibitionApi;