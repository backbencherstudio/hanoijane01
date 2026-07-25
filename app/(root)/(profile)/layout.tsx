"use client";
import LogOutModal from "@/app/(auth)/_components/LogOutModal";
import { ImageUp, Mail, Phone, Upload, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AddOnContactCTA from "../pricing/_components/AddOnContactCTA";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  setImage,
  setPreview,
} from "@/src/redux/features/profile/profileEditSlice";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/src/redux/api/auth/authApi";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const editing = useAppSelector((state) => state.profileEdit.editing);
  const preview = useAppSelector((state) => state.profileEdit.preview);
  const { data: meData } = useGetMeQuery();
  const user = meData?.data;

  const links = [
    { label: "Profile", href: "/profile" },
    { label: "Booking History", href: "/booking-history" },
    { label: "Transaction History", href: "/transaction-history" },
    // { label: "Notifications", href: "/notifications" },
  ];
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    dispatch(setImage(file));
    dispatch(setPreview(URL.createObjectURL(file)));
  };
  return (
    <div className="bg-[#fbfbfd]">
      <section className="max-w-380  mx-auto relative">
        <div className="relative h-80 md:h-100 lg:h-120 xl:h-133.75  rounded-[32px] w-full overflow-hidden border">
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/assets/banner.jpg')] bg-cover bg-center" />
        </div>

        <div className="h-25 md:h-30 lg:h-40 xl:h-55"></div>

        {/* Stats box */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-85 md:w-150 lg:w-200 xl:w-300 p-4 md:p-6 lg:p-8 xl:p-10 bg-[url('/assets/texture.webp')] bg-cover bg-center bg-no-repeat rounded-[24px] flex items-center gap-6">
          <div className="relative rounded-3xl overflow-hidden">
            {preview || user?.avatar ? (
              <img
                src={preview || user!.avatar || ""}
                alt={user?.name ?? "Profile"}
                className=" w-20 md:w-35 lg:w-50 xl:w-70 h-20 md:h-28 lg:h-42 xl:h-58 object-cover shrink-0"
              />
            ) : (
              <div className="w-20 md:w-35 lg:w-50 xl:w-70 h-20 md:h-28 lg:h-42 xl:h-58 rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                <User className="size-10 md:size-14 lg:size-20" />
              </div>
            )}

            {editing && (
              <>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <label
                  htmlFor="profile-image"
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer transition-opacity hover:bg-black/60"
                >
                  <button
                    type="button"
               
                    className="pointer-events-none text-muted"
                  >
                    <Upload />
                  </button>
                </label>
              </>
            )}
          </div>
          <div>
            <h2 className=" text-xl md:text-4xl lg:text-5xl font-bold">
              {" "}
              {user?.name ? user?.name : "User"}
            </h2>
            <p className="text-accent font-semibold text-base md:text-2xl lg:text-[32px] mt-1 xl:mt-2.5">
              {user?.companyName ? user?.companyName : "Company Name"}
            </p>
            <div className="flex flex-col gap-2 xl:gap-4 mt-4">
              <p className="text-sm lg:text-xl text-primary flex items-center gap-2">
                <Mail className="size-4" />{" "}
                {user?.email ? user?.email : "user@example.com"}
              </p>
              <p className="text-sm lg:text-xl text-primary flex items-center gap-2">
                <Phone className="size-4" />{" "}
                {user?.phoneNumber ? user?.phoneNumber : "+353 1 234 XXXX"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-4 lg:mt-14 pb-14 lg:pb-25 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4  container">
        <div className="col-span-full md:col-span-3 lg:col-span-3 md:mr-8">
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
            <li
              onClick={() => setOpen(true)}
              className="text-lg lg:text-xl font-semibold p-6  border-b hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Log Out
            </li>
          </ul>
        </div>
        {pathname === "/booking-history" && (
          <div className="col-span-full">
            <AddOnContactCTA />
          </div>
        )}
      </div>
      <LogOutModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ProfileLayout;
