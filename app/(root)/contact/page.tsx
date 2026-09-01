import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import ContactForm from "./_components/ContactForm";

type Contact = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
};
const contact: Contact[] = [
  {
    icon: Mail,
    title: "Email",
    subtitle: "office@itba.ie",
  },
  {
    icon: Phone,
    title: "Phone",
    subtitle: "(00353) 45 877543",
  },
  {
    icon: MapPin,
    title: "Office",
    subtitle: "Greenhills , Kill , Co Kildare , Ireland.",
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
                      <div className="size-8 flex justify-center items-center bg-[#EAF0FF] shrink-0 rounded-full">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-text-primary">
                          {item.title}
                        </h4>
                        <p className="text-lg text-[#777980] mt-2 break-all">
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
          <div className="col-span-full lg:col-span-3">
            <div className="bg-white rounded-xl p-6">
              <Image src="/logo.webp" alt="logo" width={110} height={90} />
              <h2 className="text-[32px] font-semibold text-primary mt-5">
                Get in touch
              </h2>
              <p className="lg:text-lg font-normal text-[#4A4C56] mt-3 pb-6 border-b-2">
                Our friendly team would love to hear from you.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
