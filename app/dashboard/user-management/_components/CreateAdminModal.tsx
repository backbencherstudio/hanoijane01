"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload, X, Pencil } from "lucide-react";
import Image from "next/image";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CreateAdminFormData = {
  username: string;
  email: string;
  password: string;
  image: FileList | null;
  status: "Active" | "Banned";
};

const CreateAdminModal = ({ isOpen, onClose }: CreateAdminModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CreateAdminFormData>({
    defaultValues: {
      status: "Active",
      image: null,
    },
  });

  const image = watch("image");

  const handleClose = () => {
    setImagePreview(null);
    reset();
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image", e.target.files as FileList);
      clearErrors("image");
    } else {
      // User cancelled - do nothing, keep existing image if any
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: CreateAdminFormData) => {
    console.log({
      ...data,
      image: data.image?.[0] || null,
    });
    // TODO: API Call
    handleClose();
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
          {/* Profile Image - moved to top */}
          <div>
            <label className="text-lg font-medium text-text-primary block mb-2">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <div className="flex justify-center items-center gap-6">
              {imagePreview ? (
                <div>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 group">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Hover overlay with replace option */}
                  <div className="  transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="bg-primary hover:bg-primary/95 text-white p-2 rounded-full transition cursor-pointer"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition cursor-pointer"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={triggerFileInput}
                  className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 bg-[#fafafa] flex flex-col items-center justify-center cursor-pointer hover:border-primary transition group"
                >
                  <Upload className="size-8 text-gray-400 group-hover:text-primary transition" />
                  <span className="text-xs text-gray-500 mt-1">Upload</span>
                </div>
              )}
            </div>

            {errors.image && (
              <p className="text-sm text-red-500 mt-2">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="text-lg font-medium text-text-primary"
            >
              User Name
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter user name"
              className={`w-full mt-2 p-3 rounded-lg bg-[#fafafa] border ${
                errors.username ? "border-red-500" : "border-gray-200"
              }`}
              {...register("username", {
                required: "User name is required",
              })}
            />

            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
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
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Status - Shadcn Select */}
          <div>
            <label className="text-lg font-medium text-text-primary block mb-2">
              Status
            </label>

            <Select
              defaultValue="Active"
              onValueChange={(value) =>
                setValue("status", value as "Active" | "Banned")
              }
            >
              <SelectTrigger className="w-full h-12.5! bg-[#fafafa] border-gray-200 cursor-pointer">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="h-12.5 cursor-pointer" value="Active">
                  <span className="text-[#859E5A] bg-[#E3E8DB] border border-[#D7DECA] py-0.5 px-2 rounded-[5px] ">
                    Active
                  </span>{" "}
                </SelectItem>
                <SelectItem className="h-12.5 cursor-pointer" value="Banned">
                  <span className="text-red-400 bg-red-50 border border-red-100 py-0.5 px-2 rounded-[5px] ">
                    Banded
                  </span>
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
            >
              Discard
            </Button>

            <Button type="submit" className="h-11">
              Create Admin
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAdminModal;
