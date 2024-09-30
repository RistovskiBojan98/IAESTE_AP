import React, { useState, useEffect } from "react";
import AdminNavbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Panel from "./panel/Panel";
import useWindowSize from "../hooks/useScreenSize"
import { Routes, useLocation, Route } from "react-router-dom";
import Country from "./panel/Country";
import EmergencyContacts from "./cards/EmergencyContacts";

const AdminPanel = () => {
    const { width } = useWindowSize()
    const location = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [country, setCountry] = useState()
    const [card, setCard] = useState()

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const selectCountry = (selectedCountry) => {
        setCountry(selectedCountry)
        if (width <= 1024) toggleSidebar(false)
    }

    const selectCard = (selectedCard) => setCard(selectedCard)

    useEffect(() => {
        setIsSidebarOpen(width > 1024);
        setIsLoading(false)
    }, [width])

    useEffect(() => {
        if (location.pathname === "/admin") setCountry(null)
        else if (!country) {
            const countryName = location.pathname.split("/")[2].replaceAll("%20", " ")
            setCountry(countryName)
        }
    }, [location])

    return (
        !isLoading &&
        <section className="flex flex-row">
            <Sidebar isOpen={isSidebarOpen} country={country} selectCountry={selectCountry} />
            <div className={`w-full transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
                <AdminNavbar toggleSidebar={toggleSidebar} />
                <Routes>
                    <Route path="/" element={<Panel />} />
                    <Route path="/:country" element={<Country selectedCountry={country} selectCard={selectCard} />} />
                    {/* TODO: Create the card components*/}
                    <Route path="/:country/emergency-numbers" element={<EmergencyContacts selectedCard={card} />} />
                    <Route path="/:country/cities-with-lcs" element={<EmergencyContacts selectedCard={card} />} />
                </Routes>
            </div>
            {/* For mobile view*/}
            {isSidebarOpen && width <= 1024 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleSidebar}></div>
            )}
        </section>
    );
}

export default AdminPanel