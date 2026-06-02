import React, { useState, useEffect, forwardRef } from "react";
import "./Gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CountryComponent } from "../../types/Types";

const Gallery = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const [images, setImages] = useState<string[]>([]);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    setImages(country.gallery ?? []);
    setCurrIndex(0);
  }, [country]);

  if (!images.length) return null;

  return (
    <section
      ref={ref}
      className="
        mx-auto max-w-7xl rounded-[2rem] px-4 py-20 my-10
        bg-gradient-to-r from-[#111827] via-[#0F172A]/80 to-[#111827]
      "
    >
      <div className="mb-10 flex flex-col items-center text-center">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#49C0B5]/10 text-2xl text-white">
          <i className="fa fa-images" />
        </span>

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Gallery
        </h2>

        <p className="mt-3 max-w-2xl text-white">
          Explore some of the places, views and moments from this country.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-slate-600 p-4 shadow-2xl ring-1 ring-white/10">
        <Carousel
          className="country-gallery"
          showArrows
          infiniteLoop
          interval={5000}
          selectedItem={currIndex}
          onChange={setCurrIndex}
          showStatus={false}
          showThumbs={false}
          showIndicators={images.length > 1}
          swipeable
          emulateTouch
          renderArrowNext={(handleNext, hasNext) =>
            hasNext && (
              <button
                type="button"
                onClick={handleNext}
                className="gallery-arrow gallery-arrow-next"
                aria-label="Next image"
              >
                <i className="fa fa-chevron-right" />
              </button>
            )
          }
          renderArrowPrev={(handlePrev, hasPrev) =>
            hasPrev && (
              <button
                type="button"
                onClick={handlePrev}
                className="gallery-arrow gallery-arrow-prev"
                aria-label="Previous image"
              >
                <i className="fa fa-chevron-left" />
              </button>
            )
          }
        >
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="gallery-slide">
              <img src={image} alt={`${country.name} gallery ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
});

export default Gallery;