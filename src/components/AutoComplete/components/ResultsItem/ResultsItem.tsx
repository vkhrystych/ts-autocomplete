import { IResultsItemProps } from "./ResultsItemTypes";

const ResultsItem = ({
  searchValue,
  text,
  onClickHandler,
  className,
}: IResultsItemProps): JSX.Element => {
  const generateHighlightedText = (): JSX.Element => {
    if (!searchValue) {
      return <div>{text}</div>;
    }

    const parts = text.split(new RegExp(`(${searchValue})`, "gi"));

    return (
      <>
        {parts.map((part, partIndex) =>
          part.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={partIndex} className="autocomplete-result_highlight">
              {part}
            </span>
          ) : (
            <span key={partIndex}>{part}</span>
          )
        )}
      </>
    );
  };

  const highlightedText: JSX.Element = generateHighlightedText();

  return (
    <li
      key={text}
      onClick={onClickHandler}
      data-id={text}
      className={className}
    >
      {highlightedText}
    </li>
  );
};

export default ResultsItem;
