"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `
        peer relative inline-flex
        h-7 w-13
        shrink-0 cursor-pointer
        items-center
        rounded-full
        border-0
        transition-colors duration-300

        data-[state=checked]:bg-primary
        data-[state=unchecked]:bg-[#D9D9D9]

        disabled:cursor-not-allowed
        disabled:opacity-50
        `,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="
          block
          size-5
          rounded-full
          bg-white
          shadow-sm

          transition-transform duration-300

          data-[state=checked]:translate-x-[28px]
          data-[state=unchecked]:translate-x-1
        "
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
