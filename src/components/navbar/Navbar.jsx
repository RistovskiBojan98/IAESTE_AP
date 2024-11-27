import { Popover } from "@headlessui/react";
import cerLogo from "./cer-logo.png";

const Navbar = ({isCountryNav}) =>
  <div className={`mx-auto mb-2 ${isCountryNav ? "hidden sm:block" : ""}`}>
    {/* Navbar is different in the country page, it disappears on mobile mode*/}
    <Popover className={isCountryNav ? "relative z-10 bg-white sm:mb-10 lg:w-full lg:max-w-2xl" : "w-full bg-transparent sm:pb-8 max-w-7xl mx-auto"}>
      <div className="relative px-4 py-1 sm:py-4 sm:px-6 lg:px-8">
        <nav
          className={`relative flex items-center ${isCountryNav ? '' : 'lg:justify-start'} justify-center sm:h-10`}
          aria-label="Global"
        >
          <div className="flex flex-shrink-0 flex-grow items-center md:flex-grow-0">
            <div className="flex w-full items-center">
              <a href="/">
                <img alt="CER Summer App" className="mt-2 sm:mt-10 sm:h-24 h-16 w-auto hover:scale-105" src={cerLogo}/>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </Popover>
  </div>

export default Navbar;
