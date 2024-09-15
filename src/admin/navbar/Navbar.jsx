import React from "react";
import { Popover } from "@headlessui/react";
import cerLogo from "../../components/navbar/cer-logo.png";
import { bgGradient } from "../../components/global/global_functions"

const AdminNavbar = ({ toggleSidebar }) => {

  return (
    <div className="mx-auto border-b border-black">
      <Popover className="w-full bg-transparent">
        <div className="relative px-4 py-1 sm:py-4 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 xl:justify-start"
            aria-label="Global"
          >
            <div className="flex flex-shrink-0 flex-grow items-center md:flex-grow-0">
              <div className="flex w-full items-center justify-between gap-8 md:w-auto">
                <button
                  className={`icon cursor-pointer border-2 border-solid border-black px-3 py-1 hover:${bgGradient} hover:text-white`}
                  onClick={toggleSidebar}>
                  <i className="fa fa-bars"></i>
                </button>
                <a href="/admin">
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
