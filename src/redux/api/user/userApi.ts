import { baseApi } from "../baseApi";
import { GetUserStatsResponse } from "@/types/userStats";
import {
  GetUserListResponse,
  GetUserListQueryParams,
  CreateAdminRequest,
  CreateAdminResponse,
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
    createAdmin: builder.mutation<CreateAdminResponse, CreateAdminRequest>({
      query: (body) => ({
        url: "/admin/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserStatsQuery, useGetUserListQuery, useCreateAdminMutation } = userApi;
