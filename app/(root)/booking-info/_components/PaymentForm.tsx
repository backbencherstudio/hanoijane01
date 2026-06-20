"use client";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/src/redux/store";
import { resetBookingInfo, resetAddOns } from "@/src/redux/slice/bookingSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { FaCreditCard } from "react-icons/fa";
import ButtonGroup from "@/components/ui/ButtonGroup";
import CardForm, { CardFormRef } from "./CardForm";

interface PaymentFormProps {
  prevStep: () => void;
}

const PaymentForm = ({ prevStep }: PaymentFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const bookingInfo = useSelector(
    (state: RootState) => state.booking.bookingInfo,
  );
  const stand = useSelector((state: RootState) => state.booking.stand);
  const addOns = useSelector((state: RootState) => state.booking.addOns);
  const selectedAddOns = addOns.filter((a) => a.selected);

  const [paymentOption, setPaymentOption] = useState<"now" | "later">("now");
  const cardFormRef = useRef<CardFormRef | null>(null);

  const handlePayment = async () => {
    let cardDetails = null;

    if (paymentOption === "now") {
      if (!cardFormRef.current) {
        alert("Card form not initialized.");
        return;
      }
      const isValid = await cardFormRef.current.validate();
      if (!isValid) {
        alert("Please fill in all card details correctly.");
        return;
      }
      // Read card data directly from the form
      cardDetails = cardFormRef.current.getValues();
    }

    // Build the final payload
    const payload = {
      bookingInfo,
      stand: {
        id: stand.id,
        name: stand.name,
        price: stand.price,
        vatRate: stand.vatRate,
      },
      addOns: selectedAddOns.map((a) => ({
        id: a.id,
        name: a.name,
        quantity: a.quantity,
        price: a.price,
        total: a.price * a.quantity,
      })),
      paymentOption,
      cardDetails,
    };

    console.log("===== FINAL BOOKING PAYLOAD =====");
    console.log(JSON.stringify(payload, null, 2));

    // Simulate payment success
    // On success:
    dispatch(resetBookingInfo());
    dispatch(resetAddOns());
    sessionStorage.removeItem("bookingState");
    router.push(
      `/booking-success?payment_option=${paymentOption === "now" ? "now" : "later"}`,
    );
  };

  return (
    <div className="lg:col-span-2 border p-6 bg-white rounded-xl">
      <div className="bg-white rounded-xl">
        <Image src="/logo.webp" alt="logo" width={110} height={90} />
        <h2 className="text-[32px] font-semibold text-primary mt-5">Payment</h2>
        <p className="lg:text-lg font-normal text-[#4A4C56] mt-3 pb-6 border-b-2">
          Choose how you&apos;d like to pay, then confirm your booking.
        </p>

        {/* Booking Summary */}
        <div className="mt-6 space-y-3 border-b pb-4">
          <h3 className="font-semibold text-2xl">Booking Summary</h3>
          <div className="p-5 space-y-4 bg-[#F2F6F8] rounded-xl overflow-hidden border">
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Company:</span>
              <span className="text-lg font-semibold">
                {bookingInfo.companyName}
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
              <span className="text-lg font-semibold">
                {bookingInfo.phoneNumber}
              </span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-lg">Address:</span>
              <span className="text-lg font-semibold">
                {bookingInfo.companyAddress}
              </span>
            </p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-6">
          <h3 className="font-semibold text-2xl">Select Payment Option</h3>
          <RadioGroup
            value={paymentOption}
            onValueChange={(value) =>
              setPaymentOption(value as "now" | "later")
            }
            className="mt-4 space-y-4"
          >
            {/* Option 1: Payment Now */}
            <div
              className={`
                border-2 rounded-xl p-2 md:p-5 cursor-pointer transition-all
                ${paymentOption === "now" ? "border-primary/10" : "border-gray-200"}
              `}
              onClick={() => setPaymentOption("now")}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-start gap-3">
                  <RadioGroupItem
                    value="now"
                    id="now"
                    className="mt-1
                      [&>span]:hidden 
                      size-6
                      data-[state=unchecked]:border-2 border-gray-300
                      data-[state=checked]:border-3
                      data-[state=checked]:bg-primary
                      data-[state=checked]:border-[#ffffff] data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
                  />
                  <div>
                    <Label
                      htmlFor="now"
                      className="text-xl lg:text-2xl font-semibold cursor-pointer"
                    >
                      Payment Now
                    </Label>
                    <p className="text-[#777980] mt-1 lg:text-xl">
                      Pay full payment for your stand booking confirmation
                    </p>
                  </div>
                </div>
                {paymentOption === "now" && (
                  <div className="space-y-5">
                    <div className="bg-primary/5 p-2 md:p-5 rounded-xl">
                      <div className="font-medium bg-primary/10 border px-4 py-3 rounded-lg flex items-center gap-2 text-primary">
                        <FaCreditCard size={20} /> Credit card
                      </div>
                    </div>
                    <div className="bg-primary/5 p-2 md:p-5 rounded-xl">
                      <h4 className="text-xl font-semibold">Card Details</h4>
                      <CardForm ref={cardFormRef} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Option 2: Payment Later – NO DATE PICKER */}
            <div
              className={`
                border-2 rounded-xl p-2 md:p-5 cursor-pointer transition-all
                ${paymentOption === "later" ? "border-primary/10" : "border-gray-200"}
              `}
              onClick={() => setPaymentOption("later")}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-start gap-3">
                  <RadioGroupItem
                    value="later"
                    id="later"
                    className="mt-1
                      [&>span]:hidden 
                      size-6
                      data-[state=unchecked]:border-2 border-gray-300
                      data-[state=checked]:border-3
                      data-[state=checked]:bg-primary
                      data-[state=checked]:border-[#ffffff] data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="later"
                      className="text-xl lg:text-2xl font-semibold cursor-pointer"
                    >
                      Payment Later
                    </Label>
                    <p className="text-[#777980] mt-1 lg:text-xl">
                      To reserve your stand with pay later, you&apos;ll need to
                      pay up two months before the event starts.
                    </p>
                  </div>
                </div>
                {paymentOption === "later" && (
                  <div className="bg-primary/5 p-2 md:p-5 rounded-xl">
                    <div className="font-medium bg-primary/10 border px-4 py-3 rounded-lg flex items-start gap-2 text-primary">
                      <Info className="shrink-0" size={16} />
                      <span>
                        You&apos;ll need to pay up two months before the event
                        starts. Missing the payment will cancel your booking.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between mt-8">
          <Button onClick={prevStep} variant="outline" className="px-8">
            Back
          </Button>
          <ButtonGroup
            onClick={handlePayment}
            className="px-8 bg-primary text-white"
          >
            Confirm
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
