"use client"
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

const NotificationPage = () => {
  const [isAllNotificationsEnabled, setIsAllNotificationsEnabled] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsAllNotificationsEnabled(checked);
    console.log("All Notifications:", checked);
    // Here you would call your API later
  };

  return (
    <div className="p-4 lg:p-6 rounded-2xl bg-white space-y-5">
      <div className="xl:w-1/2 w-full">
        <div className="w-full flex justify-between items-center gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-xl text-text-primary">
              Get All Notifications
            </h4>
            <p className="mt-1 text-sm text-accent">
              Receive all notifications about bookings, payments, and updates
            </p>
          </div>
          <div className="shrink-0">
            <Switch
              checked={isAllNotificationsEnabled}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;