"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import ButtonGroup from "@/components/ui/ButtonGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

interface FormData {
  otp: string;
}

const VerifyOtpForm = () => {
  const router = useRouter();
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

  const onSubmit = (data: FormData) => {
    console.log(data);
    // TODO: Verify OTP API
    router.push("/reset-password");
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-118">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-primary">Verify OTP</h1>

        <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
          Enter the 5-digit verification code sent to your email.
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
            Verify OTP
          </ButtonGroup>
        </div>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-accent font-medium">
          Didn&apos;t receive the code?
          <Link
            href="/forgot-password"
            className="ml-1 text-primary hover:underline"
          >
            Resend OTP
          </Link>
        </p>

        <p className="text-accent font-medium">
          <Link href="/sign-in" className="text-primary hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
