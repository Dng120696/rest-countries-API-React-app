import Box from "./Box";

function CountryBox({ newAllCountryData, dispatch }) {
  return (
    <section className="country__box">
      {newAllCountryData.map((country, index) => {
        return (
          <Box
            key={index}
            country={country}
            onClick={() =>
              dispatch({
                type: "getCountry",
                payload: index,
              })
            }
          />
        );
      })}
    </section>
  );
}

export default CountryBox;
