import React from "react";
import ExhibitionMapPageBanner from "./_components/ExhibitionMapPageBanner";
import ExhibitionMapPageHeadline from "./_components/ExhibitionMapPageHeadline";
import MapContent from "./_components/MapContent";

const ExhibitionMapPage = () => {
  return (
    <div>
      {/* banner section */}
      <ExhibitionMapPageBanner />
      {/* content section */}
      <section className="bg-[#E5EAEC] padding-default">
        <div className="container">
          <ExhibitionMapPageHeadline />
          <MapContent/>
          {/* footer */}
          <div className="lg:text-lg font-semibold text-primary mt-12 py-5.5 bg-primary/10 w-full text-center rounded-lg border border-primary p-4">
            March 14–17, 2027 · Booking deadline: Jan 30, 2027
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExhibitionMapPage;
