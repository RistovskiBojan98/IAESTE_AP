import React, { useState, useEffect, useRef } from "react";
import css from "../../../components/sr-weekends/EventPopup/event-popup.module.css";

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
    const formatDateRange = (start, end) => {
        const startDate = new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endDate = new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${startDate} - ${endDate}`;
    };

    return (
        <div className={css.overlay}>
            <div className={css.popup} ref={popupRef} style={{ maxWidth: '800px', maxHeight: '600px' }}>
                <div className="w-full bg-[#0B3D59] p-6 text-white">
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-2xl font-bold">{isEditMode ? "Edit weekend" : "Add new weekend"}</span>
                        <button onClick={onClose} className="rounded-full bg-white py-1.5 px-3 text-black">
                            <i class="fa-solid fa-x"></i>
                        </button>
                    </div>

                    <hr className="mt-4" />

                    <form className="space-y-4 mt-4 text-xl">
                        <div className="flex flex-row items-center gap-2">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={weekendData.name}
                                onChange={handleInputChange}
                                placeholder="Event Name"
                                className="text-black font-semibold p-1 grow"
                            />
                        </div>
                        {/* Date Range */}
                        <div className="flex space-x-4 mt-4">
                            <label>Date:</label>
                            <div className={css.info}>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={weekendData.startDate}
                                    onChange={handleInputChange}
                                    className="text-black p-1"
                                />
                            </div>
                            <div className={css.info}>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={weekendData.endDate}
                                    onChange={handleInputChange}
                                    className="text-black p-1"
                                />
                            </div>
                        </div>
                        {/* Location */}
                        <div className="flex flex-row items-center gap-2">
                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={weekendData.location}
                                onChange={handleInputChange}
                                placeholder="Location"
                                className="grow text-black p-1"
                            />
                        </div>

                        {/* Link */}
                        <div className="flex flex-row items-center gap-2">
                            <label>Link:</label>
                            <input
                                type="text"
                                name="link"
                                value={weekendData.link}
                                onChange={handleInputChange}
                                placeholder="Registration Link"
                                className="grow text-black underline p-1"
                            />
                        </div>
                        {/* Limit */}
                    <div className="flex flex-row items-center gap-2">
                        <label>Limit:</label>
                        <input
                            type="number"
                            name="limit"
                            value={weekendData.limit}
                            onChange={handleInputChange}
                            placeholder="Maximum Participants"
                            className="grow text-black p-1"
                        />
                    </div>
                    {/* Description */}
                    <div className="mt-4 flex flex-col">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={weekendData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            rows="4"
                            className="grow p-1 text-black"
                        />
                    </div>
                    </form>
                </div>
                {/* Fixed Footer */}
                <footer className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 p-2">
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
