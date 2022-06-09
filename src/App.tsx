import { useState, useEffect } from "react";

import AutoComplete from "./components/AutoComplete/AutoComplete";

import { getCountries } from "./api";

import "./App.css";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countryList, setCountryList] = useState<string[] | []>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries: string[] = await getCountries();

      setCountryList(countries);
    };

    fetchCountries();
  });

  const onCountrySelect = (country: string): void => {
    setSelectedCountry(country);
  };

  return (
    <div className="app">
      <AutoComplete
        value={selectedCountry}
        resultsList={countryList}
        onResultsItemClick={onCountrySelect}
      />
    </div>
  );
}

export default App;
