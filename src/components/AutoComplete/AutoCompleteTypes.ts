export interface IAutoCompleteProps {
  resultsList: string[];
  value: string;
  onResultsItemClick: (itemValue: string) => void;
}
