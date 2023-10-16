import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function CountryDetails({
  isDark,
  dispatch,
  newAllCountryData,
  selectedCountry,
}) {
  const { name } = useParams();

  useEffect(() => {
    const storedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
    if (storedCountry && storedCountry.name === name) {
      dispatch({ type: "selectedCountry", payload: storedCountry });
    } else {
      const country = newAllCountryData.find(
        (country) => country.name === name
      );
      dispatch({ type: "selectedCountry", payload: country });
      localStorage.setItem("selectedCountry", JSON.stringify(country));
    }
  }, [name, newAllCountryData, dispatch]);

  const {
    flags: { svg: flag },
    name: countryName,
    population,
    region,
    subregion,
    capital,
    currencies,
    borders,
    topLevelDomain,
    nativeName,
    languages,
  } = selectedCountry;
  const navigate = useNavigate();

  localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));

  const filterBorder = newAllCountryData.filter((country) => {
    if (!selectedCountry.borders) return;
    return selectedCountry.borders.includes(country.alpha3Code);
  });

  return (
    <div className={isDark ? "dark" : ""}>
      <section className="country__section">
        <div className="country__info">
          <button
            className="btn__back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <div className="country__info-details">
            <div className="flag">
              <img src={flag} alt="flag" />
            </div>
            <section className="info__details">
              <h3>{countryName}</h3>
              <div className="info">
                <div>
                  <p className="native__name">
                    <span>Native Name:</span>
                    <span> {nativeName}</span>
                  </p>
                  <p className="native__name">
                    <span>Population:</span>
                    <span> {population.toLocaleString()}</span>
                  </p>
                  <p className="native__name">
                    <span>Region:</span>
                    <span> {region}</span>
                  </p>
                  <p className="native__name">
                    <span>Sub Region:</span>
                    <span> {subregion}</span>
                  </p>
                  <p className="native__name">
                    <span>Capital:</span>
                    <span> {capital || "No Capital"}</span>
                  </p>
                </div>
                <div>
                  <p className="native__name">
                    <span>Top Level Domain:</span>
                    <span> {topLevelDomain}</span>
                  </p>
                  <p className="native__name">
                    <span>Currencies:</span>
                    <span>
                      {" "}
                      {currencies ? currencies[0].name : "No Currency"}
                    </span>
                  </p>
                  <p className="native__name">
                    <span>Languages:</span>
                    <span> {languages.map((lng) => lng.name).join(",")}</span>
                  </p>
                </div>
              </div>
              <p className="border__countries">
                <span>Border Countries:</span>
                {borders
                  ? filterBorder.map((border) => (
                      <button
                        className="btn__border"
                        key={border.alpha3Code}
                        onClick={() =>
                          dispatch({
                            type: "getCountry",
                            payload: newAllCountryData.findIndex(
                              (country) =>
                                country.name.toLowerCase() ===
                                border.name.toLowerCase()
                            ),
                          })
                        }
                      >
                        <Link to={`/country/${border.name}`}>
                          {" "}
                          {border.name}
                        </Link>
                      </button>
                    ))
                  : " No Border Country"}
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CountryDetails;
