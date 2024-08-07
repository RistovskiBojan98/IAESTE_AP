import { Popover } from "@headlessui/react";
import { Link } from "react-scroll";
import cerLogo from "./navbar/cer-logo.png";
import classes from "./statsStyles.module.css";

export default function Landing({ countriesRef }) {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full xl:max-w-2xl lg:pb-28 xl:pb-32"
          style={{ paddingBottom: "80px"}}
        >
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white xl:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{zIndex: "1"}}
          >
            <polygon points="10,0 100,0 33,100 10,100" />
          </svg>

          <Popover>
            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 xl:justify-start"
                aria-label="Global"
              >
                <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                  <div
                    className={`flex w-full items-center justify-between md:w-auto ${classes.logo}`}
                  >
                    <img
                      alt="CER Summer App"
                      className="md:mt-20 h-24 w-auto"
                      src={cerLogo}
                    />
                  </div>
                </div>
              </nav>
            </div>
          </Popover>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 lg:px-8">
            <div className="md:text-center xl:text-left w-full flex flex-col items-start md:items-center xl:items-start">
              <h1
                className={`text-4xl font-bold  text-gray-900 sm:text-5xl md:text-6xl leading-10 ${classes.title}`}
              >
                <span className="block xl:inline text-white "> IAESTE</span>{" "}
                <br />
                <span className="block text-[#0B3D59] xl:inline">
                  Across the planet
                </span>
              </h1>
              <p className="mt-3 text-base text-[#0B3D59] md:mx-auto sm:mt-5 md:max-w-xl md:text-lg md:mt-5 md:text-xl lg:mx-0">
                We hope you will have a great time discovering foreign places,
                and this application will help you find all information needed
                while travelling across the globe with IAESTE.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="countries-div"
                    smooth={true}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#0B3D59] px-8 py-3 text-base font-semibold text-white hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] md:py-4 md:px-10 md:text-lg cursor-pointer"
                  >
                    DISCOVER A COUNTRY
                    <i className="fa-solid fa-magnifying-glass ml-3"></i>
                  </Link>
                </div>
              </div>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/sr-weekends"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#0B3D59] px-8 py-3 text-base font-semibold text-white hover:bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] md:py-4 md:px-10 md:text-lg"
                  >
                    SUMMER RECEPTION WEEKENDS
                    <i className="fa-solid fa-umbrella-beach ml-3"></i>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2">
        <img
          className="h-56 w-full object-cover lg:h-72 lg:h-96 xl:h-full xl:w-full "
          src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div
          className="xl:absolute inset-0 bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
