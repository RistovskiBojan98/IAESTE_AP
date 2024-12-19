import React from "react";
import { bgGradient } from "../global/global_functions";
import css from "../app.module.css"
import { CountryComponent } from "../../types/Types";

const Committees: React.FC<CountryComponent> = ({ country, ref }) => {
  const countryCommittees = country.committees ?? []

  return (
    <div className={`relative ${bgGradient} ${css.containerPosition} sm:px-6 lg:px-8 shadow-xl sm:overflow-hidden sm:rounded-2xl`} ref={ref}>
      <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#F1F1E6]">
        <i className='fa fa-city mr-4'></i>
          Cities with IAESTE LCs
        </h2>
        <p className="mt-2 text-[#F1F1E6] text-lg">
          {/* Germany is the only edge case */}
          In {country.name.replace(/-/g, " ")} we have {country.name !== "Germany" ? countryCommittees.length : 'a lot of'} cities with local committees:
        </p>
        <div className="mt-3 text-3xl text-[#F1F1E6] sm:text-4xl font-semibold">
          {/* For Germany their website is shown instead of a list of committees*/}
          {country.name !== "Germany" ?
            <div className="flex justify-center mt-5">
              <div className="flex flex-wrap w-2/3 justify-center gap-2">
                {countryCommittees.map((lc, index) =>
                  <p key={index} className="text-white p-2">
                    {lc}
                  </p>
                )}
              </div>
            </div> 
            :
            <div>
              <p className="text-xl pt-2">You can check out the full list of the local committees here:</p>
              <a className="italic underline decoration-solid text-2xl hover:text-[#0B3D59]" href={"/"} target="_blank" rel="noopener noreferrer">
                Local Committees {country.name}
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Committees;
