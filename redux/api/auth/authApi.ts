// redux/api/authApi.ts

import { SignUpRequest, SignUpResponse } from "@/types/auth.types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useSignUpMutation } = authApi;
