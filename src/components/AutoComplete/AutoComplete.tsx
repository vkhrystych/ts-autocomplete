import React, { useState, useRef, useEffect } from "react";

import Loader from "./components/Loader/Loader";
import ResultsItem from "./components/ResultsItem/ResultsItem";

import { useDebounce } from "../../hooks";

import { IAutoCompleteProps } from "./AutoCompleteTypes";

import "./AutoComplete.scss";

const AutoComplete = ({
  isLoading,
  resultsList,
  onResultsItemClick,
  onSearchParamChange,
}: IAutoCompleteProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchParam = useDebounce<string>(searchValue, 200);
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const autocompleteContainerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onMouseEnter = (): void => {
    setSelectedItem(-1);
  };

  const onInputFocus = (): void => {
    setIsFocused(true);
  };

  const clearSelectedItem = (): void => {
    setSelectedItem(-1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setSearchValue(value);
    clearSelectedItem();
  };

  const onSearchResultClick = (itemValue: string): void => {
    onResultsItemClick(itemValue);
    setIsFocused(false);
    setSearchValue("");
  };

  const scrollToTheItem = (itemIndex: number): void => {
    const el: HTMLElement | null = document.querySelector(
      '[data-id="' + resultsList[itemIndex] + '"]'
    );

    el?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { key } = e;

    if (key === "Enter") {
      if (selectedItem !== -1) {
        const itemValue = resultsList[selectedItem];
        onSearchResultClick(itemValue);

        inputRef?.current?.blur();

        clearSelectedItem();
      }
    } else if (key === "ArrowDown") {
      if (selectedItem !== resultsList.length - 1) {
        setSelectedItem((selectedItem) => selectedItem + 1);

        scrollToTheItem(selectedItem);
      }
    } else if (key === "ArrowUp") {
      if (selectedItem !== 0) {
        setSelectedItem((selectedItem) => selectedItem - 1);

        scrollToTheItem(selectedItem);
      }
    }
  };

  const onFormSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  useEffect(() => {
    onSearchParamChange(debouncedSearchParam);

    scrollToTheItem(0);
  }, [debouncedSearchParam]);

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

  const renderInput = (): JSX.Element => (
    <input
      ref={inputRef}
      maxLength={30}
      value={searchValue}
      onFocus={onInputFocus}
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      className="autocomplete-input"
      placeholder="Please, enter a country"
    />
  );

  const renderLoader = (): JSX.Element | null =>
    isLoading ? <Loader additionalClassName="autocomplete-loader" /> : null;

  const renderResultsList = () =>
    isFocused && !isLoading ? (
      <ul className="autocomplete-results">
        {resultsList.length ? (
          resultsList.map((result, resultIndex) => {
            const onClickHandler = (): void => {
              onSearchResultClick(result);
            };

            const resultItemClassName: string = `autocomplete-result ${
              resultIndex === selectedItem ? "autocomplete-result_selected" : ""
            }`;

            return (
              <ResultsItem
                key={result}
                text={result}
                searchValue={searchValue}
                onClickHandler={onClickHandler}
                className={resultItemClassName}
              />
            );
          })
        ) : (
          <div className="autocomplete-result_empty">No results</div>
        )}
      </ul>
    ) : null;

  return (
    <form
      onMouseEnter={onMouseEnter}
      className="autocomplete"
      onSubmit={onFormSubmit}
      ref={autocompleteContainerRef}
    >
      {renderInput()}
      {renderLoader()}
      {renderResultsList()}
    </form>
  );
};

export default AutoComplete;
