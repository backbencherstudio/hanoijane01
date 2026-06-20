"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

export interface CardFormData {
  accountNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface CardFormRef {
  getValues: () => CardFormData;
  validate: () => Promise<boolean>;
}

const CardForm = forwardRef<CardFormRef>((_, ref) => {
  const {
    register,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<CardFormData>({
    defaultValues: {
      accountNumber: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  useImperativeHandle(ref, () => ({
    getValues: () => getValues(),
    validate: async () => {
      const isValid = await trigger();
      return isValid;
    },
  }));

  return (
    <div className="mt-2 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-lg font-medium" htmlFor="accountNumber">
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="accountNumber"
            placeholder="Enter Account Number"
            className={`mt-1 w-full rounded-lg border p-3 bg-white ${
              errors.accountNumber ? "border-red-500" : "border-gray-300"
            }`}
            {...register("accountNumber", {
              required: "Account number is required",
              pattern: {
                value: /^[0-9]{10,16}$/,
                message: "Enter a valid account number",
              },
            })}
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.accountNumber.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-lg font-medium" htmlFor="cardNumber">
            Card Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cardNumber"
            placeholder="Enter Card Number"
            className={`mt-1 w-full rounded-lg border p-3 bg-white ${
              errors.cardNumber ? "border-red-500" : "border-gray-300"
            }`}
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^[0-9]{13,19}$/,
                message: "Enter a valid card number",
              },
            })}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-lg font-medium" htmlFor="expiryDate">
            Expiry Date <span className="text-red-500">*</span>
          </label>
          <input
            type="month"
            id="expiryDate"
            className={`mt-1 w-full rounded-lg border p-3 bg-white ${
              errors.expiryDate ? "border-red-500" : "border-gray-300"
            }`}
            {...register("expiryDate", {
              required: "Expiry date is required",
            })}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.expiryDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-lg font-medium" htmlFor="cvv">
            CVV <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="cvv"
            placeholder="Enter CVV"
            className={`mt-1 w-full rounded-lg border p-3 bg-white ${
              errors.cvv ? "border-red-500" : "border-gray-300"
            }`}
            {...register("cvv", {
              required: "CVV is required",
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: "Enter a valid CVV",
              },
            })}
          />
          {errors.cvv && (
            <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
          )}
        </div>
      </div>
    </div>
  );
});

CardForm.displayName = "CardForm";
export default CardForm;