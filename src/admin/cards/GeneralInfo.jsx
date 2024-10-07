import React, { useState, useEffect } from "react";
import { mapGeneralInfo, editCardItem, bgGradient } from "../../components/global/global_functions";
import "./Card.css";

const GeneralInfo = ({ selectedCountry }) => {
    const [infoData, setInfoData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited

    useEffect(() => {
        if (selectedCountry) {
            const info = mapGeneralInfo(selectedCountry)
            if (info?.data) setInfoData([...info.data])
        };
    }, [selectedCountry]);

    // Handle the change in input during editing
    const handleInputChange = (e, index) => {
        const newData = [...infoData];
        newData[index].role = e.target.value; // Update the number in the contact data
        setInfoData(newData);
    };

    // Toggle edit/save mode for the specific row
    const handleEditClick = (index) => editCardItem(index, editIndex, setEditIndex)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {!!infoData.length && infoData.map((info, index) => (
                <div key={index} className={`relative p-4 border rounded-lg shadow-lg ${editIndex === index ? 'bg-amber-300' : "bg-[#F1F1E6]"}`}>
                    {/* Title in the top right */}
                    <div className="absolute top-3 left-3 text-2xl font-semibold flex flex-row items-center">
                        <img className="rounded-full w-10 h-10 mr-2 border border-black" src={info.imageUrl} alt="" />
                        <span>{info.name}</span>
                    </div>

                    {/* Buttons in the top left */}
                    <div className="absolute top-3 right-3 flex space-x-3">
                        {/* Edit/Save button */}
                        <button
                            type="button"
                            disabled={!info.role}
                            onClick={() => handleEditClick(index)}
                            className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 ${info.role ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : "bg-[#F1F1E6] text-black"}`}
                        >
                            <i className={`fa ${editIndex === index ? 'fa-save' : 'fa-pencil-alt'}`} aria-hidden="true"></i>
                        </button>
                    </div>

                    {/* Value input below buttons */}
                    <div className="mt-12 text-lg">
                        <textarea
                            type="text"
                            placeholder="Description"
                            rows={3}
                            value={info.role}
                            onChange={(e) => handleInputChange(e, index)} // Update input value
                            className="w-full text-center border-2"
                            readOnly={editIndex !== index} // Disable input if not in edit mode
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GeneralInfo;