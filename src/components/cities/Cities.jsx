import React from "react";
import { Disclosure } from "@headlessui/react";
import css from "../app.module.css"
import { bgGradient } from "../global/global_functions";
import CityInfoPanel from "./CityInfoPanel";
import ShowMore from "../global/ShowMore";

const Cities = ({ country, citiesRef }) => {
  const countryCities = country.cities ?? []
  // the first cities (max 5) are always shown
  // if there are additional, they are covered in the see more tab
  const firstCities = countryCities.slice(0, 5)
  const additionalCities = countryCities.slice(5)

  return (
    <section ref={citiesRef}>
      <div className={`${css.container} ${bgGradient} shadow-xl sm:overflow-hidden sm:rounded-2xl mb-10`}>
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className={css.title2}>
            Places that we recommend visiting:
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-[#F1F1E6]">
            <CityInfoPanel cities={firstCities} />
            {/* if there are more cities then generate them and the see more button*/}
            {!!additionalCities?.length && (
              <Disclosure as="div" key="additionalCities">
                {({ open }) => (
                  <div>
                    <Disclosure.Panel as="dt" className="space-y-6 divide-y divide-[#F1F1E6]" key="additionalCitiesPanel">
                      <CityInfoPanel cities={additionalCities} />
                    </Disclosure.Panel>
                    <ShowMore textColors={["[#F1F1E6]", "[#B2D8FB]"]} open={open}/>
                  </div>
                )}
              </Disclosure>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Cities;
