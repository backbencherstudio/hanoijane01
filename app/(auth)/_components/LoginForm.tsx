"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  useResendVerificationEmailMutation,
  useSignInMutation,
} from "@/src/redux/api/auth/authApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/src/redux/features/auth/authSlice";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();
  const [resendVerificationEmail] = useResendVerificationEmailMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });
  const email = watch("email");

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Signing in...");

    try {
     const res = await signIn({
        email: data.email,
        password: data.password,
      }).unwrap();
      localStorage.setItem("accessToken", res.data.token);
      dispatch(setAccessToken(res.data.token));

      toast.success("Welcome back!", {
        id: toastId,
      });

      router.push("/");
    } catch (error: unknown) {
      const fetchError = error as FetchBaseQueryError;
      const message = getErrorMessage(error, "Login failed.");

      // Email not verified
      if (fetchError.status === 403 && message === "Email not verified") {
        try {
          await resendVerificationEmail({
            email: data.email,
          }).unwrap();

          toast.success("A new verification code has been sent.", {
            id: toastId,
          });

          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);

          return;
        } catch {
          toast.error(
            "Your email isn't verified and we couldn't resend the verification code.",
            {
              id: toastId,
            },
          );

          return;
        }
      }

      toast.error(message, {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-118">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-primary">Welcome Back</h1>
        <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
          Appears on your booking confirmation and exhibitor badge.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="space-y-5">
          <div>
            <label className="text-lg font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-lg font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                className={`placeholder:text-[#777980] rounded-lg p-3 pr-9 bg-gray-100 border w-full mt-2 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {show ? (
                <EyeOff
                  onClick={() => setShow(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShow(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 cursor-pointer"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Checkbox
              id="keepLoggedIn"
              checked={keepLoggedIn}
              onCheckedChange={(checked) => setKeepLoggedIn(checked === true)}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            <label
              htmlFor="keepLoggedIn"
              className="cursor-pointer select-none"
            >
              Keep me logged in
            </label>
          </div>
          <Link
            href={`/forgot-password?email=${encodeURIComponent(email || "")}`}
            className="text-sm text-blue-600 font-bold hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="flex justify-center mt-8">
          <ButtonGroup
            type="submit"
            className="px-6 w-full flex-1"
            fullWidth={true}
          >
            Sign In
          </ButtonGroup>
        </div>
      </form>

      <p className="text-accent font-medium mt-6 text-center">
        Not a member?
        <Link
          href="sign-up"
          className="text-primary font-medium hover:underline cursor-pointer ml-1"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
