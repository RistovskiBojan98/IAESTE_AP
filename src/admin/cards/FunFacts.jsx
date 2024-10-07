import React, { useState, useEffect } from "react";
import { bgGradient, editCardItem, deleteCardItem, saveNewCardItem } from "../../components/global/global_functions";
import { funfacts } from "../../components/facts/facts";
import "./Card.css";

const FunFacts = ({ selectedCountry }) => {
    const [factsData, setFactsData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
    const [isAddMode, setAddMode] = useState(false)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        if (selectedCountry) {
            const facts = funfacts.find((obj) => obj.country === selectedCountry?.name)?.facts ?? [];
            setFactsData(facts)
        }
    }, [selectedCountry]);

    // Handle the change in input during editing
    const handleInputChange = (e, index) => {
        const newData = [...factsData];
        newData[index] = e.target.value; // Update the number in the contact data
        setFactsData(newData);
    };

    // Toggle edit/save mode for the specific row
    const handleEditClick = (index) => editCardItem(index, editIndex, setEditIndex)

    // Handle delete with confirmation
    const handleDeleteClick = (index) => deleteCardItem(index, factsData, setFactsData)

    // Handle save new item
    const handleSaveNewItem = () =>  saveNewCardItem(factsData, inputValue, setFactsData, setAddMode, setInputValue)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {!!factsData.length && factsData.map((fact, index) => (
                <div key={index} className={`relative p-4 border rounded-lg shadow-lg ${editIndex === index ? 'bg-amber-300' : "bg-[#F1F1E6]"}`}>
                    {/* Title in the top right */}
                    <div className="absolute top-3 left-3 text-2xl font-semibold">
                        Fun fact #{index + 1}
                    </div>
                    {/* Buttons in the top left */}
                    <div className="absolute top-2 right-2 flex space-x-3">
                        {/* Edit/Save button */}
                        <button
                            type="button"
                            disabled={!fact}
                            onClick={() => handleEditClick(index)}
                            className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 ${fact ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : "bg-[#F1F1E6] text-black"}`}
                        >
                            <i className={`fa ${editIndex === index ? 'fa-save' : 'fa-pencil-alt'}`} aria-hidden="true"></i>
                        </button>

                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => handleDeleteClick(index)}
                            className="btn flex items-center rounded-full border-2 border-red-500 bg-white text-red-500 p-2 hover:bg-red-500 hover:text-white hover:shadow-xl"
                        >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>

                    {/* Value input below buttons */}
                    <div className="mt-12 text-xl">
                        <textarea
                            type="text"
                            value={fact}
                            rows={4}
                            onChange={(e) => handleInputChange(e, index)} // Update input value
                            className="w-full border-2 p-2"
                            readOnly={editIndex !== index} // Disable input if not in edit mode
                        />
                    </div>
                </div>
            ))}
            <div>
                {!isAddMode ? (
                    /* Add button */
                    <button
                        type="button"
                        onClick={() => setAddMode(true)}
                        className={`btn flex items-center rounded-md border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-4 hover:${bgGradient} hover:text-white hover:shadow-xl`}
                    >
                        <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                        <span className="font-semibold">Add a new fun fact</span>
                    </button>
                ) : (
                    <div key="new" className="relative p-4 border rounded-lg shadow-lg bg-amber-300">
                        {/* Title in the top right */}
                        <div className="absolute top-3 left-3 text-2xl font-semibold">
                            Fun fact #{factsData.length + 1}
                        </div>
                        {/* Buttons in the top left */}
                        <div className="absolute top-2 right-2 flex space-x-3">
                            {/* Edit/Save button */}
                            <button
                                type="button"
                                onClick={handleSaveNewItem}
                                className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 ${inputValue ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : "bg-[#F1F1E6] text-black"}`}
                            >
                                <i className={`fa fa-save`} aria-hidden="true"></i>
                            </button>

                            {/* Remove button */}
                            <button
                                type="button"
                                onClick={() => setAddMode(false)}
                                className="btn flex items-center rounded-full border-2 border-red-500 bg-white text-red-500 p-2 hover:bg-red-500 hover:text-white hover:shadow-xl"
                            >
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </div>

                        {/* Value input below buttons */}
                        <div className="mt-12 text-xl">
                            <textarea
                                type="text"
                                value={inputValue}
                                rows={4}
                                onChange={(e) => setInputValue(e.target.value)} // Update input value
                                className="w-full border-2 p-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FunFacts;
