"use client";

import ButtonGroup from "@/components/ui/ButtonGroup";
import { UserBooking } from "@/types/booking.types";

interface BookingCardProps {
  stand: UserBooking;
  onCancel?: () => void;
  onViewMap?: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatPrice = (amount: string | number) => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return Number.isNaN(value) ? "0.00" : value.toFixed(2);
};

const BookingCard = ({ stand, onCancel, onViewMap }: BookingCardProps) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="bg-[#005697] p-5 text-white h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{stand.standTitle}</h2>
        </div>

        <div className="mt-2.5 flex-1 ">
          <p>
            <span className="font-semibold">{stand.hall}</span>{" "}
            {stand.category} {stand.size}
          </p>
        </div>
      </div>

      <div>
        {/* Body */}
        <div className="space-y-4 px-5 py-6">
          <InfoRow
            label="Status"
            value={
              <span className="bg-[#5a829c80] text-primary rounded-full px-2 h-6.5 text-sm font-medium flex items-center">
                {stand.status}
              </span>
            }
          />

          <InfoRow
            label="Payment"
            value={
              <span className="font-semibold capitalize">
                {stand.paymentStatus}
              </span>
            }
          />

          <InfoRow
            label="Size"
            value={<span className="font-semibold">{stand.size}</span>}
          />

          <InfoRow
            label="Category"
            value={<span className="font-semibold">{stand.category}</span>}
          />

          <InfoRow
            label="Price"
            value={
              <span className="font-semibold">€ {formatPrice(stand.totalAmount)}</span>
            }
          />

          <InfoRow
            label="Event"
            value={
              <span className="font-semibold">{stand.exhibitionTitle}</span>
            }
          />

          <InfoRow
            label="Location"
            value={
              <span className="font-semibold">{stand.exhibitionLocation}</span>
            }
          />

          <InfoRow
            label="Date"
            value={
              <span className="font-semibold">
                {formatDate(stand.exhibitionStartedAt)}
              </span>
            }
          />
        </div>

        {/* Footer */}
        <div className="px-4 pb-6 flex flex-col-reverse xl:flex-row gap-4 justify-between">
          {/* Uncomment if needed */}
          {/* <Button
          variant="outline"
          className="h-10 px-6"
          onClick={onCancel}
        >
          Booking Cancel
        </Button> */}

          <div className="flex-1">
            <ButtonGroup
              className="h-10 px-10"
              fullWidth
              roundButtonSize="size-10"
              onClick={onViewMap}
            >
              View Map
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-accent text-lg">{label}</span>

      <span className="text-text-primary text-lg">{value}</span>
    </div>
  );
}