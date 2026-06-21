"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, PencilLine, PenOff, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";

// Mock user data
const user = {
  name: "Jacob Jones",
  email: "jacob@gmail.com",
  company: "The Walt Disney Company",
  company_address: "3891 Ranchview Dr. Richardson, California 62639",
  phone: "1999999999",
  password: "**********",
  documents: [{ fileUrl: "", fileName: "Company License.pdf" }],
};

interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  password: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      fullName: user.name,
      email: user.email,
      companyName: user.company,
      companyAddress: user.company_address,
      phoneNumber: user.phone,
      password: user.password,
    },
  });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    reset({
      fullName: user.name,
      email: user.email,
      companyName: user.company,
      companyAddress: user.company_address,
      phoneNumber: user.phone,
      password: user.password,
    });
  };

  const onSubmit = (data: FormData) => {
    console.log("Updated Profile Data:", data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <div>
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-[32px] text-primary font-semibold flex items-center">
            Personal Information
            <Button
              onClick={isEditing ? handleCancel : handleEdit}
              className="hover:text-primary ml-2"
              variant="ghost"
            >
              {isEditing ? (
                <PenOff className="size-4 lg:size-6" />
              ) : (
                <PencilLine className="size-4 lg:size-6" />
              )}
            </Button>
          </h1>
          <p className="lg:text-lg text-accent mt-2 lg:mt-3 pb-6 border-b-2">
            {isEditing ? "Edit your profile" : "Manage your Profile"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="text-lg font-medium" htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter Your Full Name"
                disabled={!isEditing}
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-lg font-medium" htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                disabled={!isEditing}
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="text-lg font-medium" htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Enter Your Company Name"
                disabled={!isEditing}
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.companyName ? "border-red-500" : "border-gray-200"
                } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                {...register("companyName", {
                  required: "Company name is required",
                })}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Company Address */}
            <div>
              <label className="text-lg font-medium" htmlFor="companyAddress">
                Company Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyAddress"
                placeholder="Enter Your Company Address"
                disabled={!isEditing}
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.companyAddress ? "border-red-500" : "border-gray-200"
                } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                {...register("companyAddress", {
                  required: "Company address is required",
                })}
              />
              {errors.companyAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyAddress.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-lg font-medium" htmlFor="phoneNumber">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter Your Phone Number"
                disabled={!isEditing}
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-200"
                } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]{7,20}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-lg font-medium" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password"
                  disabled={!isEditing}
                  className={`placeholder:text-[#777980] rounded-lg p-3 pr-9 bg-gray-100 border w-full mt-2 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {isEditing &&
                  (showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      className="absolute mt-1 mr-2 right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="absolute mt-1 mr-2 right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  ))}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Documents section */}
          <div className=" pt-6">
            <label className="text-lg font-medium">Documents</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className="bg-[#fafafa] p-3 rounded-lg border relative">
                <div className="py-9 bg-[#F2F6F8] flex justify-center items-center rounded-lg">
                  <BsFiletypePdf size={120} className="text-red-600" />
                </div>
                <div className="mt-3">
                  <p className="text-xl font-medium text-[#58545E]">
                    Company license.pdf
                  </p>
                  <p className="text-[#777980] mt-1 lg:mt-2.5">800.20 KB</p>
                </div>
                {isEditing && (
                  <button className="bg-red-500 text-white rounded-full p-1 absolute -top-2 -right-2 cursor-pointer">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="bg-[#fafafa] p-3 rounded-lg border relative">
                <div className="py-9 bg-[#F2F6F8] flex justify-center items-center rounded-lg">
                  <BsFiletypeJpg size={120} className="text-green-700" />
                </div>
                <div className="mt-3">
                  <p className="text-xl font-medium text-[#58545E]">
                    Company license.pdf
                  </p>
                  <p className="text-[#777980] mt-1 lg:mt-2.5">800.20 KB</p>
                </div>
                {isEditing && (
                  <button className="bg-red-500 text-white rounded-full p-1 absolute -top-2 -right-2 cursor-pointer">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="bg-[#fafafa] p-3 rounded-lg border relative">
                <div className="py-9 bg-[#F2F6F8] flex justify-center items-center rounded-lg">
                  <BsFiletypePng size={120} className="text-[#a066aa]" />
                </div>
                <div className="mt-3">
                  <p className="text-xl font-medium text-[#58545E]">
                    Company license.pdf
                  </p>
                  <p className="text-[#777980] mt-1 lg:mt-2.5">800.20 KB</p>
                </div>
                {isEditing && (
                  <button className="bg-red-500 text-white rounded-full p-1 absolute -top-2 -right-2 cursor-pointer">
                    <X size={16} />
                  </button>
                )}
              </div>
              {/* Add more document cards as needed */}
            </div>
          </div>
          {/* Document Upload */}
          <div className="col-span-full mt-6">
            <div className=" md:col-span-2 ">
              <input
                type="file"
                id="companyLicense"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    // setValue("companyLicense", files);
                  }
                  // If user cancels, do nothing – keep existing file
                }}
              />

              <label
                htmlFor="companyLicense"
                className="
              flex flex-col items-center justify-center
              border border-dashed border-[#0F5EA8]
              bg-[#F5F5F5]
              rounded-3xl
       py-6.5
              cursor-pointer
              transition-all
              hover:bg-[#F0F0F0]
              mt-2
            "
              >
                <div className="size-20 rounded-full bg-[#D9E4EC] flex items-center justify-center mb-6">
                  <UploadCloud className="text-primary" size={34} />
                </div>
                <h3 className="text-xl font-medium text-center text-text-primary">
                  Upload your Company License
                </h3>
                <p className="mt-2 text-[#777980] text-center">
                  Supported format: JPG/PNG (up to 5 mb)
                </p>
                <div className="mt-8 border border-primary rounded-full px-10 py-3 text-primary font-medium">
                  Choose File
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Update button – only visible when editing */}
        {isEditing && (
          <div className="flex gap-4 flex-col-reverse lg:flex-row justify-center items-center w-full mt-8">
            <Button
              onClick={handleCancel}
              className="hover:text-primary px-6"
              variant="outline"
            >
              Cancel
            </Button>
            <ButtonGroup type="submit" className="px-6">
              Update Profile
            </ButtonGroup>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
