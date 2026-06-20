import { Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const user: {
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
  company: string;
  email: string;
  phone: string;
  company_address: string;
  password: string;
  document: string[];
} = {
  first_name: "Jacob",
  middle_name: "",
  last_name: "Jones",
  image: "/assets/profile.png",
  company: "The Walt Disney Company",
  email: "jacob@gmail.com",
  phone: "(225) 555-0118",
  company_address: "3891 Ranchview Dr. Richardson, California 62639",
  password: "**********",
  document: ["/assets/ita.pdf"],
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <section className="max-w-380  mx-auto relative">
        <div className="relative h-80 md:h-100 lg:h-120 xl:h-133.75  rounded-[32px] w-full overflow-hidden border">
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/assets/banner.jpg')] bg-cover bg-center" />
        </div>

        <div className="h-9 md:h-15 lg:h-18 xl:h-55 border"></div>

        {/* Stats box */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-85 md:w-150 lg:w-200 xl:w-300 p-10 bg-[url('/assets/texture.webp')] bg-cover bg-center bg-no-repeat rounded-[24px] flex items-center gap-6">
          <div>
            {user?.image ? (
              <Image
                src={user?.image}
                alt={user?.first_name}
                width={280}
                height={230}
              />
            ) : (
              <div className="w-70 h-57.5 rounded-3xl bg-gray-100 flex justify-center items-center text-gray-400">
                <User className="size-20" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {user?.first_name} {user?.middle_name} {user?.last_name}
            </h2>
            <p className="text-accent font-semibold text-xl md:text-2xl lg:text-[32px] mt-2.5">
              {user?.company}
            </p>
            <div className="flex gap-4 mt-4">
              <p className="text-lg lg:text-xl text-primary flex items-center gap-2">
                <Mail /> {user?.email}
              </p>
              <p className="text-lg lg:text-xl text-primary flex items-center gap-2">
                <Phone /> {user?.phone}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div>{children}</div>
    </div>
  );
};

export default ProfileLayout;
