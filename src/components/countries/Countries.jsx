import { useState } from "react";
import { countries } from "./countries";
import classes from "./Countries.module.css";

const Countries = ({ passRef }) => {
  const [displayedCountries, setDisplayedCountries] = useState(countries);

  const onFilterCountriesHandler = (e) => {
    let typedCountry = e.target.value;
    console.log(typeof typedCountry); // string
    if (typedCountry.trim().length > 0) {
      let newCountriesList = countries.filter((country) =>
        country.name.toLowerCase().includes(typedCountry.toLowerCase())
      );
      setDisplayedCountries(newCountriesList);
    } else {
      setDisplayedCountries(countries);
    }
  };

  const redirectToCountry = (countryHref, countryName) => {
    const loadingUrl = `/loading?countryHref=${encodeURIComponent(countryHref)}&countryName=${encodeURIComponent(countryName)}`;
    window.location.href = loadingUrl;
  };


  return (
    <div className="bg-white" ref={passRef} id="countries-div" style={{ overflowX: 'hidden' }}>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div>
          <h2
            className="font-bold"
            style={{ fontSize: "1.5rem", fontWeight: "600" }}
          >
            IAESTE Member Countries
          </h2>
          <input
            type="text"
            placeholder="Search for a country"
            onChange={onFilterCountriesHandler}
            style={{
              padding: "0.5rem",
              paddingLeft: "1rem",
              border: "1px solid black",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "400px",
              marginTop: "1rem",
            }}
          />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {displayedCountries.map((country) => (
            <div className="text-center">
              <a key={country.id}
                href="/"
                className="group items-center"
                onClick={() => redirectToCountry(country.href, country.name)}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white-200 xl:aspect-w-7 xl:aspect-h-7 left-12">
                  <img
                    src={country.imageSrc}
                    alt={country.imageAlt}
                    className={`h-full w-full object-cover object-center group-hover:opacity-75 ${classes.imgHover}`}
                  />
                </div>
              </a>
              <button className="btn text-center text-sm w-1/2 py-2" style={{ backgroundColor: '#0B3D59', color: 'white', borderRadius: '19px' }}>
                <a href={country.pdf} target='_blank' rel="noreferrer">Download PDF</a>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
