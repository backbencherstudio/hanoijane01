"use client";

import { PanelLeftOpen } from "lucide-react";

type NavbarProps = {
  setIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  return (
    <div className="h-18 border-b border-gray-300 px-4 lg:px-6 flex items-center justify-between">
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
      >
        <PanelLeftOpen className="size-6" />
      </button>

      <h2 className="font-medium">
        Dashboard
      </h2>

      <div>User</div>
    </div>
  );
};

export default Navbar;