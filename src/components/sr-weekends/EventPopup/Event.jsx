import React, { useRef, useEffect } from 'react';
import css from "./event-popup.module.css"
import Weekend from '../../global/Weekend';

const EventPopup = ({ event, onClose }) => {
    const popupRef = useRef(null);

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
                <Weekend weekend={event}/>
            </div>
        </div>
    );
};

export default EventPopup;
