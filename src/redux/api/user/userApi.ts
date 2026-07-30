import { baseApi } from "../baseApi";
import { GetUserStatsResponse } from "@/types/userStats";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<GetUserStatsResponse, void>({
      query: () => ({
        url: "/admin/user/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserStatsQuery } = userApi;