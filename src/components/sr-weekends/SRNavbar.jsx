import { Popover } from "@headlessui/react";
import cerLogo from "../navbar/cer-logo.png";

const SRNavbar = () => {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10  w-full">
            <Popover>
              <div className="relative px-4  sm:px-6 lg:px-8">
                <nav className="w-full flex items-center justify-between sm:h-24" aria-label="Global"
                >
                  <div className="w-full flex items-center">
                    <div className="flex w-full items-center justify-center text-center">
                      <a href="/">
                        <img
                          alt="CER Summer App"
                          className="w-auto h-24"
                          src={cerLogo}
                        />
                      </a>
                      {/* <h1 className="text-3xl text-white font-bold italic ml-auto" style={{ textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.5)' }}>
                        Summer Reception Weekends 2024
                    </h1> */}
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

export default SRNavbar;
