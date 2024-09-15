import React, { useState } from "react";
import { countries } from "../../components/countries/countries"
import { bgGradient } from "../../components/global/global_functions";

const Sidebar = () => {
    const [selectedCountry, setSelectedCountry] = useState();

    const handleSelectCountry = (event) => {
        const countryName = event.currentTarget.dataset.name;
        setSelectedCountry(countryName);
    }

    return (
        <section className="bg-gray-100 border-r border-black max-h-screen overflow-y-scroll" style={{ width: '250px' }}>
            <div className="p-6 border-b-2 text-xl font-semibold">
            <i class="fa fa-cogs mr-2" aria-hidden="true"></i>AP ADMIN UI
            </div>
            <div className="bg-gray-100   hidden sm:block">
                {countries.map(country =>
                    <div key={country.id} data-name={country.name}
                        className={`flex flex-row items-center p-3 border-b border-gray-300 hover:${bgGradient} hover:text-white cursor-pointer ${selectedCountry === country.name ? `${bgGradient} text-white` : ""}`}
                        onClick={handleSelectCountry}
                    >
                        <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-10 w-10 border hover:border-white" />
                        <span className="text-lg ml-3 font-semibold">{country.name}</span>
                    </div>
                )}
            </div>
        </section>

    )
}

export default Sidebar;