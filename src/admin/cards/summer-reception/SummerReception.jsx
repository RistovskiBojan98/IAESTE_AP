import React, { useState, useEffect } from "react";
import { summerReception } from "../../../components/summer-recepiton/summerReception";
import Weekend from "./Weekend"
import { bgGradient } from "../../../components/global/global_functions";

const SummerReception = ({ selectedCountry }) => {
    const [weekends, setWeekends] = useState([]);
    const [selectedWeekend, setSelectedWeekend] = useState(null)

    useEffect(() => {
        if (selectedCountry) setWeekends(summerReception[selectedCountry.name])
    }, [selectedCountry]);

    const closePopup = () => {
        setSelectedWeekend(null)
    }

    return (
        <div>
            {selectedWeekend !== null && <Weekend selectedWeekend={selectedWeekend} onClose={closePopup}/>}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10 p-1">
                {!!weekends.length && weekends.map((weekend, index) =>
                    <div key={index} className={`p-4 ${bgGradient} text-white rounded-md flex flex-col`}>
                        <h2 className="font-semibold text-xl md:text-2xl border-b-2 pb-2">{weekend.name}</h2>
                        <div className='flex flex-col mt-2 border-b-2 pb-2 space-y-1'>
                            <div className="flex items-center text-xl">
                                <i className="far fa-calendar-alt mr-2"></i> Date: {weekend.date}
                            </div>
                            <div className="flex items-center text-xl">
                                <i className="fas fa-map-marker-alt mr-2"></i> Location: {weekend.location}
                            </div>
                            <div className="flex items-center text-xl">
                                <i className="fas fa-link mr-1"></i> Link: {weekend.link ? "Added" : "No Registration link"}
                            </div>
                            <div className="flex items-center text-xl">
                                <i className="fas fa-users mr-1"></i> Limit: {weekend.limit ? weekend.limit : "No registration limit"}
                            </div>
                        </div>
                        {/* Buttons in the bottom right */}
                        <div className="flex space-x-3 justify-end mt-2">
                            {/* Remove button */}
                            <button
                                type="button"
                                // onClick={() => handleDeleteClick(index)}
                                className="btn flex items-center rounded-full border-2 border-red-500 bg-white text-red-500 font-semibold p-2 hover:bg-red-500 hover:text-white hover:shadow-xl"
                            >
                                <i className="fa fa-trash mr-2" aria-hidden="true"></i> Delete
                            </button>
                            {/* Edit/Save button */}
                            <button
                                type="button"
                                onClick={() => setSelectedWeekend(weekend)}
                                className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 bg-white text-[#0B3D59] font-semibold hover:bg-[#0B3D59] hover:text-white hover:shadow-xl`}
                            >
                                <i className={`fa fa-pencil-alt mr-2`} aria-hidden="true"></i>Edit
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>

    )
}

export default SummerReception