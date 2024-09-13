import React from "react";
import { committees } from "./committees";
import { bgGradient } from "../global/global_functions";
import css from "../app.module.css"

const Committees = ({ country }) => {
  const countryCommittees = committees.find((obj) => obj.country === country);

  return (
    <div className={`relative ${bgGradient} ${css.containerPosition} sm:px-6 lg:px-8 shadow-xl sm:overflow-hidden sm:rounded-2xl`} >
      <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#F1F1E6]">
          Cities with IAESTE LCs
        </h2>
        <p className="mt-2 text-[#F1F1E6] text-lg">
          {/* Germany is the only edge case */}
          In {country.replace(/-/g, " ")} we have {country !== "Germany" ? countryCommittees.lcs.length : 'a lot of'} cities with local committees:
        </p>
        <div className="mt-3 text-3xl text-[#F1F1E6] sm:text-4xl font-semibold">
          {/* For Germany their website is shown instead of a list of committees*/}
          {!countryCommittees.page ?
            <div className="flex justify-center mt-5">
              <div className="flex flex-wrap w-2/3 justify-center gap-2">
                {countryCommittees.lcs.map((lc, index) =>
                  <p key={index} className="text-white p-2">
                    {lc}
                  </p>
                )}
              </div>
            </div> 
            :
            <div>
              <p className="text-xl pt-2">You can check out the full list of the local committees here:</p>
              <a className="italic underline decoration-solid text-2xl hover:text-[#0B3D59]" href={countryCommittees.page} target="_blank" rel="noopener noreferrer">
                Local Committees {country}
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Committees;
