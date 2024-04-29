import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { summerReception } from '../summer-recepiton/summerReception';
import EventPopup from './EventPopup/Event';
import FilterPopup from "./EventFilter/Filter"

// Customize localizer to make Monday the first day of the week
const customLocalizer = momentLocalizer(moment, {
    formats: {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dd', culture),
    },
    firstDayOfWeek: 1, // Monday
});

const EventList = () => {
    // Transform the existing events data to match the new structure
    const transformedEvents = Object.keys(summerReception).reduce((acc, country) => {
        const countryEvents = summerReception[country].map(event => ({
            ...event,
            country,
            location: event.location + ", " + country,
            start: moment(event.date.split(' - ')[0], 'DD.MM').toDate(),
            end: moment(event.date.split(' - ')[1], 'DD.MM').add(1, 'day').toDate(),
            title: event.name
        }));
        return [...acc, ...countryEvents].sort((a, b) => a.start - b.start);
    }, []);

    const [filteredEvents, setFilteredEvents] = useState([...transformedEvents]);

    // State for controlling the index of the first event to be displayed
    const [startIndex, setStartIndex] = useState(0);

    // Maximum number of events to display at a time
    const maxEventsToShow = 3;

    // Calculate the end index based on the start index and maximum events to show
    const endIndex = Math.min(startIndex + maxEventsToShow, filteredEvents.length);

    // Events to display based on the start and end index
    const eventsToShow = filteredEvents.slice(startIndex, endIndex);

    // Function to handle the previous button click
    const handlePrevious = () => {
        setStartIndex(Math.max(startIndex - maxEventsToShow, 0));
    };

    // Function to handle the next button click
    const handleNext = () => {
        setStartIndex(Math.min(startIndex + maxEventsToShow, filteredEvents.length - maxEventsToShow));
    };

    // State for controlling the visibility of the filter popup
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    // Function to toggle the visibility of the filter popup
    const toggleFilterPopup = () => {
        setIsFilterPopupOpen(!isFilterPopupOpen);
        if (isFilterPopupOpen) {
            const savedFilterValues = localStorage.getItem('filterValues');
            let events = [...transformedEvents]
            if (savedFilterValues) {
                const filterValues = JSON.parse(savedFilterValues);

                if (filterValues.selectedCountries) {
                    const selectedCountries = filterValues.selectedCountries;
                    events = events.filter(event => selectedCountries.includes(event.country));
                }
                if (filterValues.startDate) {
                    const startDate = new Date(filterValues.startDate);
                    events = events.filter(event => new Date(event.start) >= startDate);
                }
                if (filterValues.endDate) {
                    const endDate = new Date(filterValues.endDate);
                    events = events.filter(event => new Date(event.end) <= endDate);
                }
            }
            setFilteredEvents(events)
        }
    };

    const [selectedEvent, setSelectedEvent] = useState(null);

    // Function to handle event click and open the popup
    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    // Function to close the popup
    const closePopup = () => {
        setSelectedEvent(null);
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
    const eventStyleGetter = (event, start, end, isSelected) => ({
        style: {
            backgroundColor: 'red',
            borderRadius: '20px',
            color: 'white',
            border: '1px solid transparent',
            display: 'block',
        }
    });

    // Function to handle the "+x events" indicator click
    const handleMoreEventsClick = (events, date) => {
        // Implement your action here
        console.log("More events clicked:", events, date);
    };

    // Custom component for rendering the "+x events" indicator
    const CustomEventWrapper = ({ children, events, date }) => (
        <div className="custom-event-wrapper" onClick={() => handleMoreEventsClick(events, date)}
            style={{
                backgroundColor: 'red',
                borderRadius: '20px',
                color: 'white',
                border: '1px solid transparent',
                padding: '5px 10px', // Adjust padding as needed
                cursor: 'pointer' // Add pointer cursor to indicate it's clickable
            }}>
            {children}
        </div>
    );

    return (
        <div>
            {selectedEvent && (<EventPopup event={selectedEvent} onClose={closePopup} />)}
            <div className="mx-auto max-w-7xl mt-10 border-solid border-b-2 pb-3">
                <div className="w-full px-10 flex justify-start items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}>
                        Upcoming events
                    </h2>
                    <div className='ml-auto'>
                        <button onClick={toggleFilterPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 text-2xl rounded-full">
                            <i class="fa fa-filter"></i> Filter
                        </button>
                        {/* Filter Popup */}
                        {isFilterPopupOpen && <FilterPopup onClose={toggleFilterPopup} events={transformedEvents}/>}
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <div className=' gap-5 mx-auto max-w-7xl'>
                    {/* event list */}
                    <div className='w-full' style={{ maxHeight: '650px' }}>
                        <div className='p-10 mx-auto max-w-7xl'>
                            <div className="flex justify-between items-center">
                                <button onClick={handlePrevious} disabled={startIndex === 0}
                                    className={`p-3 border-solid border-2 border-sky-500 rounded-full ${startIndex === 0 ? 'bg-gray-500' : 'bg-white'}`}
                                >
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
                                <div className='flex gap-4 w-full px-5'>
                                    {eventsToShow.map(event => (
                                        <div key={event.name} className="w-full card mb-3 bg-white rounded-lg shadow-md p-3 cursor-pointer hover:bg-sky-100">
                                            <div className="card-body text-black" onClick={() => handleEventClick(event)}>
                                                <h2 className="card-title font-bold text-xl">{event.name}</h2>
                                                <div className="flex items-center text-lg">
                                                    <i className="far fa-calendar-alt mr-2 text-blue-700"></i> {event.date}
                                                </div>
                                                <div className="flex items-center text-lg">
                                                    <i className="fas fa-map-marker-alt text-blue-700 mr-2"></i> {event.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleNext} disabled={endIndex >= filteredEvents.length}
                                    className={`p-3 border-solid border-2 border-sky-500 rounded-full ${endIndex >= filteredEvents.length ? 'bg-gray-500' : 'bg-white'}`}
                                >
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
                    </div>
                    {/* calendar */}
                    <div className='w-full'>
                        <div className='w-full'>
                            {/* Custom toolbar */}
                            <div className="flex justify-center gap-10 items-center p-5 ">
                                <button onClick={handlePreviousMonth} className="text-lg font-bold p-3 border-solid border-2 border-sky-500 rounded-full bg-white">
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
                                <h2 className="text-3xl text-center w-60 font-bold text-white" style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}>{currentDate.format('MMMM YYYY')}</h2>
                                <button onClick={handleNextMonth} className="text-lg font-bold p-3 border-solid border-2 border-sky-500 rounded-full bg-white">
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
                        <Calendar
                            className='bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5]  border-solid border-2 border-black text-white'
                            localizer={customLocalizer} // Use the custom localizer
                            events={filteredEvents}
                            startAccessor="start"
                            endAccessor="end"
                            views={['month']} // Display only the month view
                            toolbar={false}
                            style={{ height: 800 }}
                            onSelectEvent={handleEventClick} // Handle event click
                            date={currentDate.toDate()}
                            eventPropGetter={eventStyleGetter}
                            components={{
                                eventWrapper: CustomEventWrapper // Use the custom event wrapper component
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventList;
