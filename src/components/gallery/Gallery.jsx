import React, { useState, useEffect } from "react";
import "./Gallery.module.css";
import { Images } from "./Images";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Gallery = ({ country }) => {
  const [images, setImages] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

const handleArrowStyle = (event) =>{
  let arrow = event.target
  arrow.style.backgroundColor = 'rgba(12, 8, 71, 100)'; 
}
const setDefaultArrowStyle = (event) =>{
  let arrow = event.target
  arrow.style.backgroundColor = 'rgba(12, 8, 71, 85)'; 
}

  useEffect(() => {
    const loadedImages = Images[country];
    setImages(loadedImages);
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
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:px-8">
        <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl mb-5">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Gallery
          </h2>
          <p>Click on the right for more incredible views!</p>
        </div>
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          interval={5000}
          selectedItem={images[currIndex]}
          onChange={handleChange}
          className="carousel-container"
          renderThumbs={() => { }}
          renderArrowNext={(handleNext) => <button type="button" onClick={handleNext} aria-label="next slide / item" class="control-arrow control-next" onMouseOver={handleArrowStyle} onMouseOut={setDefaultArrowStyle} style={{backgroundColor: "rgba(12, 8, 71, 85)"}}></button>}
          renderArrowPrev={(handlePrev) => <button type="button" onClick={handlePrev} aria-label="previous slide / item" class="control-arrow control-prev" style={{backgroundColor: "rgba(12, 8, 71, 85)"}}></button>}
        >
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img
                src={image}
                alt=""
                style={{ height: "700px", width: "auto" }}
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
};

export default Gallery;
