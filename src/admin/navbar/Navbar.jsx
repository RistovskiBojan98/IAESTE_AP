import React from "react";
import { Popover } from "@headlessui/react";
import cerLogo from "../../components/navbar/cer-logo.png";

const AdminNavbar = ({ toggleSidebar }) => {

  return (
    <div className="mx-auto">
      <Popover className="w-full bg-transparent">
        <div className="relative p-1 sm:py-4">
          <nav
            className="relative flex items-center justify-between sm:h-10 xl:justify-start"
            aria-label="Global"
          >
            <div className="flex flex-grow items-center">
              <div className="flex w-full items-center justify-start">
                <button
                  className="icon cursor-pointer rounded-full px-2.5 py-1 hover:bg-[#F1F1E6]"
                  onClick={toggleSidebar}>
                  <i className="fa fa-bars text-xl"></i>
                </button>
                <a href="/admin" className="">
                  <img alt="CER Summer App" className="h-16 w-auto" src={cerLogo} />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </Popover>
    </div>
  )
}

export default AdminNavbar;
