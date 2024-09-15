import React, { useState, useEffect } from "react";
import AdminNavbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Panel from "./panel/Panel";
import useWindowSize from "../hooks/useScreenSize"

const AdminPanel = () => {
    const { width } = useWindowSize()
    const [isSidebarOpen, setIsSidebarOpen] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [country, setCountry] = useState(null)
    
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const selectCountry = (selectedCountry) => {
        setCountry(selectedCountry)
        if (width <= 640) toggleSidebar(false)
    }

    useEffect(() => {
        setIsSidebarOpen(width > 640);
        setIsLoading(true)
    }, [width])

    return (
        isLoading &&
        <section className="flex flex-row">
            <Sidebar isOpen={isSidebarOpen} selectCountry={selectCountry} toggleSidebar={toggleSidebar}/>
            <div className={`w-full transition-all duration-300 ${isSidebarOpen ? "sm:ml-60" : "ml-0"}`}>
                <AdminNavbar toggleSidebar={toggleSidebar} />
                <Panel />
            </div>
            {/* For mobile view*/}
            {isSidebarOpen && width <= 640 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleSidebar}></div>
            )}
        </section>
    );
}

export default AdminPanel