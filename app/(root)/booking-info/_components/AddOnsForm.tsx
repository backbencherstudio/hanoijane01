"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { RootState } from "@/src/redux/store";
import {
  toggleAddOn,
  incrementQuantity,
  decrementQuantity,
  setAddOns,
} from "@/src/redux/slice/bookingSlice";
import { addOns as staticAddOns } from "@/data/addOns";

interface AddOnsFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AddOnsForm = ({ nextStep, prevStep }: AddOnsFormProps) => {
  const dispatch = useDispatch();
  const addOns = useSelector((state: RootState) => state.booking.addOns);

  // Populate store with static add‑ons on mount (replace with API call later)
  useEffect(() => {
    if (addOns.length === 0) {
      dispatch(setAddOns(staticAddOns));
    }
  }, [dispatch, addOns.length]);

  return (
    <div className="lg:col-span-2 border p-6 bg-white rounded-xl">
      <div className="bg-white rounded-xl">
        <Image src="/logo.webp" alt="logo" width={110} height={90} />
        <h2 className="text-[32px] font-semibold text-primary mt-5">
          Optional Add-ons
        </h2>
        <p className="lg:text-lg font-normal text-[#4A4C56] mt-3 pb-6 border-b-2">
          Enhance your stand. All add-ons can also be purchased later from your
          dashboard.
        </p>

        <div className="mt-6">
          <div className="space-y-5">
            {addOns.map((addOn) => (
              <div
                key={addOn.id}
                className="flex items-center justify-between gap-4 p-5 border border-gray-300 rounded-xl"
              >
                <div className="flex items-center flex-1">
                  <input
                    type="checkbox"
                    checked={addOn.selected}
                    onChange={() => dispatch(toggleAddOn(addOn.id))}
                    className="size-6 cursor-pointer"
                  />
                  {addOn.icon && (
                    <div className="bg-primary size-11 rounded-lg flex justify-center items-center ml-3">
                      <Image
                        src={addOn.icon}
                        alt={addOn.name}
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                  <div className="ml-5">
                    <h2 className="text-xl lg:text-2xl text-text-primary font-semibold mb-1">
                      {addOn.name}
                    </h2>
                    <h2 className="lg:text-lg text-[#777980]">
                      {addOn.description}
                    </h2>
                  </div>
                </div>

                <div className="space-y-1 flex flex-col items-end">
                  <p className="text-xl lg:text-2xl font-semibold text-text-primary">
                    ${addOn.price}/{addOn.unit || "piece"}
                  </p>

                  {/* Quantity controls – only show if selected */}

                  <div
                    className={`${!addOn.selected && "opacity-50 cursor-not-allowed"} flex w-fit border border-gray-300 rounded-md items-center overflow-hidden`}
                  >
                    <button
                      onClick={() => dispatch(decrementQuantity(addOn.id))}
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      disabled={addOn.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <p className="px-3 text-lg">{addOn.quantity}</p>
                    <button
                      onClick={() => dispatch(incrementQuantity(addOn.id))}
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button onClick={prevStep} className="px-8" variant="outline">
              Back
            </Button>
            <ButtonGroup onClick={nextStep} type="button" className="px-12.5">
              Next
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnsForm;
