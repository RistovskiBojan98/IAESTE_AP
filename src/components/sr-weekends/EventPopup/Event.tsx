import React, { useRef, useEffect } from 'react';
import "./event-popup.css"
import Weekend from '../../global/Weekend';
import { SummerReceptionWeekend } from '../../../types/Types';
import { addClickEventListeners } from '../../global/global_functions';

interface EventPopupProps {
    event: SummerReceptionWeekend;
    onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        addClickEventListeners(popupRef, onClose);
    }, [onClose]);

    return (
        <div className="overlay">
            <div className="popup" ref={popupRef} style={{ maxWidth: '800px', maxHeight: '600px' }}>
                <Weekend weekend={event} dialog={true}/>
            </div>
        </div>
    );
};

export default EventPopup;
