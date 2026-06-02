import { Link } from "react-scroll";
import Navbar from "./navbar/Navbar";

export default function Landing() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="containerPosition">
        <div className="relative bg-white lg:w-full xl:max-w-2xl pb-8">
          {/* Polygon*/}
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white xl:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: "1" }}
          >
            <polygon points="10,0 100,0 33,100 10,100" />
          </svg>

          <Navbar />

          {/* Title, description and buttons*/}
          <main className="containerPosition px-4 mt-4 sm:mt-8 sm:mb-8 sm:px-6 lg:px-8">
            <div className="md:text-center xl:text-left w-full flex flex-col items-start md:items-center xl:items-start">
              {/* <span className="mb-5 inline-flex items-center rounded-full bg-[#1B75BB]/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#1B75BB]">
                <i className="fa-solid fa-earth-europe mr-2" />
                IAESTE Travel Guide
              </span> */}
              <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-[#143D59] md:text-7xl">
                Across the planet
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg md:text-xl">
                Discover country guides, local committees, useful travel information,
                and IAESTE weekends across Europe and beyond.
              </p>
              {/* <p className="mt-3 text-base text-[#0B3D59] sm:mt-5 md:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                We hope you will have a great time discovering foreign places,
                and this application will help you find all information needed
                while travelling across the globe with IAESTE.
              </p> */}
              <div className="mt-8 grid w-full max-w-xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <Link
                  to="countries-div"
                  smooth={true}
                  className="group flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white
                            p-3 text-center shadow-sm transition-all duration-300 cursor-pointer
                            hover:-translate-y-1 hover:border-[#27A9E1]/30 hover:shadow-xl"
                >
                  <span
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B75BB]/10
                              text-2xl text-[#1B75BB] transition-transform group-hover:scale-110"
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </span>

                  <span className="text-lg font-bold text-[#143D59]">
                    Discover a Country
                  </span>

                  <span className="mt-2 text-sm text-slate-500">
                    Browse guides, cities and useful information.
                  </span>
                </Link>

                <a
                  href="/sr-weekends"
                  className="group flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white
                            p-3 text-center shadow-sm transition-all duration-300 cursor-pointer
                            hover:-translate-y-1 hover:border-[#27A9E1]/30 hover:shadow-xl"
                >
                  <span
                    className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#49C0B5]/10
                text-2xl
                text-[#49C0B5]
                transition-transform
                group-hover:scale-110
            "
                  >
                    <i className="fa-solid fa-umbrella-beach" />
                  </span>

                  <span className="text-lg font-bold text-[#143D59]">
                    Summer Reception
                  </span>

                  <span className="mt-2 text-sm text-slate-500">
                    Discover weekends and events across Europe.
                  </span>
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
          className="xl:absolute inset-0 bgGradient mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
