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
};

const ButtonGroup = ({
  className,
  onClick,
  pathName,
  children,
  variant = "default",
  icon,
}: ButtonGroupProps) => {
  // Determine if we should use a Link (if pathName is provided)
  const isLink = !!pathName;

  // Shared button content (the two buttons)
  const mainButton = (
    <Button variant={variant} className={className}>
      {children}
      <span className={`size-9 rounded-full text-5xl relative border flex md:hidden justify-center items-center`}>
        {icon ? icon : <ArrowUpRight className="size-5" />}
      </span>
    </Button>
  );

  const iconButton = (
    <Button
      variant={variant}
      className={`${className} size-13 hidden md:flex text-5xl relative p-0 `}
    >
      {icon ? icon : <ArrowUpRight className="size-6" />}
    </Button>
  );

  // If it's a link, wrap both buttons inside a single Link
  if (isLink) {
    return (
      <div className="flex">
        <Link href={pathName}>
          {mainButton}
          {iconButton}
        </Link>
      </div>
    );
  }

  // Otherwise, use button elements with onClick
  return (
    <div className="flex">
      <div onClick={onClick}>{mainButton}</div>
      <div onClick={onClick}>{iconButton}</div>
    </div>
  );
};

export default ButtonGroup;
