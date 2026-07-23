"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import ButtonGroup from "@/components/ui/ButtonGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/src/redux/api/auth/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

interface FormData {
  otp: string;
}

const VerifyEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();

  const [resendVerificationEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();
  const email = searchParams.get("email");

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      otp: "",
    },
  });

  const otp = watch("otp");

  const onSubmit = async (data: FormData) => {
    if (!email) {
      toast.error("Email is missing. Please sign up again.");
      return;
    }

    const toastId = toast.loading("Verifying your email...");

    try {
      await verifyEmail({
        email,
        otp: data.otp,
      }).unwrap();

      toast.success("Email verified successfully!", {
        id: toastId,
      });

      router.push("/");
    } catch (error: unknown) {
      const fetchError = error as FetchBaseQueryError;

      toast.error(
        (fetchError.data as { message?: string; error?: string })?.message ||
          (fetchError.data as { message?: string; error?: string })?.error ||
          "Failed to verify email.",
        {
          id: toastId,
        },
      );
    }
  };
  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email is missing. Please sign up again.");
      return;
    }

    const toastId = toast.loading("Sending verification code...");

    try {
      await resendVerificationEmail({ email }).unwrap();

      toast.success("Verification code sent successfully!", {
        id: toastId,
      });
    } catch (error: unknown) {
      const fetchError = error as FetchBaseQueryError;

      toast.error(
        (fetchError.data as { message?: string; error?: string })?.message ||
          (fetchError.data as { message?: string; error?: string })?.error ||
          "Failed to resend verification code.",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-118">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-primary">
          Verify Your Email
        </h1>

        <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
          Enter the 5-digit verification code sent to your registered email
          address to activate your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="flex flex-col items-center">
          <label className="text-lg font-medium mb-4">Verification Code</label>

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

          {errors.otp && (
            <p className="text-red-500 text-sm mt-2">{errors.otp.message}</p>
          )}
        </div>

        <div className="mt-8">
          <ButtonGroup type="submit" fullWidth className="w-full">
            {isVerifying ? "Verifying..." : "Verify Email"}
          </ButtonGroup>
        </div>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-accent font-medium">
          Didn&apos;t receive the code?
          <button
            onClick={handleResendOTP}
            disabled={isResending}
            className="ml-1 text-primary hover:underline disabled:opacity-50 cursor-pointer"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </button>
        </p>

        <p className="text-accent font-medium">
          Wrong email?
          <Link href="/sign-up" className="ml-1 text-primary hover:underline">
            Back to Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
