import React, { useState, useEffect } from 'react';
import { summerReception } from "./summerReception"
import css from "../sr-weekends/EventPopup/event-popup.module.css"
import appCss from "../app.module.css"

const SummerReception = ({ country, summerReceptionRef }) => {
  let smCols = 2;
  let mdCols = 4
  const [weekend, setWeekend] = useState({});
  const [weekends, setWeekends] = useState([]);
  const [weekendsNames, setWeekendsNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await summerReception[country];
        setWeekends(data);
        const names = data?.map((weekend) => weekend.name) ?? [];
        setWeekendsNames(names);
        setWeekend(data ? data[0] : undefined);
        setLoading(false); // Mark data as loaded

        // Automatically select the first weekend after data is loaded
        if (data?.length > 0) setSelectedButtonIndex(0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [country]);

  if (!loading && weekends?.length && weekend) {
    smCols = weekends.length < 3 ? weekends.length : 3;
    mdCols = weekends.length < 4 ? weekends.length : 4;

    return (
      <section className={`${css.container} mt-10`} ref={summerReceptionRef}>
        <div className="lg:space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl mb-5 text-center">
          <h2 className={appCss.title}>
            Summer Reception 2024
          </h2>
          {/* <p className='mt-2 mb-8'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At elementum eu facilisis sed odio morbi. In est ante in nibh mauris. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Varius duis at consectetur lorem donec massa sapien. Molestie a iaculis at erat pellentesque. Massa eget egestas purus viverra accumsan in.
          </p> */}
        </div>
        <div className="flex flex-col items-center">
          <div className={`grid grid-cols-1 sm:grid-cols-${smCols} md:grid-cols-${mdCols} gap-4 text-center my-5`}>
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
                <div className="flex items-center text-lg md:text-xl mt-4 hover:text-sky-500">
                  <a href={weekend.link} target='_blank' rel="noreferrer">
                    <i className="fas fa-link text-white mr-1"></i> Registration link
                  </a>
                </div>
                {weekend.limit && (
                  <div className="flex items-center text-lg md:text-xl mt-4">
                    <i className="fas fa-users text-white mr-3"></i> Maximum participants: {weekend.limit}
                  </div>
                )}
                <hr className='mt-4'></hr>
                <div className={css.overflowDescription} style={{maxHeight: '300px'}}>
                  <p className='text-base md:text-lg my-4 pb-10'> {weekend.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}<br></br></p>
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
