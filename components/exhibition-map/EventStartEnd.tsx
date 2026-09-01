"use client";
import React from "react";
import { useGetExhibitionMapQuery } from "@/src/redux/api/exhibition/exhibitionApi";

const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${weekday} ${month} ${day}${getOrdinalSuffix(day)} ${year}`;
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
