export interface IAutoCompleteProps {
  resultsList: string[];
  onResultsItemClick: (itemValue: string) => void;
  onSearchParamChange: (searchParam: string) => void;
}
