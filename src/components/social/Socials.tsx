import React, { useState, useEffect, forwardRef } from "react";
import { CountryComponent, SocialLinkType } from "../../types/Types";
import { toast } from "react-toastify";

const Socials = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
    const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>([]);

    const countryName = country.name.replace(/-/g, " ");

    const handleEmailCopyToClipboard = (emailAddress: string) => {
        navigator.clipboard.writeText(emailAddress);
        toast.success(`Email address: ${emailAddress} copied to clipboard!`);
    };

    useEffect(() => {
        const links: SocialLinkType[] =
            country.socialLinks
                ?.map((link) => {
                    let icon = "fas fa-globe";
                    let iconColor = "text-[#1B75BB]";

                    switch (link.name) {
                        case "Instagram":
                            icon = "fab fa-instagram";
                            iconColor = "text-pink-500";
                            break;
                        case "Facebook":
                            icon = "fab fa-facebook";
                            iconColor = "text-blue-600";
                            break;
                        case "WhatsApp":
                            icon = "fab fa-whatsapp";
                            iconColor = "text-green-500";
                            break;
                        case "Email Address":
                            icon = "fas fa-envelope";
                            iconColor = "text-[#1B75BB]";
                            break;
                        default:
                            icon = "fas fa-globe";
                            iconColor = "text-[#1B75BB]";
                            break;
                    }

                    return {
                        ...link,
                        icon,
                        iconColor,
                    };
                })
                .filter((link) => link.value) ?? [];

        if (country.pdf) {
            links.push({
                name: "PDF",
                value: country.pdf,
                icon: "fa-regular fa-file-pdf",
                iconColor: "text-red-500",
            } as SocialLinkType);
        }

        setSocialLinks(links);
    }, [country]);

    if (!socialLinks.length) return null;

    return (
        <section ref={ref} className="mx-auto max-w-7xl px-4 py-20 rounded-[2rem] bg-gradient-to-r from-transparent via-[#1B75BB]/30 to-transparent">
            <div className="text-center">
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B75BB]/10 text-2xl text-[#1B75BB]">
                    <i className="fa fa-share-nodes" />
                </span>

                <h2 className="text-3xl font-bold text-[#143D59] sm:text-4xl">
                    Social Media & Contacts
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                    Follow IAESTE {countryName} and stay updated through their official channels.
                </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-5 sm:gap-7">
                {socialLinks.map((link, index) => {
                    const isEmail = link.name === "Email Address";
                    const tooltipText = isEmail ? "Copy email address" : `Open ${link.name}`;

                    const iconButton = (
                        <>
                            <span
                                className="
                  absolute inset-0 rounded-full bg-gradient-to-br from-[#143D59]/10 via-[#1B75BB]/10 to-[#49C0B5]/10
                  opacity-0 transition duration-300 group-hover:opacity-100
                "
                            />

                            <i
                                className={`
                  ${link.icon}
                  ${(link as any).iconColor}
                  relative text-4xl transition-transform duration-300 group-hover:scale-110
                `}
                            />
                        </>
                    );

                    return (
                        <div key={`${link.name}-${index}`} className="group relative">
                            {isEmail ? (
                                <button
                                    type="button"
                                    onClick={() => handleEmailCopyToClipboard(link.value)}
                                    aria-label="Copy email address"
                                    className="
                    relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full
                    bg-white shadow-lg ring-1 ring-slate-100
                    transition-all duration-300
                    hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(27,117,187,0.25)]
                    focus:outline-none focus:ring-4 focus:ring-[#27A9E1]/30
                  "
                                >
                                    {iconButton}
                                </button>
                            ) : (
                                <a
                                    href={link.value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${link.name}`}
                                    className="
                    relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full
                    bg-white shadow-lg ring-1 ring-slate-100
                    transition-all duration-300
                    hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(27,117,187,0.25)]
                    focus:outline-none focus:ring-4 focus:ring-[#27A9E1]/30
                  "
                                >
                                    {iconButton}
                                </a>
                            )}

                            <div
                                className="
                  pointer-events-none absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 translate-y-0
                  whitespace-nowrap rounded-xl bg-[#143D59] px-3 py-2
                  text-sm font-semibold text-white opacity-0 shadow-lg
                  transition-all duration-200
                  group-hover:translate-y-1 group-hover:opacity-100
                "
                            >
                                {tooltipText}

                                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#143D59]" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

export default Socials;