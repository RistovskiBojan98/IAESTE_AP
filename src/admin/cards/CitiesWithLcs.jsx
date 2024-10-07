import React, { useState, useEffect } from "react";
import "./Card.css";
import { committees } from "../../components/committees/committees";
import {
  bgGradient,
  editCardItem,
  deleteCardItem,
  saveNewCardItem,
  getSelectedCountryName,
} from "../../components/global/global_functions";

const CitiesWithLcs = ({ selectedCountry }) => {
  const [committeesData, setCommitteesData] = useState([]); // State to manage contact list
  const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
  const [isAddMode, setAddMode] = useState(false);
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    if (selectedCountry) {
      const countryName = getSelectedCountryName(selectedCountry);
      const data = committees.find((com) => com.country === countryName);
      if (data) setCommitteesData(data.lcs);
    }
  }, [selectedCountry]);

  // Handle the change in input during editing
  const handleInputChange = (e, index) => {
    const newData = [...committeesData];
    newData[index] = e.target.value;
    setCommitteesData(newData);
  };

  // Toggle edit/save mode for the specific row
  const handleEditClick = (index) =>
    editCardItem(index, editIndex, setEditIndex);

  // Handle delete with confirmation
  const handleDeleteClick = (index) =>
    deleteCardItem(index, committeesData, setCommitteesData);

  // Handle save new item
  const handleSaveNewItem = () =>
    saveNewCardItem(
      committeesData,
      inputValue,
      setCommitteesData,
      setAddMode,
      setInputValue
    );

  // Handle save changes
  const handleSaveChanges = () => {
    // Logic for saving changes
    console.log("Changes saved:", committeesData);
  };

  // Handle cancel changes
  const handleCancel = () => {
    // Logic to cancel edits or revert changes
    setEditIndex(null);
    setAddMode(false);
    setInputValue("");
  };

  return (
    <div className="elements-position space-y-5 mt-5 relative pb-24"> {/* Added padding for footer */}
       <table className="min-w-full border-2 border-[#1B75BB]">
                <thead className="bg-[#1B75BB] text-white">
                    <tr>
                        <th className="border p-2 text-left w-full">City Name</th>
                        <th className="border p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {!!committeesData.length ? committeesData.map((city, index) => (
                        <tr key={index} className={`border ${editIndex === index ? 'bg-amber-300' : 'bg-gray-100'}`}>
                            <td className="w-full p-1">
                                <input
                                    type="text"
                                    placeholder="City name"
                                    readOnly={editIndex !== index} // Disable input if not in edit mode
                                    value={city}
                                    onChange={(e) => handleInputChange(e, index)}
                                    className="w-full py-2 px-1 border text-2xl"
                                />
                            </td>
                            <td className="p-2">
                                <div className="relative">
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            disabled={!city}
                                            onClick={() => handleEditClick(index)}
                                            className="btn p-2 border-2 rounded-md bg-white text-[#1B75BB] hover:bg-blue-600 hover:text-white"
                                        >
                                            <i className={`fa ${editIndex === index ? 'fa-save' : 'fa-pencil-alt'}`} aria-hidden="true"></i>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(index)}
                                            className="btn p-2 border-2 rounded-md bg-white text-red-500 hover:bg-red-500 hover:text-white"
                                        >
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="2" className="p-2">No committees available.</td>
                        </tr>
                    )}
                    {isAddMode && (
                        <tr className="bg-amber-300">
                            <td className="p-2">
                                <input
                                    type="text"
                                    placeholder="City name"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full border p-2 text-2xl"
                                />
                            </td>
                            <td className="p-2">
                                <div className="flex gap-2">
                                    {/* Save button */}
                                    <button
                                        type="button"
                                        onClick={handleSaveNewItem}
                                        className="btn p-2 border-2 rounded-md bg-white text-[#1B75BB] hover:bg-blue-600 hover:text-white"
                                    >
                                        <i className="fa fa-save" aria-hidden="true"></i>
                                    </button>
                                    {/* Cancel button */}
                                    <button
                                        type="button"
                                        onClick={() => setAddMode(false)}
                                        className="btn p-2 border-2 rounded-md bg-white text-red-500 hover:bg-red-500 hover:text-white"
                                    >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

      {/* Add a new city input */}
      <div className="flex">
        {!isAddMode &&
          /* Add button */
          <button
            type="button"
            onClick={() => setAddMode(true)}
            className={`btn flex items-center rounded-md border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-4 hover:${bgGradient} hover:text-white hover:shadow-xl`}
          >
            <i className="fa fa-plus mr-2" aria-hidden="true"></i>
            <span className="font-semibold">Add a new city</span>
          </button>
              }
      </div>

      {/* Fixed footer for mobile view */}
      {/* <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-2 md:hidden">
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="btn flex items-center rounded-md border-2 border-red-500 bg-white text-red-500 p-1 hover:bg-red-500 hover:text-white hover:shadow-xl"
          >
            <i className={`fa fa-ban mr-1`} aria-hidden="true"></i>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveChanges}
            className={`btn flex items-center rounded-md border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-1 hover:${bgGradient} hover:text-white hover:shadow-xl`}
          >
            <i className={`fa fa-save mr-1`} aria-hidden="true"></i>
            Save Changes
          </button>
        </div>
      </footer> */}
    </div>
  );
};

export default CitiesWithLcs;
