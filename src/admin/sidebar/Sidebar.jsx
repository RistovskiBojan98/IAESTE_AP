import React, { useState, useEffect } from "react";
import { countries } from "../../components/countries/countries"
import { bgGradient } from "../../components/global/global_functions";
import { Link } from "react-router-dom";
import CountrySearch from "../../components/global/CountrySearch";

const Sidebar = ({ isOpen, selectCountry, country }) => {
    const [selectedCountry, setSelectedCountry] = useState(country);
    const [displayedCountries, setDisplayedCountries] = useState(countries);

    const handleSelectCountry = (event) => {
        const countryName = event.currentTarget.dataset.name;
        setSelectedCountry(countryName);
        selectCountry(countryName)
    }

    const searchFilterCountries = (filteredCountries) => setDisplayedCountries(filteredCountries)

    return (
        <section className={`fixed z-20 top-0 left-0 bg-[#F1F1E6] border-r border-[#1B75BB] w-64 max-h-screen min-h-full overflow-y-scroll transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            style={{ scrollbarWidth: "thin" }}
        >
            <ul>
                <li key="admin" className={`border-b-2 text-2xl font-semibold p-5 hover:${bgGradient} hover:text-white cursor-pointer`}>
                    <Link to="/admin">
                        <i className="fa fa-cogs mr-4" aria-hidden="true"></i>ADMIN UI
                    </Link>
                </li>
                <li key="search">
                    <CountrySearch countries={countries} searchFilterCountries={searchFilterCountries} />
                </li>
                {displayedCountries.length ? displayedCountries.map(country =>
                    <li key={country.id} data-name={country.name} onClick={handleSelectCountry}>
                        <Link to={`/admin/${country.name}`} className={`flex flex-row items-center p-3 border-b border-gray-300 hover:${bgGradient} hover:text-white cursor-pointer ${selectedCountry === country.name ? `${bgGradient} text-white` : ""}`}>
                            <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-10 w-10 border hover:border-white" />
                            <span className="text-lg ml-3 font-semibold text-wrap">{country.name}</span>
                        </Link>
                    </li>
                ) : (
                    <li className="flex justify-center items-center mt-2 font-semibold text-lg">
                        <i className="fa fa-triangle-exclamation mr-2"></i>No countires found
                    </li>
                )}
            </ul>
        </section>
    )
}

export default Sidebar;