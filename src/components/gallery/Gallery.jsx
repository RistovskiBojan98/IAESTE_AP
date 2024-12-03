import React, { useState, useEffect } from "react";
import "./Gallery.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import css from "../app.module.css"
import carouselCss from "./Gallery.module.css"

const Gallery = ({ country, galleryRef }) => {
  const [images, setImages] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

const handleArrowStyle = (event) =>{
  let arrow = event.target
  arrow.style.backgroundColor = 'rgba(11, 61, 89, 100)'; 
}
const setDefaultArrowStyle = (event) =>{
  let arrow = event.target
  arrow.style.backgroundColor = 'rgba(11, 61, 89, 85)'; 
}

  useEffect(() => {
    setImages(country.gallery ?? []);
  }, [country]);

  const handleChange = (index) => setCurrIndex(index);

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
      <section className={css.container} ref={galleryRef}>
        <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl mb-5">
          <h2 className={css.title}>
            Gallery
          </h2>
          <p className="text-center">Click on the right for more incredible views!</p>
        </div>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          interval={5000}
          selectedItem={currIndex}
          onChange={handleChange}
          renderThumbs={() => { }}
          renderArrowNext={(handleNext) => <button type="button" onClick={handleNext} className="control-arrow control-next" onMouseOver={handleArrowStyle} onMouseOut={setDefaultArrowStyle} style={{backgroundColor: "rgba(11, 61, 89, 85)"}}></button>}
          renderArrowPrev={(handlePrev) => <button type="button" onClick={handlePrev} className="control-arrow control-prev" style={{backgroundColor: "rgba(11, 61, 89, 85)"}}></button>}
        >
          {images.map((image, index) => (
            <div key={index} className={carouselCss.slide}>
              <img
                src={image}
                alt=""
                style={{ height: "500px", width: "auto" }}
              />
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
