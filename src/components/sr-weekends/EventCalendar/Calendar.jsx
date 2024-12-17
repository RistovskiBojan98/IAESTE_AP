import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import css from "../sr-weekends.module.css"
import useWindowSize from '../../../hooks/useScreenSize';

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

const EventCalendar = ({ filteredEvents, handleEventClick, currentDate, setCurrentDate, showMoreEvents }) => {
    const { width, height } = useWindowSize();

    const [calendarHeight, setCalendarHeight] = useState(0)

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
        className: css.event
    });

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

    const customMessages = {
        showMore: (count, remainig, all) => (
            <div className={css.customShowMore} onClick={() => showMoreEvents(all)}>+{count} {width >= 768 ? 'more' : ''}</div>
        )
    };

    return (
        <div className='flex flex-col'>
            <div className='w-full'>
                {/* Custom toolbar */}
                <div className="flex justify-center gap-4 items-center pb-4 px-1">
                    <button onClick={handlePreviousMonth}>
                        <i className='fa fa-chevron-left text-xl' ></i>
                    </button>
                    <h2 className={`${css.titleText} w-72 text-center text-[#0B3D59]`}>{currentDate.format('MMMM YYYY')}</h2>
                    <button onClick={handleNextMonth}>
                        <i className='fa fa-chevron-right text-xl' ></i>
                    </button>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <Calendar
                    className='bg-[#0B3D59] rounded-lg shadow-lg border-black text-white'
                    localizer={customLocalizer} // Use the custom localizer
                    events={filteredEvents}
                    startAccessor="startDate"
                    endAccessor="endDate"
                    views={['month']} // Display only the month view
                    toolbar={false}
                    style={{ height: `${calendarHeight}px`, width: '95%' }}
                    onSelectEvent={handleEventClick} // Handle event click
                    date={currentDate.toDate()}
                    eventPropGetter={eventStyleGetter}
                    dayPropGetter={dayStyleGetter}
                    onNavigate={handleNavigate}
                    messages={customMessages}
                />
            </div>
        </div>
    )
}

export default EventCalendar;