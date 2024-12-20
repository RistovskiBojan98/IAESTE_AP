import React, { useState, useEffect, forwardRef } from "react";
import FoodCard from "./FoodCard";
import useWindowSize from "../../hooks/useScreenSize";
import { OtherType, CountryComponent } from "../../types/Types";

const Food = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const { width } = useWindowSize();
  const [cuisine, setCuisine] = useState<OtherType[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [dataLen, setDataLen] = useState(0)
  const [maxItemsToShow, setMaxItemsToShow] = useState(3)
  const [disableNext, setDisableNext] = useState(false)

  useEffect(() => {
    const food = country.food ?? []
    const drinks = country.drinks ?? []
    const data = [...food, ...drinks]
    setCuisine(data)
    setDataLen(data.length)
    setMaxItemsToShow(data.length >= 3 ? 3 : data.length)
  }, [country])
  // if the screen is small we show 1 object, otherwise 3
  const showPrev = () => {
    setStartIndex(Math.max(startIndex - (width >= 768 ? 3 : 1), 0))
    setDisableNext(false)
  }

  const showNext = () => {
    if (!disableNext) {
      const itemsLength = width >= 768 ? 3 : 1
      const newStartIndex = startIndex + itemsLength
      setStartIndex(Math.min(newStartIndex, dataLen - 1))
      setDisableNext(newStartIndex + itemsLength > dataLen - 1)
    }
  }

  return dataLen ? (
    <section ref={ref} className="container sm:mt-10 sm:mb-16 pt-4">
      <h2 className="title pb-10">
        <i className='fa fa-utensils mr-4'></i>
        Traditional cuisine
      </h2>
      <div className="grid" style={{ gridTemplateColumns: '1fr 10fr 1fr' }}>
        <button onClick={showPrev} disabled={startIndex === 0}>
          <i className='fa fa-chevron-left text-xl text-[#0B3D59]' ></i>
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
        <button onClick={showNext} disabled={disableNext} className="flex items-center justify-end">
          <i className='fa fa-chevron-right text-xl text-[#0B3D59]' ></i>
        </button>
      </div>
    </section>
  ) : null
});

export default Food;
