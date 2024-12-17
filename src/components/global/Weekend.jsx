import React, { useRef, useState, useEffect } from "react";
import css from "./Weekend.module.css"

const Weekend = ({ weekend, dialog }) => {
    const parentRef = useRef(null)
    const descRef = useRef(null)
    const [descHeight, setDescHeight] = useState(320)

    useEffect(() => {
        if (dialog) {
            const updateHeight = () => {
                if (parentRef.current) {
                    const parentHeight = parentRef.current.offsetHeight
                    const otherElementsHeight = Array.from(parentRef.current.children)
                        .filter(child => child !== descRef.current)
                        .reduce((total, child) => total + child.offsetHeight, 0)
                    const result = parentHeight - otherElementsHeight - 80 // padding
                    setDescHeight(result > 0 ? result : 0)
                }
            }
    
            updateHeight()
            window.addEventListener("resize", updateHeight)
            return () => window.removeEventListener("resize", updateHeight)
        }
    }, [dialog])
    // to be fixed next year
    weekend.link = null;

    return (
        <div ref={parentRef} className="w-full bg-[#1B75BB] p-3 sm:p-6 text-white">
            <h3 className="text-2xl md:text-4xl font-bold text-center">{weekend.name}</h3>
            <hr className='mt-4'></hr>
            <div className="grid sm:grid-cols-2">
                <div className={css.info}>
                    <i className="far fa-calendar-alt mr-2"></i> {weekend.start} - {weekend.end}
                </div>
                <div className={css.info}>
                    <i className="fas fa-map-marker-alt mr-2"></i> {weekend.location}
                </div>
                {!!weekend.link && (
                    <div className={`${css.info} hover:text-sky-700`}>
                        <a href={weekend.link} target='_blank' rel="noreferrer">
                            <i className="fas fa-link mr-1"></i> Registration link
                        </a>
                    </div>
                )}
                {!!weekend.limit && (
                    <div className={css.info}>
                        <i className="fas fa-users mr-3"></i> Max. participants: {weekend.limit}
                    </div>
                )}
            </div>

            <hr className='my-4'></hr>
            <div ref={descRef} className="overflow-y-hidden hover:overflow-y-scroll" style={{ scrollbarWidth: 'thin', maxHeight: descHeight }}>
                <p className='text-base md:text-xl mt-4 px-2'> {weekend.description.split('\n').map((paragraph, index) => (
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