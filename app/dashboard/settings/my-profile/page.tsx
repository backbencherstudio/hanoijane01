"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, X, Upload, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/src/redux/api/auth/authApi";
import { toast } from "sonner";
import Image from "next/image";
import customImageLoader from "@/lib/imageLoader";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: meData, isLoading: isUserLoading } = useGetMeQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const user = meData?.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Prefill form when user data loads
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      });
    }
  }, [user, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phoneNumber", data.phone);

      // Upload avatar if a new file is selected
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleDiscard = () => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      });
      setSelectedFile(null);
    }
    setIsEditing(false);
  };

  if (isUserLoading) {
    return (
      <div className="rounded-2xl">
        <div className="p-4 lg:p-6 rounded-2xl bg-white space-y-5">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 lg:p-6 rounded-2xl bg-white space-y-5">
            {/* Avatar Upload */}
            <div className="flex flex-col w-fit items-center gap-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                  {selectedFile ? (
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      loader={customImageLoader}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User size={48} />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2 flex gap-1">
                    <label
                      htmlFor="avatar-upload"
                      className="cursor-pointer bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Upload size={16} />
                    </label>
                    {(selectedFile || user?.avatar) && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                  className="hidden"
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="xl:w-1/2">
              <label htmlFor="name" className="font-medium">
                Full Name <span className="text-red-600">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    placeholder="Full Name"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email - Disabled */}
            <div className="xl:w-1/2">
              <label htmlFor="email" className="font-medium text-gray-500">
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    disabled={true}
                    className="mt-2 bg-gray-100 cursor-not-allowed"
                  />
                )}
              />
              <p className="text-sm text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Phone */}
            <div className="xl:w-1/2">
              <label htmlFor="phone" className="font-medium">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-4 lg:gap-6 justify-end lg:justify-start">
            {!isEditing ? (
              <Button
                type="button"
                className="px-6"
                onClick={() => setIsEditing(true)}
              >
                Edit <PenLine className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-6"
                  onClick={handleDiscard}
                  disabled={isUpdating}
                >
                  Discard
                </Button>
                <Button type="submit" className="px-6" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save changes"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
