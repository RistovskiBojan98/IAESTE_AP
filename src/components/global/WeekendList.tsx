import React, { useMemo, useState } from "react";
import { SummerReceptionWeekend } from "../../types/Types";
import EventPopup from "../sr-weekends/EventPopup/Event";
import moment from "moment";

interface WeekendListProps {
    weekends: SummerReceptionWeekend[];
    setCurrentDate?: (date: moment.Moment) => void;
}

const WeekendList: React.FC<WeekendListProps> = ({ weekends, setCurrentDate }) => {
    const [selectedEvent, setSelectedEvent] = useState<SummerReceptionWeekend | null>(null);
    const [search, setSearch] = useState("");

    const filteredWeekends = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) return weekends;

        return weekends.filter((event) =>
            [event.name, event.location, event.country]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [weekends, search]);

    const handleEventClick = (event: SummerReceptionWeekend) => {
        setSelectedEvent(event);
        setCurrentDate?.(moment(event.startDate));
    };

    return (
        <section>
            {selectedEvent && (
                <EventPopup event={selectedEvent} setSelectedEvent={setSelectedEvent} />
            )}

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-md">
                    <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by city, country, or event..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-700 outline-none transition focus:border-[#27A9E1] focus:bg-white focus:ring-4 focus:ring-[#27A9E1]/10"
                    />
                </div>

                <div className="text-sm font-medium text-slate-500">
                    {filteredWeekends.length} event{filteredWeekends.length !== 1 ? "s" : ""} available
                </div>
            </div>

            {filteredWeekends.length ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredWeekends.map((event) => (
                        <button
                            key={`${event.name}-${event.start}`}
                            onClick={() => handleEventClick(event)}
                            className="group relative overflow-hidden rounded-3xl text-left shadow-lg ring-1 ring-white/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#27A9E1]/30"
                        >
                            {/* glass layer */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#143D59] via-[#1B75BB] to-[#49C0B5] backdrop-blur-[2px]" />

                            {/* subtle shine */}
                            {/* <div className="absolute -left-24 top-0 h-full w-20 rotate-12 bg-white/20 blur-xl transition-all duration-700 group-hover:left-[120%]" /> */}

                            <div className="relative p-5 text-white">
                                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                                    {event.country}
                                </h3>

                                <h3 className="line-clamp-2 min-h-[3.5rem] text-2xl font-bold leading-tight">
                                    {event.name}
                                </h3>
                            </div>

                            <div className="relative space-y-4 rounded-t-3xl bg-white/95 p-5 backdrop-blur">
                                <div className="flex items-start gap-3 text-slate-700">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB]">
                                        <i className="far fa-calendar-alt" />
                                    </span>

                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Dates
                                        </h3>
                                        <span className="font-semibold">
                                            {event.start} - {event.end}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-slate-700">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB]">
                                        <i className="fas fa-map-marker-alt" />
                                    </span>

                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Location
                                        </h3>
                                        <span className="font-semibold">{event.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                    <span className="text-sm font-bold text-[#1B75BB]">
                                        View details
                                    </span>

                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#1B75BB] group-hover:text-white">
                                        <i className="fa fa-arrow-right" />
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                    No weekends match your search.
                </div>
            )}
        </section>
    );
};

export default WeekendList;