import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  ResendVerificationEmailRequest,
  VerifyEmailRequest,
} from "@/types/auth.types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/auth/signin",
        method: "POST",
        body,
      }),
    }),

    verifyEmail: builder.mutation<LoginResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
        resendVerificationEmail: builder.mutation<LoginResponse, ResendVerificationEmailRequest>({
      query: (data) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useGetMeQuery,
} = authApi;
