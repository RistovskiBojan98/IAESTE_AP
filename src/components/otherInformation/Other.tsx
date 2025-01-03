import React, { useState, useEffect } from "react";
import useWindowSize from "../../hooks/useScreenSize";
import OtherInfoCard from "./InfoCard";
import { OtherType, CountryComponent } from "../../types/Types";

const Other: React.FC<CountryComponent> = ({ country }) => {
    const { width } = useWindowSize();
    const [startIndex, setStartIndex] = useState(0);
    const [otherInfo, setOherInfo] = useState<OtherType[]>([])
    const [arrayLength, setArrayLength] = useState(0)
    const [maxItemsToShow, setMaxItemsToShow] = useState(2)
    // if the screen is small we show 1 object, otherwise 2

    useEffect(() => {
        const data = country.otherInformation ?? []
        setOherInfo(data)
        setArrayLength(data.length)
        setMaxItemsToShow(data.length >= 2 ? 2 : data.length)
    }, [country])


    const showPrev = () => setStartIndex(Math.max(startIndex - (width >= 768 ? 2 : 1), 0));
    const showNext = () => setStartIndex(Math.min(startIndex + (width >= 768 ? 2 : 1), arrayLength - 1));

    return otherInfo?.length ? (
        <section className="container">
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold ">
                    <i className='fa fa-file-circle-plus mr-4'></i>
                    Interesting and useful information
                </h1>
                <div className="grid mt-8 gap-2" style={{ gridTemplateColumns: '1fr 15fr 1fr' }}>
                    <button onClick={showPrev} disabled={startIndex === 0}>
                        <i className='fa fa-chevron-left text-xl text-[#0B3D59]' ></i>
                    </button>
                    <div className="relative grid z-1" style={{ gridTemplateColumns: width >= 768 ? `repeat(${maxItemsToShow}, 1fr)` : '' }}>
                        {arrayLength &&
                            otherInfo
                                .slice(startIndex, startIndex + (width >= 768 ? maxItemsToShow : 1))
                                .map((item, index) => (
                                    <OtherInfoCard
                                        key={index}
                                        title={item.title}
                                        description={item.description}
                                    />
                                ))}
                    </div>
                    <button onClick={showNext} className="flex items-center justify-end"                    >
                        <i className='fa fa-chevron-right text-xl text-[#0B3D59]' ></i>
                    </button>
                </div>
            </div>
        </section>
    ) : (<></>)
};

export default Other;
