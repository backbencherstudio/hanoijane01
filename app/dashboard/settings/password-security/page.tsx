"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useChangePasswordMutation,
} from "@/src/redux/api/auth/authApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordAndSecurityPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully");
      reset();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to change password"));
    }
  };

  return (
    <div>
      <div className="rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 lg:p-6 rounded-2xl bg-white space-y-5">
            <h2 className="text-xl font-semibold text-text-primary">
              Password & Security
            </h2>
            <p className="text-sm text-accent -mt-2">
              Update your password to keep your account secure
            </p>

            {/* Current Password */}
            <div className="xl:w-1/2">
              <label className="font-medium" htmlFor="currentPassword">
                Current Password <span className="text-red-600">*</span>
              </label>
              <div className="relative mt-2">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  placeholder="Enter current password"
                  className={`pr-10 ${
                    errors.currentPassword ? "border-red-500" : ""
                  }`}
                  {...register("currentPassword", {
                    required: "Current password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="xl:w-1/2">
              <label className="font-medium" htmlFor="newPassword">
                New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative mt-2">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter new password"
                  className={`pr-10 ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
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
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="xl:w-1/2">
              <label className="font-medium" htmlFor="confirmPassword">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative mt-2">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  className={`pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end lg:justify-start">
            <Button type="submit" className="px-6" disabled={isChangingPassword}>
              {isChangingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordAndSecurityPage;