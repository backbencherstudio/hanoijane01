"use client";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import React from "react";
import StateCard from "./StateCard";
import SkeletonWrapper from "@/components/ui/SkeletonWrapper";
import StateCardSkeleton from "./StateCardSkeleton";

const DashboardStats = () => {
  const { stateData, statsLoading } = useDashboardStats();
  return (
    <div>
      {statsLoading ? (
        <SkeletonWrapper
          skeletonItem={<StateCardSkeleton />}
          className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          quantity={4}
        />
      ) : (
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stateData.map((state, idx) => {
            return <StateCard state={state} key={idx} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
