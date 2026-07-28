"use client";
import { RootState } from "@/src/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { useGetExhibitionStandQuery } from "@/src/redux/api/exhibition/exhibitionApi";

const BookingInfoCard = () => {
  const { standId } = useSelector((state: RootState) => state.booking);
  const { data: standData, isLoading, error } = useGetExhibitionStandQuery(standId, {
    skip: !standId,
  });

  const stand = standData?.data;

  if (!standId) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg overflow-hidden p-5">
          <p className="text-[#4A4C56]">No stand selected. Please select a stand from the exhibition map.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg overflow-hidden p-5">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stand) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg overflow-hidden p-5">
          <p className="text-red-500">Failed to load stand details. Please try again.</p>
        </div>
      </div>
    );
  }

  const vatRate = stand.vatPercentage / 100;
  const totalPrice = stand.price + stand.price * vatRate;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {/* Stand Info Card */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="bg-primary text-white p-5">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-2xl font-semibold">{stand.title}</h4>
            <p className="bg-[#E6D8C3] px-2 py-1 text-sm text-[#5E3B06] rounded-full font-medium">
              {stand.isAvailable ? "Available" : "Booked"}
            </p>
          </div>
          <p className="mt-2.5">{stand.hall} - Stand {stand.standNumber}</p>
        </div>
        <div className="p-5 mt-4 space-y-4 text-[#4A4C56]">
          <div className="flex items-center justify-between">
            <p className="text-lg">Category</p>
            <p className="text-lg font-semibold">{stand.category}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Size</p>
            <p className="text-lg font-semibold">{stand.size}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Exhibition</p>
            <p className="text-lg font-semibold">{stand.exhibition}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Dates</p>
            <p className="text-lg font-semibold">
              {formatDate(stand.exhibitionStartedAt)} - {formatDate(stand.exhibitionEndedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-5 space-y-4 bg-white rounded-lg text-[#4A4C56]">
        <h4 className="font-semibold text-primary">ORDER SUMMARY</h4>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-lg">{stand.title}</p>
            <p className="text-lg font-semibold">${stand.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">VAT ({Math.round(vatRate * 100)}%)</p>
            <p className="text-lg font-semibold">
              ${(stand.price * vatRate).toFixed(2)}
            </p>
          </div>

          <div className="h-px bg-gray-400"></div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Total Due</p>
          <p className="text-xl text-primary font-bold">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoCard;
