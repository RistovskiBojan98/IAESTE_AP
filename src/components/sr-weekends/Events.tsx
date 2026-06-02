import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FilterPopup from "./EventFilter/Filter"
import "./sr-weekends.css"
import { fetchDbData } from "../../service/CountriesService"
import { mapSummerReceptionWeekend } from '../global/global_functions';
import EventCalendar from './EventCalendar/Calendar';
import { SummerReceptionWeekend, FilterType } from '../../types/Types';
import WeekendList from '../global/WeekendList';

const Events = () => {
    const [transformedEvents, setTransformedEvents] = useState<SummerReceptionWeekend[]>([])
    const [filteredEvents, setFilteredEvents] = useState<SummerReceptionWeekend[]>([]);
    const [filter, setFilter] = useState<FilterType[]>([])
    // State for controlling the visibility of the filter popup
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    // Define state variables for current date
    const [currentDate, setCurrentDate] = useState(moment());
    const currentYear = new Date().getFullYear()
    const [view, setView] = useState<"list" | "calendar">("list");

    useEffect(() => {
        const fetchData = async () => {
            const countries = await fetchDbData()
            let weekends: SummerReceptionWeekend[] = []
            countries?.forEach(country => {
                const summerReception = country.summerReception?.map(weekend => mapSummerReceptionWeekend(weekend, country)) ?? []
                if (summerReception.length) weekends = [...weekends, ...summerReception]
            })
            weekends.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            setTransformedEvents(weekends.filter(weekend => weekend.startDate.getFullYear() === currentYear))
        }
        fetchData()
    }, [currentYear])

    useEffect(() => {
        setFilteredEvents(transformedEvents)
    }, [transformedEvents])

    // Function to toggle the visibility of the filter popup
    const toggleFilterPopup = () => setIsFilterPopupOpen(!isFilterPopupOpen)


    return (
        <div className="min-h-screen bg-[#F4F8FB]">
            <div className="min-h-screen bg-white/75 backdrop-blur-[1px]">
                {/* HERO */}
                <div className="bg-gradient-to-r from-[#143D59] via-[#1B75BB] to-[#27A9E1] text-white shadow-lg">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
                        <div className="relative flex flex-col items-center justify-center">
                            <a
                                className="hidden md:flex absolute left-0 top-1/2  -translate-y-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold backdrop-blur-sm transition hover:bg-white/20"
                                href="/"
                            >
                                <i className="fa fa-chevron-left"></i>
                                <span className="block">Back</span>
                            </a>

                            <h1 className="text-center text-3xl font-bold sm:text-5xl">
                                <i className="fa-solid fa-umbrella-beach mr-4 text-[#49C0B5]"></i>
                                Summer Reception {currentYear}
                            </h1>
                        </div>
                    </div>
                </div>
                {/* CONTENT */}
                <div className="mx-auto mt-8 max-w-7xl gap-4 px-4 pb-8 flex flex-col">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-[#143D59]">
                                IAESTE Weekends
                            </h2>

                            <p className="mt-1 text-slate-500">
                                Browse upcoming events and experiences.
                            </p>
                        </div>
                        <div className='flex flex-row gap-4 justify-between md:justify-start'>
                            <button
                                onClick={toggleFilterPopup}
                                className="rounded-2xl bg-[#1B75BB] px-5 font-semibold text-white transition hover:bg-[#143D59] flex flex-row items-center"
                            >
                                <i className="fa fa-filter mr-0 lg:mr-2"></i>
                                <span className="hidden lg:block">Filters</span>
                            </button>
                            <div className="inline-flex rounded-2xl bg-slate-100 p-1 shadow-inner">
                                <button
                                    onClick={() => setView("list")}
                                    className={`px-5 py-2 rounded-xl font-semibold transition flex flex-row items-center 
                                        ${view === "list"
                                            ? "bg-white text-[#143D59] shadow-sm"
                                            : "text-slate-500 hover:text-[#143D59]"
                                        }`}
                                >
                                    <i className="fas fa-th mr-0 lg:mr-2"></i>
                                    <span className="hidden lg:block">Cards</span>
                                </button>

                                <button
                                    onClick={() => setView("calendar")}
                                    className={`px-5 py-2 rounded-xl font-semibold transition flex flex-row items-center 
                                        ${view === "calendar"
                                            ? "bg-white text-[#143D59] shadow-sm"
                                            : "text-slate-500 hover:text-[#143D59]"
                                        }`}
                                >
                                    <i className="fa fa-calendar mr-0 lg:mr-2"></i>
                                    <span className="hidden lg:block">Calendar</span>
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* FILTER CHIPS */}
                    {!!filter.length && (
                        <div className="flex flex-wrap gap-3 border-t border-[#1B75BB] pt-4">
                            <button
                                onClick={toggleFilterPopup}
                                className="hidden lg:block rounded-2xl bg-[#1B75BB] px-3 font-semibold text-white transition hover:bg-[#143D59]"
                            >
                                <i className="fa fa-filter"></i>
                            </button>
                            {filter.map((filterItem, index) => (
                                <button
                                    key={index}
                                    onClick={toggleFilterPopup}
                                    className="rounded-full bg-[#1B75BB]/10 px-4 py-2 text-sm font-semibold text-[#1B75BB] transition hover:bg-[#1B75BB] hover:text-white"
                                >
                                    {Object.entries(filterItem).map(([key, value]) => {
                                        const icon =
                                            key === "Countries"
                                                ? "fa-solid fa-globe"
                                                : "fa-solid fa-calendar-days";
                                        return (
                                            <span key={key} className="flex items-center gap-2">
                                                <i className={icon}></i>
                                                <b className='font-semibold'>{value}</b>
                                            </span>
                                        )
                                    })}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="relative">
                        {view === "list" ? (
                            filteredEvents.length ? (
                                <WeekendList
                                    weekends={filteredEvents}
                                    setCurrentDate={setCurrentDate}
                                />
                            ) : (
                                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                                    <i className="fa-solid fa-circle-exclamation text-5xl text-slate-300"></i>

                                    <h2 className="mt-5 text-2xl font-bold text-[#143D59]">
                                        No events found
                                    </h2>

                                    <p className="mt-2 text-slate-500">
                                        Try changing your filters.
                                    </p>
                                </div>
                            )
                        ) : (
                            <EventCalendar
                                filteredEvents={filteredEvents}
                                currentDate={currentDate}
                                setCurrentDate={setCurrentDate}
                            />
                        )}
                    </div>
                </div>

                {/* Filter Popup */}
                {isFilterPopupOpen && <FilterPopup onClose={toggleFilterPopup} events={transformedEvents} setFilteredEvents={setFilteredEvents} setFilter={setFilter} setCurrentDate={setCurrentDate} />}
            </div>
        </div>
    )
}

export default Events;
