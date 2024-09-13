import React from 'react';
import { countryImages } from './heroImages';
import { countrySocialLinks } from './socialLinks';
import { information } from '../generalInformation/information';
import cerLogoWhite from "../footer/cer-logo-dark.png"

const Hero = ({
    country,
    scrollToCities,
    scrollToFood,
    scrollToTransport,
    scrollToSummerReception,
}) => {
    // get country image, if they don't have it, set the flag image
    const heroImg = countryImages.find((item) => item.country === country)?.image
        ?? information.find((obj) => obj.country === country).data[0].imageUrl

    const links = countrySocialLinks.find((item) => item.country === country)?.links
    // set social links icons
    const socialLinks = Object.entries(links).map(([key, value]) => {
        let icon = "fas fa-globe"; // website
        if (key === 'insta') icon = "fab fa-instagram mt-2.5 sm: mt-1.5"
        else if (key === 'facebook') icon = "fab fa-facebook"

        return { link: value, icon }
    })
    // Scroll buttons
    const buttons = [
        {title: "Transport", function: scrollToTransport},
        {title: "Travel", function: scrollToCities},
        {title: "Cuisine", function: scrollToFood},
        {title: "Summer Reception", function: scrollToSummerReception},
    ]

    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                    {/* Hero image has absolute position in the middle*/}
                    <div className="absolute inset-0">
                        <img className="h-full w-full object-cover" src={heroImg} alt="IAESTE"/>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] mix-blend-multiply" />
                    </div>
                    {/* CER logo has absolute position in the top right for mobile view, otherwise the navbar is activated*/}
                    <div className="absolute inset-0 p-3 sm:hidden h-10 z-50">
                        <a href="/">
                            <img alt="CER AP" src={cerLogoWhite} className="h-14 w-auto hover:scale-110"/>
                        </a>
                    </div>
                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                        <h1 className="text-center text-white text-4xl font-bold pt-10 sm:pt-0 sm:text-5xl lg:text-6xl">
                            <span>Welcome to</span><br></br>
                            <span>IAESTE {country.replace(/-/g, ' ')}</span>
                        </h1>
                        <div className="mx-auto mt-10 sm:flex justify-center">
                            <div
                                className="justify-center space-y-2 flex sm:space-y-0 sm:space-x-2 gap-5 font-bold text-white text-4xl"
                                style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}
                            >
                                {socialLinks.map((link, index) =>
                                    <ul key={index} className="flex items-center">
                                        <a href={link.link} target="_blank" rel="noopener noreferrer">
                                            <i className={`${link.icon} mx-2 hover:scale-110`}></i>
                                        </a>
                                    </ul>
                                )}
                            </div>
                        </div>
                        {/* Buttons for scrolling to each section*/}
                        <div className="mx-auto mt-10 flex justify-center">
                            <div className="mx-auto inline-grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
                                {buttons.map((button, index) => 
                                    <button 
                                        key={index}
                                        onClick={button.function}
                                        className="flex items-center justify-center border rounded-md bg-white p-3 text-base sm:text-lg font-bold text-[#0B3D59] shadow"
                                    >{button.title}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
