import React, { useState, useEffect } from "react";
import "./Gallery.module.css";
import { Images } from "./Images";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Gallery = ({ country }) => {
  const [images, setImages] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

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

  return (
    <section className="relative mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:py-32 lg:px-8">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={images[currIndex]}
        onChange={handleChange}
        className="carousel-container"
        renderThumbs={() => {}}
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
