import React, { useState, useEffect } from 'react';
import { summerReception } from "./summerReception"
import css from "../sr-weekends/EventPopup/event-popup.module.css"
import appCss from "../app.module.css"

const SummerReception = ({ country, summerReceptionRef }) => {
  const [weekend, setWeekend] = useState({});
  const [weekends, setWeekends] = useState([]);
  const [weekendsNames, setWeekendsNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await summerReception[country];
        // check if the event passed, if true then disable the registraion link
        const currYear = new Date().getFullYear();
        data?.forEach((event) => {
          const [startDate] = event.date.split(' - ');
          const fullStartDate = new Date(`${startDate}.${currYear}`)
          if (fullStartDate < new Date()) event.link = null;
        })
        // set the weekends
        if (data?.length) {
          setWeekends(data);
          const names = data?.map((weekend) => weekend.name) ?? [];
          setWeekendsNames(names);
          setWeekend(data[0]);
          setSelectedButtonIndex(0);
        }
        setLoading(false); // Mark data as loaded
      } catch (error) {
        console.error('Error fetching summer reception data:', error);
      }
    };

    fetchData();
  }, [country]);

  if (!loading && weekends?.length && weekend) {
    const cols = weekends.length < 4 ? weekends.length : 4
    const mobCols = weekends.length > 1 ? 2 : 1;

    return (
      <section className={`${css.container} mt-10`} ref={summerReceptionRef}>
        <div className="lg:space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl mb-5 text-center">
          <h2 className={appCss.title}>
            Summer Reception 2024
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <div className={`grid grid-cols-${mobCols} sm:grid-cols-${cols} gap-4 text-center my-5`}>
            {weekendsNames.map((name, index) => (
              <button
                key={index}
                className={`flex p-1 rounded border border-solid border-gray-300 shadow-md 
                hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] hover:text-white
                w-40 h-20 justify-center items-center text-base
                ${index === selectedButtonIndex ? 'bg-[#0B3D59] text-white' : 'text-[#0B3D59] bg-white-300'}`}
                onClick={() => {
                  setSelectedButtonIndex(index)
                  setWeekend(weekends[index])
                }}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="border border-gray-300 w-full max-w-7xl shadow-xl sm:overflow-hidden sm:rounded-2xl" style={{ maxHeight: '600px'}}>
            <div className="flex flex-col md:flex-row">
              <div className="w-full bg-[#0B3D59] p-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold">{weekend.name}</h3>
                <hr className='mt-4'></hr>
                <div className="flex items-center text-lg md:text-xl mt-4">
                  <i className="far fa-calendar-alt mr-2 text-white"></i> {weekend.date}
                </div>
                <div className="flex items-center text-lg md:text-xl mt-4">
                  <i className="fas fa-map-marker-alt text-white mr-2"></i> {weekend.location + ", " + country}
                </div>
                {weekend.link && (
                  <div className="flex items-center text-lg md:text-xl mt-4 hover:text-sky-500">
                    <a href={weekend.link} target='_blank' rel="noreferrer">
                      <i className="fas fa-link text-white mr-1"></i> Registration link
                    </a>
                  </div>
                )}
                {weekend.limit && (
                  <div className="flex items-center text-lg md:text-xl mt-4">
                    <i className="fas fa-users text-white mr-3"></i> Maximum participants: {weekend.limit}
                  </div>
                )}
                <hr className='mt-4'></hr>
                <div className={css.overflowDescription} style={{maxHeight: '300px'}}>
                  <p className='text-base md:text-lg my-4 pb-10'> {weekend.description.split('\n').map((paragraph, index) => (
                    <span key={index}>{paragraph}<br></br></span>
                  ))}
                  </p>
                </div>

              </div>
              {/* <div className="w-full md:w-1/2">
                <img
                  src={weekend.image}
                  alt=""
                />
              </div> */}
            </div>
          </div>
        </div>
        <br></br>
      </section>
    );
  }
};

export default SummerReception;
