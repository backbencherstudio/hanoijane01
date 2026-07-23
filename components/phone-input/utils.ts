import {
  CountryCode,
  getExampleNumber,
} from "libphonenumber-js";

import examples from "libphonenumber-js/mobile/examples";

export function getMaxNationalLength(country: CountryCode) {
  const example = getExampleNumber(country, examples);

  if (!example) return 15;

  return example.nationalNumber.length;
}