"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetMeQuery } from "@/src/redux/api/auth/authApi";
import { useSubmitContactMutation } from "@/src/redux/api/contact/contactApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";
import ButtonGroup from "@/components/ui/ButtonGroup";

interface ContactFormData {
  name: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactForm = () => {
  const { data: meData } = useGetMeQuery();
  const user = meData?.data;

  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  // Pre-fill form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        companyName: user.companyName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
        message: "",
      });
    } else {
      reset({
        name: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContact(data).unwrap();
      toast.success("Contact message submitted successfully");
      reset({
        name: user?.name ?? "",
        companyName: user?.companyName ?? "",
        email: user?.email ?? "",
        phoneNumber: user?.phoneNumber ?? "",
        message: "",
      });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to submit contact message"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="lg:text-lg font-medium text-text-primary"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name"
          className={`p-3 mt-2 rounded-lg bg-[#fafafa] border focus:border-gray-300 ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
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
          <p className="text-red-500 text-sm mt-1">
            {errors.companyName.message}
          </p>
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
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
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

      {/* Submit Button */}
      <ButtonGroup type="submit" fullWidth={true}>
        {isLoading ? "Sending..." : "Send Message"}
      </ButtonGroup>
    </form>
  );
};

export default ContactForm;