import React, { useState, useRef, useEffect } from "react";

import { IAutoCompleteProps } from "./AutoCompleteTypes";

import "./AutoComplete.scss";

const AutoComplete = ({
  resultsList,
  onResultsItemClick,
  onSearchParamChange,
}: IAutoCompleteProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const autocompleteContainerRef = useRef<HTMLFormElement>(null);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  const onSearchResultClick = (itemValue: string) => {
    onResultsItemClick(itemValue);
    setIsFocused(false);
    setSearchValue("");
  };

  useEffect(() => {
    onSearchParamChange(searchValue);
  }, [searchValue]);

  // create an outside click listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        autocompleteContainerRef.current &&
        !autocompleteContainerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  console.log(isFocused);

  return (
    <form className="autocomplete" ref={autocompleteContainerRef}>
      <input
        placeholder="Please, enter a country"
        className="autocomplete-input"
        value={searchValue}
        onFocus={onInputFocus}
        onChange={onInputChange}
      />

      {resultsList && isFocused && (
        <ul className="autocomplete-results">
          {resultsList.map((result) => {
            const onClickHandler = (): void => {
              onSearchResultClick(result);
            };

            return (
              <li
                key={result}
                className="autocomplete-result"
                onClick={onClickHandler}
              >
                {result}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default AutoComplete;
