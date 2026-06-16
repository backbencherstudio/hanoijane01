import Banner from "@/components/home/Banner";
import ContactCTA from "@/components/home/ContactCTA";
import EventDetails from "@/components/home/EventDetails";
import FAQ from "@/components/home/FAQ";
import HowItWorks from "@/components/home/HowItWorks";
import InteractiveFloorPlan from "@/components/home/InteractiveFloorPlan";
import PlatformFeatures from "@/components/home/PlatformFeatures";

const Home = () => {
  return (
    <div>
      <Banner />
      <EventDetails />
      <HowItWorks />
      <InteractiveFloorPlan />
      <PlatformFeatures />
      <FAQ />
      <ContactCTA />
    </div>
  );
};

export default Home;
