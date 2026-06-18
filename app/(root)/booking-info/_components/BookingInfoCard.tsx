"use client";
import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";

const BookingInfoCard = () => {
  const { stand, addOns } = useSelector((state: RootState) => state.booking);

  // Calculate totals
  const standPrice = stand.price;
  const selectedAddOns = addOns.filter((a) => a.selected);
  const addOnsTotal = selectedAddOns.reduce(
    (sum, a) => sum + a.price * a.quantity,
    0,
  );
  const subtotal = standPrice + addOnsTotal;
  const vat = subtotal * stand.vatRate;
  const total = subtotal + vat;

  return (
    <div className="space-y-4">
      {/* Stand Info Card */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="bg-primary text-white p-5">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-2xl font-semibold">{stand.name}</h4>
            <p className="bg-[#E6D8C3] px-2 py-1 text-sm text-[#5E3B06] rounded-full font-medium">
              Reserved
            </p>
          </div>
          <p className="mt-2.5">Block A {stand.type} stand</p>
        </div>
        <div className="p-5 mt-4 space-y-4 text-[#4A4C56]">
          <div className="flex items-center justify-between">
            <p className="text-lg">Type</p>{" "}
            <p className="text-lg font-semibold">{stand.type}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Size</p>{" "}
            <p className="text-lg font-semibold">{stand.size}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Area</p>{" "}
            <p className="text-lg font-semibold">{stand.area}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Event</p>{" "}
            <p className="text-lg font-semibold">{stand.event}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Date</p>{" "}
            <p className="text-lg font-semibold">{stand.date}</p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-5 space-y-4 bg-white rounded-lg text-[#4A4C56]">
        <h4 className="font-semibold text-primary">ORDER SUMMARY</h4>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-lg">{stand.name}</p>
            <p className="text-lg font-semibold">${standPrice}</p>
          </div>

          {selectedAddOns.map((addOn) => (
            <div key={addOn.id} className="flex items-center justify-between">
              <p className="text-lg">
                {addOn.name} × {addOn.quantity}
              </p>
              <p className="text-lg font-semibold">
                ${addOn.price * addOn.quantity}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <p className="text-lg">VAT ({Math.round(stand.vatRate * 100)}%)</p>
            <p className="text-lg font-semibold">${vat.toFixed(2)}</p>
          </div>
          <div className="h-px bg-gray-400"></div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Total Due</p>
          <p className="text-xl text-primary font-bold">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoCard;
