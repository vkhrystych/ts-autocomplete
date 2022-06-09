import React, { useState, useRef, useEffect } from "react";

import Loader from "../Loader/Loader";

import { IAutoCompleteProps } from "./AutoCompleteTypes";

import { useDebounce } from "../../hooks";

import "./AutoComplete.scss";

const AutoComplete = ({
  isLoading,
  resultsList,
  onResultsItemClick,
  onSearchParamChange,
}: IAutoCompleteProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchParam = useDebounce<string>(searchValue, 200);
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
    onSearchParamChange(debouncedSearchParam);
  }, [debouncedSearchParam]);

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

  const renderLoader = (): JSX.Element | null =>
    isLoading ? <Loader additionalClassName="autocomplete-loader" /> : null;

  const renderResultsList = () =>
    isFocused ? (
      <ul className="autocomplete-results">
        {resultsList.length ? (
          resultsList.map((result) => {
            const onClickHandler = (): void => {
              onSearchResultClick(result);
            };

            return (
              <li
                key={result}
                onClick={onClickHandler}
                className="autocomplete-result"
              >
                {result}
              </li>
            );
          })
        ) : (
          <div className="autocomplete-result_empty">no results :(</div>
        )}
      </ul>
    ) : null;

  return (
    <form className="autocomplete" ref={autocompleteContainerRef}>
      <input
        placeholder="Please, enter a country"
        className="autocomplete-input"
        value={searchValue}
        onFocus={onInputFocus}
        maxLength={30}
        onChange={onInputChange}
      />

      {renderLoader()}

      {renderResultsList()}
    </form>
  );
};

export default AutoComplete;
