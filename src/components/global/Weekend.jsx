import React from "react";
import css from "./Weekend.module.css"

const Weekend = ({ weekend }) => {
    // to be fixed next year
    weekend.link = null;

    return (
        <div className="w-full bg-[#0B3D59] p-6 text-white">
            <h3 className="text-2xl md:text-4xl font-bold">{weekend.name}</h3>
            <hr className='mt-4'></hr>
            <div className={css.info}>
                <i className="far fa-calendar-alt mr-2"></i> {weekend.date}
            </div>
            <div className={css.info}>
                <i className="fas fa-map-marker-alt mr-2"></i> {weekend.location}
            </div>
            {weekend.link && (
                <div className={`${css.info} hover:text-sky-700`}>
                    <a href={weekend.link} target='_blank' rel="noreferrer">
                        <i className="fas fa-link mr-1"></i> Registration link
                    </a>
                </div>
            )}
            {weekend.limit && (
                <div className={css.info}>
                    <i className="fas fa-users mr-3"></i> Maximum participants: {weekend.limit}
                </div>
            )}
            <hr className='mt-4'></hr>
            <div className="overflow-hidden hover:overflow-y-scroll max-h-72" style={{scrollbarWidth: 'thin'}}>
                <p className='text-base md:text-xl mt-4 pb-10'> {weekend.description.split('\n').map((paragraph, index) => (
                    <span key={index}>{paragraph}<br></br></span>
                ))}
                </p>
            </div>
            {/* <div className="w-full md:w-1/2">
                <img
                  src={weekend.image}
                  alt=""
                />
              </div> */}
        </div>
    )
}

export default Weekend;