import React, { useState, useEffect } from "react";
import { mapEmergencyContacts, bgGradient, editCardItem, deleteCardItem } from "../../components/global/global_functions";
import { emergencyContacts } from "../../components/emergencyContacts/emergencyContacts";
import "./Card.css";

const EmergencyContacts = ({ selectedCountry }) => {
    const [contactData, setContactData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
    const [showMenu, setShowMenu] = useState(null); // Track which row has the submenu open

    useEffect(() => {
        if (selectedCountry) setContactData([...mapEmergencyContacts(emergencyContacts, selectedCountry)]);
    }, [selectedCountry]);

    // Handle the change in input during editing
    const handleInputChange = (e, index) => {
        const newData = [...contactData];
        newData[index].number = e.target.value; // Update the number in the contact data
        setContactData(newData);
    };

    // Toggle edit/save mode for the specific row
    const handleEditClick = (index) => {
        editCardItem(index, editIndex, setEditIndex);
        setShowMenu(null); // Close menu when editing starts
    };

    // Handle delete with confirmation
    const handleDeleteClick = (index) => {
        deleteCardItem(index, contactData, setContactData);
        setShowMenu(null); // Close menu after delete
    };

    // Toggle the submenu visibility
    const handleMenuClick = (index) => {
        if (showMenu === index) {
            setShowMenu(null); // Close if already open
        } else {
            setShowMenu(index); // Open the submenu
        }
    };

    return (
        <div className="mt-10">
            {!!contactData.length ? (
                <table className="w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-[#F1F1E6]">
                            <th className="p-4 border border-[#1B75BB] text-left">Title</th>
                            <th className="p-4 border border-[#1B75BB] text-left">Emergency Number</th>
                            <th className="p-4 border border-[#1B75BB] text-left w-10">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((contact, index) => (
                            <tr key={index} className={`${editIndex === index ? 'bg-amber-300' : "bg-white"}`}>
                                <td className="p-4 border border-[#1B75BB]">{contact.title}</td>
                                <td className="p-4 border border-[#1B75BB]">
                                    <input
                                        type="text"
                                        placeholder="Emergency number"
                                        value={contact.number}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className={`w-full p-2 border ${editIndex !== index ? "bg-gray-100" : "bg-white"}`}
                                        readOnly={editIndex !== index} // Disable input if not in edit mode
                                    />
                                </td>
                                <td className="p-4 border border-[#1B75BB] justify-center w-10">
                                    {/* Large screen buttons */}
                                    <div className="hidden sm:flex space-x-3">
                                        <button
                                            type="button"
                                            disabled={!contact.number}
                                            onClick={() => handleEditClick(index)}
                                            className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 ${contact.number ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : "bg-[#F1F1E6] text-black"}`}
                                        >
                                            <i className={`fa ${editIndex === index ? 'fa-save' : 'fa-pencil-alt'}`} aria-hidden="true"></i>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(index)}
                                            className="btn flex items-center rounded-full border-2 border-red-500 bg-white text-red-500 p-2 hover:bg-red-500 hover:text-white hover:shadow-xl"
                                        >
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </div>

                                    {/* Small screen - Three dots and submenu */}
                                    <div className="relative sm:hidden">
                                        <button
                                            type="button"
                                            onClick={() => handleMenuClick(index)}
                                            className="btn flex items-center rounded-full border-2 border-gray-400 bg-white text-gray-400 p-2 hover:bg-gray-200"
                                        >
                                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                        </button>

                                        {/* Submenu */}
                                        {showMenu === index && (
                                            <div className="absolute right-0 mt-2 w-28 z-20 bg-white border border-gray-200 rounded shadow-lg">
                                                <ul className="py-1">
                                                    <li>
                                                        <button
                                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            onClick={() => handleEditClick(index)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            onClick={() => handleDeleteClick(index)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-gray-500 mt-2">No emergency contacts available.</div>
            )}
        </div>
    );
};

export default EmergencyContacts;
