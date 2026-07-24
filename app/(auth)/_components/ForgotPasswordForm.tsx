"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import ButtonGroup from "@/components/ui/ButtonGroup";
import { useRouter, useSearchParams } from "next/navigation";
import { useForgotPasswordMutation } from "@/src/redux/api/auth/authApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";

interface FormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: email ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Sending OTP...");

    try {
      await forgotPassword({ email: data.email }).unwrap();

      toast.success("OTP sent to your email!", {
        id: toastId,
      });

      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to send OTP."), {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-118">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-primary">Forgot Password</h1>

        <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
          Enter your registered email address and we&apos;ll send you a one-time
          password (OTP) to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div>
          <label className="text-lg font-medium" htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-8">
          <ButtonGroup type="submit" className="w-full" fullWidth={true}>
            {isLoading ? "Sending..." : "Send OTP"}
          </ButtonGroup>
        </div>
      </form>

      <p className="text-accent font-medium mt-6 text-center">
        Remember your password?
        <Link href="/sign-in" className="ml-1 text-primary hover:underline">
          Back to Sign In
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
