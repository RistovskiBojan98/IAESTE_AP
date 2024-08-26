import React, { useState } from "react";
import { cities } from "./cities";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import css from "../app.module.css"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Cities = ({ country, citiesRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenCitiesHandler = () => setIsOpen(prev => !prev)
  
  const countryCities = cities.find((obj) => obj.country === country);
  const totalCities = countryCities?.cities?.length ?? 0
  const firstFiveCities = countryCities.cities.slice(0, totalCities  > 5 ? 5 : totalCities)
  const additionalCities = totalCities > 5 ? countryCities.cities.slice(5, totalCities) : 0

  return (
    <>
      <section ref={citiesRef}>
        <div className={`${css.container} bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] shadow-xl sm:overflow-hidden sm:rounded-2xl mb-10`}>
          <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
            <h2 className={`${css.title2}`}>
              Places that we recommend visiting:
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-[#F1F1E6]">
              {firstFiveCities.map((faq) => (
                  <Disclosure as="div" key={faq.question} className="pt-6 text-start">
                    {({ open }) => (
                      <>
                        <dt className="text-[#F1F1E6] hover:text-[#B2D8FB]">
                          <Disclosure.Button
                            className="flex w-full items-start justify-between text-left px-3">
                            <span className="font-semibold text-2xl">
                              {faq.question}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "-rotate-180" : "rotate-0",
                                  "h-6 w-6 transform"
                                )}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="pt-6 text-lg text-[#F1F1E6]">{faq.answer}</p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}

              {additionalCities && (
                <Disclosure as="div">
                  {() => (
                    <>
                      <Disclosure.Panel as="dd" className="space-y-6 divide-y divide-[#F1F1E6]">
                        {countryCities.cities.map((faq, index) => {
                          if (index >= 5) {
                            return <Disclosure as="div" key={index} className="pt-6 text-start">
                              {({ open2 }) => (
                                <>
                                  <dt className="text-[#F1F1E6] hover:text-[#B2D8FB]">
                                    <Disclosure.Button
                                      className="flex w-full items-start justify-between text-left px-3">
                                      <span className="font-semibold text-2xl">
                                        {faq.question}
                                      </span>
                                      <span className="ml-6 flex h-7 items-center">
                                        <ChevronDownIcon
                                          className={classNames(
                                            open2 ? "-rotate-180" : "rotate-0",
                                            "h-6 w-6 transform"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Disclosure.Button>
                                  </dt>
                                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                    <p className="pt-6 text-lg text-[#F1F1E6]">{faq.answer}</p>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>;
                          }
                          return <></>;
                        })}
                      </Disclosure.Panel>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex md:w-2/7 items-start justify-between text-left text-[#F1F1E6] hover:text-[#B2D8FB] pt-6"
                          onClick={onOpenCitiesHandler} style={{ fontSize: '18px' }}>
                          <span className="font-base">
                            {isOpen ? 'Show less' : 'Show more'}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                isOpen ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                    </>
                  )}
                </Disclosure>

              )}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cities;
