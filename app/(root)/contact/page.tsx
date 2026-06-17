import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

type Contact = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
};
const contact: Contact[] = [
  {
    icon: Mail,
    title: "Email",
    subtitle: "exhibitors@industryexpo2027.com",
  },
  {
    icon: Phone,
    title: "Phone",
    subtitle: "+971 4 XXX XXXX",
  },
  {
    icon: MapPin,
    title: "Office",
    subtitle: "Dubai World Trade Centre, UAE",
  },
];

const ContactPage = () => {
  return (
    <section className="bg-[#fbfbfd]">
      {" "}
      <div className="container padding-default">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-15">
          {/* left side */}
          <div className="col-span-full lg:col-span-2">
            <Image
              src="/assets/contact.webp"
              alt="contact"
              width={516}
              height={577}
            />
            <div>
              <div className="flex flex-col gap-5 mt-12">
                {contact.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="px-4 py-5 rounded-xl bg-white border border-gray-300 flex gap-3"
                    >
                      <div className="size-8 flex justify-center items-center bg-[#EAF0FF] rounded-full">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-text-primary">
                          {item.title}
                        </h4>
                        <p className="text-lg text-[#777980] mt-2">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* content - right side */}
          <div className="col-span-full lg:col-span-3">right</div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
