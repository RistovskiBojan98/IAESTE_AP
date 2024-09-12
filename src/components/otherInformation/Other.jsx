import React, { useState } from "react";
import { otherInfo } from "./other";
import useWindowSize from "../../hooks/useScreenSize";
import OtherInfoCard from "./InfoCard";
import css from "../app.module.css"
import { leftArrow, rightArrow } from "../global_functions";

const Other = ({ country }) => {
    const { width } = useWindowSize();
    const [startIndex, setStartIndex] = useState(0);
    const countryOtherInfo = otherInfo.find((obj) => obj.country === country);

    const arrayLength = countryOtherInfo?.info?.length
    const maxItemsToShow = arrayLength >= 3 ? 3 : arrayLength
    // if the screen is small we show 1 object, otherwise 3
    const showPrev = () => {
        setStartIndex(Math.max(startIndex - (width >= 768 ? 3 : 1), 0));
    };

    const showNext = () => {
        setStartIndex(Math.min(startIndex + (width >= 768 ? 3 : 1), arrayLength - 1));
    };

    return countryOtherInfo?.info?.length ? (
        <section className={css.container}>
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold ">
                    Interesting and useful information
                </h1>
                <div className="grid mt-8 gap-2" style={{ gridTemplateColumns: '1fr 15fr 1fr' }}>
                    <button onClick={showPrev} disabled={startIndex === 0}>
                        {leftArrow}
                    </button>
                    <div className="relative grid z-1" style={{ gridTemplateColumns: width >= 768 ? `repeat(${maxItemsToShow}, 1fr)` : '' }}>
                        {arrayLength &&
                            countryOtherInfo.info
                                .slice(startIndex, startIndex + (width >= 768 ? maxItemsToShow : 1))
                                .map((item, index) => (
                                    <OtherInfoCard
                                        key={index}
                                        title={item.title}
                                        description={item.desc}
                                    />
                                ))}
                    </div>
                    <button onClick={showNext} className="flex items-center justify-end"                    >
                        {rightArrow}
                    </button>
                </div>
            </div>
        </section>
    ) : (<></>)
};

export default Other;
