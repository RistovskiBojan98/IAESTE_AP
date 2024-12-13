import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { summerReception } from '../summer-recepiton/summerReception';
import EventPopup from './EventPopup/Event';
import FilterPopup from "./EventFilter/Filter"
import MoreEventsPopup from "./MoreEventsPopup/MoreEvents"
import useWindowSize from '../../hooks/useScreenSize';
import css from "./sr-weekends.module.css"
import { fetchDbData } from "../../service/CountriesService"
import { mapSummerReceptionWeekend } from '../global/global_functions';

// Customize localizer to make Monday the first day of the week
moment.updateLocale('en', {
    week: {
        dow: 1,
    },
});
const customLocalizer = momentLocalizer(moment, {
    formats: {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dd', culture),
    },
});

const EventList = () => {
    const { width } = useWindowSize();
    const [transformedEvents, setTransformedEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState([])
    // State for controlling the index of the first event to be displayed
    const [startIndex, setStartIndex] = useState(0);

    // Maximum number of events to display at a time
    const maxEventsToShow = width >= 768 ? 3 : 1;

    // Calculate the end index based on the start index and maximum events to show
    const endIndex = Math.min(startIndex + maxEventsToShow, filteredEvents.length);

    // Events to display based on the start and end index
    const eventsToShow = filteredEvents.slice(startIndex, endIndex);

    // Function to handle the previous button click
    const handlePrevious = () => {
        setStartIndex(Math.max(startIndex - 1, 0));
    };

    // Function to handle the next button click
    const handleNext = () => {
        setStartIndex(Math.min(startIndex + 1, filteredEvents.length - 1));
    };

    useEffect(() => {
        setStartIndex(0); // Reset startIndex when screen size changes
    }, [width]);

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

    // State for controlling the visibility of the filter popup
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    // Function to toggle the visibility of the filter popup
    const toggleFilterPopup = () => setIsFilterPopupOpen(!isFilterPopupOpen)

    const [selectedEvent, setSelectedEvent] = useState(null);

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

    // Define state variables for current date
    const [currentDate, setCurrentDate] = useState(moment());

    // Function to navigate to the previous month
    const handlePreviousMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'month'));
    };

    // Function to navigate to the next month
    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'month'));
    };

    // Function to customize event style
    const eventStyleGetter = () => ({
        className: css.event
    });

    // Function to handle the "+x events" indicator click
    const handleMoreEventsClick = (events, date) => {
        // Implement your action here
        console.log("More events clicked:", events, date);
    };

    // Custom component for rendering the "+x events" indicator
    const CustomEventWrapper = ({ children, events, date }) => (
        <div className="custom-event-wrapper" onClick={() => handleMoreEventsClick(events, date)}>
            {children}
        </div>
    );

    // Function to customize day style
    const dayStyleGetter = (date) => {
        const today = moment();
        const currentMonth = currentDate.month();

        if (moment(date).isSame(today, 'day')) {
            return {
                style: {
                    backgroundColor: '#1B75BB'
                }
            };
        }

        // if (moment(date).month() !== currentMonth) {
        //     return {
        //         style: {
        //             backgroundColor: '#6086A7',
        //             color: 'white'
        //         }
        //     };
        // }

        return {};
    };

    const handleNavigate = (date) => {
        setCurrentDate(moment(date));
    };

    const [moreEvents, setMoreEvents] = useState([])
    const [moreEventsSelectedDate, setMoreEventsSelectedDate] = useState([])
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
    const customMessages = {
        showMore: (count, remainig, all) => (
            <div className={css.customShowMore} onClick={() => showMoreEvents(all)}>+{count} {width >= 768 ? 'more' : ''}</div>
        )
    };

    return (
        <div>
            {selectedEvent && (<EventPopup event={selectedEvent} onClose={closePopup} />)}
            {!!moreEvents.length && (<MoreEventsPopup events={moreEvents} date={moreEventsSelectedDate} onClose={closeMoreEvents} />)}
            <div className="mx-auto max-w-7xl border-solid border-b-2 py-2 border-[#0B3D59]">
                <div className="w-full px-3 sm:px-10 flex justify-start items-center">
                    <h2 className="text-3xl sm:text-5xl font-bold ">
                        <i className="fa-solid fa-umbrella-beach mr-3"></i>
                        Summer Reception 2024
                    </h2>
                    <div className='ml-auto'>
                        <button onClick={toggleFilterPopup} className="bg-[#0B3D59] hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] text-white font-bold py-3 px-4 sm:px-6 text-sm md:text-xl rounded-full">
                            <i className="fa fa-filter"></i> {maxEventsToShow === 3 ? 'Filter' : ''}
                        </button>
                        {/* Filter Popup */}
                        {isFilterPopupOpen && <FilterPopup onClose={toggleFilterPopup} events={transformedEvents} setFilteredEvents={setFilteredEvents} setFilter={setFilter} setCurrentDate={setCurrentDate} />}
                    </div>
                </div>
                {/* Filter values */}
                {!!filter.length && (
                    <div className="flex justify-start items-center mt-3 max-w-7xl px-10 border-solid border-t-2 border-[#0B3D59] pt-3">
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
            </div>
            <div className="mb-10 px-1">
                <div className='gap-5 mx-auto max-w-7xl flex flex-col sm:flex-row'>
                    {/* event list */}
                    <div className='w-full bg-[#0B3D59] mt-5 rounded-lg shadow-lg border border-black' style={{ maxHeight: '650px' }}>
                        <div className='p-2 mx-auto max-w-7xl'>
                            <span className='text-white text-3xl font-semibold'>
                                IAESTE Weekends
                            </span>
                            {filteredEvents.length ? (
                                <div className="flex justify-between items-center gap-2 mt-2">
                                    <div className='flex flex-col gap-4 pr-2 w-full items-center overflow-y-scroll' style={{ scrollbarWidth: 'thin', height: 500 }}>
                                        {filteredEvents.map(event => (
                                            <div key={event.name} className={`w-full card rounded-lg shadow-md p-3 cursor-pointer h-auto md:h-40 
                                                hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5]
                                                ${selectedEvent !== event ? 'bg-white' : 'bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5]'}`}>
                                                <div className="card-body text-[#0B3D59] flex flex-col justify-between h-full hover:text-white" onClick={() => handleEventClick(event)}>
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
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <h2 className={`${css.titleText} text-center`}><i className="fa-solid fa-circle-exclamation"></i> No events found from the filter parameters!</h2>
                                </div>
                            )}

                        </div>
                    </div>
                    {/* calendar */}
                    <div className='w-full'>
                        <div className='w-full'>
                            {/* Custom toolbar */}
                            <div className="flex justify-center gap-10 items-center py-5 px-1">
                                <button onClick={handlePreviousMonth} className={`${css.navButton} bg-white`}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 30 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.76 17.6L19.448 32.288L17.672 34.304L0.872 17.6L17.432 0.847998L19.208 2.864L4.76 17.6Z"
                                            fill="blue"
                                        />
                                    </svg>
                                </button>
                                <h2 className={`${css.titleText} w-60 text-center`}>{currentDate.format('MMMM YYYY')}</h2>
                                <button onClick={handleNextMonth} className={`${css.navButton} bg-white`}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 15 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.66588 0.847998L19.1779 17.6L2.42588 34.304L0.601875 32.288L15.3379 17.6L0.841875 2.864L2.66588 0.847998Z"
                                            fill="blue"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='w-full flex justify-center'>
                            <Calendar
                                className='bg-[#0B3D59] border-solid border-2 border-black text-white'
                                localizer={customLocalizer} // Use the custom localizer
                                events={filteredEvents}
                                startAccessor="startDate"
                                endAccessor="endDate"
                                views={['month']} // Display only the month view
                                toolbar={false}
                                style={{ height: 500, width: '100%' }}
                                onSelectEvent={handleEventClick} // Handle event click
                                date={currentDate.toDate()}
                                eventPropGetter={eventStyleGetter}
                                dayPropGetter={dayStyleGetter}
                                onNavigate={handleNavigate}
                                messages={customMessages}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventList;
