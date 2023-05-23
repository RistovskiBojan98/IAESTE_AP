import React from "react";
import austria from "./austria.jpg";
import { countryImages } from "./heroImages";
import classes from "./Hero.module.css";

const Hero = ({ country, scrollToCities, scrollToFood, scrollToTransport }) => {
  const heroImg = countryImages.find((item) => item.country === country)
    ? countryImages.find((item) => item.country === country).image
    : austria;

  return (
    <div className="relative ">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src={heroImg}
              alt="IAESTE Austria"
            />
            <div className="absolute inset-0  bg-gradient-to-r  from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className=" text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">Welcome to</span>
              <span className="block text-white">
                IAESTE {country.replace(/-/g, " ")}
              </span>
            </h1>

            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div
                className={`space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-3 sm:gap-5 sm:space-y-0 ${classes["btns-container"]}`}
              >
                <button
                  onClick={scrollToTransport}
                  className="flex items-center justify-center rounded-md border border-transparent bg-white bg-opacity-60 px-4 py-3 text-base font-medium text-[#0B3D59] shadow-sm hover:bg-opacity-70 sm:px-8"
                >
                  Transport
                </button>
                <button
                  onClick={scrollToCities}
                  className="flex items-center justify-center rounded-md border border-transparent bg-white bg-opacity-60 px-4 py-3 text-base font-medium text-[#0B3D59] shadow-sm hover:bg-opacity-70 sm:px-8"
                >
                  Travel
                </button>
                <button
                  onClick={scrollToFood}
                  className="flex items-center justify-center rounded-md border border-transparent bg-white bg-opacity-60 px-4 py-3 text-base font-medium text-[#0B3D59] shadow-sm hover:bg-opacity-70 sm:px-8"
                >
                  Food&Drinks
                </button>
                <button
                  disabled
                  onClick={scrollToFood}
                  className={`${classes['sr-button']} flex items-center justify-center rounded-md border border-transparent bg-white bg-opacity-60 px-4 py-3 text-base font-medium text-[#0B3D59] shadow-sm hover:bg-opacity-70 sm:px-8`}
                >
                  SR weekends
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
