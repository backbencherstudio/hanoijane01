"use client";

import { Menu } from "lucide-react";

type NavbarProps = {
  setIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  return (
    <div className="h-18 border-b border-gray-300 px-4 flex items-center justify-between">
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
      >
        <Menu className="size-6" />
      </button>

      <h2 className="font-medium">
        Dashboard
      </h2>

      <div>User</div>
    </div>
  );
};

export default Navbar;