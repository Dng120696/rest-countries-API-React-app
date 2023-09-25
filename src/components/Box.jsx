import { Link } from "react-router-dom";

function Box({ country, onClick }) {
  const {
    population,
    name,
    region,
    capital,
    flags: { png: countryFlag },
  } = country;
  return (
    <>
      <Link to={`/country/${name}`}>
        <div className="box" onClick={onClick}>
          <div className="country__flag">
            <img src={countryFlag} alt="" />
          </div>
          <div className="country__details">
            <h3 className="country__name">{name}</h3>
            <p className="country__population">
              <span>Population:</span>
              <span> {population.toLocaleString()}</span>
            </p>
            <p className="country__region">
              <span>Region:</span>
              <span> {region}</span>
            </p>
            <p className="county__capital">
              <span>Capital:</span>
              <span> {capital || "No Capital"}</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Box;
