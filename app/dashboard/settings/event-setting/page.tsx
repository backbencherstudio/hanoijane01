"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

// Mock event data
const mockEvent = {
  eventName: "ITBA EXPO The NEXT 100",
  eventDate: "2027-03-14",
  venue: "Dubai World Trade Centre, UAE",
  bookingDeadline: "2027-01-30",
};

interface EventFormData {
  eventName: string;
  eventDate: string;
  venue: string;
  bookingDeadline: string;
}

const EventSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    defaultValues: {
      eventName: mockEvent.eventName,
      eventDate: mockEvent.eventDate,
      venue: mockEvent.venue,
      bookingDeadline: mockEvent.bookingDeadline,
    },
  });

  const onSubmit = (data: EventFormData) => {
    console.log("Event Settings Data:", data);
    // Here you would send data to your API
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDiscard = () => {
    reset({
      eventName: mockEvent.eventName,
      eventDate: mockEvent.eventDate,
      venue: mockEvent.venue,
      bookingDeadline: mockEvent.bookingDeadline,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 lg:p-6 rounded-2xl bg-white space-y-5">
            {/* Event Name */}
            <div className="xl:w-1/2">
              <label htmlFor="eventName" className="font-medium">
                Event Name <span className="text-red-600">*</span>
              </label>
              <Controller
                name="eventName"
                control={control}
                rules={{ required: "Event name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="eventName"
                    placeholder="Enter event name"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.eventName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eventName.message}
                </p>
              )}
            </div>

            {/* Event Date */}
            <div className="xl:w-1/2">
              <label htmlFor="eventDate" className="font-medium">
                Event Date <span className="text-red-600">*</span>
              </label>
              <Controller
                name="eventDate"
                control={control}
                rules={{ required: "Event date is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="eventDate"
                    type="date"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.eventDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            {/* Venue / Location */}
            <div className="xl:w-1/2">
              <label htmlFor="venue" className="font-medium">
                Venue / Location <span className="text-red-600">*</span>
              </label>
              <Controller
                name="venue"
                control={control}
                rules={{ required: "Venue is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="venue"
                    placeholder="Enter venue location"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.venue && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.venue.message}
                </p>
              )}
            </div>

            {/* Booking Deadline */}
            <div className="xl:w-1/2">
              <label htmlFor="bookingDeadline" className="font-medium">
                Booking Deadline <span className="text-red-600">*</span>
              </label>
              <Controller
                name="bookingDeadline"
                control={control}
                rules={{ required: "Booking deadline is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="bookingDeadline"
                    type="date"
                    disabled={!isEditing}
                    className={`mt-2 ${
                      !isEditing ? "opacity-100! cursor-text! select-text" : ""
                    }`}
                  />
                )}
              />
              {errors.bookingDeadline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bookingDeadline.message}
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
                <Button type="submit" className="px-6">
                  Save changes
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