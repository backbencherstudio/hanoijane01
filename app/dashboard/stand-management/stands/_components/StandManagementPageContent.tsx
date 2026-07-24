"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StandFilters from "./StandFilters";
import {
  StandManagement,
  standManagementData,
} from "@/data/dashboard/standManagementData";
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
import type { Stand } from "@/types/stand";
import { updateStand } from "@/src/redux/features/bookingSlice";

const stateData = [
  {
    title: "Standard Stand",
    value: standManagementData.filter((s) => s.standType === "Standard").length,
  },
  {
    title: "Double Size Stand",
    value: standManagementData.filter((s) => s.standType === "Double").length,
  },
  {
    title: "Outdoor Stand",
    value: standManagementData.filter((s) => s.standType === "Outdoor").length,
  },
];

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
  // for map -end

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
  const typeFilter = searchParams.get("type") || "All types";
  const blockFilter = searchParams.get("block") || "All Block";
  const statusFilter = searchParams.get("status") || "All Status";

  const [filters, setFilters] = useState({ currentPage: 1, perPageItem: 8 });

  // Check if any filter is active
  const isAnyFilterActive =
    typeFilter !== "All types" ||
    blockFilter !== "All Block" ||
    statusFilter !== "All Status";

  // Filter data based on URL params
  const filteredData = standManagementData.filter((item) => {
    const typeMatch =
      typeFilter === "All types" || item.standType === typeFilter;
    const blockMatch =
      blockFilter === "All Block" || item.block === blockFilter;
    const statusMatch =
      statusFilter === "All Status" || item.status === statusFilter;
    return typeMatch && blockMatch && statusMatch;
  });

  const startIndex = (filters.currentPage - 1) * filters.perPageItem;
  const endIndex = startIndex + filters.perPageItem;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / filters.perPageItem);

  const pagination = {
    currentPage: filters.currentPage,
    totalPages,
    totalItems,
    itemsPerPage: filters.perPageItem,
  };

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const handleItemsPerPageChange = (newPerPage: number) => {
    setFilters({ currentPage: 1, perPageItem: newPerPage });
  };

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
      value === "All types" ||
      value === "All Block" ||
      value === "All Status"
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
    // Reset to page 1 when filter changes
    setFilters((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Clear all filters (keep view)
  const clearFilters = () => {
    const params = new URLSearchParams();
    const view = searchParams.get("view");
    if (view) params.set("view", view);
    router.push(`?${params.toString()}`, { scroll: false });
    setFilters((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Log filter changes (optional)
  useEffect(() => {
    console.log("Filters:", {
      type: typeFilter,
      block: blockFilter,
      status: statusFilter,
      view: currentView,
    });
  }, [typeFilter, blockFilter, statusFilter, currentView]);

  const columns: Column<StandManagement>[] = [
    {
      header: "Booking ID",
      headerClassName: "text-left",
      accessor: "bookingId",
      cellClassName: "px-3 py-5 font-medium",
    },
    {
      header: "Stand No",
      accessor: "standNo",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Block",
      accessor: "block",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Stand Type",
      accessor: "standType",
      render: (value) => {
        const type = value as string;
        const colorMap: Record<string, string> = {
          Standard: "bg-[#d3e0fb] text-blue-700 border border-[#BED1F9]",
          Double: "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          Outdoor: "bg-[#FBF5EB] text-[#D79930] border border-[#F3E1C1]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[type] || ""}`}
          >
            {type}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Price ($)",
      accessor: "price",
      render: (value) => `$${value as number}`,
      cellClassName: "px-3 py-5 font-semibold text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          Available: "bg-[#E9E9EA] border border-[#D4DAE3] text-[#777980]",
          Booked: "bg-[#F6F1E9] border border-[#E6C58C] text-[#D79930]",
          Reserved: "bg-[#F9EFEA] border border-[#EDCEBF] text-[#C25B29]",
          Cancelled: "bg-[#FDECEE] border border-[#F9C5CA] text-[#EB3D4D]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[status] || ""}`}
          >
            <GoDotFill className="size-3" />
            {status}
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
      accessor: "exhibitor",
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
        {stateData.map((state) => (
          <StateCard2
            title={state.title}
            value={state.value}
            key={state.title}
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
                type={typeFilter}
                block={blockFilter}
                status={statusFilter}
                onTypeChange={(value) => updateFilter("type", value)}
                onBlockChange={(value) => updateFilter("block", value)}
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
            data={currentData}
            columns={columns}
            showIndex={false}
            indexLabel="SN"
            isLoading={false}
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
                  <StandLayer tooltipRef={tooltipRef} />
                </svg>
              </TransformComponent>
            </TransformWrapper>
            <StandTooltip ref={tooltipRef} onBookNow={handleBookNow} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StandManagementPageContent;