import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetUserBookingResponse,
  BookingStatsResponse,
  AdminBookingsResponse,
  AdminBookingDetailsResponse,
} from "@/types/booking.types";
import { baseApi } from "../baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<
      CreateBookingResponse,
      CreateBookingRequest
    >({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
    getUserBooking: builder.query<
      GetUserBookingResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 4 } = {}) => ({
        url: "/booking",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Booking"],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        return newItems;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.limit !== previousArg?.limit
        );
      },
    }),
    getBookingStats: builder.query<BookingStatsResponse, null>({
      query: () => ({
        url: "/admin/booking/stats",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getAdminBookings: builder.query<
      AdminBookingsResponse,
      { status?: string; page?: number; limit?: number }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.status && params.status !== "all")
          searchParams.set("status", params.status);
        if (params.page) searchParams.set("page", String(params.page));
        if (params.limit) searchParams.set("limit", String(params.limit));
        const queryString = searchParams.toString();
        return {
          url: `/admin/booking${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Booking"],
    }),
    getAdminBookingDetails: builder.query<AdminBookingDetailsResponse, string>({
      query: (bookingId) => ({
        url: `/admin/booking/${bookingId}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBookingMutation,
  useGetUserBookingQuery,
  useGetBookingStatsQuery,
  useGetAdminBookingsQuery,
  useGetAdminBookingDetailsQuery,
} = bookingApi;
