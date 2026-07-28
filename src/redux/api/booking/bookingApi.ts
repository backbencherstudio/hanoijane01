import { baseApi } from "../baseApi";

interface CreateBookingRequest {
  standId: string;
  userName: string;
  companyName: string;
  companyAddress: string;
  email: string;
  phoneNumber: string;
  termsAndConditionsAccepted: boolean;
  onBehalfOf: string;
  title: string;
  signature: string;
}

interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    userName: string;
    companyName: string;
    companyAddress: string;
    email: string;
    phoneNumber: string;
    termsAndConditionsAccepted: boolean;
    onBehalfOf: string;
    title: string;
    signaturePath: string;
    subTotalAmount: number;
    vatAmount: number;
    vatPercentage: number;
    totalAmount: number;
    paymentStatus: string;
    paymentMethod: string;
    status: number;
  };
}

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<CreateBookingResponse, CreateBookingRequest>({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateBookingMutation } = bookingApi;