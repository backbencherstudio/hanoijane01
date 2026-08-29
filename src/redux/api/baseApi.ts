import { getAccessToken, removeAccessToken } from "@/lib/cookies";
import { logout } from "@/src/redux/features/auth/authSlice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",

  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args.url;

  if (
    result.error &&
    (url.includes("/auth/me") || result.error.status === 401)
  ) {
    removeAccessToken();
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "Auth",
    "User",
    "Exhibition",
    "Booking",
    "Stand",
    "Dashboard",
    "Notification",
  ],

  endpoints: () => ({}),
});
