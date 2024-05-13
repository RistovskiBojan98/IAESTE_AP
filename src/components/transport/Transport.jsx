import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { transport } from "./transport";

const Transport = ({ transportRef, country }) => {
  const [transportProps, setTransportProps] = useState([]);
  console.log(transportProps)

  useEffect(() => {
    const loadedTransportProps = transport[country];
    setTransportProps(loadedTransportProps);
  }, [country]);

  return (
    <>
    { transportProps?.tiers?.length ? (
      <div
      className="mx-auto max-w-7xl bg-white py-24 px-4 sm:px-6 lg:px-8"
      ref={transportRef}
    >
      <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-none lg:text-4xl">
        Travelling options
      </h4>

      {/* Tiers */}
      <div className="mt-24 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0">
        {transportProps?.tiers?.map((tier) => (
          <div
            key={tier.title}
            className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {tier.title}
              </h3>
              {tier.mostPopular ? (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-[#0B3D59] py-1.5 px-4 text-sm font-semibold text-white">
                  Discounts
                </p>
              ) : null}

              <p className="mt-6 text-gray-500">{tier.description}</p>

              {/* Feature list */}
              <ul className="mt-6 space-y-6">
                {tier.features.map((feature, index) => (
                  <li key={feature + "-" + index} className="flex">
                    <CheckIcon
                      className="h-6 w-6 flex-shrink-0 text-[#0B3D59]"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
    ): (<></>)}
    </>
    
  );
};

export default Transport;
