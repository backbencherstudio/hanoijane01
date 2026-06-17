import { standPackages } from "@/data/standPackages";
import PriceCard from "./_components/PriceCard";
import OptionalExtras from "./_components/OptionalExtras";
import SecurePaymentOptions from "./_components/SecurePaymentOptions";

const PricingPage = () => {
  return (
    <div>
      {/* banner section */}
      <section className="max-w-380 h-80 md:h-100 lg:h-120 xl:h-133.75 mx-auto rounded-4xl overflow-hidden flex justify-center items-center bg-[url('/assets/pricing-banner.webp')] bg-cover bg-center padding-default relative">
        <div className="bg-black/50 absolute top-0 left-0 w-full h-full contrast-75"></div>
        <div className="container relative  z-10">
          {/* Heading */}
          <div className="flex flex-col items-center mx-auto text-center justify-center max-w-150 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold tracking-tight  leading-8 md:leading-10 lg:leading-16">
              Simple, Transparent Exhibition Pricing
            </h2>

            <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-xl font-normal">
              Choose from Standard, Double, or Outdoor stands. No hidden fees.
              Everything you need to make your mark at Industry Expo 2027.
            </p>
          </div>
        </div>
      </section>
      {/* content section */}
      <section className="bg-white padding-default">
        <div className="container">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29] mb-4">
              ✦ Interactive Floor Plan
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-8 md:leading-10 lg:leading-12">
              Exhibition Pricing
            </h2>

            <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-accent font-normal">
              Choose a plan that suits your business needs
            </p>
          </div>

          {/* pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {standPackages.map((standPackage, idx) => (
              <PriceCard standPackage={standPackage} key={idx} />
            ))}
          </div>
        </div>
      </section>
      {/* Optional Extras section*/}
      <OptionalExtras />
      <SecurePaymentOptions/>
    </div>
  );
};

export default PricingPage;
