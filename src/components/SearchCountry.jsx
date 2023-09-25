function SearchCountry({ dispatch, inputSearchVal }) {
  return (
    <div className="search__box">
      <input
        type="text"
        placeholder="Search a Country..."
        value={inputSearchVal}
        onChange={(e) =>
          dispatch({ type: "searchCountry", payload: e.target.value })
        }
      />
      <small>
        <i className="fa-solid fa-magnifying-glass"></i>
      </small>
    </div>
  );
}

export default SearchCountry;
