import React, { useState, useEffect } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { transport } from "./transport";
import css from "../app.module.css";
import { Disclosure } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Transport = ({ transportRef, country }) => {
  const [transportProps, setTransportProps] = useState([]);

  useEffect(() => {
    const loadedTransportProps = transport[country];
    setTransportProps(loadedTransportProps);
  }, [country]);

  return (
    <>
      {transportProps?.tiers?.length ? (
        <div className={css.container} ref={transportRef}>
          <h4 className={css.title}>Travelling options</h4>
          {/* Tiers */}
          <div className="mt-12 space-y-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:space-y-0">
            {transportProps?.tiers?.map((tier) => {
              const firstTenFeatures = tier.features.slice(0, 10);
              const remainingFeatures = tier.features.slice(10);

              return (
                <div
                  key={tier.title}
                  className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex-1 text-start">
                    <h3 className="text-xl font-semibold text-[#0B3D59]">
                      {tier.title}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-[#0B3D59] py-1.5 px-4 text-sm font-semibold text-white">
                        Discounts
                      </p>
                    ) : null}

                    <p className="mt-6 text-[#3A4856] font-semibold">{tier.description}</p>

                    {/* Feature list */}
                    <ul className="mt-6 space-y-6">
                      {firstTenFeatures.map((feature, index) => (
                        <li key={feature + "-" + index} className="flex">
                          <CheckIcon
                            className="h-6 w-6 flex-shrink-0 text-[#0B3D59]"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-[#3A4856] font-semibold">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {remainingFeatures.length > 0 && (
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Disclosure.Panel as="ul" className="mt-6 space-y-6">
                              {remainingFeatures.map((feature, index) => (
                                <li key={feature + "-" + index} className="flex">
                                  <CheckIcon
                                    className="h-6 w-6 flex-shrink-0 text-[#0B3D59]"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 text-[#3A4856] font-semibold">{feature}</span>
                                </li>
                              ))}
                            </Disclosure.Panel>
                            <div className="text-lg mt-4">
                              <Disclosure.Button className="flex items-start justify-between text-left text-[#0B3D59] hover:text-[#B2D8FB]"
                                style={{ fontSize: '18px' }}>
                                <span className="font-base">
                                  {open ? 'Show less' : 'Show more'}
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
                            </div>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Transport;
