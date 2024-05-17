import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { summerReception } from '../summer-recepiton/summerReception';
import EventPopup from './EventPopup/Event';
import FilterPopup from "./EventFilter/Filter"
import useWindowSize from '../../hooks/useScreenSize';

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

    const [filter, setFilter] = useState([])

    // State for controlling the index of the first event to be displayed
    const [startIndex, setStartIndex] = useState(0);

    // Maximum number of events to display at a time
    const maxEventsToShow = width >= 768 ? 3 : 1;

    // Calculate the end index based on the start index and maximum events to show
    const endIndex = Math.min(startIndex + maxEventsToShow, filteredEvents.length);

    // Events to display based on the start and end index
    const eventsToShow = filteredEvents.slice(startIndex, endIndex);
    // const eventsToShow = []

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

    // State for controlling the visibility of the filter popup
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    // Function to toggle the visibility of the filter popup
    const toggleFilterPopup = () => {
        // helper function
        const formatDate = (date) => {
            const splitDateT = date.split('T')[0];
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

        setIsFilterPopupOpen(!isFilterPopupOpen);
        if (isFilterPopupOpen) {
            const savedFilterValues = localStorage.getItem('filterValues');
            let events = [...transformedEvents]
            let filter = []
            if (savedFilterValues) {
                const filterValues = JSON.parse(savedFilterValues);
                if (filterValues.selectedCountries) {
                    const selectedCountries = filterValues.selectedCountries;
                    if (selectedCountries.length) {
                        events = events.filter(event => selectedCountries.includes(event.country))
                        let countriesInFilter = ""
                        selectedCountries.forEach((country, index) => {
                            countriesInFilter += country
                            if (index < selectedCountries.length - 1) countriesInFilter += ", "
                        })
                        filter.push({ "Countries": countriesInFilter })
                    }
                }
                if (filterValues.startDate) {
                    const startDate = new Date(filterValues.startDate);
                    events = events.filter(event => new Date(event.start) >= startDate || new Date(event.end));
                    filter.push({ "From date": formatDate(filterValues.startDate) })
                }
                if (filterValues.endDate) {
                    const endDate = new Date(filterValues.endDate);
                    events = events.filter(event => new Date(event.end) <= endDate || new Date(event.start) <= endDate);
                    filter.push({ "To date": formatDate(filterValues.endDate) })
                }
            }
            setFilteredEvents(events)
            setFilter(filter)
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
            backgroundColor: 'lightblue',
            borderRadius: '20px',
            color: 'blue',
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
                backgroundColor: 'lightblue',
                borderRadius: '20px',
                color: 'white',
                border: '1px solid transparent',
                padding: '5px 10px', // Adjust padding as needed
                cursor: 'pointer' // Add pointer cursor to indicate it's clickable
            }}>
            {children}
        </div>
    );

    // Function to customize day style
    const dayStyleGetter = (date) => {
        const today = moment();
        if (moment(date).isSame(today, 'day')) {
            return {
                style: {
                    backgroundColor: '#aabbcc' // Change this to the desired color
                }
            };
        }
        return {};
    };

    return (
        <div>
            {selectedEvent && (<EventPopup event={selectedEvent} onClose={closePopup} />)}
            <div className="mx-auto max-w-7xl mt-10 border-solid border-b-2 pb-3 border-[#0B3D59]">
                <div className="w-full px-10 flex justify-start items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#0B3D59] sm:text-4xl" style={{ textShadow: '0 0 5px rgba(255,255,255,1' }}>
                        {maxEventsToShow === 3 ? 'Summer Reception Weekends 2024' : 'SR 2024'}
                    </h2>
                    <div className='ml-auto'>
                        <button onClick={toggleFilterPopup} className="bg-[#0B3D59] hover:bg-sky-700 text-white font-bold py-3 px-10 text-2xl rounded-full">
                            <i class="fa fa-filter"></i> {maxEventsToShow === 3 ? 'Filter' : ''}
                        </button>
                        {/* Filter Popup */}
                        {isFilterPopupOpen && <FilterPopup onClose={toggleFilterPopup} events={transformedEvents} />}
                    </div>
                </div>
                {/* Filter values */}
                {filter.length > 0 && (
                    <div className="flex justify-start items-center mt-3 max-w-7xl px-10">
                        <span className="text-lg font-semibold text-[#0B3D59] hidden md:block"><i class="fa fa-filter"></i></span>
                        <div className='flex flex-col md:flex-row gap-3'>
                            {filter.map((filterItem, index) => (
                                <div key={index} onClick={toggleFilterPopup} className="flex flex-row items-center bg-[#0B3D59] hover:bg-sky-700 cursor-pointer text-white rounded-full px-3 py-1 ml-2">
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
            <div className="mb-10">
                <div className=' gap-5 mx-auto max-w-7xl'>
                    {/* event list */}
                    <div className='w-full' style={{ maxHeight: '650px' }}>
                        <div className='py-10 px-1 mx-auto max-w-7xl'>
                            {eventsToShow.length ? (
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
                                            <div key={event.name} className="w-full card mb-3 bg-white rounded-lg shadow-md p-3 cursor-pointer h-auto md:h-40 hover:bg-sky-100">
                                                <div className="card-body text-black flex flex-col justify-between h-full" onClick={() => handleEventClick(event)}>
                                                    <h2 className="card-title font-semibold text-2xl border-b-2 pb-2">{event.name}</h2>
                                                    <div className='flex flex-col'>
                                                        <div className="flex items-center text-lg">
                                                            <i className="far fa-calendar-alt mr-2 text-blue-700"></i> {event.date}
                                                        </div>
                                                        <div className="flex items-center text-lg">
                                                            <i className="fas fa-map-marker-alt text-blue-700 mr-2"></i> {event.location}
                                                        </div>
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
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <h2 className="text-3xl text-center font-semibold text-[#0B3D59]" style={{ textShadow: '0 0 5px rgba(255,255,255,1' }}><i class="fa-solid fa-circle-exclamation"></i> No events found from the filter parameters!</h2>
                                </div>
                            )}

                        </div>
                    </div>
                    {/* calendar */}
                    <div className='w-full'>
                        <div className='w-full'>
                            {/* Custom toolbar */}
                            <div className="flex justify-center gap-10 items-center py-5 px-1">
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
                                <h2 className="text-3xl text-center w-60 font-bold text-[#0B3D59]" style={{ textShadow: '0 0 5px rgba(255,255,255,1' }}>{currentDate.format('MMMM YYYY')}</h2>
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
                            className='bg-[#0B3D59] border-solid border-2 border-black text-white'
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
                            dayPropGetter={dayStyleGetter}
                            components={{
                                eventWrapper: CustomEventWrapper // Use the custom event wrapper component
                            }}
                        />
                    </div>
                    {/* Subscribe */}
                    {/* <div className='w-full px-10 py-5'>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}>
                            Subscribe to our newsletter
                        </h2>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default EventList;
