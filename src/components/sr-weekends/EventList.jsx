import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventPopup from './EventPopup/Event';
import FilterPopup from "./EventFilter/Filter"
import MoreEventsPopup from "./MoreEventsPopup/MoreEvents"
import useWindowSize from '../../hooks/useScreenSize';
import css from "./sr-weekends.module.css"
import { fetchDbData } from "../../service/CountriesService"
import { mapSummerReceptionWeekend } from '../global/global_functions';
import EventCalendar from './EventCalendar/Calendar';

const EventList = () => {
    const { width } = useWindowSize();
    const [transformedEvents, setTransformedEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [eventsToShow, setEventsToShow] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [moreEvents, setMoreEvents] = useState([])
    const [moreEventsSelectedDate, setMoreEventsSelectedDate] = useState([])
    const [filter, setFilter] = useState([])
    const [maxEvents, setMaxEvents] = useState(1)
    const [startIndex, setStartIndex] = useState(0)
    // State for controlling the visibility of the filter popup
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    // Define state variables for current date
    const [currentDate, setCurrentDate] = useState(moment());

    useEffect(() => {
        setMaxEvents(width >= 768 ? 3 : 1)
    }, [width])

    useEffect(() => {
        const fetchData = async () => {
            const countries = await fetchDbData()
            let weekends = []
            countries?.forEach(country => {
                const summerReception = country.summerReception?.map(weekend => mapSummerReceptionWeekend(weekend, country)) ?? []
                if (summerReception.length) weekends = [...weekends, ...summerReception]
            })
            setTransformedEvents(weekends.sort((a, b) => a.startDate - b.startDate))
        }
        fetchData()
    }, [])

    useEffect(() => {
        setFilteredEvents(transformedEvents)
    }, [transformedEvents])

    useEffect(() => {
        setEventsToShow(filteredEvents.slice(startIndex, maxEvents + startIndex))
    }, [startIndex, filteredEvents, maxEvents])

    // Function to toggle the visibility of the filter popup
    const toggleFilterPopup = () => setIsFilterPopupOpen(!isFilterPopupOpen)

    // Function to handle event click and open the popup
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setCurrentDate(moment(event.startDate)); // Set the current date to the event's start date
    };

    // Function to close the popup
    const closePopup = () => {
        setSelectedEvent(null);
        localStorage.removeItem('selectedEvent')
    };

    // event list buttons
    const handlePreviousEvents = () => {
        setStartIndex(startIndex - maxEvents)
    }

    const handleNextEvents = () => {
        setStartIndex(startIndex + maxEvents)
    }

    // Customizing the 'Show More' button
    const showMoreEvents = (events) => {
        const date = currentDate.toDate().toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        setMoreEvents([events])
        setMoreEventsSelectedDate(date)
    }

    const closeMoreEvents = () => {
        setMoreEvents([])
        setMoreEventsSelectedDate([])
        const selectedEvent = localStorage.getItem('selectedEvent');
        if (selectedEvent) handleEventClick(JSON.parse(selectedEvent))
    }

    return (
        <div>
            {selectedEvent && (<EventPopup event={selectedEvent} onClose={closePopup} />)}
            {!!moreEvents.length && (<MoreEventsPopup events={moreEvents} date={moreEventsSelectedDate} onClose={closeMoreEvents} />)}
            <div className="mx-auto w-full bg-[#0B3D59] py-4">
                <div className="w-full px-3 sm:px-10 relative justify-center items-center text-center">
                    <h2 className={`${css.titleText} text-white`}>
                        <i className="fa-solid fa-umbrella-beach mr-3"></i>
                        Summer Reception 2024
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
                                            {Object.entries(filterItem).map(([key, value]) => (
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
                            <div className="flex flex-row justify-between items-center gap-4 mt-2">
                                <button onClick={handlePreviousEvents} disabled={!startIndex}>
                                    <i className='fa fa-chevron-left text-xl text-[#0B3D59]' ></i>
                                </button>
                                <div className='flex flex-row justify-between gap-4 pr-2 w-full items-center'>
                                    {eventsToShow.map(event => (
                                        <div key={event.name} className={`w-full card rounded-lg shadow-md p-3 cursor-pointer h-auto md:h-40
                                                hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] hover:text-white text-white
                                                ${selectedEvent !== event ? 'bg-[#1B75BB]' : 'bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] '}`}>
                                            <div className="card-body  flex flex-col justify-between h-full" onClick={() => handleEventClick(event)}>
                                                <h2 className="card-title font-semibold text-xl md:text-2xl border-b-2 pb-2">{event.name}</h2>
                                                <div className='flex flex-col mt-2 sm:mt-0'>
                                                    <div className={css.cardText}>
                                                        <i className="far fa-calendar-alt mr-2"></i> {event.start} - {event.end}
                                                    </div>
                                                    <div className={css.cardText}>
                                                        <i className="fas fa-map-marker-alt mr-2"></i> {event.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleNextEvents} disabled={filteredEvents.length - 1 <= startIndex + maxEvents}>
                                    <i className='fa fa-chevron-right text-xl text-[#0B3D59]' ></i>
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full mt-2">
                                <h2 className={`${css.titleText} text-center`}><i className="fa-solid fa-circle-exclamation"></i> No events found from the filter parameters!</h2>
                            </div>
                        )}

                    </div>
                    {/* calendar */}
                    <EventCalendar filteredEvents={filteredEvents} handleEventClick={handleEventClick} currentDate={currentDate} setCurrentDate={setCurrentDate} showMoreEvents={showMoreEvents} />
                </div>
            </div>
        </div>
    );
}

export default EventList;
