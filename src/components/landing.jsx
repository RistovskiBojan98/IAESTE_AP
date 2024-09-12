import { Link } from "react-scroll";
import Navbar from "./navbar/Navbar";
import css from "./app.module.css"
import { bgGradient } from "./global_functions";

export default function Landing() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className={css.containerPosition}>
        <div className="relative bg-white lg:w-full xl:max-w-2xl pb-8">
          {/* Polygon*/}
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white xl:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{zIndex: "1"}}
          >
            <polygon points="10,0 100,0 33,100 10,100" />
          </svg>
          
          <Navbar isCountryNav={false} />

          {/* Title, description and buttons*/}
          <main className={`${css.containerPosition} px-4 mt-4 sm:mt-8 sm:mb-8 sm:px-6 lg:px-8`}>
            <div className="md:text-center xl:text-left w-full flex flex-col items-start md:items-center xl:items-start">
              <h1 className="text-5xl font-bold pb-3 text-gray-900 md:text-7xl leading-10">
                Across the planet
              </h1>
              <p className="mt-3 text-base text-[#0B3D59] sm:mt-5 md:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                We hope you will have a great time discovering foreign places,
                and this application will help you find all information needed
                while travelling across the globe with IAESTE.
              </p>
              <div className={css.landingBtnsContainer}>
                <Link to="countries-div" smooth={true} className={`${css.landingBtns} hover:${bgGradient}`}>
                    DISCOVER A COUNTRY
                    <i className="fa-solid fa-magnifying-glass ml-3"></i>
                </Link>
              </div>
              <div className={css.landingBtnsContainer}>
                <a href="/sr-weekends" className={`${css.landingBtns} hover:${bgGradient}`}>
                    SUMMER RECEPTION
                    <i className="fa-solid fa-umbrella-beach ml-3"></i>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Image next to title*/}
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
