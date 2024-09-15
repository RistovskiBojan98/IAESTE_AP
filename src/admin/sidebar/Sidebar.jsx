import React, { useState } from "react";
import { countries } from "../../components/countries/countries"
import { bgGradient } from "../../components/global/global_functions";

const Sidebar = ({ isOpen, selectCountry, toggleSidebar }) => {
    const [selectedCountry, setSelectedCountry] = useState();

    const handleSelectCountry = (event) => {
        const countryName = event.currentTarget.dataset.name;
        setSelectedCountry(countryName);
        selectCountry(countryName)
    }

    return (
        <section 
            className={`fixed z-20 top-0 left-0 bg-gray-100 border-r border-black max-h-screen overflow-y-scroll transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} >
            <div className="border-b-2 text-2xl font-semibold p-5">
                <i className="fa fa-cogs mr-4" aria-hidden="true"></i>ADMIN UI
            </div>
            {countries.map(country =>
                    <div key={country.id} data-name={country.name}
                        className={`flex flex-row items-center p-3 border-b border-gray-300 hover:${bgGradient} hover:text-white cursor-pointer ${selectedCountry === country.name ? `${bgGradient} text-white` : ""}`}
                        onClick={handleSelectCountry}
                    >
                        <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-10 w-10 border hover:border-white" />
                        <span className="text-lg ml-3 font-semibold">{country.name}</span>
                    </div>
                )}
        </section>

    )
}

export default Sidebar;