import React, { useState, useEffect } from "react";
import { countries } from "../../components/countries/countries"
import { bgGradient } from "../../components/global/global_functions";
import { Link } from "react-router-dom";
import { filterCountriesToDisplay } from "../../components/global/global_functions";

const Sidebar = ({ isOpen, selectCountry, country }) => {
    const [selectedCountry, setSelectedCountry] = useState();
    const [displayedCountries, setDisplayedCountries] = useState(countries);

    const handleSelectCountry = (event) => {
        const countryName = event.currentTarget.dataset.name;
        setSelectedCountry(countryName);
        selectCountry(countryName)
    }

    const onFilterCountriesHandler = (event) => {
        const typedCountry = event.target.value;
        setDisplayedCountries(filterCountriesToDisplay(countries, typedCountry))
    }

    useEffect(() => {
        setSelectedCountry(country)
    }, [country])

    return (
        <section className={`fixed z-20 top-0 left-0 bg-gray-100 max-h-screen overflow-y-scroll transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} >
            <ul>
                <li key="admin" className={`border-b-2 text-2xl font-semibold p-5 hover:${bgGradient} hover:text-white cursor-pointer`}>
                    <Link to="/admin">
                        <i className="fa fa-cogs mr-4" aria-hidden="true"></i>ADMIN UI
                    </Link>
                </li>
                <li key="search">
                    <input
                        type="text"
                        className="p-2 my-1 max-w-md w-full rounded-xl border-b-2"
                        placeholder="Search for a country"
                        onChange={onFilterCountriesHandler}
                    />
                </li>
                {displayedCountries.map(country =>
                    <li key={country.id} data-name={country.name} onClick={handleSelectCountry}>
                        <Link to={`/admin/${country.name}`} className={`flex flex-row items-center p-3 border-b border-gray-300 hover:${bgGradient} hover:text-white cursor-pointer ${selectedCountry === country.name ? `${bgGradient} text-white` : ""}`}>
                            <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-10 w-10 border hover:border-white" />
                            <span className="text-lg ml-3 font-semibold">{country.name}</span>
                        </Link>
                    </li>
                )}
            </ul>

        </section>

    )
}

export default Sidebar;