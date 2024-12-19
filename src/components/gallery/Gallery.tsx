import React, { useState, useEffect } from "react";
import "./Gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import css from "../app.module.css"
import { CountryComponent } from "../../types/Types";

const Gallery: React.FC<CountryComponent> = ({ country, ref }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currIndex, setCurrIndex] = useState(0);

const handleArrowStyle = (event: any) =>{
  let arrow = event.target
  arrow.style.backgroundColor = 'rgba(11, 61, 89, 100)'; 
}
const setDefaultArrowStyle = (event: any) =>{
  let arrow = event.target
  arrow.style.backgroundColor = 'rgba(11, 61, 89, 85)'; 
}

  useEffect(() => {
    setImages(country.gallery ?? []);
  }, [country]);

  const handleChange = (index: number) => setCurrIndex(index);

  const handlePrev = () =>
    setCurrIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

  const handleNext = () =>
    setCurrIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );

  if (images?.length)
    return (
      <section className={css.container} ref={ref}>
        <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl mb-5">
          <h2 className={css.title}>
            <i className='fa fa-images mr-4'></i>
            Gallery
          </h2>
          <p className="text-center">Click on the right for more incredible views!</p>
        </div>
        <Carousel
          className="rounded-lg shadow-2xl bg-gray-700 max-h-[305px] md:max-h-[560px]"
          showArrows={true}
          infiniteLoop={true}
          interval={5000}
          selectedItem={currIndex}
          onChange={handleChange}
          renderThumbs={() => []}
          renderArrowNext={(handleNext) => <button type="button" onClick={handleNext} className="control-arrow control-next" onMouseOver={handleArrowStyle} onMouseOut={setDefaultArrowStyle} style={{backgroundColor: "rgba(11, 61, 89, 85)"}}></button>}
          renderArrowPrev={(handlePrev) => <button type="button" onClick={handlePrev} className="control-arrow control-prev" style={{backgroundColor: "rgba(11, 61, 89, 85)"}}></button>}
        >
          {images.map((image, index) => (
            <div key={index} className="slide p-1">
              <img src={image} alt="" style={{ height: "550px", width: "auto", border: '1px solid white'}} />
            </div>
          ))}
        </Carousel>
        <button className="custom-button custom-button-prev" onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="custom-button custom-button-next" onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </section>
    );
    return <></>
};

export default Gallery;
