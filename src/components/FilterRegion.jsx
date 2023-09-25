function FilterRegion({ dispatch, regionVal }) {
  return (
    <select
      className="filter__region"
      value={regionVal}
      onChange={(e) =>
        dispatch({ type: "filterRegion", payload: e.target.value })
      }
    >
      <option value="" disabled>
        Filter by Region
      </option>
      <option value="africa">Afirca</option>
      <option value="americas">America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Ocenia</option>
      <option value="all">All</option>
    </select>
  );
}

export default FilterRegion;
