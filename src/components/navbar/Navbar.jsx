import { Popover } from "@headlessui/react";
import cerLogo from "./cer-logo.png";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <Popover>
              <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                      <a href="/">
                        <img
                          alt="CER Summer App"
                          className="w-auto sm:h-24 mt-20"
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
