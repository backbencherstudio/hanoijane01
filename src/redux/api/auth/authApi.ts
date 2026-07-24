import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  VerifyEmailRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
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
        url: "/auth/signin",
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
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
} = authApi;
