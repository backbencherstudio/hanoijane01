import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[url('/logo.png')] bg-no-repeat bg-center object-cover bg-[#02406d] relative flex justify-center items-center">
      <div className="min-h-screen h-full w-full bg-primary/70 absolute top-0 left-0">
      
      </div>
      <div className="z-998 px-4 min-h-screen w-full flex items-center flex-col py-14">
        {" "}
        <div className="flex justify-center items-center md:block container">
            <Link href="/">
          <Image
            className="z-999 mb-14"
            src="/logo.webp"
            alt="logo"
            width={68}
            height={56}
          />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
