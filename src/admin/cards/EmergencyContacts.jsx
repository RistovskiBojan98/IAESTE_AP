import React, { useState, useEffect } from "react";
import { mapEmergencyContacts, bgGradient, editCardItem, deleteCardItem } from "../../components/global/global_functions";
import { emergencyContacts } from "../../components/emergencyContacts/emergencyContacts";
import CardFooter from "./CardFooter";
import "./Card.css";

const EmergencyContacts = ({ selectedCountry }) => {
    const [contactData, setContactData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
    const [showMenu, setShowMenu] = useState(null); // Track which row has the submenu open
    const [actionInProgress, setActionInProgress] = useState(false); // Track if an action is in progress

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
        setActionInProgress(true); // Set action in progress
        setShowMenu(null); // Close menu when editing starts
    };

    // Handle delete with confirmation
    const handleDeleteClick = (index) => {
        deleteCardItem(index, contactData, setContactData);
        setActionInProgress(true); // Set action in progress
        setShowMenu(null); // Close menu after delete
    };

    // Cancel the current action (reset the editing state)
    const handleCancel = () => {
        setEditIndex(null);
        setActionInProgress(false); // Reset action in progress
    };

    // Save changes (apply the changes and close edit mode)
    const handleSave = () => {
        setEditIndex(null);
        setActionInProgress(false); // Reset action in progress
        console.log("Changes saved:", contactData); // Replace with actual save logic
    };

    // Toggle the submenu visibility
    const handleMenuClick = (index) => {
        if (!actionInProgress) {
            if (showMenu === index) {
                setShowMenu(null); // Close if already open
            } else {
                setShowMenu(index); // Open the submenu
            }
        }
    };

    return (
        <div className="mt-10"> {/* Added padding for footer */}
            {!!contactData.length ? (
                <table className="w-full border border-[#1B75BB] table-auto">
                    <thead>
                        <tr className="bg-[#1B75BB] text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Emergency Number</th>
                            <th className="p-4 text-left w-10">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((contact, index) => (
                            <tr key={index} className={`border-b border-[#1B75BB] ${editIndex === index ? 'bg-amber-300' : "bg-white"}`}>
                                <td className="p-4 font-semibold">{contact.title}</td>
                                <td className="p-4">
                                    <input
                                        type="text"
                                        placeholder="Emergency number"
                                        value={contact.number}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className={`w-full p-2 border text-xl ${editIndex !== index ? "bg-gray-100" : "bg-white"}`}
                                        readOnly={editIndex !== index} // Disable input if not in edit mode
                                    />
                                </td>
                                <td className="p-4 justify-end w-10">
                                    <button
                                        type="button"
                                        disabled={editIndex === index}
                                        onClick={() => handleEditClick(index)}
                                        className={`btn flex items-center rounded-full border-2 border-[#1B75BB] p-2 ${editIndex !== index ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : `${bgGradient} text-white`}`}
                                    >
                                        <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-gray-500 mt-2">No emergency contacts available.</div>
            )}

            {/* Reusable Footer Component */}
            <CardFooter isDisabled={editIndex == null} onCancel={handleCancel} onSave={handleSave} />
        </div>
    );
};

export default EmergencyContacts;
