import { Popover } from "@headlessui/react";
import cerLogo from "./cer-logo.png";
import classes from "../statsStyles.module.css";

const Navbar = ({isCountryNav}) =>
  <div className={`mx-auto mb-2 ${isCountryNav ? "hidden sm:block" : ""}`}>
    <Popover className={isCountryNav ? "relative z-10 bg-white sm:mb-10 lg:w-full lg:max-w-2xl" : "w-full bg-transparent sm:pb-8 max-w-7xl mx-auto"}>
      <div className="relative px-4 py-1 sm:py-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between sm:h-10 xl:justify-start"
          aria-label="Global"
        >
          <div className="flex flex-shrink-0 flex-grow items-center md:flex-grow-0">
            <div
              className={`flex w-full items-center justify-between md:w-auto ${classes.logo}`}
            >
              <a href="/">
                <img
                  alt="CER Summer App"
                  className="mt-2 sm:mt-10 sm:h-24 h-16 w-auto"
                  src={cerLogo}
                />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </Popover>
  </div>

export default Navbar;
