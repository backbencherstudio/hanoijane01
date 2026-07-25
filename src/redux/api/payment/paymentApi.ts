import { baseApi } from "../baseApi";

interface CreatePaymentIntentRequest {
  bookingId: string;
  customerEmail: string;
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
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
  }),
  overrideExisting: false,
});

export const { useCreatePaymentIntentMutation } = paymentApi;