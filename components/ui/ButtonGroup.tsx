import React from "react";
import { Button } from "./button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ButtonGroupProps = {
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  pathName?: string;
  children: React.ReactNode;
  roundButtonSize?: string;
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
  fullWidth = false,
  onClick,
  pathName,
  children,
  variant = "default",
  icon,
  type,
  roundButtonSize = "size-13",
}: ButtonGroupProps) => {
  const isLink = !!pathName;

  const renderIcon = () => (
    <span className="inline-block transition-transform duration-300 ease-in-out group-hover:rotate-45">
      {icon ? icon : <ArrowUpRight className="size-6" />}
    </span>
  );

  const mainButton = (
    <Button
      variant={variant}
      className={`${className} ${fullWidth ? "w-full" : "w-fit"}`}
      type={type}
    >
      {children}
    </Button>
  );

  const iconButton = (
    <Button
      variant={variant}
      className={`${className} ${roundButtonSize} flex text-5xl relative p-0`}
      type={type}
    >
      {renderIcon()}
    </Button>
  );

  // If it's a link
  if (isLink) {
    return (
      <div
        className={`group flex justify-center items-center ${fullWidth ? "w-full" : ""}`}
      >
        <div className={fullWidth ? "flex-1" : ""}>
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
    <div
      className={`group flex justify-center items-center ${fullWidth ? "w-full" : ""}`}
    >
      <div onClick={onClick} className={fullWidth ? "flex-1" : ""}>
        {mainButton}
      </div>
      <div onClick={onClick} className="shrink-0">
        {iconButton}
      </div>
    </div>
  );
};

export default ButtonGroup;