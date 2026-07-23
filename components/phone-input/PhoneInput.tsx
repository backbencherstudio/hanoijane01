"use client";

import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

import { PhoneInputProps } from "./types";
import { countryOptions } from "./country-data";
import CountrySelect from "./CountrySelect";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { getMaxNationalLength } from "./utils";

const PhoneInput = ({
  value,
  onChange,
  disabled,
  placeholder = "Enter phone number",
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countryOptions.find((c) => c.code === "IE")!,
  );
  const [displayValue, setDisplayValue] = useState(value);
  const handleChange = (input: string) => {
    // Remove everything except digits
    const digits = input.replace(/\D/g, "");

    // Maximum digits allowed for the selected country
    const maxLength = getMaxNationalLength(selectedCountry.code);

    // Prevent typing more than the allowed digits
    const limitedDigits = digits.slice(0, maxLength);

    // Format while typing
    const formatter = new AsYouType(selectedCountry.code);
    const formatted = formatter.input(limitedDigits);

    // Update the displayed value
    setDisplayValue(formatted);

    // Return E.164 value (or empty string if not yet valid)
    const phone = formatter.getNumber();

    onChange?.(phone?.number ?? "");
  };
  return (
    <div className="flex h-11 w-full overflow-hidden rounded-md border bg-background">
      {/* Country Selector */}
      <CountrySelect country={selectedCountry} onSelect={setSelectedCountry} />

      {/* Phone Number */}
      <Input
        type="tel"
        value={displayValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        className="h-full flex-1 rounded-none border-0 shadow-none focus-visible:ring-0"
      />
    </div>
  );
};

export default PhoneInput;
