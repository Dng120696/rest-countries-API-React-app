import FilterRegion from "./FilterRegion";
import SearchBox from "./SearchCountry";
import SearchBoxAndRegionFilter from "./SearchBoxAndRegionFilter";
import MainContainer from "./MainContainer";
import CountryBox from "./CountryBox";
import { Loading } from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function MainPage({
  dispatch,
  status,
  newAllCountryData,
  regionVal,
  inputSearchVal,
}) {
  return (
    <MainContainer>
      <SearchBoxAndRegionFilter>
        <SearchBox dispatch={dispatch} inputSearchVal={inputSearchVal} />
        <FilterRegion dispatch={dispatch} regionVal={regionVal} />
      </SearchBoxAndRegionFilter>
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorMessage />}
      {status === "success" && (
        <CountryBox newAllCountryData={newAllCountryData} dispatch={dispatch} />
      )}
    </MainContainer>
  );
}
