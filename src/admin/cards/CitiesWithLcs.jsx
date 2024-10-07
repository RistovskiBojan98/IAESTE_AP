import React, { useState, useEffect } from "react";
import "./Card.css"
import { committees } from "../../components/committees/committees";
import { bgGradient, editCardItem, deleteCardItem } from "../../components/global/global_functions";

const CitiesWithLcs = ({ selectedCountry }) => {
    const [committeesData, setCommitteesData] = useState([]) // State to manage contact list
    const [editIndex, setEditIndex] = useState(null) // Track which row is being edited
    const [isAddMode, setAddMode] = useState(false)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        if (selectedCountry) {
            const countryName = typeof (selectedCountry) === 'string' ? selectedCountry : selectedCountry?.name;
            const data = committees.find(com => com.country === countryName)
            if (data) setCommitteesData(data.lcs)
        }
    }, [selectedCountry]);

    // Handle the change in input during editing
    const handleInputChange = (e, index) => {
        const newData = [...committeesData]
        newData[index] = e.target.value;
        setCommitteesData(newData)
    }

    // Toggle edit/save mode for the specific row
    const handleEditClick = (index) => editCardItem(index, editIndex, setEditIndex)

    // Handle delete with confirmation
    const handleDeleteClick = (index) => deleteCardItem(index, committeesData, setCommitteesData)

    // handle save new item
    const handleSaveNewItem = () => {
        const newData = [...committeesData, inputValue]
        setCommitteesData(newData)
        setAddMode(false)
        setInputValue("")
        window.alert('Item added successfully!')
    }

    return (
        <div className="elements-position space-y-5 mt-5">
            {!!committeesData.length ? committeesData.map((city, index) => (
                <div key={index} className="flex flex-row font-semibold rounded-md w-full gap-2 sm:gap-5">
                    <input
                        type="text"
                        readOnly={editIndex !== index} // Disable input if not in edit mode
                        value={city}
                        onChange={(e) => handleInputChange(e, index)}
                        className={`p-2 grow text-2xl border-2 border-[#1B75BB] ${editIndex === index ? 'bg-amber-300' : "bg-[#F1F1E6]"}`}
                    />
                    {/* Edit/Save button */}
                    <button
                        type="button"
                        onClick={() => handleEditClick(index)}
                        className={`btn flex items-center rounded-md border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-4 hover:${bgGradient} hover:text-white hover:shadow-xl`}
                    >
                        <i className={`fa ${editIndex === index ? 'fa-save' : 'fa-pencil-alt'}`} aria-hidden="true"></i>
                    </button>

                    {/* Remove button */}
                    <button
                        type="button"
                        onClick={() => handleDeleteClick(index)}
                        className="btn flex items-center rounded-md border-2 border-red-500 bg-white text-red-500 p-4 hover:bg-red-500 hover:text-white hover:shadow-xl"
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            )) : (
                <div>No committees available.</div>
            )}
            <div className="flex">
                {!isAddMode ? (
                    /* Add button */
                    <button
                        type="button"
                        onClick={() => setAddMode(true)}
                        className={`btn flex items-center rounded-md border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-4 hover:${bgGradient} hover:text-white hover:shadow-xl`}
                    >
                        <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                        <span className="font-semibold">Add a new city</span>
                    </button>
                ) : (
                    <div key="new" className="flex flex-row font-semibold rounded-md w-full gap-2 sm:gap-5">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className={`p-2 grow text-2xl border-2 border-[#1B75BB] bg-amber-300`}
                        />
                        {/* Save button */}
                        <button
                            type="button"
                            onClick={handleSaveNewItem}
                            className={`btn flex items-center rounded-md border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-4 hover:${bgGradient} hover:text-white hover:shadow-xl`}
                        >
                            <i className={`fa fa-save`} aria-hidden="true"></i>
                        </button>

                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => setAddMode(false)}
                            className="btn flex items-center rounded-md border-2 border-red-500 bg-white text-red-500 p-4 hover:bg-red-500 hover:text-white hover:shadow-xl"
                        >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CitiesWithLcs