import React, { useRef, useEffect }  from 'react';
import css from "./event-popup.module.css"

const EventPopup = ({ event, onClose }) => {
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

    return (
        <div className={css.overlay}>
            <div className={css.popup} ref={popupRef}>
                <button onClick={onClose} className={css.closeButton}>
                    <i class="fa-solid fa-x"></i>
                </button>
                <div className="w-full md:w-1/2 bg-[#0B3D59] p-6 text-white">
                    <h3 className="text-4xl font-bold">{event.name}</h3>
                    <hr className='mt-4'></hr>
                    <div className="flex items-center text-2xl mt-4">
                        <i className="far fa-calendar-alt mr-2 text-white"></i> {event.date}
                    </div>
                    <div className="flex items-center text-2xl mt-4">
                        <i className="fas fa-map-marker-alt text-white mr-2"></i> {event.location}
                    </div>
                    <div className="flex items-center text-2xl mt-4">
                        <i className="fas fa-link text-white mr-2"></i> {event.link}
                    </div>
                    <hr className='mt-4'></hr>
                    <p className='text-xl mt-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <img src={event.image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default EventPopup;
