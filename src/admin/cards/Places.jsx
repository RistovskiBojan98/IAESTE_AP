import React, { useState, useEffect } from "react";
import { bgGradient, editCardItem, deleteCardItem, saveNewCardItem, getCountryFoodAndDrinks } from "../../components/global/global_functions";
import { cities } from "../../components/cities/cities";
import "./Card.css";

const Places = ({ selectedCountry }) => {
    const [placesData, setPlacesData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
    const [isAddMode, setAddMode] = useState(false)
    const [inputTitleValue, setInputTitleValue] = useState("")
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        if (selectedCountry) {
            const result = cities.find((obj) => obj.country === selectedCountry.name)?.cities ?? [];
            setPlacesData(result)
        }
    }, [selectedCountry]);

    const handleInputTitleChange = (e, index) => {
        const newData = [...placesData];
        newData[index].question = e.target.value;
        setPlacesData(newData);
    }

    // Handle the change in input during editing
    const handleInputDescChange = (e, index) => {
        const newData = [...placesData];
        newData[index].answer = e.target.value; // Update the number in the contact data
        setPlacesData(newData);
    };

    // Toggle edit/save mode for the specific row
    const handleEditClick = (index) => editCardItem(index, editIndex, setEditIndex)

    // Handle delete with confirmation
    const handleDeleteClick = (index) => deleteCardItem(index, placesData, setPlacesData)

    // Handle save new item
    const handleSaveNewItem = () => {
        const newData = [...placesData]
        const newItem = { question: inputTitleValue, answer: inputValue }
        newData.push(newItem)
        setPlacesData(newData)
        setAddMode(false)
        setInputTitleValue("")
        setInputValue("")
        window.alert('Item added successfully!')
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {!!placesData.length && placesData.map((item, index) => (
                <div key={index} className={`p-4 border rounded-lg shadow-lg ${editIndex === index ? 'bg-amber-300 text-black border-black' : "bg-[#1B75BB] text-white"}`}>
                    {/* Title in the top right */}
                    <div className="text-2xl font-semibold">
                        <input
                            type="text"
                            placeholder="Title"
                            value={item.question}
                            onChange={(e) => handleInputTitleChange(e, index)} // Update input value
                            className={`w-full p-1 ${editIndex === index ? "bg-white border-black border" : "bg-transparent"}`} />
                    </div>

                    {/* Value input below buttons */}
                    <div className="text-xl pt-1">
                        <textarea
                            type="text"
                            placeholder="Description"
                            value={item.answer}
                            rows={8}
                            onChange={(e) => handleInputDescChange(e, index)} // Update input value
                            style={{ scrollbarWidth: "thin" }}
                            className={`w-full p-1 border-y ${editIndex === index ? "bg-white border-black border" : "bg-transparent"}`}
                            readOnly={editIndex !== index} // Disable input if not in edit mode
                        />
                    </div>

                    {/* Buttons in the bottom right */}
                    <div className="flex space-x-3 justify-end">
                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => handleDeleteClick(index)}
                            className="btn flex items-center rounded-full border-2 border-red-500 bg-white text-red-500 p-2 hover:bg-red-500 hover:text-white hover:shadow-xl"
                        >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        {/* Edit/Save button */}
                        <button
                            type="button"
                            onClick={() => handleEditClick(index)}
                            className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 ${item.title && item.description ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : "bg-[#F1F1E6] text-black"}`}
                        >
                            <i className={`fa ${editIndex === index ? 'fa-save' : 'fa-pencil-alt'}`} aria-hidden="true"></i>
                        </button>
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
                        <span className="font-semibold">Add a new recommended place</span>
                    </button>
                ) : (
                    <div key="new" className="relative p-4 border rounded-lg shadow-lg bg-amber-300">
                        {/* Title in the top right */}
                        <div className="absolute top-3 left-3 text-2xl font-semibold">
                            <input
                                type="text"
                                placeholder="Title"
                                value={inputTitleValue}
                                onChange={(e) => setInputTitleValue(e.target.value)} // Update input value
                                className="border-2 p-2" />
                        </div>
                        {/* Buttons in the top left */}
                        <div className="absolute top-2 right-2 flex space-x-3">
                            {/* Edit/Save button */}
                            <button
                                type="button"
                                onClick={handleSaveNewItem}
                                className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 ${inputTitleValue && inputValue ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : "bg-[#F1F1E6] text-black"}`}
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
                                placeholder="Description"
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

export default Places;
