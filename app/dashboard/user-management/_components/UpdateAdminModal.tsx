"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserMutation } from "@/src/redux/api/user/userApi";
import { UpdateUserRequest, UserListItem } from "@/types/userList";
import { toast } from "sonner";
import { getErrorMessage } from "@/src/lib/getErrorMessage";

interface UpdateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserListItem | null;
  onSuccess?: () => void;
}

type UpdateAdminFormData = {
  name: string;
  email: string;
  password?: string;
  status: "ACTIVE" | "BANNED";
};

const UpdateAdminModal = ({
  isOpen,
  onClose,
  user,
  onSuccess,
}: UpdateAdminModalProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateAdminFormData>();

  const statusValue = watch("status");

  // Pre-fill form when user data changes
  React.useEffect(() => {
    if (user && isOpen) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("status", user.statusText as "ACTIVE" | "BANNED");
      setValue("password", "");
    }
  }, [user, isOpen, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: UpdateAdminFormData) => {
    if (!user) return;

    const toastId = toast.loading("Updating user...");

    try {
      const updateBody: UpdateUserRequest = {
        name: data.name,
        email: data.email,
        status: data.status,
      };

      // Only include password if it's provided
      if (data.password?.trim()) {
        updateBody.password = data.password;
      }

      await updateUser({
        userId: user.id,
        body: updateBody,
      }).unwrap();

      toast.success("User updated successfully.", {
        id: toastId,
      });

      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update user."), {
        id: toastId,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="md:w-120 lg:w-150 xl:w-182.5">
        <h1 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-primary">
          Update User Profile
        </h1>

        <p className="text-lg mt-3 border-b pb-6 mb-6">
          Update the details for {user?.name}.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-lg font-medium text-text-primary"
            >
              User Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter user name"
              className={`w-full mt-2 p-3 rounded-lg bg-[#fafafa] border ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
              {...register("name", {
                required: "User name is required",
              })}
            />

            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-lg font-medium text-text-primary"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className={`w-full mt-2 p-3 rounded-lg bg-[#fafafa] border ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email",
                },
              })}
            />

            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-lg font-medium text-text-primary"
            >
              Password{" "}
              <span className="text-sm text-gray-500">
                (leave blank to keep current)
              </span>
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className={`w-full mt-2 p-3 pr-12 rounded-lg bg-[#fafafa] border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-gray-500" />
                ) : (
                  <Eye className="size-5 text-gray-500" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-lg font-medium text-text-primary">
              Status
            </label>
            <Select
              value={statusValue || ""}
              onValueChange={(value: "ACTIVE" | "BANNED") => {
                setValue("status", value, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="w-full h-12.5! mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="h-12.5" value="ACTIVE">
                  Active
                </SelectItem>
                <SelectItem className="h-12.5" value="BANNED">
                  Banned
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={handleClose}
              disabled={isLoading}
            >
              Discard
            </Button>

            <Button type="submit" className="h-11" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update User"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateAdminModal;
