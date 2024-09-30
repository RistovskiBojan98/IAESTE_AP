import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgGradient } from "../../components/global/global_functions";

const Path = ({ country, card }) => {
    const [pathElements, setPathElements] = useState([]);

    useEffect(() => {
        const elements = [];
        // helper function
        const addPath = (href, text) => {
            href += `/${text}`
            elements.push({ href, text })
        }
        // add the house icon
        let href = "/admin"
        elements.push({ href, text: <i className="fa fa-house"></i> })
        // add the country name
        if (country) addPath(href, country)
        // add the card
        if (card) addPath(href, card)
        setPathElements(elements)
    }, [country, card])

    return (
        <div className="flex items-center justify-between text-sm sm:text-base md:text-lg mb-2.5 sm:mb-0">
            <div className="text-[#1B75BB] gap-2 items-center py-1">
                {pathElements.map((el, index) =>
                    <Link to={el.href} key={index} className="hover:text-sky-500 font-semibold ml-1 items-center">{el.text}{(index < pathElements.length - 1) && " /"}</Link>
                )}
            </div>
        </div>

    )
}

export default Path;