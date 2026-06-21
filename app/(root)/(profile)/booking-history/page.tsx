import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Info, Plus } from "lucide-react";
import React from "react";

export const standBookings = [
  {
    id: "A03",
    standName: "Stand A03",
    standLabel: "Block A Standard Stand",
    status: "Booked",
    type: "Standard",
    size: "(3×3m)",
    area: "Indoor Stand",
    event: "ITBA EXPO The NEXT 100",
    date: "14-16 March 2027",
    canAddOn: true,
  },
  {
    id: "B12",
    standName: "Stand B12",
    standLabel: "Block B Premium Stand",
    status: "Reserved",
    type: "Premium",
    size: "(6×3m)",
    area: "Indoor Stand",
    event: "ITBA EXPO The NEXT 100",
    date: "14-16 March 2027",
    canAddOn: true,
    paymentDeadline: "31 January 2027",
  },
];

const BookingHistoryPage = () => {
  return (
    <div className="bg-white p-4 rounded-xl">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-[32px] text-primary font-semibold flex items-center">
          Personal Information
        </h1>
        <p className="lg:text-lg text-accent mt-2 lg:mt-3 pb-6 border-b-2">
          Mange your Bookings
        </p>
      </div>
      <div className="bg-primary/5 p-2 md:p-5 rounded-xl mt-6 space-y-6">
        <p className="px-4 py-5.5 bg-primary text-white font-semibold text-lg flex justify-center items-center rounded-lg">
          March 14–17, 2027 · Booking deadline: Jan 30, 2027{" "}
        </p>
        <div className="font-medium bg-primary/10 border px-4 py-3 rounded-lg flex items-start gap-2 text-primary">
          <Info className="shrink-0" size={16} />
          <span>
            You&apos;ll need to pay up two months before the event starts.
            Missing the payment will cancel your booking.
          </span>
        </div>
      </div>
      {/* cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {standBookings.map((stand) => (
          <div
            key={stand.id}
            className="bg-white border rounded-lg overflow-hidden"
          >
            <div>
              {/* card header */}
              <div
                className={`p-5 ${stand?.status === "Booked" ? "bg-[#D79930] text-white" : "bg-[#E6D8C3] text-black"}`}
              >
                <div className={`flex items-center justify-between`}>
                  <h2 className="text-2xl font-semibold ">
                    {stand?.standName}
                  </h2>
                  <button className="rounded-full border border-primary py-1 px-4 text-primary flex items-center gap-1 hover:bg-primary hover:text-white hover:border-white transition-all duration-300 cursor-pointer active:scale-98">
                    <Plus size={16} /> Add On
                  </button>
                </div>
                <p className="mt-2.5">{stand?.standLabel}</p>
              </div>
              {/* card body */}
              <div className="px-5 py-6 space-y-4">
                <p className="flex justify-between w-full">
                  <span className="text-accent text-lg">Status</span>
                  <span className="text-text-primary text-lg">
                    {stand.status}
                  </span>
                </p>
                <p className="flex justify-between w-full">
                  <span className="text-accent text-lg">Type</span>
                  <span className="text-text-primary text-lg">
                    {stand.type}
                  </span>
                </p>
                <p className="flex justify-between w-full">
                  <span className="text-accent text-lg">Area</span>
                  <span className="text-text-primary text-lg">
                    {stand.area}
                  </span>
                </p>
                <p className="flex justify-between w-full">
                  <span className="text-accent text-lg">Event</span>
                  <span className="text-text-primary text-lg">
                    {stand.event}
                  </span>
                </p>
                <p className="flex justify-between w-full">
                  <span className="text-accent text-lg">Date</span>
                  <span className="text-text-primary text-lg">
                    {stand.date}
                  </span>
                </p>
              </div>
              {/* action button */}
              <div className="flex flex-col-reverse lg:flex-row gap-4 w-full justify-between px-4 pb-6 ">
                <Button variant="outline" className="h-10 px-6 ">
                  Booking Cancel
                </Button>
                <ButtonGroup className="h-10 px-10" fullWidth={true} roundButtonSize="size-10">
                  View Map
                </ButtonGroup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistoryPage;
