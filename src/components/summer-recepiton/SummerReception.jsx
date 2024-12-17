import React, { useState, useEffect } from 'react';
import css from "../sr-weekends/EventPopup/event-popup.module.css"
import Weekend from '../global/Weekend';
import { bgGradient, mapSummerReceptionWeekend } from "../global/global_functions";

const SummerReception = ({ country, summerReceptionRef }) => {
  const [weekend, setWeekend] = useState({});
  const [weekends, setWeekends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  useEffect(() => {
    const data = country.summerReception ?? [];
    // set the weekends
    if (data?.length) {
      const mappedWeekends = data.map(weekend => mapSummerReceptionWeekend(weekend, country.name))
      setWeekends(mappedWeekends);
      setWeekend(mappedWeekends[0]);
      setSelectedButtonIndex(0);
    }
    setLoading(false); // Mark data as loaded
  }, [country]);

  if (!loading && weekends?.length && weekend) {
    const cols = weekends.length < 4 ? weekends.length : 4
    const mobCols = weekends.length > 1 ? 2 : 1;

    return (
      <section className={`${css.container} mt-10`} ref={summerReceptionRef}>
        {!!weekends.length ?
          <div>
            <div className="lg:space-y-5 mx-auto max-w-xl sm:space-y-4 lg:max-w-5xl mb-5 text-center">
              <h2 className="text-2xl sm:text-4xl font-bold text-center text-[#1B75BB]">
                <i className='fa fa-umbrella-beach mr-4'></i>
                Summer Reception 2024
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div className={`grid grid-cols-${mobCols} sm:grid-cols-${cols} gap-4 text-center my-5`}>
                {weekends.map((weekend, index) => (
                  <button
                    key={index}
                    className={`flex p-1 rounded border border-solid border-gray-300 shadow-md 
                hover:${bgGradient} hover:text-white w-40 h-20 justify-center items-center text-base
                ${index === selectedButtonIndex ? 'bg-[#1B75BB] text-white' : 'text-[#0B3D59] bg-white-300'}`}
                    onClick={() => {
                      setSelectedButtonIndex(index)
                      setWeekend(weekends[index])
                    }}
                  >
                    {weekend.name}
                  </button>
                ))}
              </div>
              <div className="border border-gray-300 w-full max-w-7xl shadow-xl overflow-hidden sm:rounded-2xl" style={{ maxHeight: '600px' }}>
                <Weekend weekend={weekend} dialog={false}/>
              </div>
            </div>
            <br></br>
          </div>
          : <></>
        }

      </section>
    );
  }
};

export default SummerReception;
