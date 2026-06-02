import React, { useRef, useEffect, useState } from 'react';
import "./filter-popup.css";
import DatePicker from "react-datepicker";
import { enGB } from 'date-fns/locale';
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
            const newDate = new Date(start);
            filteredEvents = filteredEvents.filter(
                event =>
                    new Date(event.startDate) >= newDate ||
                    new Date(event.endDate) >= newDate
            );
            date = start;
        }

        if (end) {
            const newDate = new Date(end);
            filteredEvents = filteredEvents.filter(
                event =>
                    new Date(event.endDate) <= newDate ||
                    new Date(event.startDate) <= newDate
            );
            if (!date) date = end;
        }

        if (start || end) {
            filter.push({
                Date: `${start ? formatDate(start) : "∞"} - ${end ? formatDate(end) : "∞"}`
            });
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
            <div
                ref={popupRef}
                className="relative w-[92vw] max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-white/60"
            >
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#143D59] via-[#1B75BB] to-[#49C0B5] p-6 text-white">
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative flex items-start justify-between gap-4">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                                Event filters
                            </p>

                            <h3 className="text-3xl font-bold md:text-4xl">
                                Filter Events
                            </h3>

                            <p className="mt-2 text-sm text-white/80">
                                Narrow down weekends by country and date range.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                        >
                            <i className="fa fa-times" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="max-h-[65vh] overflow-y-auto p-6">
                    {/* Countries */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB]">
                                <i className="fas fa-globe" />
                            </span>

                            <div>
                                <h4 className="text-lg font-bold text-[#143D59]">
                                    Countries
                                </h4>
                                <p className="text-sm text-slate-500">
                                    Select one or more countries.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {countries.map((country) => {
                                const checked = selectedCountries.includes(country);

                                return (
                                    <label
                                        key={country}
                                        htmlFor={country}
                                        className={`group flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${checked
                                            ? "border-[#1B75BB] bg-[#1B75BB]/10 text-[#143D59]"
                                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-[#27A9E1] hover:bg-white"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            id={country}
                                            name={country}
                                            value={country}
                                            checked={checked}
                                            onChange={handleCountryChange}
                                            className="peer sr-only"
                                        />

                                        <span
                                            className={`flex h-6 w-6 items-center justify-center rounded-md border transition ${checked
                                                ? "border-[#1B75BB] bg-[#1B75BB] text-white"
                                                : "border-slate-300 bg-white"
                                                }`}
                                        >
                                            {checked && <i className="fa fa-check text-xs" />}
                                        </span>

                                        <span className="font-semibold">{country}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-400">
                                Start Date
                            </label>

                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#27A9E1] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#27A9E1]/10">
                                <i className="fas fa-calendar-alt text-[#1B75BB]" />

                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    locale={enGB}
                                    placeholderText="Choose date"
                                    className="w-full bg-transparent text-slate-700 outline-none"
                                />

                                {startDate && (
                                    <button
                                        onClick={() => setStartDate(null)}
                                        className="text-slate-400 transition hover:text-red-500"
                                        type="button"
                                    >
                                        <i className="fas fa-trash-can" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-400">
                                End Date
                            </label>

                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#27A9E1] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#27A9E1]/10">
                                <i className="fas fa-calendar-alt text-[#1B75BB]" />

                                <DatePicker
                                    selected={endDate}
                                    onChange={(event: any) => setEndDate(event)}
                                    dateFormat="dd/MM/yyyy"
                                    locale={enGB}
                                    minDate={startDate ?? undefined}
                                    placeholderText="Choose date"
                                    className="w-full bg-transparent text-slate-700 outline-none"
                                />

                                {endDate && (
                                    <button
                                        onClick={() => setEndDate(null)}
                                        className="text-slate-400 transition hover:text-red-500"
                                        type="button"
                                    >
                                        <i className="fas fa-trash-can" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50/80 p-5">
                    <button
                        onClick={onClose}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-500"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleResetFilter}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-600 transition hover:border-[#1B75BB]/30 hover:text-[#1B75BB]"
                    >
                        Reset
                    </button>

                    <button
                        onClick={handleApplyFilter}
                        className="ml-auto rounded-2xl bg-[#1B75BB] px-6 py-3 font-bold text-white shadow-lg shadow-[#1B75BB]/20 transition hover:-translate-y-0.5 hover:bg-[#143D59] hover:shadow-xl"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
