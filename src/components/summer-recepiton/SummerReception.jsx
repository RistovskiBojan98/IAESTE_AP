import React, { useState, useEffect } from 'react';
import { summerReception } from "./summerReception"

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
        setWeekends(data);
        const names = data?.map((weekend) => weekend.name) ?? [];
        setWeekendsNames(names);
        setWeekend(data[0]);
        setLoading(false); // Mark data as loaded

        // Automatically select the first weekend after data is loaded
        if (data.length > 0) setSelectedButtonIndex(0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [country]);

  if (!loading && weekends.length && weekend) {
    const smCols = weekends.length < 2 ? weekends.length : 2;
    const mdCols = weekends.length < 4 ? weekends.length : 4;

    return (
      <section className="my-10 flex flex-col border-b border-gray-300" ref={summerReceptionRef}>
        <div className="lg:space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl mb-5">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Summer Reception 2023
          </h2>
          <p className='mt-2 mb-8'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At elementum eu facilisis sed odio morbi. In est ante in nibh mauris. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Varius duis at consectetur lorem donec massa sapien. Molestie a iaculis at erat pellentesque. Massa eget egestas purus viverra accumsan in.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className={`flex grid md:grid-cols-${mdCols} grid-cols-${smCols} gap-4 text-center my-2`}>
            {weekendsNames.map((name, index) => (
              <button
                key={index}
                className={`flex rounded border border-gray-300 shadow-md bg-white-300 hover:bg-gray-400 focus:bg-[#0B3D59] focus:text-white focus:outline-none w-40 h-20 justify-center items-center ${
                  index === selectedButtonIndex ? 'bg-[#0B3D59] text-white' : ''
                }`}
                style={{ fontSize: '18px' }}
                onClick={() => setSelectedButtonIndex(index)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="border border-gray-300">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-[#0B3D59] p-6 text-white">
                <h3 className="text-lg ">{weekend.name}</h3>
                <p className='text-md mt-4'>Date: {weekend.date}</p>
                <p className='text-md'>Location: {weekend.location}</p>
                <p className='text-md'>Link: {weekend.link}</p>
                <p className='text-md mt-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src={weekend.img}
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </section>
    );
  }
  return <div>Loading...</div>;
};

export default SummerReception;
