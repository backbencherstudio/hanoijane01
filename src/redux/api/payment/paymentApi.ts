import { baseApi } from "../baseApi";
import { GetUserTransactionsResponse } from "@/types/transaction.types";

interface CreatePaymentIntentRequest {
  bookingId: string;
}

interface CreatePaymentIntentResponse {
  success: boolean;
  data: {
    paymentIntentId: string;
    clientSecret: string;
  };
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      CreatePaymentIntentResponse,
      CreatePaymentIntentRequest
    >({
      query: (body) => ({
        url: "/payment/stripe/create-payment-intent",
        method: "POST",
        body,
      }),
    }),
    getUserTransactions: builder.query<
      GetUserTransactionsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 8 } = {}) => ({
        url: "/transaction",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Booking"],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (_currentCache, newItems) => {
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

export const {
  useCreatePaymentIntentMutation,
  useGetUserTransactionsQuery,
} = paymentApi;
