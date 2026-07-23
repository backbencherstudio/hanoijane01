import { CountryCode } from "libphonenumber-js";

export interface Country {
  code: CountryCode;
  name: string;
  callingCode: string;
}

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;

  defaultCountry?: CountryCode;

  disabled?: boolean;

  placeholder?: string;

  className?:string;
}