import React from "react"
import logoImg from "./cer-logo-dark.png"
import footerImg from "./footer_img.png"

const socialLinks = [
    {
        name: 'facebook',
        href: 'https://www.facebook.com/iaestecer',
        mask: "IAESTE Central European Region",
    },
    {
        name: 'instagram',
        href: 'https://www.instagram.com/iaestecer.official/',
        mask: "@iaestecer.official",
    },
    {
        name: 'website',
        href: 'https://cer-core.iaeste.org/',
        mask: "https://cer-core.iaeste.org/",
    },
    {
        name: 'email',
        mask: "cer-management@iaeste.org",
    },
]

export default function Footer() {
    return (
        <footer className="bg-[#0A3D58]">
            <div className="mx-auto max-w-md overflow-hidden px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-20">
                    <a href="/" className="hover:scale-110">
                        <img src={logoImg} alt="" />
                    </a>
                    <div className="flex flex-col justify-start py-4">
                        {socialLinks.map((item) => (
                            // eslint-disable-next-line react/jsx-no-target-blank
                            <a key={item.name} href={item.href ?? ''} target="_blank" className="text-white hover:text-sky-300 flex flex-row justify-between">
                                <span className="font-semibold">{item.name}</span>
                                <span className="">{item.mask}</span>
                            </a>
                        ))}
                    </div>
                    <img src={footerImg} alt="" className="hidden lg:block" />
                </div>
            </div>
        </footer>
    )
}
