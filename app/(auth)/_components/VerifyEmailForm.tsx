"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ButtonGroup from "@/components/ui/ButtonGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface FormData {
  otp: string;
}

const VerifyEmailForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    console.log(data);

    // TODO:
    // await verifyEmail({
    //   otp: data.otp,
    // });

    router.push("/"); // or /dashboard

    setLoading(false);
  };

  const handleResendOTP = async () => {
    // TODO:
    // await resendEmailVerificationOTP();

    console.log("Resend verification OTP");
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
            {loading ? "Verifying..." : "Verify Email"}
          </ButtonGroup>
        </div>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-accent font-medium">
          Didn&apos;t receive the code?
          <button
            type="button"
            onClick={handleResendOTP}
            className="ml-1 text-primary hover:underline"
          >
            Resend OTP
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
