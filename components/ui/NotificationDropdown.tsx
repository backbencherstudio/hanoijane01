import { Bell, Trash, X } from "lucide-react";
import React from "react";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}
export const notifications = [
  {
    id: "1",
    title: "New booking submitted",
    description: "An exhibitor submitted a new stand request for Gaff Complex.",
    type: "warning",
    createdAt: "2026-07-31T15:58:00Z",
    read: false,
  },
  {
    id: "2",
    title: "Payment received",
    description: "Payment for Stand BK-1042 has been confirmed.",
    type: "success",
    createdAt: "2026-07-31T15:42:00Z",
    read: false,
  },
  {
    id: "3",
    title: "Stand booking cancelled",
    description: "BK-1042 was cancelled by Admin 2. Payment deadline varies.",
    type: "warning",
    createdAt: "2026-07-31T15:00:00Z",
    read: true,
  },
  {
    id: "4",
    title: "Stand 07 marked as manually booked",
    description: "Goff Complex, Standard (3m × 2m)",
    type: "booking",
    createdAt: "2026-07-31T13:20:00Z",
    read: true,
  },
  {
    id: "5",
    title: "New exhibitor registered",
    description: "John Smith successfully created an exhibitor account.",
    type: "info",
    createdAt: "2026-07-30T18:30:00Z",
    read: false,
  },
  {
    id: "6",
    title: "Stand booking approved",
    description: "Booking request BK-1058 has been approved.",
    type: "success",
    createdAt: "2026-07-30T14:10:00Z",
    read: true,
  },
];

const NotificationDropdown = ({
  isOpen,
  onClose,
}: NotificationDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-full md:w-100  absolute top-14 right-0 md:top-8 md:right-4 px-4 md:px-0">
      {/* header */}
      <div className="bg-white rounded-2xl border">
        <div className="h-14 border-b flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-[#0F172A]">Notifications</p>
            <p className="rounded-2xl h-5 w-6 flex items-center justify-center font-semibold border border-primary text-primary bg-primary/10 text-xs">
              4
            </p>
          </div>
          <button className="text-xs text-[#5E5F79] flex items-center gap-1 cursor-pointer">
            <Trash size={12} /> Clear all
          </button>
        </div>
        {/* content */}
        <div className="max-h-100 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-4 flex gap-2 border-b ${notification.read?"":"bg-primary/3"}`}>
              <div className="size-8 shrink-0 flex items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Bell size={14} />
              </div>
              <div className="w-full">
                <div className="w-full flex items-start justify-between">
                  <h6 className="text-sm md:text-base font-semibold text-[#1C1F23]">
                    {notification.title}
                  </h6>
                  <button className="text-xs hover:bg-gray-100 transition-all duration-200 active:scale-98 rounded-full justify-center h-5 w-5 shrink-0 text-[#5E5F79] flex items-center gap-1 cursor-pointer">
                    <X size={12} />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-[#64748B] mt-0.5">
                  {notification.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] md:text-xs text-accent mt-1">
                  <p className="size-1 rounded-full bg-primary shrink-0"></p>2m
                  ago
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* footer */}
        <div className="border-t h-10 flex items-center justify-center">
          <button className="text-xs text-[#5E5F79] flex items-center gap-1 cursor-pointer">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
