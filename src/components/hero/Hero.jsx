import React from 'react';
import cerLogoWhite from "../footer/cer-logo-dark.png"

const Hero = ({
    country,
    scrollToCities,
    scrollToFood,
    scrollToTransport,
    scrollToSummerReception,
    scrollToInfo,
    scrollToLcs,
    scrollToFacts,
    scrollToGalery
}) => {
    // get country image, if they don't have it, set the flag image
    const heroImg = country.banner ?? country.imageSrc
    // set social links icons
    const socialLinks = country.socialLinks?.map(link => {
        const setIcon = () => {
            switch(link.name) {
                case 'Instagram':
                    return "fab fa-instagram mt-2.5 sm: mt-1.5"
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
    socialLinks.push({ href: country.pdf, icon: 'fa-regular fa-file-pdf' })
    // Scroll buttons
    const buttons = [
        {icon: "fa fa-info-circle", title: "General Info", function: scrollToInfo},
        {icon: "fa fa-city", title: "Local Committees", function: scrollToLcs},
        {icon: "fa fa-train", title: "Transport", function: scrollToTransport},
        {icon: "fa fa-location-dot", title: "Travel", function: scrollToCities},
        {icon: "fa fa-utensils", title: "Cuisine", function: scrollToFood},
        {icon: "fa fa-umbrella-beach", title: "Summer Reception", function: scrollToSummerReception},
        {icon: "fa fa-brain", title: "Fun Facts", function: scrollToFacts},
        {icon: "fa fa-images", title: "Gallery", function: scrollToGalery},
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
                        <div className="mx-auto mt-10 flex justify-center">
                            <div className="mx-auto inline-grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                                {buttons.map((button, index) => 
                                    <button 
                                        key={index}
                                        onClick={button.function}
                                        className="flex items-center justify-center border rounded-md bg-white p-3 text-base sm:text-lg font-bold text-[#0B3D59] shadow"
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
