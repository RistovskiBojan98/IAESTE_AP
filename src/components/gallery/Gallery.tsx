import React, { useState, useEffect, forwardRef } from "react";
import "./Gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CountryComponent } from "../../types/Types";

const Gallery = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const [images, setImages] = useState<string[]>([]);
  const [currIndex, setCurrIndex] = useState(0);

const handleArrowStyle = (event: any) =>{
  let arrow = event.target
  arrow.style.backgroundColor = '#1B75BB'; 
}
const setDefaultArrowStyle = (event: any) =>{
  let arrow = event.target
  arrow.style.backgroundColor = '#1B75BB'; 
}

  useEffect(() => {
    setImages(country.gallery ?? []);
  }, [country]);

  const handleChange = (index: number) => setCurrIndex(index);

  if (images?.length)
    return (
      <section className="container" ref={ref}>
        <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl mb-5">
          <h2 className="title">
            <i className='fa fa-images mr-4'></i>
            Gallery
          </h2>
          <p className="text-center">Click on the right for more incredible views!</p>
        </div>
        <Carousel
          className="rounded-lg shadow-2xl bg-[#0B3D59] max-h-[305px] md:max-h-[560px]"
          showArrows={true}
          infiniteLoop={true}
          interval={5000}
          selectedItem={currIndex}
          onChange={handleChange}
          renderThumbs={() => []}
          renderArrowNext={(handleNext) => <button type="button" onClick={handleNext} className="control-arrow control-next" onMouseOver={handleArrowStyle} onMouseOut={setDefaultArrowStyle}></button>}
          renderArrowPrev={(handlePrev) => <button type="button" onClick={handlePrev} className="control-arrow control-prev" onMouseOver={handleArrowStyle} onMouseOut={setDefaultArrowStyle}></button>}
        >
          {images.map((image, index) => (
            <div key={index} className="slide p-1">
              <img src={image} alt="" style={{ height: "550px", width: "auto", border: '1px solid white'}} />
            </div>
          ))}
        </Carousel>
        {/* <button className="bg-[#1B75BB] rounded-lg" onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="bg-[#1B75BB]" onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button> */}
      </section>
    );
    return <></>
});

export default Gallery;
