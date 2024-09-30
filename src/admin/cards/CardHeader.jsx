import React, { useState } from "react";
import Path from "../panel/Path";
import { bgGradient } from "../../components/global/global_functions";

const CardHeader = ({ country, card, toggleEditMode, toggleAddMode }) => {
    const [isAddMode, setIsAddMode] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditMode = () => {
        setIsEditMode(!isEditMode)
        toggleEditMode();
    }

    const handleAddMode = () => {
        setIsAddMode(true)
        toggleAddMode();
    }

    return (
        <section>
            {country && <Path country={country} card={card} />}
            <div className="justify-between flex sm:mt-10 sm:px-10 border-b border-gray-300 pb-4">
                <div className="text-3xl sm:text-5xl flex flex-col font-semibold text-[#1B75BB]">
                    <span>IAESTE {country}</span>
                    <span>{card}</span>
                </div>
                <div className="items-center flex space-x-2 font-semibold">
                    <button
                        disabled={isAddMode || isEditMode}
                        onClick={handleEditMode}
                        className={`btn flex flex-row items-center text-center sm:justify-between rounded-full sm:rounded-md border-2 border-[#1B75BB] bg-[#F1F1E6] text-[#1B75BB] p-3 hover:${bgGradient} hover:text-white hover:shadow-xl `}
                    >
                        <i className="fa fa-pencil-alt sm:mr-2" aria-hidden="true"></i>
                        <span className="hidden sm:block">Edit</span>
                    </button>
                    <button
                        disabled={isAddMode || isEditMode}
                        onClick={handleAddMode}
                        className={`btn flex flex-row items-center text-center sm:justify-between rounded-full sm:rounded-md border-2 bg-[#1B75BB] text-white p-3 hover:${bgGradient} hover:text-white hover:shadow-xl `}
                    >
                        <i className="fa fa-plus sm:mr-2" aria-hidden="true"></i>
                        <span className="hidden sm:block">Add</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CardHeader;