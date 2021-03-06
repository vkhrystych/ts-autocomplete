import { countries } from "./db";

export const getCountryBySearchParam = (
  searchParam: string
): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultsList = countries.filter((country) =>
        country.toLowerCase().includes(searchParam.toLowerCase())
      );

      resolve(resultsList);
    }, 500);
  });
};
