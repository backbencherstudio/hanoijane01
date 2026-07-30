import { baseApi } from "../baseApi";
import { GetUserStatsResponse } from "@/types/userStats";
import {
  GetUserListResponse,
  GetUserListQueryParams,
} from "@/types/userList";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<GetUserStatsResponse, void>({
      query: () => ({
        url: "/admin/user/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserList: builder.query<GetUserListResponse, GetUserListQueryParams>({
      query: (params) => ({
        url: "/admin/user",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserStatsQuery, useGetUserListQuery } = userApi;
