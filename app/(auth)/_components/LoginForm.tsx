"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}
const LoginForm = ({ pageShow }: { pageShow: (page: string) => void }) => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormData) => {
    console.log("Login data:", data);
  };

  return (
    <div className="w-full px-4 py-6 md:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-primary">Welcome Back</h1>
        <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
          Appears on your booking confirmation and exhibitor badge.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="space-y-5">
          <div>
            <label className="text-lg font-medium" htmlFor="email">
              Email Address
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

          <div>
            <label className="text-lg font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
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
              {show ? (
                <EyeOff
                  onClick={() => setShow(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShow(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ButtonGroup type="submit" className="px-6">
            Sign In
          </ButtonGroup>
        </div>
      </form>

      <p className="text-accent mt-6 text-center">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => pageShow("register")}
          className="text-primary font-medium hover:underline cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
