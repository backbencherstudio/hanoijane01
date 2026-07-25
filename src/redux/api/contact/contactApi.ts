import { ContactRequest, ContactResponse } from "@/types/contact.types";
import { baseApi } from "../baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<ContactResponse, ContactRequest>({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {} = contactApi;
