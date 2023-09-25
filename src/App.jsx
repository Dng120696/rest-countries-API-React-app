import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useReducer, useEffect } from "react";
import CountryDetails from "./components/CountryDetails";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import Header from "./components/Header";

const storedSelectedCountry = localStorage.getItem("selectedCountry");

const storedPreviousCountry = localStorage.getItem("previousCountry");

const parsedSelectedCountry = storedSelectedCountry
  ? JSON.parse(storedSelectedCountry)
  : null;
const parsePreviousCountry = storedPreviousCountry
  ? JSON.parse(storedPreviousCountry)
  : null;

const initialState = {
  isDark: JSON.parse(localStorage.getItem("isDark")) || false,
  status: "loading",
  selectedCountry: parsedSelectedCountry,
  previousCountry: parsePreviousCountry,
  allSelectedCountry: [],
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

      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
      state.lengthSelected = state.allSelectedCountry.length;
      return {
        ...state,
        allSelectedCountry: [...state.allSelectedCountry, selectedCountry],
        selectedCountry: selectedCountry,
      };
    }
    // case "goBack": {
    //   if (state.allSelectedCountry > 2) {
    //     state.lengthSelected -= 2;
    //   } else {
    //     state.lengthSelected--;
    //   }
    //   console.log(state.allSelectedCountry[state.lengthSelected]);
    //   return {
    //     ...state,
    //     selectedCountry: state.allSelectedCountry[state.lengthSelected],
    //   };
    // }
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

  async function fetchCountry() {
    try {
      const res = await fetch(`./src/assets/data.json`);
      const data = await res.json();

      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }
  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <BrowserRouter>
      <div className={`${isDark ? "dark" : ""}`}>
        <div className="wrapper">
          <Header isDark={isDark} dispatch={dispatch} onFetch={fetchCountry} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isDark={isDark}
                  dispatch={dispatch}
                  onFetch={fetchCountry}
                  status={status}
                  newAllCountryData={newAllCountryData}
                  originalAllCountryData={originalAllCountryData}
                  regionVal={regionVal}
                  inputSearchVal={inputSearchVal}
                />
              }
            ></Route>
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
