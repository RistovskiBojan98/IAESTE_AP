import React from 'react';
import { countryImages } from './heroImages';
import classes from './Hero.module.css';
import { countrySocialLinks } from './socialLinks';
import { information } from '../generalInformation/information';
import cerLogoWhite from "../cer-logo-dark.png"

const Hero = ({
    country,
    scrollToCities,
    scrollToFood,
    scrollToTransport,
    scrollToSummerReception,
}) => {

    const heroImg = countryImages.find((item) => item.country === country)?.image
        ?? information.find((obj) => obj.country === country).data[0].imageUrl

    const links = countrySocialLinks.find((item) => item.country === country)?.links

    const socialLinks = Object.entries(links).map(([key, value]) => {
        let icon = "fas fa-globe mx-2"; // website
        if (key === 'insta') icon = "fab fa-instagram mx-2 mt-2.5 sm: mt-1.5"
        else if (key === 'facebook') icon = "fab fa-facebook mx-2"

        return { link: value, icon }
    })

    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover"
                            src={heroImg}
                            alt="IAESTE Austria"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] mix-blend-multiply" />
                    </div>
                    <div className="absolute inset-0 p-3 sm:hidden" style={{zIndex: '99'}}>
                        <a href="/">
                            <img alt="CER AP" src={cerLogoWhite} className="h-14 w-auto"/>
                        </a>
                    </div>
                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                        <h1 className="text-center text-4xl font-bold pt-10 sm:pt-0 sm:text-5xl lg:text-6xl">
                            <span className="block text-white">Welcome to</span>
                            <span className="block text-white">
                                IAESTE {country.replace(/-/g, ' ')}
                            </span>
                        </h1>
                        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none justify-center">
                            <div
                                className="justify-center space-y-2 flex sm:space-y-0 sm:space-x-2 gap-5 font-bold text-white text-4xl"
                                style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}
                            >
                                {socialLinks.map((link, index) =>
                                    <div key={index} className={classes.socialLink}>
                                        <a href={link.link} target="_blank" rel="noopener noreferrer">
                                            <i className={link.icon}></i>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="mx-auto mt-10 max-w-sm flex sm:max-w-none justify-center">
                            <div
                                className={`mx-auto inline-grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5`}
                            >
                                <button onClick={scrollToTransport} className={classes.scrollBtn}>Transport</button>
                                <button onClick={scrollToCities} className={classes.scrollBtn}>Travel</button>
                                <button onClick={scrollToFood} className={classes.scrollBtn}>Cuisine</button>
                                <button onClick={scrollToSummerReception} className={classes.scrollBtn}>Summer Reception</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
