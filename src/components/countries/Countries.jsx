import { useState } from "react";
import { countries } from "./countries";
import css from "../app.module.css"

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
    <div className="bg-white overflow-x-hidden" ref={passRef} id="countries-div">
      <div className={`${css.containerPosition} py-8 px-4 sm:px-6 g:px-8`}>
        <div>
          <h2 className="font-bold text-3xl">
            IAESTE CER & CoRe Member Countries
          </h2>
          <input
            type="text"
            className="p-2 mt-4 max-w-md w-full border border-solid border-black rounded-xl"
            placeholder="Search for a country"
            onChange={onFilterCountriesHandler}
          />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8">
          {displayedCountries.map((country, index) => (
            <div className="text-center" key={index}>
              <a key={country.id} className="group items-center" href={country.href}>
                  <div className="mx-auto h-20 w-20 sm:h-40 sm:w-40">
                    <img
                      src={country.imageSrc}
                      alt={country.imageAlt}
                      className="group-hover:opacity-75 rounded-full hover:scale-105 w-full h-full transition-all duration-300 ease-in-out"
                    />
                </div>
              </a>
              <a href={country.href}>
                <h1 className="my-5 font-semibold text-xl text-[#0B3D59] hover:text-sky-700">
                  IAESTE {country.name}
                </h1>
              </a>
              {/* <button className={`btn text-center text-white text-sm w-1/2 sm:w-1/3 py-2 max-w-20 bg-[#0B3D59] hover:${bgGradient} rounded-2xl`}>
                <a href={country.pdf} target='_blank' rel="noreferrer">
                  <i className="fa-solid fa-download text-white text-lg mr-2"></i>PDF
                  </a>
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
