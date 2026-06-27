"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Mock user data
const mockUser = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+353871234567",
};

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
}

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: mockUser.fullName,
      email: mockUser.email,
      phone: mockUser.phone,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile Data:", data);
    // Here you would send data to your API
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDiscard = () => {
    reset({
      fullName: mockUser.fullName,
      email: mockUser.email,
      phone: mockUser.phone,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 lg:p-6 rounded-2xl  bg-white space-y-5 ">
            {/* full name */}
            <div className="xl:w-1/2">
              <label htmlFor="fullName" className="font-medium">
                Full Name <span className="text-red-600">*</span>
              </label>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="fullName"
                    placeholder="Full Name"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* email */}
            <div className="xl:w-1/2">
              <label htmlFor="email" className="font-medium">
                Email Address <span className="text-red-600">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* phone */}
            <div className="xl:w-1/2">
              <label htmlFor="phone" className="font-medium">
                Phone number <span className="text-red-600">*</span>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <div
                    className={`relative mt-2 rounded-lg bg-[#F4F5F7] transition-colors ${
                      !isEditing ? "opacity-100!" : ""
                    } ${
                      isEditing &&
                      "focus-within:border focus-within:border-gray-400 focus-within:ring-3 focus-within:ring-ring/50"
                    }`}
                  >
                    <PhoneInput
                      defaultCountry="ie"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={!isEditing}
                      className="w-full! border rounded-lg"
                      countrySelectorStyleProps={{
                        buttonClassName: `
                        !h-12 
                        !bg-transparent 
                        !border-0 
                        !px-1.5 
                        !rounded-l-lg
                        !outline-none
                        ${!isEditing ? "!cursor-text" : ""}
                      `,
                        dropdownStyleProps: {
                          className: "!rounded-xl !p-4 !z-50",
                          listItemClassName: "!py-2 hover:!bg-primary/5",
                        },
                      }}
                      inputClassName={`
                      !w-full 
                      !h-12 
                      !bg-transparent 
                      !border-none 
                      !rounded-r-lg
                      !text-base
                      !outline-none
                      !shadow-none
                      placeholder:!text-muted-foreground
                      focus:!ring-0
                      ${!isEditing ? "!cursor-text" : ""}
                    `}
                    />
                  </div>
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
              <Button type="button" className="px-6" onClick={handleEdit}>
                Edit <PenLine className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-6"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
                <Button type="submit" className="px-6">
                  Save changes
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
