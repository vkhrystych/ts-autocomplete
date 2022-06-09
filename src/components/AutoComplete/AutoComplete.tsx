import { useState, useEffect } from "react";

import { IAutoCompleteProps } from "./AutoCompleteTypes";

import "./AutoComplete.scss";

const AutoComplete = ({
  resultsList,
  value,
  onResultsItemClick,
}: IAutoCompleteProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputBlur = () => {
    setIsFocused(false);
  };

  const onItemClick = (itemValue: string) => {
    onResultsItemClick(itemValue);
  };

  return (
    <form className="autocomplete">
      <input
        placeholder="Please, enter a country"
        className="autocomplete-input"
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        value={value}
      />

      {isFocused && (
        <ul className="autocomplete-results">
          {resultsList.map((result) => {
            return (
              <li
                className="autocomplete-result"
                onClick={() => onItemClick(result)}
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
