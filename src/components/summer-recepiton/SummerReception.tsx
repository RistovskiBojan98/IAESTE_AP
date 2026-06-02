import React, { useState, useEffect, forwardRef } from "react";
import "../sr-weekends/EventPopup/event-popup.css";
import { mapSummerReceptionWeekend } from "../global/global_functions";
import { CountryComponent, SummerReceptionWeekend } from "../../types/Types";
import WeekendList from "../global/WeekendList";

const SummerReception = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const [weekends, setWeekends] = useState<SummerReceptionWeekend[]>([]);
  const currentYear = new Date().getFullYear();
  const countryName = country.name.replace(/-/g, " ");

  useEffect(() => {
    const data = country.summerReception ?? [];

    const mappedWeekends = data
      .filter((weekend) => new Date(weekend.startDate).getFullYear() === currentYear)
      .map((weekend) => mapSummerReceptionWeekend(weekend, country));

    setWeekends(mappedWeekends);
  }, [country, currentYear]);

  if (!weekends.length) return null;

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-20">
      <div className="relative overflow-hidden rounded-[2rem] p-6 shadow-xl ring-1 ring-slate-100 sm:p-10 bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#7AE7D8]">
        <div className="relative">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur text-white">
              <i className="fa fa-umbrella-beach" />
            </span>

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Summer Reception {currentYear}
            </h2>

            <p className="mt-3 max-w-2xl text-white/75">
              Discover upcoming IAESTE weekends and events hosted in {countryName}.
            </p>
          </div>

          <WeekendList weekends={weekends} />
        </div>
      </div>
    </section>
  );
});

export default SummerReception;