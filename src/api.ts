import { countries } from "./db";

export const getCountries = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(countries);
    }, 1000);
  });
};
