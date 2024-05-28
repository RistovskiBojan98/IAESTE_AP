import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { transport } from "./transport";
import css from "../app.module.css"

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
          <div className={`mt-12 space-y-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:space-y-0`}>
            {transportProps?.tiers?.map((tier) => (
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
                    {tier.features?.map((feature, index) => (
                      <li key={feature + "-" + index} className="flex">
                        <CheckIcon
                          className="h-6 w-6 flex-shrink-0 text-[#0B3D59]"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-[#3A4856] font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (<></>)}
    </>

  );
};

export default Transport;
