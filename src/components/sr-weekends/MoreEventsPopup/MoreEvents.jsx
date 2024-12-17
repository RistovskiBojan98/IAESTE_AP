import React, { useRef, useEffect } from 'react';
import css from "./more-events.module.css"

const MoreEventsPopup = ({ events, date, onClose }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        // click outside of the popup window
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };
        // escape button
        const handleEscapeKey = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);

    const handleEventClick = (event) => {
        localStorage.setItem('selectedEvent', JSON.stringify(event));
        onClose();
    }

    return (
        <div className={css.overlay}>
            <div className={css.popup} ref={popupRef} style={{ maxWidth: '800px', maxHeight: '600px' }}>
                <div className="w-full h-full p-6 text-white">
                    <h3 className="text-2xl md:text-4xl font-bold">All events on {date}</h3>
                    <hr className='mt-4'></hr>
                    <div className={css.overflow} style={{ scrollbarWidth: 'thin'}}>
                        {events[0].map(event => (
                            <div key={event.name} className={`w-full card mb-3 rounded-lg shadow-md p-3 cursor-pointer h-auto md:h-40 bg-white text-[#0B3D59]
                                                hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] hover:text-white`} onClick={() => handleEventClick(event)}>
                                <div className="card-body flex flex-col justify-between h-full">
                                    <h2 className="card-title font-semibold text-xl md:text-2xl border-b-2 pb-2">{event.name}</h2>
                                    <div className='flex flex-col mt-2 sm:mt-0'>
                                        <div className={css.cardText}>
                                            <i className="far fa-calendar-alt mr-2"></i> {event.date}
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
            </div>
        </div>
    );
};

export default MoreEventsPopup;
