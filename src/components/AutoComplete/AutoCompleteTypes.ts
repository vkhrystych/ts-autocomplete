export interface IAutoCompleteProps {
  isLoading: boolean;
  resultsList: string[];
  onResultsItemClick: (itemValue: string) => void;
  onSearchParamChange: (searchParam: string) => void;
}
