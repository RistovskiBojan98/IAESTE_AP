import React from "react";
import "./Weekend.css";
import { SummerReceptionWeekend } from "../../types/Types";

interface WeekendProps {
    weekend: SummerReceptionWeekend;
    dialog: boolean;
    onClose?: () => void;
}

const Weekend: React.FC<WeekendProps> = ({ weekend, onClose }) => {
    return (
        <div className="flex max-h-[82vh] flex-col overflow-hidden bg-white text-slate-700">
            {/* Header */}
            <div className="relative min-h-[150px] overflow-hidden bg-gradient-to-br from-[#143D59] via-[#1B75BB] to-[#49C0B5] px-6 pb-8 pt-7 text-white sm:min-h-[180px] sm:p-8">                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                            {weekend.country}
                        </p>

                        <h3 className="max-w-[85%] break-words text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">
                            {weekend.name}
                        </h3>
                    </div>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                        >
                            <i className="fa fa-times" />
                        </button>
                    )}
                </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {/* <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB]">
                        <i className="fa fa-info" />
                    </span>

                    <div>
                        <h4 className="text-xl font-bold text-[#143D59]">
                            About this weekend
                        </h4>
                        <p className="text-sm text-slate-500">
                            Event details and additional information.
                        </p>
                    </div>
                </div> */}

                <div className="space-y-4 text-base leading-7 text-slate-600 md:text-lg">
                    {weekend.description?.split("\n").map((paragraph, index) =>
                        paragraph.trim() ? <p key={index} className="font-semibold">{paragraph}</p> : null
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-slate-50/90 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <FooterItem icon="far fa-calendar-alt" label="Dates">
                        {weekend.start} - {weekend.end}
                    </FooterItem>

                    <FooterItem icon="fas fa-map-marker-alt" label="Location">
                        {weekend.location}
                    </FooterItem>

                    {!!weekend.link && (
                        <a
                            href={weekend.link}
                            target="_blank"
                            rel="noreferrer"
                            className="md:ml-auto flex items-center justify-center rounded-2xl bg-[#1B75BB] px-5 py-3 font-bold text-white shadow-lg shadow-[#1B75BB]/20 transition hover:-translate-y-0.5 hover:bg-[#143D59] hover:shadow-xl"
                        >
                            <i className="fas fa-link mr-2" />
                            Register
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

interface FooterItemProps {
    icon: string;
    label: string;
    children: React.ReactNode;
}

const FooterItem: React.FC<FooterItemProps> = ({ icon, label, children }) => (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-100">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB]">
            <i className={icon} />
        </span>

        <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="font-bold text-[#143D59]">{children}</p>
        </div>
    </div>
);

export default Weekend;