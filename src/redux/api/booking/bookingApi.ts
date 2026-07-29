import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetUserBookingResponse,
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
  }),
  overrideExisting: false,
});

export const { useCreateBookingMutation, useGetUserBookingQuery } = bookingApi;
