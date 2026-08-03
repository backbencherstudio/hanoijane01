"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/src/redux/api/auth/authApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout as clearAuth } from "@/src/redux/features/auth/authSlice";
import { baseApi } from "@/src/redux/api/baseApi";
import { removeAccessToken } from "@/lib/cookies";

interface FormData {
  oldPassword: string;
  newPassword: string;
}

export default function ChangePasswordForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const oldPasswordValue = watch("oldPassword", "");
  const newPasswordValue = watch("newPassword", "");

  const onSubmit = async (data: FormData) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully. Please sign in with your new password.");
      reset();
      removeAccessToken();
      dispatch(clearAuth());
      dispatch(baseApi.util.resetApiState());
      router.push("/sign-in");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to change password"));
    }
  };

  const isSubmitting = isLoading;

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={onSubmitForm} className="space-y-6">
      <div className="flex items-start justify-between">
        <div className=" items-center gap-2 text-primary">
          <h2 className="text-2xl lg:text-3xl  font-semibold">
            Change Password
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Update your account password.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Current Password" error={errors.oldPassword?.message}>
          <div className="relative">
            <Input
              type={showOldPassword ? "text" : "password"}
              className="mt-2"
              {...register("oldPassword", { required: "Current password is required" })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 text-gray-500"
              onClick={() => setShowOldPassword((s) => !s)}
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        <Field label="New Password" error={errors.newPassword?.message}>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              className="mt-2"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 text-gray-500"
              onClick={() => setShowNewPassword((s) => !s)}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || !oldPasswordValue || !newPasswordValue || !!errors.oldPassword || !!errors.newPassword}
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="font-medium">{label}</label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
