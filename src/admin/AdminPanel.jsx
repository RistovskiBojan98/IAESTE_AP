import React from "react";
import AdminNavbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Panel from "./panel/Panel";
import Country from "./panel/Country";

const AdminPanel = () => {

    return (
        <section className="flex flex-row">
            <Sidebar />
            <div className="w-full">
                <AdminNavbar />
                <Country />
            </div>
        </section>
    );
}

export default AdminPanel