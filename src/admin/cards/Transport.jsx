import React, { useState, useEffect } from "react";
import { transport, TRANSPORT_CONSTANTS } from "../../components/transport/transport";
import { mapCountryTransportTiers, bgGradient } from "../../components/global/global_functions";
import "./Card.css";

const Transport = ({ selectedCountry }) => {
    const [transportData, setTransportData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null); // State to manage which transport item is open

    useEffect(() => {
        if (selectedCountry) {
            const result = transport[selectedCountry.name]?.tiers || [];

            Object.values(TRANSPORT_CONSTANTS).forEach((id) => {
                if (!result.find((t) => t.id === id)) result.push({ id, features: [] });
            });

            result.sort((a, b) => a.id - b.id);
            setTransportData(mapCountryTransportTiers(result));
        }
    }, [selectedCountry]);

    const hasLinks = (feature) => feature?.hasOwnProperty("link");

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle open/close state
    };

    return (
        <div className="mt-5">
            {transportData.map((transport, index) => (
                <div key={transport.id} className="mb-4 border border-[#1B75BB]">
                    <div
                        className={`p-4 font-bold cursor-pointer flex justify-between items-center gap-2 text-xl transition-all duration-300 ${openIndex === index ? "bg-[#1B75BB] text-white" : `hover:${bgGradient} text-white bg-[#1B75BB]`}`}
                        onClick={() => toggleAccordion(index)} // Call toggle function on click
                    >
                        <div className="flex items-center gap-4">
                            <i className={transport.icon}></i>
                            <h1>{transport.title}</h1>
                        </div>
                        <i className={`fa ${openIndex === index ? "fa-minus" : "fa-plus"} transition-transform duration-300`} />
                    </div>
                    <div className={`bg-white border-t border-[#1B75BB] transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
                        <table className="w-full">
                            <thead className="w-full border border-[#1B75BB]">
                                <tr className="bg-[#F1F1E6]">
                                    <th className="p-2 text-left font-semibold">Title</th>
                                    {hasLinks(transport.features[0]) && <th className="p-2 text-left font-semibold">Link</th>}
                                    <th className="p-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transport.features.length ? (
                                    transport.features.map((feature, featureIndex) => (
                                        <tr key={featureIndex} className="border border-[#1B75BB]">
                                            <td className="p-2 text-lg">{feature.name}</td>
                                            {hasLinks(feature) && (
                                                <td className="p-2 text-lg">
                                                    <a
                                                        href={feature.link}
                                                        className="text-blue-500 underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {feature.link}
                                                    </a>
                                                </td>
                                            )}
                                            <td className="p-2 flex gap-2">
                                                {/* Edit/Save button */}
                                                <button
                                                    type="button"
                                                    className={`btn flex items-center rounded-md border-2 border-[#1B75BB] p-2 ${feature ? `bg-white text-[#1B75BB] hover:${bgGradient} hover:text-white hover:shadow-xl` : "bg-[#F1F1E6] text-black"}`}
                                                >
                                                    <i className={`fa ${feature ? 'fa-save' : 'fa-pencil-alt'}`} aria-hidden="true"></i>
                                                </button>

                                                {/* Remove button */}
                                                <button
                                                    type="button"
                                                    className="btn flex items-center rounded-md border-2 border-red-500 bg-white text-red-500 p-2 hover:bg-red-500 hover:text-white hover:shadow-xl"
                                                >
                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={hasLinks(transport.features[0]) ? 3 : 2} className="text-gray-500 text-center p-4">No transport available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Transport;
