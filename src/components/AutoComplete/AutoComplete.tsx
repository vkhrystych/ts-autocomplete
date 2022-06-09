import "./AutoComplete.scss";

const AutoComplete = () => {
  return (
    <form className="autocomplete">
      <input
        placeholder="Please, enter a country"
        className="autocomplete-input"
      />

      <ul className="autocomplete-results"></ul>
    </form>
  );
};

export default AutoComplete;
