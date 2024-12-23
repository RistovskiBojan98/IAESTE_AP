import React, { useState, useEffect, forwardRef } from 'react';
import "../sr-weekends/EventPopup/event-popup.css"
import { mapSummerReceptionWeekend } from "../global/global_functions";
import { CountryComponent, SummerReceptionWeekend } from '../../types/Types';
import WeekendList from '../global/WeekendList';

const SummerReception = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const [weekends, setWeekends] = useState<SummerReceptionWeekend[]>([]);

  useEffect(() => {
    const data = country.summerReception ?? [];
    // set the weekends
    if (data?.length) {
      const mappedWeekends = data.map(weekend => mapSummerReceptionWeekend(weekend, country))
      setWeekends(mappedWeekends);
    }
  }, [country]);

    return (
      weekends.length ?
        <section className="mt-10" ref={ref}>
          <div className='container bg-[#0B3D59] rounded-lg shadow-lg'>
            <div className="lg:space-y-5 mx-auto max-w-xl sm:space-y-4 lg:max-w-5xl mb-5 ">
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                <i className='fa fa-umbrella-beach mr-4 mb-4'></i>
                Summer Reception 2024
              </h2>
            </div>
            <WeekendList weekends={weekends} />
            <br></br>
          </div>
      </section> : <></>
    );
});

export default SummerReception;
