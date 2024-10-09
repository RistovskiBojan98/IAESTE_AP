import React, { useState, useEffect, useRef } from "react";
import css from "../../../components/sr-weekends/EventPopup/event-popup.module.css";
import "./Weekend.css"
import { bgGradient } from "../../../components/global/global_functions"

const WeekendForm = ({ selectedWeekend, onClose }) => {
    const [weekendData, setWeekendData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        location: "",
        link: "",
        limit: "",
        description: ""
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        if (selectedWeekend) {
            setWeekendData({
                name: selectedWeekend.name || "",
                startDate: selectedWeekend.startDate || "",
                endDate: selectedWeekend.endDate || "",
                location: selectedWeekend.location || "",
                link: selectedWeekend.link || "",
                limit: selectedWeekend.limit || "",
                description: selectedWeekend.description || ""
            });
            setIsEditMode(true);
        }
    }, [selectedWeekend]);

    useEffect(() => {
        // click outside of the popup window
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) onClose();
        };
        // escape button
        const handleEscapeKey = (event) => {
            if (event.keyCode === 27) onClose();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWeekendData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission (save changes)
    const handleSave = () => {
        console.log("Form Data Submitted: ", weekendData);
        // Add logic to save the changes here
        setIsEditMode(false);
    };

    // Handle cancel changes
    const handleCancel = () => {
        setWeekendData({
            name: selectedWeekend.name || "",
            startDate: selectedWeekend.startDate || "",
            endDate: selectedWeekend.endDate || "",
            location: selectedWeekend.location || "",
            link: selectedWeekend.link || "",
            limit: selectedWeekend.limit || "",
            description: selectedWeekend.description || ""
        });
        setIsEditMode(false);
        onClose(); // Close the form
    };

    // Format startDate - endDate without year
    // const formatDateRange = (start, end) => {
    //     const startDate = new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    //     const endDate = new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    //     return `${startDate} - ${endDate}`;
    // };

    return (
        <div className={css.overlay}>
            <div className={`relative ${bgGradient} rounded-xl shadow-md w-4/5 h-4/5 flex flex-col`} 
                ref={popupRef} style={{ maxWidth: '800px', maxHeight: '600px' }}>
                <div className="absolute top-0 flex w-full mx-auto justify-between items-center py-2 px-5 border-b">
                    <span className="text-2xl font-bold text-white">{isEditMode ? "Edit weekend" : "Add new weekend"}</span>
                    <button onClick={onClose} className="rounded-full bg-white py-1.5 px-3 text-black border border-[#0B3D59]">
                        <i class="fa-solid fa-x text-[#0B3D59]"></i>
                    </button>
                </div>
                <div className="w-full p-6 text-white overflow-y-scroll mt-14 mb-20" style={{ scrollbarWidth: "thin" }}>
                    <form className="space-y-4 mt-4 text-xl">
                        <div className="form-row">
                            <label>
                                <i class="fa-solid fa-umbrella-beach"></i>
                                <span>Name: </span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={weekendData.name}
                                onChange={handleInputChange}
                                placeholder="Event Name"
                                className="sm:col-span-4"
                            />
                        </div>
                        {/* Date Range */}
                        <div className="form-row">
                            <label>
                                <i className="fa fa-calendar-alt"></i>
                                <span>Date: </span>
                            </label>
                            <input
                                    type="date"
                                    name="startDate"
                                    value={weekendData.startDate}
                                    onChange={handleInputChange}
                                    className="col-span-2"
                                />
                            <input
                                    type="date"
                                    name="endDate"
                                    value={weekendData.endDate}
                                    onChange={handleInputChange}
                                    className="col-span-2"
                                />
                        </div>
                        {/* Location */}
                        <div className="form-row">
                            <label>
                                <i className="fa fa-map-marker-alt"></i>
                                <span>Location: </span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={weekendData.location}
                                onChange={handleInputChange}
                                placeholder="Location"
                                className="col-span-4"
                            />
                        </div>

                        {/* Link */}
                        <div className="form-row">
                            <label>
                                <i className="fa fa-link"></i>
                                <span>Reg. link: </span>
                            </label>
                            <input
                                type="text"
                                name="link"
                                value={weekendData.link}
                                onChange={handleInputChange}
                                placeholder="Registration Link"
                                className="underline col-span-4"
                            />
                        </div>
                        {/* Limit */}
                        <div className="form-row">
                            <label>
                                <i className="fa fa-users"></i>
                                <span>Limit: </span>
                            </label>
                            <input
                                type="number"
                                name="limit"
                                value={weekendData.limit}
                                onChange={handleInputChange}
                                placeholder="Maximum Participants"
                                className="col-span-4"
                            />
                        </div>
                        {/* Description */}
                        <div className="form-row">
                            <label>
                                <i className="fa fa-file-lines"></i>
                                <span>Description: </span>
                            </label>
                            <textarea
                                name="description"
                                value={weekendData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                rows="8"
                                className="col-span-4 p-1 text-black"
                            />
                        </div>
                    </form>
                </div>
                {/* Fixed Footer */}
                <footer className="absolute bottom-0 left-0 w-full border-t-2 p-2">
                    <div className="flex justify-end space-x-4 font-semibold">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn flex items-center rounded-md border-2 border-red-500 text-red-500 p-1 bg-white hover:bg-red-500 hover:text-white hover:shadow-xl"
                        >
                            <i className="fa fa-ban mr-1" aria-hidden="true"></i>
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="btn flex items-center rounded-md border-2 border-[#1B75BB] text-[#1B75BB] p-1 bg-white hover:bg-[#1B75BB] hover:text-white hover:shadow-xl"
                        >
                            <i className="fa fa-save mr-1" aria-hidden="true"></i>
                            Save Changes
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default WeekendForm;
