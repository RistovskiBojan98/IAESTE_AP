import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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
    const { width, height } = useWindowSize();
    const [transformedEvents, setTransformedEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState([])
    const [calendarHeight, setCalendarHeight] = useState(0)

    useEffect(() => {
        setCalendarHeight(height - 250)
    }, [height]);

    

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

    // Function to customize day style
    const dayStyleGetter = (date) => {
        const today = moment();
        // const currentMonth = currentDate.month();

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
            <div className="mx-auto max-w-7xl border-solid border-b-2 py-4 border-[#0B3D59]">
                <div className="w-full px-3 sm:px-10 flex justify-center items-center">
                    <h2 className={css.titleText}>
                        <i className="fa-solid fa-umbrella-beach mr-3"></i>
                        Summer Reception 2025
                    </h2>
                </div>
                {/* Filter values */}
                {!!filter.length && (
                    <div className="flex justify-start items-center mt-3 max-w-7xl px-10 border-solid border-t-2 border-[#0B3D59] pt-4">
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
                    <div className='w-full bg-[#0B3D59] mt-5 rounded-lg shadow-lg border border-black' style={{ maxHeight: calendarHeight + 70 }}>
                        <div className='p-2 mx-auto max-w-7xl'>
                            <div className='flex flex-row justify-between items-center border-b pb-2 px-2'>
                                <span className='text-white text-3xl font-semibold'>
                                    IAESTE Weekends
                                </span>
                                <div className='ml-auto'>
                                    <button onClick={toggleFilterPopup} className="hover:text-sky-100 text-white font-bold text-sm md:text-xl rounded-full">
                                        <i className="fa fa-filter"></i> {width >= 768 ? 'Filter' : ''}
                                    </button>
                                    {/* Filter Popup */}
                                    {isFilterPopupOpen && <FilterPopup onClose={toggleFilterPopup} events={transformedEvents} setFilteredEvents={setFilteredEvents} setFilter={setFilter} setCurrentDate={setCurrentDate} />}
                                </div>
                            </div>
                            {filteredEvents.length ? (
                                <div className="flex justify-between items-center gap-2 mt-2">
                                    <div className='flex flex-col gap-4 pr-2 w-full items-center overflow-y-scroll' style={{ scrollbarWidth: 'thin', height: calendarHeight - 10 }}>
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
                            <div className="flex justify-center gap-4 items-center py-5 px-1">
                                <button onClick={handlePreviousMonth}>
                                    <i className='fa fa-chevron-left text-xl' ></i>
                                </button>
                                <h2 className={`${css.titleText} w-60 text-center`}>{currentDate.format('MMMM YYYY')}</h2>
                                <button onClick={handleNextMonth}>
                                    <i className='fa fa-chevron-right text-xl' ></i>
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
                                style={{ height: calendarHeight, width: '100%' }}
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
