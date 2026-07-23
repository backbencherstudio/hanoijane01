import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

countries.registerLocale(en);

export interface CountryOption {
  code: CountryCode;
  name: string;
  callingCode: string;
}

export const countryOptions: CountryOption[] = getCountries()
  .map((code) => ({
    code,
    name: countries.getName(code, "en") || code,
    callingCode: `+${getCountryCallingCode(code)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));