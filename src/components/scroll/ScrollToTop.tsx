import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => setIsVisible(window.scrollY > 350));
        return () => {
            window.removeEventListener('scroll', () => setIsVisible(window.scrollY > 350)); // cleanup the event listener
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            {isVisible &&
                <button onClick={handleClick} className={`fixed z-20 bottom-4 right-4 h-12 w-12 rounded-full border-2 border-[#1B75BB] bg-white text-[#1B75BB] hover:bg-[#1B75BB] hover:text-white cursor-pointer transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            }
        </>
    )
}

export default ScrollToTop;