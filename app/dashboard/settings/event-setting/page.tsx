"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, PenLine } from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useGetAdminExhibitionDetailsQuery,
  useUpdateAdminExhibitionMutation,
} from "@/src/redux/api/exhibition/exhibitionApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";

interface EventFormData {
  title: string;
  location: string;
  startedAt: string;
  endedAt: string;
  bookingStatedAt: string;
  bookingEndedAt: string;
}

// Convert ISO date string to YYYY-MM-DD for date inputs
const toDateInputValue = (iso: string) => {
  if (!iso) return "";
  return iso.slice(0, 10);
};

// Convert YYYY-MM-DD to ISO string for the API
const toIso = (date: string) => {
  if (!date) return "";
  return new Date(date).toISOString();
};

const EventSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useGetAdminExhibitionDetailsQuery();
  const [updateAdminExhibition, { isLoading: isUpdating }] =
    useUpdateAdminExhibitionMutation();

  const exhibition = data?.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    defaultValues: {
      title: "",
      location: "",
      startedAt: "",
      endedAt: "",
      bookingStatedAt: "",
      bookingEndedAt: "",
    },
  });

  // Populate form when data loads
  React.useEffect(() => {
    if (exhibition) {
      reset({
        title: exhibition.title ?? "",
        location: exhibition.location ?? "",
        startedAt: toDateInputValue(exhibition.startedAt),
        endedAt: toDateInputValue(exhibition.endedAt),
        bookingStatedAt: toDateInputValue(exhibition.bookingStatedAt),
        bookingEndedAt: toDateInputValue(exhibition.bookingEndedAt),
      });
    }
  }, [exhibition, reset]);

  const onSubmit = async (formData: EventFormData) => {
    try {
      await updateAdminExhibition({
        title: formData.title,
        location: formData.location,
        startedAt: toIso(formData.startedAt),
        endedAt: toIso(formData.endedAt),
        bookingStatedAt: toIso(formData.bookingStatedAt),
        bookingEndedAt: toIso(formData.bookingEndedAt),
      }).unwrap();

      toast.success("Event settings updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update event settings"));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDiscard = () => {
    if (exhibition) {
      reset({
        title: exhibition.title ?? "",
        location: exhibition.location ?? "",
        startedAt: toDateInputValue(exhibition.startedAt),
        endedAt: toDateInputValue(exhibition.endedAt),
        bookingStatedAt: toDateInputValue(exhibition.bookingStatedAt),
        bookingEndedAt: toDateInputValue(exhibition.bookingEndedAt),
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 rounded-2xl bg-white space-y-5">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 lg:p-6 rounded-2xl bg-white space-y-5">
            {/* Event Name */}
            <div className="xl:w-1/2">
              <label htmlFor="title" className="font-medium">
                Event Name <span className="text-red-600">*</span>
              </label>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Event name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    placeholder="Enter event name"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Venue / Location */}
            <div className="xl:w-1/2">
              <label htmlFor="location" className="font-medium">
                Venue / Location <span className="text-red-600">*</span>
              </label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Venue is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="location"
                    placeholder="Enter venue location"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Event Start Date */}
            <div className="xl:w-1/2">
              <label htmlFor="startedAt" className="font-medium">
                Event Start Date <span className="text-red-600">*</span>
              </label>
              <Controller
                name="startedAt"
                control={control}
                rules={{ required: "Event start date is required" }}
                render={({ field }) => (
                  <div className="relative mt-2">
                    <Input
                      {...field}
                      id="startedAt"
                      type="date"
                      disabled={!isEditing}
                      className={`[&::-webkit-calendar-picker-indicator]:hidden pr-10 ${
                        !isEditing
                          ? "opacity-100! cursor-text! select-text"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById(
                          "startedAt",
                        ) as HTMLInputElement;
                        if (input) input.showPicker?.();
                      }}
                      disabled={!isEditing}
                    >
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                )}
              />
              {errors.startedAt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startedAt.message}
                </p>
              )}
            </div>

            {/* Event End Date */}
            <div className="xl:w-1/2">
              <label htmlFor="endedAt" className="font-medium">
                Event End Date <span className="text-red-600">*</span>
              </label>
              <Controller
                name="endedAt"
                control={control}
                rules={{ required: "Event end date is required" }}
                render={({ field }) => (
                  <div className="relative mt-2">
                    <Input
                      {...field}
                      id="endedAt"
                      type="date"
                      disabled={!isEditing}
                      className={`[&::-webkit-calendar-picker-indicator]:hidden pr-10 ${
                        !isEditing
                          ? "opacity-100! cursor-text! select-text"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById(
                          "endedAt",
                        ) as HTMLInputElement;
                        if (input) input.showPicker?.();
                      }}
                      disabled={!isEditing}
                    >
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                )}
              />
              {errors.endedAt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endedAt.message}
                </p>
              )}
            </div>

            {/* Booking Start Date */}
            <div className="xl:w-1/2">
              <label htmlFor="bookingStatedAt" className="font-medium">
                Booking Start Date <span className="text-red-600">*</span>
              </label>
              <Controller
                name="bookingStatedAt"
                control={control}
                rules={{ required: "Booking start date is required" }}
                render={({ field }) => (
                  <div className="relative mt-2">
                    <Input
                      {...field}
                      id="bookingStatedAt"
                      type="date"
                      disabled={!isEditing}
                      className={`[&::-webkit-calendar-picker-indicator]:hidden pr-10 ${
                        !isEditing
                          ? "opacity-100! cursor-text! select-text"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById(
                          "bookingStatedAt",
                        ) as HTMLInputElement;
                        if (input) input.showPicker?.();
                      }}
                      disabled={!isEditing}
                    >
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                )}
              />
              {errors.bookingStatedAt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bookingStatedAt.message}
                </p>
              )}
            </div>

            {/* Booking End Date */}
            <div className="xl:w-1/2">
              <label htmlFor="bookingEndedAt" className="font-medium">
                Booking End Date <span className="text-red-600">*</span>
              </label>
              <Controller
                name="bookingEndedAt"
                control={control}
                rules={{ required: "Booking end date is required" }}
                render={({ field }) => (
                  <div className="relative mt-2">
                    <Input
                      {...field}
                      id="bookingEndedAt"
                      type="date"
                      disabled={!isEditing}
                      className={`[&::-webkit-calendar-picker-indicator]:hidden pr-10 ${
                        !isEditing
                          ? "opacity-100! cursor-text! select-text"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById(
                          "bookingEndedAt",
                        ) as HTMLInputElement;
                        if (input) input.showPicker?.();
                      }}
                      disabled={!isEditing}
                    >
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                )}
              />
              {errors.bookingEndedAt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bookingEndedAt.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-4 lg:gap-6 justify-end lg:justify-start">
            {!isEditing ? (
              <Button type="button" className="px-6" onClick={handleEdit}>
                Edit <PenLine className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-6"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
                <Button type="submit" className="px-6" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save changes"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventSettingsPage;