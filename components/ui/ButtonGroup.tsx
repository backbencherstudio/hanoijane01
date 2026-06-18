import React from "react";
import { Button } from "./button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ButtonGroupProps = {
  className?: string;
  onClick?: () => void;
  pathName?: string;
  children: React.ReactNode;
  variant?:
    | "default"
    | "link"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const ButtonGroup = ({
  className,
  onClick,
  pathName,
  children,
  variant = "default",
  icon,
  type,
}: ButtonGroupProps) => {
  // Determine if we should use a Link (if pathName is provided)
  const isLink = !!pathName;

  // Shared button content (the two buttons)
  const mainButton = (
    <Button variant={variant} className={className} type={type}>
      {children}
      <span
        className={`size-9 rounded-full text-5xl relative[#C25B29] flex md:hidden border ${className?.includes("bg-white") && "border-primary"} justify-center items-center`}
      >
        {icon ? icon : <ArrowUpRight className="size-5" />}
      </span>
    </Button>
  );

  const iconButton = (
    <Button
      variant={variant}
      className={`${className} size-13 hidden md:flex text-5xl relative p-0 `}
      type={type}
    >
      {icon ? icon : <ArrowUpRight className="size-6" />}
    </Button>
  );

  // If it's a link, wrap both buttons inside a single Link
  if (isLink) {
    return (
      <div className="flex w-full justify-center items-center">
        <div className="flex-1">
          <Link href={pathName}>{mainButton}</Link>
        </div>
        <div className="shrink-0">
          <Link href={pathName}>{iconButton}</Link>
        </div>
      </div>
    );
  }

  // Otherwise, use button elements with onClick
  return (
    <div className="flex w-full justify-center items-center">
      <div onClick={onClick} className="flex-1">
        {mainButton}
      </div>
      <div onClick={onClick} className="shrink-0">
        {iconButton}
      </div>
    </div>
  );
};

export default ButtonGroup;
