"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { useCreateAdminMutation } from "@/src/redux/api/user/userApi";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type CreateAdminFormData = {
  name: string;
  email: string;
  password: string;
};

const CreateAdminModal = ({ isOpen, onClose, onSuccess }: CreateAdminModalProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAdminFormData>();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateAdminFormData) => {
    try {
      await createAdmin({
        name: data.name,
        email: data.email,
        password: data.password,
        type: "admin",
        status: "ACTIVE",
      }).unwrap();
      onSuccess?.();
      handleClose();
    } catch {
      // Error handled by RTK Query
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="md:w-[480px] lg:w-[600px] xl:w-[730px]">
        <h1 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-primary">
          Create Admin Profile
        </h1>

        <p className="text-lg mt-3 border-b pb-6 mb-6">
          Fill in the details below to create a new admin.
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
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
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
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full mt-2 p-3 pr-12 rounded-lg bg-[#fafafa] border ${
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
              {isLoading ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAdminModal;