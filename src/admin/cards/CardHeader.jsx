import React, { useState, useEffect } from "react";
import Path from "../panel/Path";
import { bgGradient } from "../../components/global/global_functions";

const CardHeader = ({ country, card, toggleEditMode, toggleAddMode, headerButtonsStatus }) => {

    return (
        <section>
            {country && <Path country={country} card={card} />}
            <div className="justify-between flex sm:mt-10 sm:px-10 border-b border-gray-300 pb-4">
                <div className="text-3xl sm:text-5xl flex flex-col font-semibold text-[#1B75BB]">
                    <span>IAESTE {country}</span>
                    <span>{card}</span>
                </div>
            </div>
        </section>
    )
}

export default CardHeader;