import React, { useRef, useEffect, useState } from 'react';
import css from "./filter-popup.module.css";

const FilterPopup = ({ onClose, events }) => {
    const popupRef = useRef(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // Extract unique countries from events
        const uniqueCountries = [...new Set(events.map(event => event.country))];
        setCountries(uniqueCountries);
    }, [events]);

    useEffect(() => {
        // load filter values from local storage
        const savedFilterValues = localStorage.getItem('filterValues');
        if (savedFilterValues) {
            const filterValues = JSON.parse(savedFilterValues);
            setSelectedCountries(filterValues.selectedCountries || []);
            setStartDate(filterValues.startDate || '');
            setEndDate(filterValues.endDate || '');
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);

    const handleApplyFilter = () => {
        localStorage.setItem('filterValues', JSON.stringify({
            selectedCountries,
            startDate,
            endDate
        }));
        onClose();
    };

    const handleCountryChange = (event) => {
        const { value } = event.target;
        setSelectedCountries((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((country) => country !== value)
                : [...prevSelected, value]
        );
    };

    // const handleStartDateChange = (event) => {
    //     const { value } = event.target;
    //     setStartDate(value);
    //     if (value > endDate) {
    //         setEndDate(value);
    //     }
    // };

    // const handleEndDateChange = (event) => {
    //     const { value } = event.target;
    //     setEndDate(value);
    //     if (value < startDate) {
    //         setStartDate(value);
    //     }
    // };

    const handleResetFilter = () => {
        localStorage.removeItem('filterValues');
        onClose();
    }

    return (
        <div className={css.overlay}>
            <div className={css.popup} ref={popupRef}>
                <button onClick={onClose} className={css.closeButton}>
                    <i class="fa-solid fa-x"></i>
                </button>
                <div className="w-full bg-[#0B3D59] p-6 text-white">
                    <h3 className="text-4xl font-bold mb-4">Filter Events</h3>
                    <h3 className="text-lg">Select the properties to filter the events</h3>
                    <hr className='mt-4'></hr>
                    <div className="my-6">
                        <h4 className="text-2xl font-bold mb-2">Countries:</h4>
                        {countries.map((country, index) => (
                            <div key={index} className="flex items-center ml-2 mt-2 text-lg">
                                <input
                                    type="checkbox"
                                    id={country}
                                    name={country}
                                    value={country}
                                    checked={selectedCountries.includes(country)}
                                    onChange={handleCountryChange}
                                    style={{ transform: "scale(1.5)" }}
                                />
                                <label htmlFor={country} className="ml-2 font-semibold">{country}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <h4 className="text-2xl font-bold mb-2">Start Date:</h4>
                        <input
                            type="date"
                            value={startDate}
                            // onChange={handleStartDateChange}
                            className='text-black text-lg font-semibold w-full md:w-1/2'
                            // min={new Date().toISOString().split("T")[0]} // Minimum date is today
                            // max={endDate || undefined} // Maximum date is the selected end date, if any
                        />
                    </div>
                    <div className="mb-4">
                        <h4 className="text-2xl font-bold mb-2">End Date:</h4>
                        <input
                            type="date"
                            value={endDate}
                            // onChange={handleEndDateChange}
                            className='text-black text-lg font-semibold w-full md:w-1/2'
                            // min={startDate || new Date().toISOString().split("T")[0]} // Minimum date is the selected start date, if any
                        />
                    </div>
                    <div className="mt-10 flex gap-5">
                        <button className="bg-white text-red-500 border-solid border-2 border-red-500 font-bold text-lg py-1 px-3 rounded-full" onClick={onClose}>Cancel</button>
                        <button className="bg-white text-[#0B3D59] font-bold text-lg py-1 px-3 rounded-full" onClick={handleResetFilter}>Reset</button>
                        <button className="bg-white text-green-500 font-bold border-solid border-2 border-green-500 text-lg py-1 px-3 rounded-full ml-auto" onClick={handleApplyFilter}>Apply</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
