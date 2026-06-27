import { defaultCountries } from "react-international-phone";

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const codeToEmoji = (code: string) =>
  code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

export const countries: Country[] = defaultCountries
  .map(([name, iso2, dialCode]) => ({
    code: iso2.toUpperCase(),
    name,
    dialCode: `+${dialCode}`,
    flag: codeToEmoji(iso2),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const findCountryByCode = (code: string) =>
  countries.find((c) => c.code === code.toUpperCase());

export const findCountryByName = (name: string) =>
  countries.find((c) => c.name.toLowerCase() === name.toLowerCase());

export const findCountryByDialCode = (dialCode: string) =>
  countries.find((c) => c.dialCode === dialCode);

export const findCountriesByDialCode = (dialCode: string) =>
  countries.filter((c) => c.dialCode === dialCode);

export const searchCountries = (query: string) => {
  const q = query.toLowerCase();
  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dialCode.includes(query)
  );
};
