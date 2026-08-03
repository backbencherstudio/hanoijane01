import { baseApi } from "../baseApi";
import type { StandStatsResponse } from "@/types/standStats";
import type { StandsApiResponse } from "@/types/standManagement";
import type {
  ExhibitionDetailsResponse,
  UpdateExhibitionRequest,
} from "@/types/stand";

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
    getAdminExhibitionDetails: builder.query<ExhibitionDetailsResponse, void>({
      query: () => ({
        url: "/admin/exhibition/latest-details",
        method: "GET",
      }),
      providesTags: ["Exhibition"],
    }),
    updateAdminExhibition: builder.mutation<
      ExhibitionDetailsResponse,
      UpdateExhibitionRequest
    >({
      query: (body) => ({
        url: "/admin/exhibition/latest-one",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Exhibition"],
    }),
    getStandStats: builder.query<StandStatsResponse, null>({
      query: () => ({
        url: "/admin/exhibition/stands/stats",
        method: "GET",
      }),
      providesTags: ["Stand"],
    }),
    getAdminStands: builder.query<
      StandsApiResponse,
      {
        hall?: string;
        category?: string;
        status?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.hall && params.hall !== "All Halls")
          searchParams.set("hall", params.hall);
        if (params.category && params.category !== "All Categories")
          searchParams.set("category", params.category);
        if (params.status && params.status !== "All Status")
          searchParams.set("status", params.status);
        if (params.page) searchParams.set("page", String(params.page));
        if (params.limit) searchParams.set("limit", String(params.limit));
        const queryString = searchParams.toString();
        return {
          url: `/admin/exhibition/stands${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Stand"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExhibitionMapQuery,
  useGetExhibitionStandQuery,
  useGetAdminExhibitionQuery,
  useGetAdminExhibitionDetailsQuery,
  useUpdateAdminExhibitionMutation,
  useGetStandStatsQuery,
  useGetAdminStandsQuery,
} = exhibitionApi;
