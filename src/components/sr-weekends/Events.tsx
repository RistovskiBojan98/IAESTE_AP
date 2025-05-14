import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FilterPopup from "./EventFilter/Filter"
import useWindowSize from '../../hooks/useScreenSize';
import "./sr-weekends.css"
import { fetchDbData } from "../../service/CountriesService"
import { mapSummerReceptionWeekend } from '../global/global_functions';
import EventCalendar from './EventCalendar/Calendar';
import { SummerReceptionWeekend, FilterType } from '../../types/Types';
import WeekendList from '../global/WeekendList';

const Events = () => {
    const { width } = useWindowSize();
    const [transformedEvents, setTransformedEvents] = useState<SummerReceptionWeekend[]>([])
    const [filteredEvents, setFilteredEvents] = useState<SummerReceptionWeekend[]>([]);
    const [filter, setFilter] = useState<FilterType[]>([])
    // State for controlling the visibility of the filter popup
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    // Define state variables for current date
    const [currentDate, setCurrentDate] = useState(moment());
    const currentYear = new Date().getFullYear()

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
        <div>
            <div className="mx-auto w-full bg-[#0B3D59] py-4">
                <div className="w-full px-3 sm:px-10 relative justify-center items-center text-center">
                    <h2 className="titleText text-white">
                        <i className="fa-solid fa-umbrella-beach mr-3"></i>
                        Summer Reception {currentYear}
                    </h2>
                    <a className="absolute top-2 left-4 items-center flex flex-row text-white font-semibold cursor-pointer hover:text-sky-200" href='/'>
                        <i className='fa fa-chevron-left'></i>
                        <span className='hidden sm:block ml-2'>Back</span>
                    </a>
                </div>
            </div>
            <div className="mb-10 px-1 mt-2">
                <div className='gap-5 mx-auto max-w-7xl flex flex-col'>
                    {/* event list */}
                    <div className='p-2 mx-auto max-w-7xl w-full text-[#0B3D59]'>
                        <div className='flex flex-row justify-between items-center border-b border-[#0B3D59] pb-2 px-2'>
                            <span className='text-3xl font-bold' style={{ textShadow: '0 0 5px rgba(255,255,255,1' }}>
                                IAESTE Weekends
                            </span>
                            <div className='ml-auto'>
                                <button onClick={toggleFilterPopup} className="bg-[#0B3D59] text-white hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] py-2 px-3 font-bold text-sm md:text-xl rounded-full">
                                    <i className="fa fa-filter"></i> {width >= 768 ? 'Filter' : ''}
                                </button>
                                {/* Filter Popup */}
                                {isFilterPopupOpen && <FilterPopup onClose={toggleFilterPopup} events={transformedEvents} setFilteredEvents={setFilteredEvents} setFilter={setFilter} setCurrentDate={setCurrentDate} />}
                            </div>
                        </div>
                        {/* Filter values */}
                        {!!filter.length && (
                            <div className="flex justify-start items-center mt-3 border-b border-[#0B3D59] pb-2">
                                <span className="text-lg font-semibold text-[#0B3D59]"><i className="fa fa-filter"></i></span>
                                <div className='flex flex-col md:flex-row gap-3'>
                                    {filter.map((filterItem, index) => (
                                        <div key={index} onClick={toggleFilterPopup} className="flex flex-row items-center bg-[#0B3D59] hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] cursor-pointer text-white rounded-full px-3 py-1 ml-2">
                                            {Object.entries(filterItem).map(([key, value]: [key: string, value: string]) => (
                                                <span key={key}>
                                                    {key}: <b className='font-semibold'>{value}</b>
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {filteredEvents.length ? (
                            <WeekendList weekends={filteredEvents} setCurrentDate={setCurrentDate} />
                        ) : (
                            <div className="flex justify-center items-center h-full mt-2">
                                <h2 className="titleText text-center">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    No events found from the filter parameters!
                                </h2>
                            </div>
                        )}
                    </div>
                    {/* calendar */}
                    <EventCalendar filteredEvents={filteredEvents} currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>
            </div>
        </div>
    );
}

export default Events;
