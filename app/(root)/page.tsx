import EventDetails from "@/components/home/EventDetails";
import FAQ from "@/components/home/FAQ";
import HowItWorks from "@/components/home/HowItWorks";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import Banner from "@/components/layout/Banner";
import React from "react";

const Home = () => {
  return (
    <div>
      <Banner />
      <EventDetails />
      <HowItWorks />
      <PlatformFeatures />
      <FAQ/>
    </div>
  );
};

export default Home;
