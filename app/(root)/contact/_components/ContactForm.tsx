"use client";
import React from "react";
import { useForm } from "react-hook-form";
import ButtonGroup from "@/components/ui/ButtonGroup";

interface ContactFormData {
  companyName: string;
  email: string;
  phoneNumber: string;
  message: string;
  agree: boolean;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      companyName: "",
      email: "",
      phoneNumber: "",
      message: "",
      agree: false,
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form data:", data);
    // API call here
    reset(); // clear form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <div className="flex flex-col">
        <label
          htmlFor="companyName"
          className="lg:text-lg font-medium text-text-primary"
        >
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="companyName"
          placeholder="Enter Your Company Name"
          className={`p-3 mt-2 rounded-lg bg-[#fafafa] border focus:border-gray-300 ${
            errors.companyName ? "border-red-500" : "border-gray-200"
          }`}
          {...register("companyName", {
            required: "Company name is required",
          })}
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="lg:text-lg font-medium text-text-primary"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className={`p-3 mt-2 rounded-lg bg-[#fafafa] border focus:border-gray-300 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label
          htmlFor="phoneNumber"
          className="lg:text-lg font-medium text-text-primary"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          placeholder="Enter Your Phone Number"
          className={`p-3 mt-2 rounded-lg bg-[#fafafa] border focus:border-gray-300 ${
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
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label
          htmlFor="message"
          className="lg:text-lg font-medium text-text-primary"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Leave us a message..."
          className="p-3 mt-2 rounded-lg bg-[#fafafa] border border-gray-200 focus:border-gray-300 resize-none"
          {...register("message")}
        />
      </div>

      {/* Agree checkbox */}
      <div className=" rounded-lg pl-2 py-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="size-5 cursor-pointer"
            {...register("agree", {
              required: "Please accept the privacy policy",
            })}
          />
          <span className="text-[#777980]">
            I agree with our{" "}
            <span className="underline text-black">Privacy Policy</span>
          </span>
        </label>
        {errors.agree && (
          <p className="text-red-500 text-sm mt-2">{errors.agree.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <ButtonGroup type="submit" className="w-full">
        Send Message
      </ButtonGroup>
    </form>
  );
};

export default ContactForm;