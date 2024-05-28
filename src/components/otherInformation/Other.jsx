import React, { useState } from "react";
import { otherInfo } from "./other";
import classes from "./Other.module.css"
import useWindowSize from "../../hooks/useScreenSize";
import OtherInfoCard from "./InfoCard";
import css from "../app.module.css"

const Other = ({ country }) => {
    const { width } = useWindowSize();
    const [startIndex, setStartIndex] = useState(0);
    const countryOtherInfo = otherInfo.find((obj) => obj.country === country);

    const arrayLength = countryOtherInfo?.info?.length
    const maxItemsToShow = arrayLength >= 3 ? 3 : arrayLength

    const cards = arrayLength &&
        countryOtherInfo.info
            .slice(startIndex, startIndex + (width >= 768 ? maxItemsToShow : 1))
            .map((item) => (
                <OtherInfoCard
                    key={item.id}
                    title={item.title}
                    description={item.desc}
                />
            ));

    const showPrev = () => {
        setStartIndex(Math.max(startIndex - (width >= 768 ? 3 : 1), 0));
    };

    const showNext = () => {
        setStartIndex(Math.min(startIndex + (width >= 768 ? 3 : 1), arrayLength - 1));
    };

    return (
        <>
            {countryOtherInfo?.info?.length ? (
                <section className={css.container}>
                <div className="px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold ">
                        Interesting and useful information
                    </h1>
                    <div className={classes.grid}>
                        <button onClick={showPrev} disabled={startIndex === 0}>
                            <svg
                                width="15"
                                viewBox="0 0 20 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.76 17.6L19.448 32.288L17.672 34.304L0.872 17.6L17.432 0.847998L19.208 2.864L4.76 17.6Z"
                                    fill="black"
                                />
                            </svg>
                        </button>
                        <div className={classes.cards}
                            style={{ gridTemplateColumns: width >= 768 ? `repeat(${maxItemsToShow}, 1fr)` : '' }}>{cards}
                        </div>
                        <button
                            onClick={showNext}
                            disabled={(arrayLength > 3 && startIndex + 3 >= arrayLength) || (arrayLength <= maxItemsToShow)}
                            className={classes["next-button"]}
                        >
                            <svg
                                width="15"
                                viewBox="0 0 20 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.66588 0.847998L19.1779 17.6L2.42588 34.304L0.601875 32.288L15.3379 17.6L0.841875 2.864L2.66588 0.847998Z"
                                    fill="black"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            ) : (
                <></>
            )}
        </>

    );
};

export default Other;
