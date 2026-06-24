import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[url('/logo.jpg')] bg-no-repeat bg-center bg-[#0D4264] relative flex justify-center items-center">
      <div className="min-h-screen w-full bg-primary/70 absolute top-0 left-0"></div>
      <div className="z-999">{children}</div>
    </div>
  );
};

export default AuthLayout;
