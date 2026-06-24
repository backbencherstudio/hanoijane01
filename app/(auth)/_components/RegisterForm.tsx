"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

// Form data interface
interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = (data: FormData) => {
    console.log("Registration data:", data);
    // Send data to your API
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl md:w-120 lg:w-150 xl:w-183.25 lg:pb-4 b">
      <div className="text-center">
        <h1 className="text-[32px] font-semibold text-primary">
          Create an Account
        </h1>
        <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
          Appears on your booking confirmation and exhibitor badge.
        </p>
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
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
                {...register("fullName", {
                  required: "Full name is required",
                })}
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
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
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
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.companyName ? "border-red-500" : "border-gray-200"
                }`}
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

            {/* Phone Number */}
            <div>
              <label className="text-lg font-medium" htmlFor="phoneNumber">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter Your Phone Number"
                className={`placeholder:text-[#777980] rounded-lg p-3 bg-gray-100 border w-full mt-2 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-200"
                }`}
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
                  className={`placeholder:text-[#777980] rounded-lg p-3 pr-9 bg-gray-100 border w-full mt-2 ${
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
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="absolute mt-1 mr-2 right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="absolute mt-1 mr-2 right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-lg font-medium" htmlFor="confirmPassword">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="flex relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Your Password"
                  className={`placeholder:text-[#777980] rounded-lg p-3 pr-9 bg-gray-100 border w-full mt-2 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />
                {showConfirmPassword ? (
                  <EyeOff
                    onClick={() => setShowConfirmPassword(false)}
                    className="absolute mt-1 mr-2 right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowConfirmPassword(true)}
                    className="absolute mt-1 mr-2 right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center items-center w-full">
          <ButtonGroup type="submit" className="px-6">
            Create An Account
          </ButtonGroup>
        </div>
      </form>
      <p className="text-accent font-medium mt-6 text-center">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary font-medium hover:underline cursor-pointer"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
