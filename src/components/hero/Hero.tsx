import React, { useState, useEffect } from 'react';
import cerLogoWhite from "../footer/cer-logo-dark.png"
import { scrollToSection } from '../global/global_functions';
import { CountryType, SocialLinkType } from '../../types/Types';
import useWindowSize from "../../hooks/useScreenSize";

interface HeroProps {
    country: CountryType,
    citiesRef: React.RefObject<null | HTMLDivElement>,
    foodRef: React.RefObject<null | HTMLDivElement>,
    transportRef: React.RefObject<null | HTMLDivElement>,
    summerReceptionRef: React.RefObject<null | HTMLDivElement>,
    infoRef: React.RefObject<null | HTMLDivElement>,
    lcsRef: React.RefObject<null | HTMLDivElement>,
    factsRef: React.RefObject<null | HTMLDivElement>,
    galleryRef: React.RefObject<null | HTMLDivElement>,
    socialsRef: React.RefObject<null | HTMLDivElement>,
    otherRef: React.RefObject<null | HTMLDivElement>
}

interface HeroButton {
    icon: string,
    title: string,
    shortTitle: string,
    ref: React.RefObject<null | HTMLDivElement>
}

const Hero: React.FC<HeroProps> = ({
    country,
    citiesRef,
    foodRef,
    transportRef,
    summerReceptionRef,
    infoRef,
    lcsRef,
    factsRef,
    galleryRef,
    socialsRef,
    otherRef
}) => {
    const { width } = useWindowSize();
    // get country image, if they don't have it, set the flag image
    const [heroImg, setHeroImg] = useState('')
    // set social links icons
    // const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>([])
    // Scroll buttons
    const [buttons, setButtons] = useState<HeroButton[]>([])

    useEffect(() => {
        // setHeroImg(country.banner ?? country.imageSrc) - TODO: DB FIX
        setHeroImg(country.imageSrc)
        const links: SocialLinkType[] = country.socialLinks?.map(link => {
            const setIcon = () => {
                switch (link.name) {
                    case 'Instagram':
                        return "fab fa-instagram mt-3.5 sm:mt-1.5"
                    case 'Facebook':
                        return "fab fa-facebook"
                    case "WhatsApp":
                        return "fab fa-whatsapp"
                    case "Email Address":
                        return "fas fa-envelope"
                    // case 'pdf':
                    //     return 'fa-regular fa-file-pdf'
                    default:
                        return 'fas fa-globe' // website
                }
            }
            return { ...link, icon: setIcon() }
        }) ?? []
        if (country.pdf) links.push({ name: "pdf", value: country.pdf, icon: 'fa-regular fa-file-pdf' })
        // setSocialLinks(links)
    }, [country])

    useEffect(() => {
        setTimeout(() => {
            setButtons([
                { icon: "fa fa-info-circle", title: "General Information", shortTitle: "Gen. Info", ref: infoRef },
                { icon: "fa fa-city", title: "Local Committees", shortTitle: "LCs", ref: lcsRef },
                { icon: "fa fa-share-nodes", title: "Socials", shortTitle: "Socials", ref: socialsRef },
                { icon: "fa fa-train", title: "Transport", shortTitle: "Transport", ref: transportRef },
                { icon: "fa fa-location-dot", title: "Travel", shortTitle: "Travel", ref: citiesRef },
                { icon: "fa fa-utensils", title: "Cuisine", shortTitle: "Cuisine", ref: foodRef },
                { icon: "fa fa-umbrella-beach", title: "Summer Reception", shortTitle: "SR Weekends", ref: summerReceptionRef },
                { icon: "fa fa-brain", title: "Fun Facts", shortTitle: "Fun Facts", ref: factsRef },
                { icon: "fa fa-file-circle-plus", title: "Extra info", shortTitle: "Extra", ref: otherRef },
                { icon: "fa fa-images", title: "Gallery", shortTitle: "Gallery", ref: galleryRef },
            ])
        }, 300)
    }, [citiesRef, foodRef, transportRef, summerReceptionRef, infoRef, lcsRef, factsRef, galleryRef, otherRef, socialsRef])

    return (
        <div className="relative sm:mt-5">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto max-w-full sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                    {/* Hero image has absolute position in the middle*/}
                    <div className="absolute inset-0">
                        <img className="h-full w-full object-cover" src={heroImg} alt="IAESTE" />
                        <div className="absolute inset-0 bgGradient mix-blend-multiply" />
                    </div>
                    {/* CER logo has absolute position in the top right for mobile view, otherwise the navbar is activated*/}
                    <header className="absolute top-0 inset-x-0 flex justify-between items-center px-6 py-4 z-50 bg-gradient-to-b from-black/40 to-transparent">
                        <a href="/" className="flex items-center text-white hover:text-sky-200">
                            <i className="fa fa-chevron-left mr-2"></i> Back
                        </a>
                        <img src={cerLogoWhite} alt="CER Logo" className="h-10 w-auto" />
                    </header>

                    <div className="relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8" style={{ minHeight: "600px" }}>
                        <div className="relative flex flex-col items-center justify-center text-center min-h-[400px]">
                            <h1 className="text-white text-5xl lg:text-6xl flex flex-col space-y-5">
                                <span className="text-4xl font-light">Welcome to</span>
                                <span className="text-7xl font-bold">IAESTE {country.name.replace(/-/g, ' ')}</span>
                            </h1>
                        </div>

                        {/* <div className="mx-auto mt-10 sm:flex justify-center">
                            <div
                                className="justify-center space-y-2 flex sm:space-y-0 sm:space-x-2 gap-5 font-bold text-white text-4xl"
                                style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}
                            >
                                {socialLinks.map((link, index) =>
                                    link && link.value !== "" &&
                                    <ul key={index} className="flex items-center">
                                        {link.name !== "Email Address" ? (
                                            <a href={link.value} target="_blank" rel="noopener noreferrer">
                                                <i className={`${link.icon} mx-2 hover:scale-110`}></i>
                                            </a>
                                        ) : (
                                            <div onClick={() => handleEmailCopyToClipboard(link.value)}>
                                                <i className={`${link.icon} mx-2 hover:scale-110 cursor-pointer`}></i>
                                            </div>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div> */}
                        {/* Buttons for scrolling to each section*/}

                        {/* Carousel navigation buttons */}
                        {/* Docked card bar 
                        [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]
                        */}
                        {/* <div className="absolute inset-x-0 bottom-0">
                            <div className="mx-auto w-full  px-3 sm:px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
                                <div className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-2 sm:p-3"
                                    aria-label="Jump to section">
                                    <div className="grid gap-2 sm:gap-3
                                        
                                        grid-cols-3 
                                        overflow-x-auto sm:overflow-visible scrollbar-hide"
                                    >
                                        {buttons.map((button, index) => (
                                            <button
                                                key={index}
                                                onClick={() => scrollToSection(button.ref)}
                                                disabled={!button.ref.current}
                                                className={`group relative flex items-center justify-center gap-2
                                                    rounded-xl px-1 py-1 sm:py-2 text-sm sm:text-base font-semibold tracking-tight
                                                    ring-1 ring-white/10 transition
                                                    ${!button.ref.current
                                                        ? "bg-white/20 text-white/60 cursor-not-allowed"
                                                        : "bg-white/10 text-white hover:bg-white/20 hover:ring-white/20 active:scale-[.98]"}
                                                            focus:outline-none focus:ring-2 focus:ring-sky-300/60`}
                                            >
                                                <i className={`${button.icon} text-xs sm:text-sm opacity-80`} />
                                                <span className="truncate hidden sm:block">{button.title}</span>
                                                <span className="truncate block sm:hidden">{button.shortTitle}</span>

                                                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sky-400/0 via-sky-400/50 to-sky-400/0 opacity-0 group-hover:opacity-100 transition" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {buttons.length > 0 && (
                            <div className="absolute inset-x-0 bottom-0">
                                <div className="mx-auto w-full px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-4">
                                    <div className="grid grid-cols-5 gap-2 rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md"
                                        aria-label="Jump to section"
                                    >
                                        {buttons.map((button) => (
                                            <button
                                                key={button.title}
                                                onClick={() => scrollToSection(button.ref)}
                                                className="group relative flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 p-3
                                                    text-white ring-1 ring-white/10  transition-all duration-200
                                                    hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg active:scale-[0.98]"
                                            >
                                                <i
                                                    className={`${button.icon} text-lg opacity-90 transition-transform duration-200 group-hover:scale-110`}
                                                />

                                                <span className="text-center text-xs font-semibold leading-tight sm:text-sm">
                                                    {width > 768 ? button.title : button.shortTitle}
                                                </span>

                                                <span
                                                    className="
                                pointer-events-none
                                absolute
                                inset-x-3
                                bottom-1
                                h-0.5
                                rounded-full
                                bg-white/60
                                opacity-0
                                transition
                                group-hover:opacity-100
                            "
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
