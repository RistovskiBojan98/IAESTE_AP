import React from "react";
import { Link } from "react-router-dom";
import { bgGradient } from "../../components/global/global_functions";

const Path = ({ country, card }) => {
    const setPathElements = () => {
        // helper function
        const addPath = (href, text) => {
            back = href
            href += `/${text}`
            pathElements.push({ href, text })
        }
        // add the house icon
        let href = "/admin"
        pathElements.push({ href, text: <i className="fa fa-house"></i> })
        // add the country name
        if (country) addPath(href, country)
        // add the card
        if (card) addPath(href, card)
    }

    let pathElements = []
    let back = "/admin"
    setPathElements();

    return (
        <div className="flex items-center justify-between text-sm sm:text-base md:text-lg mb-2.5 sm:mb-0">
            <Link to={back} className={`btn rounded-md shadow-sm border-2 border-[#1B75BB] text-[#1B75BB] px-2 py-1 hover:${bgGradient} hover:text-white`}>
                <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>Back
            </Link>
            <div className="text-[#1B75BB] gap-2 items-center py-1">
                {pathElements.map((el, index) =>
                    <Link to={el.href} key={index} className="hover:text-sky-500 font-semibold ml-1">{el.text}{(index < pathElements.length - 1) && " >> "}</Link>
                )}
            </div>
        </div>

    )
}

export default Path;