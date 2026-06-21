"use client";
import { Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const user: {
  name: string;
  image: string;
  company: string;
  email: string;
  phone: string;
  company_address: string;
  password: string;
  document: string[];
} = {
  name: "Jacob Jones",
  image: "/assets/profile.png",
  company: "The Walt Disney Company",
  email: "jacob@gmail.com",
  phone: "1999999999",
  company_address: "3891 Ranchview Dr. Richardson, California 62639",
  password: "**********",
  document: ["/assets/ita.pdf"],
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const links = [
    { label: "Profile", href: "/profile" },
    { label: "Booking History", href: "/booking-history" },
    { label: "Transaction History", href: "/transaction-history" },
    { label: "Notification", href: "/notification" },
  ];
  return (
    <div className="bg-[#fbfbfd]">
      <section className="max-w-380  mx-auto relative">
        <div className="relative h-80 md:h-100 lg:h-120 xl:h-133.75  rounded-[32px] w-full overflow-hidden border">
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/assets/banner.jpg')] bg-cover bg-center" />
        </div>

        <div className="h-25 md:h-30 lg:h-40 xl:h-55 border"></div>

        {/* Stats box */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-85 md:w-150 lg:w-200 xl:w-300 p-4 md:p-6 lg:p-8 xl:p-10 bg-[url('/assets/texture.webp')] bg-cover bg-center bg-no-repeat rounded-[24px] flex items-center gap-6">
          <div>
            {user?.image ? (
              <Image
                src={user?.image}
                alt={user?.name}
                width={280}
                height={230}
                className="w-20 md:w-35 lg:w-50 xl:w-70 shrink-0"
              />
            ) : (
              <div className="w-20 md:w-35 lg:w-50 shrink-0 xl:w-70 h-57.5 rounded-3xl bg-gray-100 flex justify-center items-center text-gray-400">
                <User className="size-20" />
              </div>
            )}
          </div>
          <div>
            <h2 className=" text-xl md:text-4xl lg:text-5xl font-bold">
              {user?.name}
            </h2>
            <p className="text-accent font-semibold text-base md:text-2xl lg:text-[32px] mt-1 xl:mt-2.5">
              {user?.company}
            </p>
            <div className="flex flex-col gap-2 xl:gap-4 mt-4">
              <p className="text-sm lg:text-xl text-primary flex items-center gap-2">
                <Mail className="size-4" /> {user?.email}
              </p>
              <p className="text-sm lg:text-xl text-primary flex items-center gap-2">
                <Phone className="size-4" /> {user?.phone}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-4 lg:mt-14 mb-14 lg:mb-25 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-8 container">
        <div className="col-span-full md:col-span-3 lg:col-span-3">
          {children}
        </div>
        <div className="row-start-1 md:col-start-4 md:col-span-2 lg:col-start-4 ">
          <ul className="sticky top-0 h-fit bg-white rounded-t-xl overflow-hidden">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.label} href={link.href}>
                  <li
                    className={`text-lg lg:text-xl font-semibold p-6 border-b cursor-pointer transition-all duration-300 ${isActive ? "bg-primary text-white hover:bg-primary/95" : "hover:bg-primary/5"}`}
                  >
                    {link.label}
                  </li>
                </Link>
              );
            })}
            <li className="text-lg lg:text-xl font-semibold p-6  border-b hover:bg-red-500 hover:text-white cursor-pointer">
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
