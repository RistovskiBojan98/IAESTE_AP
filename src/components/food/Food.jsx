import React, { useState } from "react";
import { food, drinks } from "./dataFood";
import FoodCard from "./FoodCard";
import useWindowSize from "../../hooks/useScreenSize";
import css from "../app.module.css"
import { leftArrow, rightArrow } from "../global_functions";

const Food = ({ country, foodRef }) => {
  const findContent = (obj) => obj.find((el) => el.country === country)?.content ?? [];

  const { width } = useWindowSize();
  const countryFood = findContent(food)
  const countryDrinks = findContent(drinks)
  const countryData = [...countryFood, ...countryDrinks];

  const dataLen = countryData?.length ?? 0
  const maxItemsToShow = dataLen >= 3 ? 3 : dataLen

  const [startIndex, setStartIndex] = useState(0);    
  // if the screen is small we show 1 object, otherwise 3
  const showPrev = () => setStartIndex(Math.max(startIndex - (width >= 768 ? 3 : 1), 0));

  const showNext = () => setStartIndex(Math.min(startIndex + (width >= 768 ? 3 : 1), dataLen - 1));

  return dataLen ? (
    <section
      ref={foodRef}
      className={`${css.container} sm:mt-10 sm:mb-16`}
      style={{ paddingTop: '1rem' }}
    >
      <h2 className={`${css.title} pb-10`}>
        Traditional food and drinks
      </h2>
      <div className="grid" style={{ gridTemplateColumns: '1fr 10fr 1fr' }}>
        <button onClick={showPrev} disabled={startIndex === 0}>
          {leftArrow}
        </button>
        <div className="grid relative z-1 gap-2" style={{ gridTemplateColumns: width >= 768 ? `repeat(${maxItemsToShow}, 1fr)` : '' }}>
          {dataLen &&
            countryData
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
