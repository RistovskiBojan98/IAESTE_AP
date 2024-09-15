import React from "react";
import austriaLogo from "../../components/generalInformation/images/Austria/austria_flag.png";
import { bgGradient } from "../../components/global/global_functions";
import { componentsCards } from "./ComponentsCards";

const Country = () => {

    const country = {
        id: 1,
        name: "Austria",
        href: "/Austria",
        imageSrc: austriaLogo,
    }

    return (
        <section className="px-10 py-5 w-full">
            <div className="flex flex-row justify-between items-center ">
                <div className="flex items-center mr-auto">
                    <img src={country.imageSrc} alt={country.imageAlt} className="rounded-full h-14 w-14 border" />
                    <span className="text-4xl ml-3 font-semibold">{country.name}</span>
                </div>
                <a className={`btn rounded-md border px-2 py-1 bg-[#1B75BB] text-white font-semibold hover:${bgGradient}`}
                    href={country.href} target="_blank">
                    <i className="fa fa-eye mr-1" />
                    Preview page
                </a>

            </div>
            <div className="mt-10 grid grid-cols-4 gap-4">
                {componentsCards.map(card =>
                    <div className={`bg-gray-100 shadow-xl rounded-lg p-6 text-center text-[#1B75BB] cursor-pointer hover:${bgGradient} hover:text-white`}>
                        {/* Icon at the top */}
                        <div className="text-4xl mb-4">
                            <i className={card.icon} />
                        </div>

                        {/* Title below the icon */}
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