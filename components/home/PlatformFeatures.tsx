import {
  CalendarCheck,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { FiUpload } from "react-icons/fi";
import { RiLoopRightFill } from "react-icons/ri";
import ButtonGroup from "../ui/ButtonGroup";
type Features = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
};
const PlatformFeatures = () => {
  const features: Features[] = [
    {
      icon: RiLoopRightFill,
      title: "Real-Time Stand Availability",
      subtitle:
        "Live floor plan updates ensure you always see accurate availability. Stands update instantly when bookings or reservations are made.",
    },
    {
      icon: CalendarCheck,
      title: "Online Booking System",
      subtitle:
        "Select your stand, choose your package, and complete your booking entirely online — available 24/7 from any device.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      subtitle:
        "Industry-grade payment processing with support for bank transfers, credit cards, and payment instalment plans.",
    },
    {
      icon: FiUpload,
      title: "Document Upload Management",
      subtitle:
        "Upload trade licences, insurance certificates, and compliance documents directly within your booking dashboard.",
    },
    {
      icon: LayoutDashboard,
      title: "Exhibitor Dashboard",
      subtitle:
        "Track your booking status, outstanding payments, deadlines, and setup schedule from a single, unified dashboard.",
    },
    {
      icon: Settings,
      title: "Admin Management System",
      subtitle:
        "Powerful tools for organizers to manage floor plans, approve exhibitors, review documents, and generate reports.",
    },
  ];
  return (
    <section className="bg-[#f5f5fd] padding-default">
      <div className="container">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
            ✦ Platform Features
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
            Built for Exhibition Excellence
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
            Every tool you need, from first click to final stand setup — in one
            professional platform.
          </p>
        </div>
        {/* content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={index} className="px-6 py-8 rounded-2xl bg-[#0056971A]">
                {/* Icon */}
                <div className=" top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Icon className="h-5.5 w-5.5 text-white" />
                </div>
                <h2 className="text-text-primary text-xl lg:text-2xl font-bold mt-6 lg:mt-10">
                  {feature.title}
                </h2>
                <p className="text-accent text-sm lg:text-base font-normal mt-4">
                  {feature.subtitle}
                </p>
              </div>
            );
          })}
        </div>
        {/* cta button */}
        <div className="w-full flex justify-center mt-12">
          <ButtonGroup className="px-6">
            Explore Full Floor Map
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
