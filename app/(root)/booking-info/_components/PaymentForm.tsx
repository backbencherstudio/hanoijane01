"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCreditCard } from "react-icons/fa";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { RootState } from "@/src/redux/store";
import { resetBookingInfo } from "@/src/redux/features/bookingSlice";
import StripeProvider from "@/providers/StripeProvider";
import StripeCardForm, { StripeCardFormRef } from "./StripeCardForm";
import { useCreatePaymentIntentMutation } from "@/src/redux/api/payment/paymentApi";
import { useGetExhibitionStandQuery } from "@/src/redux/api/exhibition/exhibitionApi";
import { baseApi } from "@/src/redux/api/baseApi";
import { toast } from "sonner";

interface PaymentFormProps {
  prevStep: () => void;
}

const PaymentForm = ({ prevStep }: PaymentFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const bookingInfo = useSelector(
    (state: RootState) => state.booking.bookingInfo,
  );
  const standId = useSelector((state: RootState) => state.booking.standId);
  const termsAndConditions = useSelector(
    (state: RootState) => state.booking.termsAndConditions,
  );
  const bookingId = useSelector((state: RootState) => state.booking.bookingId);

  // Fetch stand details using standId
  const { data: standData, isLoading: isLoadingStand } = useGetExhibitionStandQuery(standId, {
    skip: !standId,
  });
  const stand = standData?.data;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingSecret, setIsLoadingSecret] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const stripeCardFormRef = useRef<StripeCardFormRef | null>(null);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const hasFetchedRef = useRef(false);
  const isClient = typeof window !== "undefined";

  // Redirect to booking-info if no bookingId (booking not created yet)
  useEffect(() => {
    if (!bookingId) {
      router.push("/booking-info");
    }
  }, [bookingId, router]);

  // Warn user before leaving payment page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (bookingId) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [bookingId]);

  const fetchClientSecret = async () => {
    setIsLoadingSecret(true);
    setLoadError(false);

    try {
      const result = await createPaymentIntent({
        bookingId: bookingId,
      }).unwrap();

      if (result.success && result.data?.clientSecret) {
        setClientSecret(result.data.clientSecret);
      } else {
        setLoadError(true);
        toast.error("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      setLoadError(true);
      toast.error("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoadingSecret(false);
    }
  };

  // Fetch client secret once on mount (hydration-safe)
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchClientSecret();
    }
  }, []);

  const handlePayment = async () => {
    if (!clientSecret) {
      toast.error("Payment not initialized. Please try again.");
      return;
    }

    if (!stripeCardFormRef.current) {
      toast.error("Payment form not ready. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentResult = await stripeCardFormRef.current.confirmPayment(clientSecret);

      if (paymentResult.success) {
        toast.success("Payment successful!");

        // Force a fresh /api/exhibition/latest-one request so the next map render
        // sees the updated stand availability immediately after payment.
        await fetch("/api/exhibition/latest-one", {
          cache: "no-store",
        });

        // Mark exhibition/booking/stand caches as stale so /exhibition-map
        // refetches fresh stand availability after payment (survives navigation)
        dispatch(
          baseApi.util.invalidateTags(["Exhibition", "Booking", "Stand"]),
        );

        dispatch(resetBookingInfo());
        sessionStorage.removeItem("bookingState");
        router.push(`/booking-success?payment_option=now`);
      } else {
        toast.error(paymentResult.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isClient) {
    return (
      <div className="lg:col-span-2 border p-6 bg-white rounded-xl">
        <div className="bg-white rounded-xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 border p-6 bg-white rounded-xl">
      <div className="bg-white rounded-xl">
        <Image src="/logo.webp" alt="logo" width={110} height={90} />
        <h2 className="text-[32px] font-semibold text-primary mt-5">Payment</h2>
        <p className="lg:text-lg font-normal text-[#4A4C56] mt-3 pb-6 border-b-2">
          Complete your payment to confirm your stand booking.
        </p>

        {/* Booking Summary */}
        <div className="mt-6 space-y-3 border-b pb-4">
          <h3 className="font-semibold text-2xl">Booking Summary</h3>
          <div className="p-5 space-y-4 bg-[#F2F6F8] rounded-xl overflow-hidden border">
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Stand:</span>
              <span className="text-lg font-semibold">
                {isLoadingStand ? "Loading..." : stand?.title || stand?.name || "N/A"}
              </span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Contact:</span>
              {bookingInfo.contactName}
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Email:</span>
              <span className="text-lg font-semibold">{bookingInfo.email}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Phone:</span>
              <span className="text-lg font-semibold">{bookingInfo.phoneNumber}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Address:</span>
              <span className="text-lg font-semibold">{bookingInfo.companyAddress}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">On behalf of:</span>
              <span className="text-lg font-semibold">{termsAndConditions.onBehalfOf}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Title:</span>
              <span className="text-lg font-semibold">{termsAndConditions.title}</span>
            </p>
          </div>
        </div>

        {/* Card Payment */}
        <div className="mt-6">
          <div className="bg-primary/5 p-2 md:p-5 rounded-xl">
            <div className="font-medium bg-primary/10 border px-4 py-3 rounded-lg flex items-center gap-2 text-primary">
              <FaCreditCard size={20} /> Credit card
            </div>
          </div>
          <div className="bg-primary/5 p-2 md:p-5 rounded-xl mt-5">
            <h4 className="text-xl font-semibold">Card Details</h4>
            {isLoadingSecret ? (
              <p className="text-sm text-gray-500 mt-2">
                Initializing payment form...
              </p>
            ) : clientSecret ? (
              <StripeProvider clientSecret={clientSecret}>
                <StripeCardForm ref={stripeCardFormRef} />
              </StripeProvider>
            ) : (
              <div className="text-sm text-red-500 mt-2">
                <p>Failed to load payment form.</p>
                <button
                  onClick={fetchClientSecret}
                  className="mt-1 text-primary hover:underline cursor-pointer"
                  disabled={isLoadingSecret}
                >
                  {isLoadingSecret ? "Retrying..." : "Retry"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button onClick={prevStep} variant="outline" className="px-8" disabled={isProcessing}>
            Back
          </Button>
          <ButtonGroup onClick={handlePayment} className="px-8 bg-primary text-white">
            {isProcessing ? "Processing..." : "Pay Now"}
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;