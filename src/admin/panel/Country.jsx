import React, { useEffect } from "react";
import { bgGradient } from "../../components/global/global_functions";
import { componentsCards } from "./ComponentsCards";
import Path from "./Path";
import { Link } from "react-router-dom";
import { countries } from "../../components/countries/countries";
import { emergencyContacts } from "../../components/emergencyContacts/emergencyContacts";
import { information } from "../../components/generalInformation/information"
import { committees } from "../../components/committees/committees"
import { cities } from "../../components/cities/cities"
import { transport } from "../../components/transport/transport";
import { summerReception } from "../../components/summer-recepiton/summerReception";
import { food, drinks } from "../../components/food/dataFood";
import { funfacts } from "../../components/facts/facts";
import { otherInfo } from "../../components/otherInformation/other";
import { Images } from "../../components/gallery/Images";

const Country = ({ selectedCountry, selectCard }) => {
    // local helper function
    const checkIfCardIsEmpty = (title, countryName) => {
        // find the object from the items list
        // for some items, there's an array column with a specific name that contains the content
        // for the rest, there are only fields not in an array, so the condition is true if the object is found
        const checkIfObjectExists = (list, columnName) => {
            const listObject = list.find(el => el.country === countryName)
            if (!listObject) return true
            if (!columnName) return false
            return !listObject[columnName]?.length
        }

        switch (title) {
            case "Emergency Numbers":
                return checkIfObjectExists(emergencyContacts)
            case "General Information":
                return checkIfObjectExists(information, 'data')
            case "Recommended PlacesCities With LCs":
                return checkIfObjectExists(committees, 'lcs')
            case "Transportation":
                return !transport[countryName]
            case "Recommended Places":
                return checkIfObjectExists(cities, 'cities')
            case "Summer Reception":
                return !summerReception[countryName]
            case "Traditional Cuisine":
                return checkIfObjectExists(food, 'content') && checkIfObjectExists(drinks, 'content')
            case "Fun Facts":
                return checkIfObjectExists(funfacts, 'facts')
            case "Other Information":
                return checkIfObjectExists(otherInfo, 'info')
            case "Gallery":
                return !Images[countryName]
            default:
                return false;
        }
    }

    // replace with a variable when demo is done
    const country = {...countries.find(c => c.name === selectedCountry)}

    // add links to cards
    const cards = componentsCards.map(card => ({
        ...card,
        link: card.title.replace(/\s/g, "-"),
        isEmpty: checkIfCardIsEmpty(card.title, country.name.replace("&", "and").replace(/\s/g, "-"))
    }))

    return (
        !!country ? (
            <section className="px-4 py-2 bg-sky-100 h-full">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col">
                        <Path country={country.name} />
                        <div className="flex items-center justify-center w-full">
                            <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-20 w-20 sm:h-32 sm:w-32 border" />
                            <div className="flex flex-col ml-5 font-bold text-[#1B75BB]">
                                <span className="text=xl sm:text-3xl">IAESTE</span>
                                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">{country.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <a href={country.href} target="_blank" rel="noreferrer"
                            className={`bg-[#1B75BB] shadow-xl space-y-2 rounded-lg p-2 py-6 sm:p-6 text-center text-white cursor-pointer hover:${bgGradient}`}>
                            {/* Top half with the icon */}
                            <div className="flex flex items-center justify-center h-1/2">
                                <i className="fa fa-eye text-4xl aria-hidden='true'" />
                            </div>

                            {/* Bottom half with the title */}
                            <div className="flex grow items-center justify-center h-1/2">
                                <h3 className="text-xl sm:text-2xl font-bold">
                                    Preview page
                                </h3>
                            </div>
                        </a>
                        {cards.map((card, index) =>
                            <Link key={index} to={`/admin/${country.name}/${card.link}`}
                                className={`relative ${card.isEmpty ? "bg-[#F1F1E6]" : "bg-gray-100"} shadow-xl space-y-2 rounded-lg p-2 py-6 sm:p-6 text-center text-[#1B75BB] cursor-pointer hover:${bgGradient} hover:text-white`}>
                                {/* Conditional ribbon when card.isEmpty is true */}
                                {card.isEmpty && (
                                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
                                        Section empty
                                    </div>
                                )}
                                {/* Top half with the icon */}
                                <div className="flex flex items-center justify-center h-1/2">
                                    <i className={`${card.icon} text-4xl aria-hidden="true`} />
                                </div>

                                {/* Bottom half with the title */}
                                <div className="flex grow items-center justify-center h-1/2">
                                    <h3 className="text-xl sm:text-2xl font-bold">
                                        {card.title}
                                    </h3>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        ) : (
            <section className="px-4 py-2 bg-sky-100 h-screen text-[#1B75BB]">
                <div className="my-4 text-center font-bold flex flex-col space-y-4 items-center">
                    <i className="fa fa-triangle-exclamation text-5xl"></i>
                    <h1 className="text-5xl">Country not found</h1>
                    <div className="pt-2 font-bold items-center text-lg">
                        <i className="fa fa-circle-info mr-3"></i>Start by selecting a country from the sidebar to access the country menu
                    </div>
                </div>
            </section>
        )
    )
}

export default Country;