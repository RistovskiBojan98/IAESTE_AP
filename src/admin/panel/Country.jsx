import React from "react";
import flag from "../../components/generalInformation/images/Poland/poland_flag.png";
import { bgGradient } from "../../components/global/global_functions";
import { componentsCards } from "./ComponentsCards";

const Country = () => {

    const country = {
        id: 1,
        name: "Poland",
        href: "/Poland",
        imageSrc: flag,
        imageAlt: "Flag"
    }

    return (
        <section className="px-10 py-5 w-full">
            <div className="flex flex-row justify-between items-center ">
                <div className="flex items-center mr-auto">
                    <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-14 w-14 sm:h-20 sm:w-20 border" />
                    <span className="text-4xl sm:text-5xl ml-5 font-bold">{country.name}</span>
                </div>
                <a className={`btn flex items-center gap-2 rounded-md border px-2 py-1 bg-[#1B75BB] text-white font-semibold hover:${bgGradient}`}
                    href={country.href} target="_blank" rel="noreferrer">
                    <i className="fa fa-eye" />
                    <span className="hidden md:block">Preview page</span>
                </a>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {componentsCards.map((card, index) =>
                    <div key={index} className={`bg-gray-100 shadow-xl rounded-lg p-6 text-center text-[#1B75BB] cursor-pointer hover:${bgGradient} hover:text-white`}>
                        <div className="text-4xl mb-4">
                            <i className={`${card.icon} aria-hidden="true"`} />
                        </div>

                        <h3 className="text-2xl font-bold">
                            {card.title}
                        </h3>
                    </div>
                )}
            </div>
        </section>
    )

}

export default Country;