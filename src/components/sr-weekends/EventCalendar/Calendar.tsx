import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../sr-weekends.css"
import useWindowSize from '../../../hooks/useScreenSize';
import { SummerReceptionWeekend } from "../../../types/Types";
import EventPopup from "../EventPopup/Event";
import MoreEventsPopup from "../MoreEventsPopup/MoreEvents";

// Customize localizer to make Monday the first day of the week
moment.updateLocale('en', {
    week: {
        dow: 1,
    },
})

const customLocalizer = momentLocalizer(moment)

interface EventCalendarProps {
    filteredEvents: SummerReceptionWeekend[];
    currentDate: moment.Moment;
    setCurrentDate: (date: moment.Moment) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ filteredEvents, currentDate, setCurrentDate }) => {
    const { height } = useWindowSize();
    const [calendarHeight, setCalendarHeight] = useState(0)
    const [events, setEvents] = useState<SummerReceptionWeekend[]>([])
    const [selectedEvent, setSelectedEvent] = useState<SummerReceptionWeekend | null>(null);
    const [moreEvents, setMoreEvents] = useState<SummerReceptionWeekend[]>([])
    const [moreEventsSelectedDate, setMoreEventsSelectedDate] = useState<string>("")

    useEffect(() => {
        setEvents(filteredEvents)
    }, [filteredEvents])

    useEffect(() => {
        setCalendarHeight(height - 200)
    }, [height]);

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
        className: "event"
    });

    const dayStyleGetter = (date: Date) => {
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

    const handleNavigate = (date: Date) => {
        setCurrentDate(moment(date));
    };

    const handleShowMore = (events: SummerReceptionWeekend[]) => {
        showMoreEvents(events);
    }

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        if (setCurrentDate) setCurrentDate(moment(event.startDate)); // Set the current date to the event's start date
    };

    const closeMoreEvents = () => {
        setMoreEvents([])
        setMoreEventsSelectedDate("")
        const selectedEvent = localStorage.getItem('selectedEvent');
        if (selectedEvent) handleEventClick(JSON.parse(selectedEvent))
    }

    const showMoreEvents = (events: SummerReceptionWeekend[]) => {
        const date = currentDate.toDate().toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        setMoreEvents(events)
        setMoreEventsSelectedDate(date)
    }


    return (
        <section>
            {!!moreEvents.length && (<MoreEventsPopup events={moreEvents} date={moreEventsSelectedDate} onClose={closeMoreEvents} />)}
            {selectedEvent && (<EventPopup event={selectedEvent} setSelectedEvent={setSelectedEvent}/>)}
            <div className='flex flex-col'>
                <div className='w-full'>
                    {/* Custom toolbar */}
                    <div className="flex justify-center gap-4 items-center pb-4 px-1">
                        <button onClick={handlePreviousMonth}>
                            <i className='fa fa-chevron-left text-xl' ></i>
                        </button>
                        <h2 className="titleText w-72 text-center text-[#0B3D59]">{currentDate.format('MMMM YYYY')}</h2>
                        <button onClick={handleNextMonth}>
                            <i className='fa fa-chevron-right text-xl' ></i>
                        </button>
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <Calendar
                        className='bg-[#0B3D59] rounded-lg shadow-lg border-black text-white'
                        localizer={customLocalizer}
                        events={events}
                        startAccessor="startDate"
                        endAccessor="endDate"
                        views={['month']} // Display only the month view
                        toolbar={false}
                        style={{ height: `${calendarHeight}px`, width: '95%' }}
                        onSelectEvent={handleEventClick}
                        date={currentDate.toDate()}
                        eventPropGetter={eventStyleGetter}
                        dayPropGetter={dayStyleGetter}
                        onNavigate={handleNavigate}
                        onShowMore={handleShowMore}
                    />
                </div>
            </div>
        </section>
    )
}

export default EventCalendar;