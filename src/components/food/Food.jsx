import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import useWindowSize from "../../hooks/useScreenSize";
import css from "../app.module.css"
import { leftArrow, rightArrow } from "../global/global_functions";

const Food = ({ country, foodRef }) => {
  const { width } = useWindowSize();
  const [cuisine, setCuisine] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [dataLen, setDataLen] = useState(0)
  const [maxItemsToShow, setMaxItemsToShow] = useState(3)

  useEffect(() => {
    const food = country.food ?? []
    const drinks = country.drinks ?? []
    const data = [...food, ...drinks]
    setCuisine(data)
    setDataLen(data.length)
    setMaxItemsToShow(data.length >= 3 ? 3 : data.length)
  }, [country])
  // if the screen is small we show 1 object, otherwise 3
  const showPrev = () => setStartIndex(Math.max(startIndex - (width >= 768 ? 3 : 1), 0));

  const showNext = () => setStartIndex(Math.min(startIndex + (width >= 768 ? 3 : 1), dataLen - 1));

  return dataLen ? (
    <section ref={foodRef} className={`${css.container} sm:mt-10 sm:mb-16 pt-4`}>
      <h2 className={`${css.title} pb-10`}>
        Traditional cuisine
      </h2>
      <div className="grid" style={{ gridTemplateColumns: '1fr 10fr 1fr' }}>
        <button onClick={showPrev} disabled={startIndex === 0}>
          {leftArrow}
        </button>
        <div className="grid relative z-1 gap-2" style={{ gridTemplateColumns: width >= 768 ? `repeat(${maxItemsToShow}, 1fr)` : '' }}>
          {dataLen &&
            cuisine
              .slice(startIndex, startIndex + (width >= 768 ? maxItemsToShow : 1))
              .map((item, index) => (
                <FoodCard
                  title={item.title}
                  description={item.description}
                  key={index}
                />
              ))}
        </div>
        <button onClick={showNext} className="flex items-center justify-end">
          {rightArrow}
        </button>
      </div>
    </section>
  ) : null
};

export default Food;
