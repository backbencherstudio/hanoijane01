"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import ButtonGroup from "@/components/ui/ButtonGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/src/redux/api/auth/authApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";

interface FormData {
  password: string;
  confirmPassword: string;
  otp: string;
}

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otpParam = searchParams.get("otp");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
      otp: otpParam || "",
    },
  });

  const password = watch("password");
  const otp = watch("otp");

  const onSubmit = async (data: FormData) => {
    if (!email) {
      toast.error("Email is missing. Please go back to forgot password.");
      return;
    }

    const toastId = toast.loading("Resetting password...");

    try {
      await resetPassword({
        email,
        otp: data.otp,
        password: data.password,
      }).unwrap();

      toast.success("Password reset successfully! Please sign in.", {
        id: toastId,
      });

      router.push("/sign-in");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to reset password."), {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-118">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-primary">Reset Password</h1>

        <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
          Create a new password for your account. Make sure it&apos;s secure and
          easy for you to remember.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="space-y-5">
          {/* OTP Field */}
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium mb-4">
              Verification Code
            </label>

            <InputOTP
              maxLength={5}
              value={otp}
              onChange={(value) =>
                setValue("otp", value, {
                  shouldValidate: true,
                })
              }
            >
              <InputOTPGroup>
                <InputOTPSlot className="size-10" index={0} />
                <InputOTPSlot className="size-10" index={1} />
                <InputOTPSlot className="size-10" index={2} />
                <InputOTPSlot className="size-10" index={3} />
                <InputOTPSlot className="size-10" index={4} />
              </InputOTPGroup>
            </InputOTP>

            {otp && otp.length < 5 && (
              <p className="text-red-500 text-sm mt-2">
                Please enter complete 5-digit OTP
              </p>
            )}
          </div>
          {/* New Password */}
          <div>
            <label className="text-lg font-medium" htmlFor="password">
              New Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className={`placeholder:text-[#777980] rounded-lg p-3 pr-10 bg-gray-100 border w-full mt-2 ${
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

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-1"
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-gray-500" />
                ) : (
                  <Eye className="size-5 text-gray-500" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-lg font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className={`placeholder:text-[#777980] rounded-lg p-3 pr-10 bg-gray-100 border w-full mt-2 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-1"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-5 text-gray-500" />
                ) : (
                  <Eye className="size-5 text-gray-500" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <ButtonGroup type="submit" fullWidth className="w-full">
            {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordForm;
