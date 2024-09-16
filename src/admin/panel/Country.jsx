import React from "react";
import flag from "../../components/generalInformation/images/Poland/poland_flag.png";
import { bgGradient } from "../../components/global/global_functions";
import { componentsCards } from "./ComponentsCards";
import Path from "./Path";
import { Link } from "react-router-dom";

const Country = ({selectCard}) => {
    // replace with a variable when demo is done
    const country = {
        id: 1,
        name: "Poland",
        href: "/Poland",
        imageSrc: flag,
        imageAlt: "Flag"
    }

    // add links to cards
    const cards = componentsCards.map(card => ({
        ...card,
        link: card.title.replace(/\s/g, "-")
    }))

    return (
        <section className="px-4 py-2 bg-sky-100 h-full">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col">
                    <Path country={country.name}/>
                    <div className="flex items-center justify-center w-full">
                        <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-24 w-24 sm:h-24 sm:w-24 border" />
                        <div className="flex flex-col ml-5 font-bold text-[#1B75BB]">
                            <span className="text-xl">IAESTE</span>
                            <span className="text-5xl">{country.name}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <a  href={country.href} target="_blank" rel="noreferrer"
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
                             className={`bg-gray-100 shadow-xl space-y-2 rounded-lg p-2 py-6 sm:p-6 text-center text-[#1B75BB] cursor-pointer hover:${bgGradient} hover:text-white`}>
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
    )

}

export default Country;