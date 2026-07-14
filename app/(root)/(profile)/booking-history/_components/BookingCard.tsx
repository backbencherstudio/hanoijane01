"use client";

import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";

export interface StandBooking {
  id: string;
  standName: string;
  standCategory: string;
  standLabel: string;
  status: string;
  type: string;
  size: string;
  area: string;
  price: number;
  event: string;
  date: string;
  canAddOn: boolean;
  paymentDeadline?: string;
}

interface BookingCardProps {
  stand: StandBooking;
  onCancel?: () => void;
  onViewMap?: () => void;
}

const BookingCard = ({
  stand,
  onCancel,
  onViewMap,
}: BookingCardProps) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#005697] p-5 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {stand.standName}
          </h2>
        </div>

        <div className="mt-2.5">
          <p>
            <span className="font-semibold">
              {stand.standCategory}
            </span>{" "}
            {stand.type} {stand.size} {stand.area}
          </p>
        </div>
      </div>

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
          label="Type"
          value={
            <span className="font-semibold">
              {stand.type}
            </span>
          }
        />

        <InfoRow
          label="Size"
          value={
            <>
              <span className="font-semibold">
                {stand.size}
              </span>{" "}
              {stand.area}
            </>
          }
        />

        <InfoRow
          label="Category"
          value={
            <span className="font-semibold">
              {stand.standCategory}
            </span>
          }
        />

        <InfoRow
          label="Price"
          value={
            <span className="font-semibold">
              € {stand.price}
            </span>
          }
        />

        <InfoRow
          label="Event"
          value={
            <span className="font-semibold">
              {stand.event}
            </span>
          }
        />

        <InfoRow
          label="Date"
          value={
            <span className="font-semibold">
              {stand.date}
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
      <span className="text-accent text-lg">
        {label}
      </span>

      <span className="text-text-primary text-lg">
        {value}
      </span>
    </div>
  );
}