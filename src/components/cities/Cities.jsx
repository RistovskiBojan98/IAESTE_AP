import React, { useState } from "react";
import { cities } from "./cities";
import { Disclosure } from "@headlessui/react";
import css from "../app.module.css"
import { bgGradient } from "../global_functions";
import CityInfoPanel from "./CityInfoPanel";
import DownIcon from "./DownIcon";

const Cities = ({ country, citiesRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenCitiesHandler = () => setIsOpen(prev => !prev)

  const countryCities = cities.find((obj) => obj.country === country);
  const totalCities = countryCities?.cities?.length ?? 0
  // the first cities (max 5) are always shown
  // if there are additional, they are covered in the see more tab
  const firstCities = countryCities.cities.slice(0, totalCities > 5 ? 5 : totalCities)
  const additionalCities = totalCities > 5 ? countryCities.cities.slice(5, totalCities) : null

  return (
      <section ref={citiesRef}>
        <div className={`${css.container} ${bgGradient} shadow-xl sm:overflow-hidden sm:rounded-2xl mb-10`}>
          <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
            <h2 className={`${css.title2}`}>
              Places that we recommend visiting:
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-[#F1F1E6]">
              <CityInfoPanel cities={firstCities} />
               {/* if there are more cities then generate them and the see more button*/}
              {additionalCities && (
                <Disclosure as="div" key="additionalCities">
                  <Disclosure.Panel as="dt" className="space-y-6 divide-y divide-[#F1F1E6]" key="additionalCitiesPanel">
                    <CityInfoPanel cities={additionalCities} />
                  </Disclosure.Panel>
                  {/* Icon for opening the additional cities panels*/}
                  <Disclosure.Button className="flex md:w-2/7 items-start justify-between text-left text-lg text-[#F1F1E6] hover:text-[#B2D8FB] pt-6"
                      onClick={onOpenCitiesHandler}>
                      <span>
                        {isOpen ? 'Show less' : 'Show more'}
                      </span>
                      <DownIcon isOpen={isOpen} />
                    </Disclosure.Button>
                </Disclosure>
              )}
            </dl>
          </div>
        </div>
      </section>
  );
};

export default Cities;
