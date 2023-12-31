import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useReducer, useEffect } from "react";
import CountryDetails from "./components/CountryDetails";
import PageNotFound from "./components/PageNotFound";
import MainPage from "./components/MainPage";
import Header from "./components/Header";

const initialState = {
  isDark: JSON.parse(localStorage.getItem("isDark")) || false,
  status: "loading",
  selectedCountry: JSON.parse(localStorage.getItem("selectedCountry")) || null,
  originalAllCountryData: [],
  newAllCountryData: [],
  regionVal: "",
  inputSearchVal: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "success",
        originalAllCountryData: action.payload,
        newAllCountryData: state.originalAllCountryData,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "getCountry": {
      const selectedCountry = state.newAllCountryData[action.payload];
      return { ...state, selectedCountry };
    }
    case "selectedCountry":
      return { ...state, selectedCountry: action.payload };
    case "searchCountry": {
      const searchCountry =
        action.payload === ""
          ? (state.newAllCountryData = state.originalAllCountryData.filter(
              (country) =>
                country.region.toLowerCase() === state.regionVal ||
                state.regionVal === "all" ||
                state.regionVal === ""
            ))
          : (state.newAllCountryData = state.originalAllCountryData.filter(
              (country) =>
                country.name.toLowerCase().includes(action.payload) &&
                (country.region.toLowerCase() === state.regionVal ||
                  state.regionVal === "all" ||
                  state.regionVal === "")
            ));
      return {
        ...state,
        newAllCountryData: searchCountry,
        inputSearchVal: action.payload,
      };
    }

    case "filterRegion": {
      const filterRegion =
        action.payload === "all"
          ? state.originalAllCountryData
          : state.originalAllCountryData.filter(
              (country) => country.region.toLowerCase() === action.payload
            );
      return {
        ...state,
        newAllCountryData: filterRegion,
        regionVal: action.payload,
        inputSearchVal: "",
      };
    }
    case "reset":
      return {
        ...state,
        regionVal: "",
        inputSearchVal: "",
        newAllCountryData: state.originalAllCountryData,
      };
    case "isDarkMode": {
      localStorage.setItem("isDark", JSON.stringify(action.payload));
      return {
        ...state,
        isDark: action.payload,
      };
    }

    default:
      return state;
  }
}

function App() {
  const [
    {
      isDark,
      status,
      newAllCountryData,
      selectedCountry,
      originalAllCountryData,
      regionVal,
      inputSearchVal,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await fetch("./data.json");
        console.log(res);
        const dataCountry = await res.json();
        console.log(dataCountry);
        dispatch({ type: "dataReceived", payload: dataCountry });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchCountry();
  }, []);

  return (
    <BrowserRouter>
      <div className={`${isDark ? "dark" : ""}`}>
        <div className="wrapper">
          <Header isDark={isDark} dispatch={dispatch} />
          <Routes>
            {/* <Route replace element={<MainPage />} /> */}
            <Route
              index
              element={
                <MainPage
                  isDark={isDark}
                  dispatch={dispatch}
                  status={status}
                  newAllCountryData={newAllCountryData}
                  originalAllCountryData={originalAllCountryData}
                  regionVal={regionVal}
                  inputSearchVal={inputSearchVal}
                />
              }
            />
            <Route
              path="country/:name"
              element={
                <CountryDetails
                  isDark={isDark}
                  dispatch={dispatch}
                  selectedCountry={selectedCountry}
                  newAllCountryData={newAllCountryData}
                />
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
