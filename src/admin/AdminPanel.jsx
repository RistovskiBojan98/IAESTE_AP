import React, { useState, useEffect } from "react";
import AdminNavbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Panel from "./panel/Panel";
import useWindowSize from "../hooks/useScreenSize"
import { Routes, useLocation, Route } from "react-router-dom";
import Country from "./panel/Country";

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
        if (width <= 640) toggleSidebar(false)
    }

    useEffect(() => {
        setIsSidebarOpen(width > 640);
        setIsLoading(false)
    }, [width])

    useEffect(() => {
        if (location.pathname === "/admin") setCountry(null)
    }, [location])

    return (
        !isLoading &&
        <section className="flex flex-row">
            <Sidebar isOpen={isSidebarOpen} country={country} selectCountry={selectCountry}/>
            <div className={`w-full transition-all duration-300 ${isSidebarOpen ? "sm:ml-60" : "ml-0"}`}>
                <AdminNavbar toggleSidebar={toggleSidebar}/>
                <Routes>
                    <Route path="/" element={<Panel />} />
                    <Route path="/:country" element={<Country selectedCountry={country}/>} />
                    {/* TODO: Create the card component*/}
                    <Route path="/:country/:card" element={<Country />} />
                </Routes>
            </div>
            {/* For mobile view*/}
            {isSidebarOpen && width <= 640 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleSidebar}></div>
            )}
        </section>
    );
}

export default AdminPanel