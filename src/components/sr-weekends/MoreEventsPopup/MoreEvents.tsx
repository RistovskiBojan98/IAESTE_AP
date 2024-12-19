import React, { useRef, useEffect } from 'react';
import "./more-events.css"
import { addClickEventListeners } from '../../global/global_functions';
import { SummerReceptionWeekend } from '../../../types/Types';

interface MoreEventsPopupProps {
    events: SummerReceptionWeekend[];
    date: string;
    onClose: () => void;
}

const MoreEventsPopup: React.FC<MoreEventsPopupProps> = ({ events, date, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        addClickEventListeners(popupRef, onClose);
    }, [onClose]);

    const handleEventClick = (event: SummerReceptionWeekend) => {
        localStorage.setItem('selectedEvent', JSON.stringify(event));
        onClose();
    }

    return (
        <div className="overlay">
            <div className="popup" ref={popupRef} style={{ maxWidth: '800px', maxHeight: '600px' }}>
                <div className="w-full h-full p-6 text-white">
                    <h3 className="text-2xl md:text-4xl font-bold">All events on {date}</h3>
                    <hr className='mt-4'></hr>
                    <div className="overflow" style={{ scrollbarWidth: 'thin'}}>
                        {events.map(event => (
                            <div key={event.name} 
                                 className={`w-full card mb-3 rounded-lg shadow-md p-3 cursor-pointer h-auto md:h-40 bg-[#1B75BB] text-white 
                                    hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5]`} 
                                 onClick={() => handleEventClick(event)}>
                                <div className="card-body flex flex-col justify-between h-full">
                                    <h2 className="card-title font-semibold text-xl md:text-2xl border-b-2 pb-2">{event.name}</h2>
                                    <div className='flex flex-col mt-2 sm:mt-0'>
                                        <div className="cardText">
                                            <i className="far fa-calendar-alt mr-2"></i> {event.date}
                                        </div>
                                        <div className="cardText">
                                            <i className="fas fa-map-marker-alt mr-2"></i> {event.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreEventsPopup;
