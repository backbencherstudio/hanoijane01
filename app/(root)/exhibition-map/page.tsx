import React from "react";
import ExhibitionMapPageBanner from "../../../components/exhibition-map/ExhibitionMapPageBanner";
import ExhibitionMapPageHeadline from "../../../components/exhibition-map/ExhibitionMapPageHeadline";
import MapContent from "@/components/exhibition-map/MapContent";
import EventStartEnd from "@/components/exhibition-map/EventStartEnd";

const ExhibitionMapPage = () => {
  return (
    <div>
      {/* banner section */}
      <ExhibitionMapPageBanner />
      {/* content section */}
      <section className="bg-[#E5EAEC] padding-default">
        <div className="container">
          <ExhibitionMapPageHeadline />
          <div className="lg:text-lg font-semibold text-primary mt-12 py-5.5 bg-primary/10 w-full text-center rounded-lg border border-primary p-4">
            <EventStartEnd />
          </div>
          <MapContent />
        </div>
      </section>
    </div>
  );
};

export default ExhibitionMapPage;
