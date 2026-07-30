"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import { Button } from "@/components/ui/button";
import { Eye, X, CheckCheck, Copy } from "lucide-react";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StandFilters from "./StandFilters";
import type { StandApiItem } from "@/types/standManagement";
import CustomTable from "@/components/ui/Table";
import { GoDotFill } from "react-icons/go";
import { Column } from "@/types/table";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import MapControls from "@/components/exhibition-map/MapControls";
import BaseMap from "@/components/map/BaseMap";
import StandLayer from "@/components/exhibition-map/StandLayer";
import StandTooltip, {
  TooltipHandle,
} from "@/components/exhibition-map/StandTooltip";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { Stand } from "@/types/stand";
import type { StandStats } from "@/types/standStats";
import { updateStand } from "@/src/redux/features/bookingSlice";
import {
  useGetAdminExhibitionQuery,
  useGetStandStatsQuery,
  useGetAdminStandsQuery,
} from "@/src/redux/api/exhibition/exhibitionApi";
import { Skeleton } from "@/components/ui/skeleton";

type ViewType = "map" | "list";

const StandManagementPageContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  // for map -start
  const tooltipRef = useRef<TooltipHandle>(null);

  useEffect(() => {
    const onScroll = () => {
      tooltipRef.current?.refreshPosition();
    };
    // Dashboard layout scrolls inside <main>, not on window
    const scrollContainer = document.querySelector("main");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", onScroll, { passive: true });
      return () => scrollContainer.removeEventListener("scroll", onScroll);
    }
    // Fallback for layouts where window scrolls
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Book Now handler ────────────────────────────────────────────────────
  const handleBookNow = useCallback(
    (stand: Stand) => {
      dispatch(
        updateStand({
          id: stand.stand_no,
          name: `Stand ${stand.stand_no}`,
          type: stand.standType,
          size: stand.size,
          price: stand.price,
        }),
      );
      router.push("/terms-and-conditions");
    },
    [dispatch, router],
  );

  // Read view from URL
  const viewParam = searchParams.get("view") as ViewType | null;
  const currentView =
    viewParam && (viewParam === "map" || viewParam === "list")
      ? viewParam
      : "list";

  // Read filter values from URL
  const hallFilter = searchParams.get("hall") || "All Halls";
  const categoryFilter = searchParams.get("category") || "All Categories";
  const statusFilter = searchParams.get("status") || "All Status";

  const [page, setPage] = useState(1);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const limit = 8;

  const { data: exhibitionData } = useGetAdminExhibitionQuery(null);
  const { data: standStats, isLoading: isStateLoading } =
    useGetStandStatsQuery(null);
  const {
    data: standsData,
    isLoading,
    isFetching,
  } = useGetAdminStandsQuery({
    hall: hallFilter !== "All Halls" ? hallFilter : undefined,
    category: categoryFilter !== "All Categories" ? categoryFilter : undefined,
    status:
      statusFilter !== "All Status" ? statusFilter.toLowerCase() : undefined,
    page,
    limit,
  });

  const statsData: StandStats[] = standStats?.data ?? [];
  const apiStands = exhibitionData?.data?.stands ?? [];

  const stands: StandApiItem[] = standsData?.data ?? [];
  const meta = standsData?.metaData;

  const pagination = meta
    ? {
        currentPage: meta.currentPage,
        totalPages: meta.totalPages,
        totalItems: meta.totalItems,
        itemsPerPage: meta.itemsPerPage,
      }
    : {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: limit,
      };

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage],
  );

  const handleItemsPerPageChange = (_newPerPage: number) => {
    // Keep fixed at 8 per page as per requirement
  };

  // Check if any filter is active
  const isAnyFilterActive =
    hallFilter !== "All Halls" ||
    categoryFilter !== "All Categories" ||
    statusFilter !== "All Status";

  // Toggle view in URL
  const toggleView = () => {
    const newView = currentView === "map" ? "list" : "map";
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newView);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Update URL when filter changes
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (
      value === "All Halls" ||
      value === "All Categories" ||
      value === "All Status"
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
    // Reset to page 1 when filter changes
    setPage(1);
  };

  // Clear all filters (keep view)
  const clearFilters = () => {
    const params = new URLSearchParams();
    const view = searchParams.get("view");
    if (view) params.set("view", view);
    router.push(`?${params.toString()}`, { scroll: false });
    setPage(1);
  };

  const columns: Column<StandApiItem>[] = [
    {
      header: "Booking ID",
      headerClassName: "text-left",
      accessor: "bookingId",
      render: (value) => {
        const bookingId = value as string | null;
        if (!bookingId) return <span className="ct-text">-</span>;
        const MAX_LENGTH = 28;
        const isLong = bookingId.length > MAX_LENGTH;
        const display = isLong
          ? `${bookingId.slice(0, MAX_LENGTH)}...`
          : bookingId;

        const handleCopy = async () => {
          try {
            await navigator.clipboard.writeText(bookingId);
            setCopiedRef(bookingId);
            toast.success("Booking ID copied to clipboard");
            setTimeout(() => {
              setCopiedRef((prev) => (prev === bookingId ? null : prev));
            }, 2000);
          } catch {
            toast.error("Failed to copy booking ID");
          }
        };

        return (
          <span
            className="ct-text group inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-copy!"
            title={isLong ? bookingId : "Click to copy"}
            onClick={handleCopy}
          >
            <span className="ct-text">{display}</span>
            {copiedRef === bookingId ? (
              <CheckCheck className="size-3.5 text-green-500 shrink-0" />
            ) : (
              <Copy className="size-3.5 text-gray-400 group-hover:text-primary shrink-0" />
            )}
          </span>
        );
      },
      cellClassName: "px-3 py-5 font-medium",
    },
    {
      header: "Stand No",
      accessor: "standNumber",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Hall",
      accessor: "hall",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Category",
      accessor: "category",
      render: (value) => {
        const cat = value as string;
        const colorMap: Record<string, string> = {
          "Standard Size": "bg-[#d3e0fb] text-blue-700 border border-[#BED1F9]",
          "Premium Size 1":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size 2":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size 3":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size A":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size B":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size C":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size D":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Small Size": "bg-[#FBF5EB] text-[#D79930] border border-[#F3E1C1]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[cat] || ""}`}
          >
            {cat}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Price (€)",
      accessor: "price",
      render: (value) => `€${value as number}`,
      cellClassName: "px-3 py-5 font-semibold text-center",
    },
    {
      header: "Status",
      accessor: "isAvailable",
      render: (value) => {
        const isAvail = value as boolean;
        const statusText = isAvail ? "Available" : "Booked";
        const colorMap: Record<string, string> = {
          Available: "bg-[#E9E9EA] border border-[#D4DAE3] text-[#777980]",
          Booked: "bg-[#F6F1E9] border border-[#E6C58C] text-[#D79930]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[statusText] || ""}`}
          >
            <GoDotFill className="size-3" />
            {statusText}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Size",
      accessor: "size",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Exhibitor",
      accessor: "bookedBy",
      render: (value) => {
        const bookedBy = value as { name: string; email: string } | null;
        return bookedBy?.name || "-";
      },
      cellClassName: "px-3 py-5 text-center whitespace-nowrap",
    },
  ];

  return (
    <div>
      {/* heading */}
      <div className="w-full flex gap-4 sm:flex-row justify-between">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Stand Management
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo 2027, Overview for Wednesday, 10 June 2026
          </p>
        </div>
        <Button onClick={toggleView}>
          <Eye />
          View {currentView === "list" ? "Map" : "List"}
        </Button>
      </div>

      {/* state cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-3 gap-5">
        {isStateLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 space-y-3 border"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))
          : statsData.map((stat) => (
              <StateCard2
                title={stat.title}
                value={stat.totalStands}
                key={stat.id}
              />
            ))}
      </div>

      {/* content or data table */}
      {currentView === "list" ? (
        <div className="bg-white rounded-2xl px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <p className="text-text-primary text-lg font-semibold">
              All Stand List
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <StandFilters
                hall={hallFilter}
                category={categoryFilter}
                status={statusFilter}
                onHallChange={(value) => updateFilter("hall", value)}
                onCategoryChange={(value) => updateFilter("category", value)}
                onStatusChange={(value) => updateFilter("status", value)}
              />
              {isAnyFilterActive && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2.25 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition whitespace-nowrap"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          {/* table */}
          <CustomTable
            data={stands}
            columns={columns}
            showIndex={false}
            indexLabel="SN"
            isLoading={isLoading || isFetching}
            emptyMessage="No stands found"
            pagination={pagination}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      ) : (
        <div className="bg-white rounded-[20px] overflow-hidden flex items-center justify-center">
          <div className="w-full relative h-fit bg-white  p-4  ">
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={8}
              centerOnInit
              limitToBounds={true}
              smooth
              wheel={{
                disabled: true,
              }}
              doubleClick={{
                disabled: true,
              }}
              pinch={{
                disabled: false,
              }}
              panning={{
                disabled: false,
              }}
              onPanning={() => {
                tooltipRef.current?.refreshPosition();
              }}
              onZoom={() => {
                tooltipRef.current?.refreshPosition();
              }}
            >
              <MapControls />
              <TransformComponent
                wrapperClass="w-full! h-full! "
                contentClass="w-full!"
              >
                <svg viewBox="0 0 998 1274" className="w-full h-auto">
                  <BaseMap />
                  <StandLayer tooltipRef={tooltipRef} apiStands={apiStands} />
                </svg>
              </TransformComponent>
            </TransformWrapper>
            <StandTooltip
              ref={tooltipRef}
              onBookNow={handleBookNow}
              isAdmin={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StandManagementPageContent;
