import React from "react";

const CountrySearch = ({countries, searchFilterCountries}) => {
    const onFilterCountriesHandler = (e) => {
        const typedCountry = e.target.value;
        const filteredCountries =  !typedCountry 
            ? countries
            : countries.filter((country) => country.name.toLowerCase().includes(typedCountry.toLowerCase()))
        searchFilterCountries(filteredCountries)
      };

    return (
        <input
            type="text"
            className="p-2 max-w-md w-full border border-solid border-black rounded-xl"
            placeholder="Search for a country"
            onChange={onFilterCountriesHandler}
          />
    )
}

export default CountrySearch;