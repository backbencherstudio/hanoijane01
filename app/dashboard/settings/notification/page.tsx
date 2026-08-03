"use client"
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import {
  useGetAdminSettingQuery,
  useUpdateAdminSettingMutation,
} from "@/src/redux/api/notification/notificationApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";

const NotificationPage = () => {
  const { data, isLoading } = useGetAdminSettingQuery();
  const [updateAdminSetting, { isLoading: isUpdating }] =
    useUpdateAdminSettingMutation();
  // Local override for optimistic updates; null means use the fetched value
  const [localValue, setLocalValue] = useState<boolean | null>(null);

  const isAllNotificationsEnabled =
    localValue ?? data?.data?.notification ?? false;

  const handleSwitchChange = async (checked: boolean) => {
    // Optimistically update the UI
    setLocalValue(checked);

    try {
      await updateAdminSetting({ notification: checked }).unwrap();
      toast.success(
        checked
          ? "All notifications enabled"
          : "All notifications disabled"
      );
    } catch (error) {
      // Revert on failure
      setLocalValue(null);
      toast.error(getErrorMessage(error, "Failed to update notification settings"));
    }
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
              disabled={isLoading || isUpdating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;