import React, { useState, useEffect } from "react"
import { SummerReceptionWeekend } from "../../types/Types"
import useWindowSize from "../../hooks/useScreenSize";
import EventPopup from "../sr-weekends/EventPopup/Event";
import moment from "moment";

interface WeekendListProps {
    weekends: SummerReceptionWeekend[]
    setCurrentDate? : (date: moment.Moment)  => void
}

const WeekendList: React.FC<WeekendListProps> = ({ weekends, setCurrentDate }) => {
    const { width } = useWindowSize();
    const [eventsToShow, setEventsToShow] = useState<SummerReceptionWeekend[]>([])
    const [startIndex, setStartIndex] = useState(0)
    const [maxEvents, setMaxEvents] = useState(1)
    const [selectedEvent, setSelectedEvent] = useState<SummerReceptionWeekend | null>(null);

    useEffect(() => {
        const checkWidth = (): number => {
            if (width >= 768) return 3
            if (width < 768 && width > 640) return 2
            return 1
        }

        setMaxEvents(checkWidth())
    }, [width])

    useEffect(() => {
        setEventsToShow(weekends.slice(startIndex, maxEvents + startIndex))
    }, [startIndex, weekends, maxEvents])

    // event list buttons
    const handlePreviousEvents = () => {
        const newStartIndex = Math.max(startIndex - maxEvents, 0);
        setStartIndex(newStartIndex);
      };
    
      const handleNextEvents = () => {
        const remainingWeekends = weekends.length - startIndex - maxEvents;
        const newStartIndex = remainingWeekends >= maxEvents ? startIndex + maxEvents : weekends.length - maxEvents;
        setStartIndex(newStartIndex);
      };

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        if (setCurrentDate) setCurrentDate(moment(event.startDate)); // Set the current date to the event's start date
    };


    return (
        <section>
            {selectedEvent && (<EventPopup event={selectedEvent} setSelectedEvent={setSelectedEvent} />)}
            <div className="flex flex-row justify-between items-center gap-4 mt-2 text-white text-start">
                <button onClick={handlePreviousEvents} disabled={!startIndex}>
                    <i className={`fa fa-chevron-left text-xl ${!startIndex ? 'text-gray-300' : 'text-[#1B75BB]'}`}></i>
                </button>
                <div className='flex flex-row justify-between gap-4 pr-2 w-full items-center'>
                    {eventsToShow.map(event => (
                        <div key={event.name} className={`w-full card rounded-lg shadow-md p-3 cursor-pointer h-auto md:h-40
                                                hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] hover:text-white text-white
                                                ${selectedEvent !== event ? 'bg-[#1B75BB]' : 'bgGradient '}`}>
                            <div className="card-body  flex flex-col justify-between h-full" onClick={() => handleEventClick(event)}>
                                <h2 className="card-title font-semibold text-xl md:text-2xl border-b-2 pb-2">{event.name}</h2>
                                <div className='flex flex-col mt-2 sm:mt-0'>
                                    <div className="cardText">
                                        <i className="far fa-calendar-alt mr-2"></i> {event.start} - {event.end}
                                    </div>
                                    <div className="cardText">
                                        <i className="fas fa-map-marker-alt mr-2"></i> {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleNextEvents} disabled={weekends.length - 1 < startIndex + maxEvents}>
                    <i className={`fa fa-chevron-right text-xl ${weekends.length - 1 < startIndex + maxEvents ? 'text-gray-300' : 'text-[#1B75BB]'}`}></i>
                </button>
            </div>
        </section>
    )
}

export default WeekendList