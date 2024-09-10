import { useState } from "react";
import { countries } from "./countries";
import classes from "./Countries.module.css";

const Countries = ({ passRef }) => {
  const [displayedCountries, setDisplayedCountries] = useState(countries);

  const onFilterCountriesHandler = (e) => {
    const typedCountry = e.target.value;
    if (!typedCountry.trim().length) setDisplayedCountries(countries);
    else {
      const newCountriesList = countries.filter((country) =>
        country.name.toLowerCase().includes(typedCountry.toLowerCase())
      );
      setDisplayedCountries(newCountriesList);
    }
  };

  return (
    <div className="bg-white" ref={passRef} id="countries-div" style={{ overflowX: 'hidden' }}>
      <div className="mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div>
          <h2
            className="font-bold"
            style={{ fontSize: "1.5rem", fontWeight: "600" }}
          >
            IAESTE CER & CoRe Member Countries
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
        <div className="mt-12 grid grid-cols-2 gap-y-20 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {displayedCountries.map((country, index) => (
            <div className="text-center" key={index}>
              <a key={country.id}
                className="group items-center"
                href={country.href}>
                  <div className="mx-auto h-20 w-20 sm:h-40 sm:w-40">
                  <img
                    src={country.imageSrc}
                    alt={country.imageAlt}
                    className={`group-hover:opacity-75 rounded-full ${classes.imgHover}`}
                    style={{width:'100%', height:'100%'}}
                  />
                </div>
              </a>
              <a href={country.href}><h1 className="my-5 font-semibold text-xl text-[#0B3D59] hover:text-sky-700">IAESTE {country.name}</h1></a>
              <button className="btn text-center text-sm w-1/2 sm:w-1/3 py-2 max-w-20 hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5]" style={{ backgroundColor: '#0B3D59', color: 'white', borderRadius: '19px' }}>
                <a href={country.pdf} target='_blank' rel="noreferrer"><i className="fa-solid fa-download text-white text-lg mr-2"></i>PDF</a>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
