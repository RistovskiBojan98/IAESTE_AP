import React, { useRef, useEffect, useState } from 'react';
import css from "./filter-popup.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const FilterPopup = ({ onClose, events, setFilteredEvents, setFilter, setCurrentDate }) => {
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

    const setFilterValues = (countries, start, end) => {
        // helper function
        const formatDate = (date) => {
            const dateString = new Date(date).toISOString()
            const splitDateT = dateString.split('T')[0];
            const splitDate = splitDateT.split('-');
            // Create a Date object with the split date parts
            const formattedDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
            // Increase the date by one day
            formattedDate.setDate(formattedDate.getDate() + 1);
            // Get the formatted date parts
            const day = formattedDate.getDate();
            const month = formattedDate.getMonth() + 1;
            const year = formattedDate.getFullYear();
            // Return the formatted date in the dd/mm/yy format
            return `${day}/${month}/${year}`;
        };

        const filter = []
        let filteredEvents = [...events]
        let date = null

        if (countries.length) {
            filteredEvents = filteredEvents.filter(event => countries.includes(event.country))
            let countriesInFilter = ""
            countries.forEach((country, index) => {
                countriesInFilter += country
                if (index < countries.length - 1) countriesInFilter += ", "
            })
            filter.push({ "Countries": countriesInFilter })
        }

        if (start) {
            const newDate = new Date(start)
            filteredEvents = filteredEvents.filter(event => new Date(event.startDate) >= newDate || new Date(event.endDate) >= newDate);
            filter.push({ "From: ": formatDate(start) })
            date = start
        }

        if (end) {
            const newDate = new Date(end);
            events = events.filter(event => new Date(event.endDate) <= newDate || new Date(event.startDate) <= newDate);
            filter.push({ "To: ": formatDate(end) })
            if (!date) date = end
        }

        setFilteredEvents(filteredEvents)
        setFilter(filter)
        if (date) setCurrentDate(moment(date))
        onClose()
    }

    const handleApplyFilter = () => {
        localStorage.setItem('filterValues', JSON.stringify({
            selectedCountries,
            startDate,
            endDate
        }));
        setFilterValues(selectedCountries, startDate, endDate)
    };

    const handleCountryChange = (event) => {
        const { value } = event.target;
        setSelectedCountries((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((country) => country !== value)
                : [...prevSelected, value]
        );
    };

    const handleStartDateChange = (event) => {
        setStartDate(event);
        const date = new Date(event)
        const value = date
        // setStartDate(value);
        if (value > endDate) setEndDate(null);
    };

    const handleResetFilter = () => {
        localStorage.removeItem('filterValues')
        setSelectedCountries([])
        setStartDate(null)
        setEndDate(null)
        setFilterValues([], null, null)
    }

    return (
        <div className={css.overlay}>
            <div className={css.popup} ref={popupRef}>
                <div className="w-full bg-[#0B3D59] p-2 md:p-4 text-white flex flex-col justify-between">
                    <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Filter Events</h3>
                    <h3 className="text-base">Select the properties to filter the events</h3>
                    <hr className='mt-2'></hr>
                    <div className={css.overflow}>
                        <div className="my-2">
                            <div className='flex flex-row w-full justify-start items-center gap-1'>
                                <i className='fas fa-globe text-white text-lg md:text-2xl px-2 py-1' />
                                <h4>Countries:</h4>
                            </div>
                            {countries.map((country, index) => (
                                <div key={index} className="flex items-center ml-6 mt-2 text-base md:text-lg">
                                    <input
                                        type="checkbox"
                                        id={country}
                                        name={country}
                                        value={country}
                                        checked={selectedCountries.includes(country)}
                                        onChange={handleCountryChange}
                                        style={{ transform: "scale(1.5)" }}
                                    />
                                    <label htmlFor={country} className="ml-2">{country}</label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <div className={css.dateContainer}>
                                <i className='fas fa-calendar-alt text-lg md:text-2xl px-2 py-1' />
                                <h4>Start Date:</h4>
                                <div className={css.datepickerContainer}>
                                    <DatePicker selected={startDate} onChange={handleStartDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className={css.datepicker} />
                                    <i className='fas fa-trash-can text-2xl text-red-500 px-2 py-1 ml-auto cursor-pointer' onClick={() => setStartDate(null)} />
                                </div>

                            </div>
                        </div>
                        <div className="my-4">
                            <div className={css.dateContainer}>
                                <i className='fas fa-calendar-alt text-lg md:text-2xl px-2 py-1' />
                                <h4>End Date:</h4>
                                <div className={css.datepickerContainer}>
                                    <DatePicker selected={endDate} onChange={(event) => setEndDate(event)}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={startDate ?? undefined}
                                        className={css.datepicker} />
                                    <i className='fas fa-trash-can text-2xl text-red-500 px-2 py-1 ml-auto cursor-pointer' onClick={() => setEndDate(null)} />
                                </div>

                            </div>
                        </div>
                    </div>

                    <hr></hr>
                    <div className="mt-4 flex gap-5">
                        <button className={`${css.filterConfirmButton} text-red-500 border-red-500`} onClick={onClose}>Cancel</button>
                        <button className={`${css.filterConfirmButton} text-[#0B3D59] border-[#0B3D59]`} onClick={handleResetFilter}>Reset</button>
                        <button className={`${css.filterConfirmButton} text-green-500 border-green-500 ml-auto`} onClick={handleApplyFilter}>Apply</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
