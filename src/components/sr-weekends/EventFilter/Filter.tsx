import React, { useRef, useEffect, useState } from 'react';
import "./filter-popup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { SummerReceptionWeekend, FilterType } from '../../../types/Types';
import { addClickEventListeners } from '../../global/global_functions';

interface FilterProps {
    onClose: () => void;
    events: SummerReceptionWeekend[];
    setFilteredEvents: (events: SummerReceptionWeekend[]) => void;
    setFilter: (filter: FilterType[]) => void;
    setCurrentDate: (date: any) => void;
}

const FilterPopup: React.FC<FilterProps> = ({ onClose, events, setFilteredEvents, setFilter, setCurrentDate }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        // Extract unique countries from events
        const uniqueCountries = Array.from(new Set(events.map(event => event.country)))
        setCountries(uniqueCountries);
    }, [events]);

    useEffect(() => {
        // load filter values from local storage
        const savedFilterValues = localStorage.getItem('filterValues');
        if (savedFilterValues) {
            const filterValues = JSON.parse(savedFilterValues);
            setSelectedCountries(filterValues.selectedCountries || []);
            setStartDate(filterValues.startDate ? new Date(filterValues.startDate) : null);
            setEndDate(filterValues.endDate ? new Date(filterValues.endDate) : null);
        }
    }, [])

    useEffect(() => {
        addClickEventListeners(popupRef, onClose);
    }, [onClose]);

    const setFilterValues = (countries: string[], start: Date | null, end: Date | null) => {
        // helper function
        const formatDate = (date: Date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
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

    const handleCountryChange = (event: any) => {
        const { value } = event.target;
        setSelectedCountries((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((country) => country !== value)
                : [...prevSelected, value]
        );
    };

    const handleStartDateChange = (event: any) => {
        setStartDate(event);
        const date = new Date(event)
        const value = date
        // setStartDate(value);
        if (endDate && value > endDate) setEndDate(null);
    };

    const handleResetFilter = () => {
        localStorage.removeItem('filterValues')
        setSelectedCountries([])
        setStartDate(null)
        setEndDate(null)
        setFilterValues([], null, null)
    }

    return (
        <div className="filter-overlay">
            <div className="filter-popup" ref={popupRef}>
                <div className="w-full bg-[#0B3D59] p-2 md:p-4 text-white flex flex-col justify-between">
                    <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Filter Events</h3>
                    <h3 className="text-base">Select the properties to filter the events</h3>
                    <hr className='mt-2'></hr>
                    <div className="filter-overflow">
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
                            <div className="filter-dateContainer">
                                <i className='fas fa-calendar-alt text-lg md:text-2xl px-2 py-1' />
                                <h4>Start Date:</h4>
                                <div className="filter-datepickerContainer">
                                    <DatePicker selected={startDate} onChange={handleStartDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="filter-datepicker" />
                                    <i className='fas fa-trash-can text-2xl text-red-500 px-2 py-1 ml-auto cursor-pointer' onClick={() => setStartDate(null)} />
                                </div>

                            </div>
                        </div>
                        <div className="my-4">
                            <div className="filter-dateContainer">
                                <i className='fas fa-calendar-alt text-lg md:text-2xl px-2 py-1' />
                                <h4>End Date:</h4>
                                <div className="filter-datepickerContainer">
                                    <DatePicker selected={endDate} onChange={(event: any) => setEndDate(event)}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={startDate ?? undefined}
                                        className="filter-datepicker" />
                                    <i className='fas fa-trash-can text-2xl text-red-500 px-2 py-1 ml-auto cursor-pointer' onClick={() => setEndDate(null)} />
                                </div>

                            </div>
                        </div>
                    </div>

                    <hr></hr>
                    <div className="mt-4 flex gap-5">
                        <button className="filter-ConfirmButton text-red-500 border-red-500" onClick={onClose}>Cancel</button>
                        <button className="filter-ConfirmButton text-[#0B3D59] border-[#0B3D59]" onClick={handleResetFilter}>Reset</button>
                        <button className="filter-ConfirmButton text-green-500 border-green-500 ml-auto" onClick={handleApplyFilter}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
