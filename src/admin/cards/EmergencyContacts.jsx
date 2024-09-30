import React, { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import Path from "../panel/Path";
import { countries } from "../../components/countries/countries";
import { bgGradient, mapEmergencyContacts } from "../../components/global/global_functions";
import { emergencyContacts } from "../../components/emergencyContacts/emergencyContacts";

const EmergencyContacts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactData, setContactData] = useState([]); // State to manage contact list
    const [isAddMode, setIsAddMode] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
    const [hasChanges, setHasChanges] = useState(false); // Track if changes are made
    const [country, setCountry] = useState(null);
    const [card, setCard] = useState(null);

    useEffect(() => {
        const urlParts = window.location.href.split("/");
        const cardUrl = urlParts[urlParts.length - 1].replace("-", " ");
        const cardObject = cardUrl.charAt(0).toUpperCase() + cardUrl.slice(1);
        setCard(cardObject);

        const countryUrl = urlParts[urlParts.length - 2];
        const countryObject = countries.find((c) => c.name === countryUrl);
        setCountry(countryObject);
    }, []);

    useEffect(() => {
        if (country) setContactData([...mapEmergencyContacts(emergencyContacts, country)]);
    }, [country]);

    // Initialize contactData with eContacts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1100);
        return () => clearTimeout(timer);
    }, []);

    // Handle input change
    const handleEdit = (e, index) => {
        const { value } = e.target;
        const updatedContacts = [...contactData];
        updatedContacts[index].number = value; // Update the contact's number
        setContactData(updatedContacts);
        setHasChanges(true);
    };

    const handleAdd = () => {
        const newContacts = [...contactData, { title: "", number: "" }]; // Add a new empty row
        setContactData(newContacts);
        setHasChanges(true);
        setIsAddMode(true);
    };

    const handleSave = () => {
        // Logic to save changes to your backend or state
        console.log("Saved Data:", contactData);
        setIsEditMode(false);
        setHasChanges(false);
    };

    const handleCancel = () => {
        setContactData([...mapEmergencyContacts(emergencyContacts, country)]); // Revert to original data
        setIsEditMode(false);
        setIsAddMode(false)
        setHasChanges(false);
    };

    console.log(contactData)

    return (
        <section className="relative w-full min-h-screen">
            {isLoading ? (
                <Loader />
            ) : (
                <section className="px-4 py-2 bg-sky-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col min-h-screen">
                            {country && <Path country={country.name} card={card} />}
                            <div className="justify-between flex sm:mt-10 sm:px-10 border-b border-gray-300 pb-4">
                                <div className="text-3xl sm:text-5xl flex flex-col font-semibold text-[#1B75BB]">
                                    <span>IAESTE {country?.name}</span>
                                    <span>{card}</span>
                                </div>
                                <div className="items-center flex space-x-2 font-semibold">
                                    <button
                                        disabled={isAddMode || isEditMode}
                                        onClick={() => setIsEditMode(true)}
                                        className={`btn flex flex-row items-center text-center sm:justify-between rounded-full sm:rounded-md border-2 border-[#1B75BB] bg-[#F1F1E6] text-[#1B75BB] p-3 hover:${bgGradient} hover:text-white hover:shadow-xl `}
                                    >
                                        <i className="fa fa-pencil-alt sm:mr-2" aria-hidden="true"></i>
                                        <span className="hidden sm:block">Edit</span>
                                    </button>
                                    <button
                                        disabled={isAddMode || isEditMode}
                                        onClick={handleAdd}
                                        className={`btn flex flex-row items-center text-center sm:justify-between rounded-full sm:rounded-md border-2 bg-[#1B75BB] text-white p-3 hover:${bgGradient} hover:text-white hover:shadow-xl `}
                                    >
                                        <i className="fa fa-plus sm:mr-2" aria-hidden="true"></i>
                                        <span className="hidden sm:block">Add</span>
                                    </button>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <form className="mt-10 sm:mx-10 space-y-4 bg-gray-100 p-4 rounded-lg shadow-lg border-2 border-[#1B75BB] text-lg sm:text-2xl">
                                {!!contactData?.length ? contactData?.map((contact, index) => (
                                    <div key={index} className="flex sm:items-center sm:space-x-4">
                                        {(!isAddMode || contact.title) 
                                            ?
                                            <label className="font-semibold w-full sm:w-1/3">
                                                {contact.title}
                                            </label>
                                            :
                                            <input 
                                                type="text"
                                                placeholder="New contact"
                                                onChange={(e) => console.log(e)}
                                                className="border rounded-md px-2 py-1 w-full sm:w-1/3"
                                            />
                                        }
                                        
                                        {isEditMode || isAddMode || !contact.number ? (
                                            <input
                                                type="text"
                                                value={contact.number}
                                                placeholder="New contact number"
                                                onChange={(e) => handleEdit(e, index)}
                                                className="border rounded-md px-2 py-1 w-full sm:w-2/3"
                                            />
                                        ) : (
                                            <span className="w-full sm:w-2/3 text-gray-700">{contact.number}</span>
                                        )}
                                    </div>
                                )) : <div>No contacts available.</div> }
                            </form>

                            {/* Footer with Save/Cancel buttons */}
                            {(isEditMode || isAddMode) && (
                                <div className="my-8 sm:mr-10 flex justify-end space-x-4">
                                    <button
                                        onClick={handleCancel}
                                        className={`btn bg-gray-300 text-black px-4 py-2 rounded-md`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={!hasChanges}
                                        className={`btn bg-green-500 text-white px-4 py-2 rounded-md ${
                                            !hasChanges ? "cursor-not-allowed opacity-50" : ""
                                        }`}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
};

export default EmergencyContacts;
