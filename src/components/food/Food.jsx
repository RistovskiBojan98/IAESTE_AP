import React, { useState } from "react";
import { food, drinks } from "./dataFood";
import FoodCard from "./FoodCard";
import classes from "./Food.module.css";
import useWindowSize from "../../hooks/useScreenSize";

const Food = ({ country, foodRef }) => {
  const {width} = useWindowSize();
  const countryFood =
    food.find((obj) => obj.country === country) &&
    food.find((obj) => obj.country === country).content;
  const countryDrinks =
    drinks.find((obj) => obj.country === country) &&
    drinks.find((obj) => obj.country === country).content;

  const countryData = countryDrinks ? countryFood.concat(countryDrinks) : countryFood;
  const maxItemsToShow = countryData && countryData.length >= 3 ? 3 : countryData.length

  const [startIndex, setStartIndex] = useState(0);

  const cards =
    countryData.length > 0 &&
    countryData
      .slice(startIndex, startIndex + (width >= 768 ?  maxItemsToShow : 1))
      .map((item) => (
        <FoodCard
          key={item.id}
          title={item.title}
          description={item.description}
        />
      ));

  const showPrev = () => {
    setStartIndex(Math.max(startIndex - (width >= 768 ?  3 : 1), 0));
  };

  const showNext = () => {
    setStartIndex(Math.min(startIndex + (width >= 768 ?  3 : 1), countryData.length - 1));
  };

  return (
    <>
    { countryData.length ? (
      <section
      style={{ padding: "0 2rem" }}
      ref={foodRef}
      className="relative mb-12 mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
    >
      <h2 style={{fontSize: '36px'}} className="font-bold tracking-tight text-gray-900 mb-6">
        Traditional food and drinks
      </h2>
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
          style={{gridTemplateColumns: width >= 768 ? `repeat(${maxItemsToShow}, 1fr)` : ''}}>{cards}</div>
        <button
          onClick={showNext}
          disabled={startIndex + 3 >= countryData.length}
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
    </section>
    ) : (<></>) }
    </>
  );
};

export default Food;
