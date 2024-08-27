import React, { useRef, useEffect } from 'react';
import css from "./event-popup.module.css"

const EventPopup = ({ event, onClose }) => {
    const popupRef = useRef(null);

    const currYear = new Date().getFullYear();
    const [startDate] = event.date.split(' - ');
    const fullStartDate = new Date(`${startDate}.${currYear}`)
    if (fullStartDate < new Date()) event.link = null;

    useEffect(() => {
        // click outside of the popup window
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) onClose();
        };
        // escape button
        const handleEscapeKey = (event) => {
            if (event.keyCode === 27) onClose();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);

    return (
        <div className={css.overlay}>
            <div className={css.popup} ref={popupRef} style={{ maxWidth: '800px', maxHeight: '600px' }}>
                <button onClick={onClose} className={css.closeButton}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div className="w-full h-full p-6 text-white">
                    <h3 className="text-2xl md:text-4xl font-bold">{event.name}</h3>
                    <hr className='mt-4'></hr>
                    <div className="flex items-center text-base md:text-2xl mt-2 md:mt-4">
                        <i className="far fa-calendar-alt mr-3 text-white"></i> {event.date}
                    </div>
                    <div className="flex items-center text-base md:text-2xl mt-2 md:mt-4">
                        <i className="fas fa-map-marker-alt text-white mr-3"></i> {event.location}
                    </div>
                    {event.link && (
                        <div className="flex items-center text-base md:text-2xl mt-2 md:mt-4 hover:text-sky-500">
                            <a href={event.link} target='_blank' rel="noreferrer">
                                <i className="fas fa-link text-white mr-1"></i> Registration link
                            </a>
                        </div>
                    )}

                    {/* {event.limit && (
                        <div className="flex items-center text-lg md:text-2xl mt-4">
                            <i className="fas fa-users text-white mr-3"></i> Maximum participants: {event.limit}
                        </div>
                    )} */}

                    <hr className='mt-2 md:mt-4'></hr>
                    <div className={css.overflowDescription}>
                        <p className='text-sm md:text-xl my-4'> {event.description.split('\n').map((paragraph, index) => (
                            <span key={index}>{paragraph}<br></br></span>
                        ))}
                        </p>
                    </div>
                </div>
                {/* <div className="w-full md:w-1/2">
                    <img src={event.image} alt="" />
                </div> */}
            </div>
        </div>
    );
};

export default EventPopup;
