"use client";

import ReactCountryFlag from "react-country-flag";
import { Check, ChevronDown } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";

import { CountryOption, countryOptions } from "./country-data";

interface CountrySelectProps {
  country: CountryOption;
  onSelect: (country: CountryOption) => void;
}

export default function CountrySelect({
  country,
  onSelect,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-full rounded-none border-r"
        >
          <div className="flex items-center gap-2">
            <ReactCountryFlag svg countryCode={country.code} />
            <span className="hidden sm:inline font-medium">{country.code}</span>
            <span>{country.callingCode}</span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-75 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />

          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>

            <CommandGroup>
              {countryOptions.map((item) => (
                <CommandItem
                  key={item.code}
                  value={`${item.name} ${item.callingCode}`}
                  onSelect={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  <ReactCountryFlag svg countryCode={item.code} />

                  <span className="flex-1 ml-2">{item.name}</span>

                  <span className="text-muted-foreground mr-3">
                    {item.callingCode}
                  </span>

                  <Check
                    className={cn(
                      "h-4 w-4",
                      item.code === country.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
