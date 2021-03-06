import { useState } from "react";

import AutoComplete from "./components/AutoComplete/AutoComplete";

import { getCountryBySearchParam } from "./api";

import "./App.css";

function App(): JSX.Element {
  const [isCountryListLoading, setIsCountryListLoading] =
    useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countryList, setCountryList] = useState<string[] | []>([]);

  const onCountrySelect = (country: string): void => {
    setSelectedCountry(country);
  };

  const onSearchParamChange = async (searchParam: string) => {
    if (searchParam) {
      setIsCountryListLoading(true);
    }

    const updatedCountryList: string[] = await getCountryBySearchParam(
      searchParam
    );

    setCountryList(updatedCountryList);

    if (searchParam) {
      setIsCountryListLoading(false);
    }
  };

  return (
    <div className="app">
      <h3>Selected country: {selectedCountry || "None"}</h3>

      <AutoComplete
        isLoading={isCountryListLoading}
        resultsList={countryList}
        onResultsItemClick={onCountrySelect}
        onSearchParamChange={onSearchParamChange}
      />
    </div>
  );
}

export default App;
