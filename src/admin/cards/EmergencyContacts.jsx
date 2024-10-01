import React, { useState, useEffect } from "react";
import { mapEmergencyContacts, bgGradient } from "../../components/global/global_functions";
import { emergencyContacts } from "../../components/emergencyContacts/emergencyContacts";
import "./Card.css";

const EmergencyContacts = ({ selectedCountry }) => {
    const [contactData, setContactData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited

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
        if (editIndex === index) {
            // Save changes and exit edit mode, show success alert
            setEditIndex(null);
            window.alert('Contact updated successfully!');
        } else {
            // Enter edit mode for this row
            setEditIndex(index);
        }
    };

    // Handle delete with confirmation
    const handleDeleteClick = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
            const newData = contactData.filter((_, i) => i !== index); // Remove the contact
            setContactData(newData);
            window.alert('Emergency contact deleted successfully!');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {!!contactData.length && contactData.map((contact, index) => (
                <div key={index} className={`relative p-4 border rounded-lg shadow-lg ${editIndex === index ? 'bg-amber-300' : "bg-[#F1F1E6]"}`}>
                    {/* Title in the top right */}
                    <div className="absolute top-3 left-3 text-2xl font-semibold">
                        {contact.title}
                    </div>

                    {/* Buttons in the top left */}
                    <div className="absolute top-2 right-2 flex space-x-3">
                        {/* Edit/Save button */}
                        <button
                            type="button"
                            onClick={() => handleEditClick(index)}
                            className={`btn flex items-center rounded-full border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-2 hover:${bgGradient} hover:text-white hover:shadow-xl`}
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
                    <div className="mt-12 text-2xl">
                        <input
                            type="text"
                            value={contact.number}
                            onChange={(e) => handleInputChange(e, index)} // Update input value
                            className="w-full text-center border-2"
                            readOnly={editIndex !== index} // Disable input if not in edit mode
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmergencyContacts;
