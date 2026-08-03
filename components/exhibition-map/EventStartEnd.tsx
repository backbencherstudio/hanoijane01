"use client";
import React from "react";
import { useGetExhibitionMapQuery } from "@/src/redux/api/exhibition/exhibitionApi";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatEventRange = (startedAt: string, endedAt: string) => {
  const start = new Date(startedAt);
  const end = new Date(endedAt);

  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const startDay = start.getDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  const endDay = end.getDate();
  const year = start.getFullYear();

  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
};

const EventStartEnd = () => {
  const { data, isLoading } = useGetExhibitionMapQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const exhibition = data?.data;

  if (isLoading || !exhibition) {
    return null;
  }

  const eventRange = formatEventRange(exhibition.startedAt, exhibition.endedAt);
  const bookingDeadline = formatDate(exhibition.bookingEndedAt);

  return (
    <p>
      {eventRange} · Booking deadline: {bookingDeadline}
    </p>
  );
};

export default EventStartEnd;
