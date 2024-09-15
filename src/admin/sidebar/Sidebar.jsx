import React, { useState } from "react";
import { countries } from "../../components/countries/countries"
import { bgGradient } from "../../components/global/global_functions";
import useWindowSize from "../../hooks/useScreenSize";

const Sidebar = () => {
    const { height } = useWindowSize();
    const maxHeight = height -70

    const [selectedCountry, setSelectedCountry] = useState();

    const handleSelectCountry = (event) => {
        const countryName = event.currentTarget.dataset.name;
        setSelectedCountry(countryName);
    }

    return (
        <div className="bg-gray-100 border-r border-black overflow-y-scroll hidden sm:block" style={{maxHeight: maxHeight, width: '200px'}}>
            {countries.map(country =>
                <div key={country.id} data-name={country.name}
                    className={`flex flex-row items-center p-3 border-b border-gray-300 hover:${bgGradient} hover:text-white cursor-pointer ${selectedCountry === country.name ? `${bgGradient} text-white` : ""}`}
                    onClick={handleSelectCountry}
                >
                    <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-10 w-10 border hover:border-white"/>
                    <span className="text-lg ml-3 font-semibold">{country.name}</span>
                </div>
            )}
        </div>
    )
}

export default Sidebar;