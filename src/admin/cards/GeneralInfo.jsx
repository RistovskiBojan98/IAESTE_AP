import React, { useState, useEffect } from "react";
import { mapGeneralInfo, editCardItem, bgGradient } from "../../components/global/global_functions";
import CardFooter from "./CardFooter";
import "./Card.css";

const GeneralInfo = ({ selectedCountry }) => {
    const [infoData, setInfoData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
    const [actionInProgress, setActionInProgress] = useState(false); // Track if an action is in progress

    useEffect(() => {
        if (selectedCountry) {
            const info = mapGeneralInfo(selectedCountry);
            if (info?.data) setInfoData([...info.data]);
        }
    }, [selectedCountry]);

    // Handle the change in input during editing
    const handleInputChange = (e, index) => {
        const newData = [...infoData];
        newData[index].role = e.target.value; // Update the role (description) in the data
        setInfoData(newData);
    };

    // Toggle edit/save mode for the specific row
    const handleEditClick = (index) => {
        editCardItem(index, editIndex, setEditIndex);
        setActionInProgress(true); // Set action in progress
    };

    // Handle save changes
    const handleSave = () => {
        setEditIndex(null);
        setActionInProgress(false); // Reset action in progress
        console.log("Changes saved:", infoData); // Replace with actual save logic
    };

    // Handle cancel changes
    const handleCancel = () => {
        setEditIndex(null);
        setActionInProgress(false); // Reset action in progress
    };

    return (
        <div className="mt-10 pb-24">
            <table className="card-table">
                <thead className="card-table-head">
                    <tr>
                        <th className="w-20 sm:w-44">Title</th>
                        <th>Description</th>
                        <th className="w-5">
                            <span className="hidden sm:block">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!!infoData.length ? (
                        infoData.map((info, index) => (
                            <tr key={index} className={`card-table-row ${editIndex === index ? 'bg-amber-300' : "bg-white"}`}>
                                {/* Name column */}
                                <td className="font-semibold">
                                    {info.name}
                                </td>

                                {/* Description column */}
                                <td>
                                    <textarea
                                        type="text"
                                        placeholder="Description"
                                        rows={2}
                                        value={info.role}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className={`w-full p-2 border-2 resize-none text-lg ${editIndex !== index ? "bg-gray-100" : "bg-white"}`}
                                        readOnly={editIndex !== index} // Disable input if not in edit mode
                                        style={{ wordWrap: 'break-word' }} // Ensure text wrapping within the cell
                                    />
                                </td>

                                {/* Actions column */}
                                <td className="actions">
                                    {/* Edit button */}
                                    <button
                                            type="button"
                                            disabled={editIndex === index}
                                            onClick={() => handleEditClick(index)}
                                            className={`btn border-[#1B75BB] ${editIndex !== index ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : `${bgGradient} text-white`}`}
                                        >
                                            <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                        </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-gray-500 p-4">
                                No general information available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Reusable CardFooter Component */}
            <CardFooter isDisabled={editIndex == null} onCancel={handleCancel} onSave={handleSave} />
        </div>
    );
};

export default GeneralInfo;
