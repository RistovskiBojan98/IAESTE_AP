import React, { useRef, useEffect } from "react";
import "./event-popup.css";
import Weekend from "../../global/Weekend";
import { SummerReceptionWeekend } from "../../../types/Types";
import { addClickEventListeners } from "../../global/global_functions";

interface EventPopupProps {
    event: SummerReceptionWeekend;
    setSelectedEvent: (event: SummerReceptionWeekend | null) => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, setSelectedEvent }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        addClickEventListeners(popupRef, () => {
            setSelectedEvent(null);
            localStorage.removeItem("selectedEvent");
        });
    }, [setSelectedEvent]);

    return (
        <div className="filter-overlay">
            <div
                ref={popupRef}
                className="relative w-[92vw] max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-white/60"
            >
                <Weekend
                    weekend={event}
                    dialog
                    onClose={() => {
                        setSelectedEvent(null);
                        localStorage.removeItem("selectedEvent");
                    }}
                />
            </div>
        </div>
    );
};

export default EventPopup;