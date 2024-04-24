import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { summerReception } from '../summer-recepiton/summerReception';

const localizer = momentLocalizer(moment);

const EventList = () => {
    // Transform the existing events data to match the new structure
    const transformedEvents = Object.keys(summerReception).reduce((acc, country) => {
        const countryEvents = summerReception[country].map(event => ({
            ...event,
            country,
            location: event.location + ", " + country,
            start: moment(event.date.split(' - ')[0], 'DD.MM'),
            end: moment(event.date.split(' - ')[1], 'DD.MM'),
            title: event.name
        }));
        return [...acc, ...countryEvents];
    }, []);

    const handleFilterClick = () => {
        // Implement your filtering logic here
        console.log('Filter button clicked');
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="w-full px-10 flex justify-start items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#0B3D59] sm:text-4xl">
                        Summer Reception Weekends 2024
                    </h2>
                    <div className='ml-auto'>
                        <button onClick={handleFilterClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 text-2xl rounded-full">Filter</button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 mt-10" style={{maxHeight: "600px"}}>
                <div className='flex row p-10 mx-auto max-w-7xl'>
                    <div className='col-md-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue scrollbar-track-gray-100' style={{ maxHeight: '500px' }}>
                        {transformedEvents.map(event => (
                            <div key={event.name} className="card mb-3 bg-white rounded-lg shadow-md p-3">
                                <div className="card-body text-black">
                                    <h2 className="card-title font-bold">{event.name}</h2>
                                    <p>Date: {event.date}</p>
                                    <p>Location: {event.location}</p>
                                    {/* Add other details as needed */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-8'>
                        <Calendar
                            localizer={localizer}
                            events={transformedEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventList;
