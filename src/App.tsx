import { useState, useEffect } from "react";

import AutoComplete from "./components/AutoComplete/AutoComplete";

import { getCountryBySearchParam } from "./api";

import "./App.css";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countryList, setCountryList] = useState<string[] | []>([]);

  const onCountrySelect = (country: string): void => {
    setSelectedCountry(country);
  };

  const onSearchParamChange = async (searchParam: string) => {
    const updatedCountryList = await getCountryBySearchParam(searchParam);

    setCountryList(updatedCountryList);
  };

  return (
    <div className="app">
      <h3>Selected country: {selectedCountry}</h3>

      <AutoComplete
        resultsList={countryList}
        onResultsItemClick={onCountrySelect}
        onSearchParamChange={onSearchParamChange}
      />
    </div>
  );
}

export default App;
