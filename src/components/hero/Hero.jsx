import React, { useState, useEffect } from 'react';
import cerLogoWhite from "../footer/cer-logo-dark.png"
import { scrollToSection } from '../global/global_functions';

const Hero = ({
    country,
    citiesRef,
    foodRef,
    transportRef,
    summerReceptionRef,
    infoRef,
    lcsRef,
    factsRef,
    galleryRef
}) => {
    // get country image, if they don't have it, set the flag image
    const [heroImg, setHeroImg] = useState('')
    // set social links icons
    const [socialLinks, setSocialLinks] = useState([])
    // Scroll buttons
    const [buttons, setButtons] = useState([])

    useEffect(() => {
        if (country) {
            setHeroImg(country.banner ?? country.imageSrc)
            const links = country.socialLinks?.map(link => {
                const setIcon = () => {
                    switch(link.name) {
                        case 'Instagram':
                            return "fab fa-instagram mt-3.5 sm:mt-1.5"
                        case 'Facebook':
                            return "fab fa-facebook"
                        // case 'pdf':
                        //     return 'fa-regular fa-file-pdf'
                        default:
                            return 'fas fa-globe' // website
                    }
                }
                return { href: link.value, icon: setIcon() }
            }) ?? []
            if (country.pdf) links.push({ href: country.pdf, icon: 'fa-regular fa-file-pdf' })
            setSocialLinks(links)
        }
    }, [country])

    useEffect(() => {
        setTimeout(() => {
            setButtons([
                {icon: "fa fa-info-circle", title: "General Info", ref: infoRef},
                {icon: "fa fa-city", title: "Local Committees", ref: lcsRef},
                {icon: "fa fa-train", title: "Transport", ref: transportRef},
                {icon: "fa fa-location-dot", title: "Travel", ref: citiesRef},
                {icon: "fa fa-utensils", title: "Cuisine", ref: foodRef},
                {icon: "fa fa-umbrella-beach", title: "Summer Reception", ref: summerReceptionRef},
                {icon: "fa fa-brain", title: "Fun Facts", ref: factsRef},
                {icon: "fa fa-images", title: "Gallery", ref: galleryRef},
            ])
        }, 300)
    }, [citiesRef, foodRef, transportRef, summerReceptionRef, infoRef, lcsRef, factsRef, galleryRef])

    return (
        <div className="relative sm:mt-10">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                    {/* Hero image has absolute position in the middle*/}
                    <div className="absolute inset-0">
                        <img className="h-full w-full object-cover" src={heroImg} alt="IAESTE"/>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] mix-blend-multiply" />
                    </div>
                    {/* CER logo has absolute position in the top right for mobile view, otherwise the navbar is activated*/}
                    <div className="absolute inset-x-0 p-2 top-0 h-10 z-50">
                        <a href="/">
                            <img alt="CER AP" src={cerLogoWhite} className="h-14 mx-auto w-auto hover:scale-110"/>
                        </a>
                    </div>
                    <a className="absolute inset-0 py-2 px-4 h-10 z-50 mt-4" href='/'>
                        <div className='flex flex-row text-white font-semibold cursor-pointer hover:text-sky-200 items-center w-20'>
                            <i className='fa fa-chevron-left'></i>
                            <span className='ml-2'>Back</span>
                        </div>            
                    </a>
                    <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                        <h1 className="text-center text-white text-4xl font-bold pt-10 sm:pt-0 sm:text-5xl lg:text-6xl">
                            <span>Welcome to</span><br></br>
                            <span>IAESTE {country.name.replace(/-/g, ' ')}</span>
                        </h1>
                        <div className="mx-auto mt-10 sm:flex justify-center">
                            <div
                                className="justify-center space-y-2 flex sm:space-y-0 sm:space-x-2 gap-5 font-bold text-white text-4xl"
                                style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}
                            >
                                {socialLinks.map((link, index) =>
                                    <ul key={index} className="flex items-center">
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            <i className={`${link.icon} mx-2 hover:scale-110`}></i>
                                        </a>
                                    </ul>
                                )}
                            </div>
                        </div>
                        {/* Buttons for scrolling to each section*/}
                        <div className="mx-auto mt-10 flex justify-center md:p-5 rounded-3xl bg-transparent mix-blend-screen">
                            <div className="mx-auto inline-grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                                {buttons.map((button, index) => 
                                    <button 
                                        key={index}
                                        disabled={!button.ref.current}
                                        onClick={() => scrollToSection(button.ref)}
                                        className={`flex items-center justify-center border rounded-3xl p-3 text-base sm:text-lg font-bold text-white shadow ${!button.ref.current ? 'bg-gray-400' : 'bg-transparent hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5]'}`}
                                    >
                                        <i className={button.icon} />
                                        <span className='ml-2'>{button.title}</span>
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
