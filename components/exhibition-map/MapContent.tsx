"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import StandCategoryAccordion from "./StandCategoryAccordion";
import Image from "next/image";
import BaseMap from "@/components/map/BaseMap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MapControls from "./MapControls";
import StandLayer from "./StandLayer";
import StandTooltip, { type TooltipHandle } from "./StandTooltip";
import type { Stand } from "@/types/stand";
import { updateStandId } from "@/src/redux/features/bookingSlice";
import { useGetExhibitionMapQuery } from "@/src/redux/api/exhibition/exhibitionApi";
import { useGetMeQuery } from "@/src/redux/api/auth/authApi";
import { toast } from "sonner";

const MapContent = () => {
  const { data, isLoading } = useGetExhibitionMapQuery(null, {
    // Always refetch when visiting the map so stand availability is up to date
    // after bookings/payments (even if RTK Query still has cached data)
    refetchOnMountOrArgChange: true,
  });
  const halls = data?.data?.halls;
  const apiStands = data?.data?.stands ?? [];
  const dispatch = useDispatch();
  const router = useRouter();

  // ── Auth state ───────────────────────────────────────────────────────────
  const { data: meData } = useGetMeQuery();
  const user = meData?.data;
  const isLoggedIn = !!user;
  const isAdmin = user?.type === "admin";

  const tooltipRef = useRef<TooltipHandle>(null);

  // ── Book Now handler ────────────────────────────────────────────────────
  const handleBookNow = useCallback(
    (stand: Stand) => {
      if (!isLoggedIn) {
        toast.error("Please sign in before booking a stand");
        const redirectPath = "/exhibition-map";
        router.push(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
        return;
      }
      dispatch(updateStandId(stand.id || stand.stand_no));
      router.push("/terms-and-conditions");
    },
    [dispatch, router, isLoggedIn],
  );

  // ── Reposition tooltip on page scroll ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      tooltipRef.current?.refreshPosition();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoading) {
    return (
      <section className="w-full mt-12 flex flex-col lg:flex-row gap-6 animate-pulse">
        <div className="w-full lg:w-[320px] px-4 py-5 rounded-[20px] bg-white shadow-sm">
          <div className="h-31 w-37.75 mx-auto rounded-lg bg-slate-200" />
          <div className="mt-6 h-6 w-32 rounded bg-slate-200" />
          <div className="mt-4 space-y-3">
            <div className="h-5 w-full rounded bg-slate-100" />
            <div className="h-5 w-5/6 rounded bg-slate-100" />
            <div className="h-5 w-4/6 rounded bg-slate-100" />
            <div className="h-5 w-2/3 rounded bg-slate-100" />
          </div>
        </div>

        <div className="w-full h-fit bg-white overflow-hidden relative p-4 rounded-[20px] shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="h-8 w-36 rounded bg-slate-200" />
          </div>
          <div className="aspect-998/1274 w-full rounded-[16px] bg-slate-100" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full  mt-12 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[320px] px-4 py-5 rounded-[20px] bg-white ">
        <Image
          src="/logo-1.png"
          alt="Logo"
          width={151}
          height={124}
          className="mb-6 mx-auto"
        />

        <h3 className="text-xl font-semibold text-[#1C1F23] mb-6">
          Stand Category
        </h3>
        <StandCategoryAccordion halls={halls} />
      </div>
      <div className="w-full h-fit bg-white overflow-hidden relative p-4 rounded-[20px] ">
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
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
        />
      </div>
    </section>
  );
};

export default MapContent;
