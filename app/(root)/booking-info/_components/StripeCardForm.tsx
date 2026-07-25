"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, forwardRef, useImperativeHandle } from "react";

const elementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#111827",
      fontFamily: "inherit",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#EF4444",
    },
  },
};

export interface StripeCardFormRef {
  confirmPayment: (clientSecret: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
}

const StripeCardForm = forwardRef<StripeCardFormRef>((_, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  useImperativeHandle(ref, () => ({
    confirmPayment: async (clientSecret: string) => {
      if (!stripe || !elements) {
        return { success: false, error: "Stripe is not initialized yet." };
      }

      if (
        !cardComplete.cardNumber ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardCvc
      ) {
        return {
          success: false,
          error: "Please fill in all card details correctly.",
        };
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        return { success: false, error: "Card element not found." };
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
          },
        }
      );

      if (error) {
        return { success: false, error: error.message || "Payment failed." };
      }

      if (paymentIntent?.status === "succeeded") {
        return { success: true };
      }

      return {
        success: false,
        error: `Payment status: ${paymentIntent?.status || "unknown"}`,
      };
    },
  }));

  return (
    <div className="mt-2 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card Number */}
        <div className="md:col-span-2">
          <label className="text-lg font-medium">Card Number</label>

          <div
            className={`mt-1 rounded-lg border bg-white p-3 ${
              cardComplete.cardNumber ? "border-green-400" : "border-gray-300"
            }`}
          >
            <CardNumberElement
              options={elementOptions}
              onChange={(e) =>
                setCardComplete((prev) => ({
                  ...prev,
                  cardNumber: e.complete,
                }))
              }
            />
          </div>
        </div>

        {/* Expiry */}
        <div>
          <label className="text-lg font-medium">Expiry Date</label>

          <div
            className={`mt-1 rounded-lg border bg-white p-3 ${
              cardComplete.cardExpiry ? "border-green-400" : "border-gray-300"
            }`}
          >
            <CardExpiryElement
              options={elementOptions}
              onChange={(e) =>
                setCardComplete((prev) => ({
                  ...prev,
                  cardExpiry: e.complete,
                }))
              }
            />
          </div>
        </div>

        {/* CVC */}
        <div>
          <label className="text-lg font-medium">CVC</label>

          <div
            className={`mt-1 rounded-lg border bg-white p-3 ${
              cardComplete.cardCvc ? "border-green-400" : "border-gray-300"
            }`}
          >
            <CardCvcElement
              options={elementOptions}
              onChange={(e) =>
                setCardComplete((prev) => ({
                  ...prev,
                  cardCvc: e.complete,
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
});

StripeCardForm.displayName = "StripeCardForm";

export default StripeCardForm;