import { Popover } from "@headlessui/react";
import cerLogo from "./cer-logo.png";
import classes from "../statsStyles.module.css";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-3 bg-white md:pb-20 lg:w-full lg:max-w-2xl">
            <Popover>
              <div className="relative lg:px-8">
                <nav
                  className="relative flex items-center justify-between md:h-10"
                  aria-label="Global"
                >
                  <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div
                      className={`flex w-full items-center justify-between md:w-auto ${classes.logo}`}
                    >
                      <a href="/">
                        <img
                          alt="CER Summer App"
                          className="md:mt-20 h-20 w-auto"
                          src={cerLogo}
                        />
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
