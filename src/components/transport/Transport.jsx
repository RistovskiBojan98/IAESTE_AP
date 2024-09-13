import React, { useState, useEffect } from "react";
import { transport } from "./transport";
import css from "../app.module.css";
import { Disclosure } from "@headlessui/react";
import TransportFeatures from "./TransportFeatures";
import { TRANSPORT_CONSTANTS } from "../global/global_functions";
import ShowMore from "../global/ShowMore";

const Transport = ({ transportRef, country }) => {
  const [countryTransport, setTransportProps] = useState([]);

  useEffect(() => {
    const tiers = transport[country]?.tiers?.map(tier => {
      // helper function
      // set the title and icon of the feature tier
      // this is done to not repeat the same code in the transport.js
      const { AIRPORTS, NATIONAL_AND_INTERNATIONAL_TRANSPORT, PUBLIC_TRANSPORT } = TRANSPORT_CONSTANTS
      const setTitleAndIcon = (id) => {
        switch (id) {
          case AIRPORTS:
            return {
              title: "Airports",
              icon: "fa fa-plane",
            };
          
          case NATIONAL_AND_INTERNATIONAL_TRANSPORT:
            return {
              title: "National and international transport",
              icon: "fa fa-train",
            };

          case PUBLIC_TRANSPORT:
            return {
              title: "Public transport",
              icon: "fa fa-bus",
            }
          
          default:
            return {
              title: "Discounts",
              icon: "fa fa-tag",
            }
        }
      }

      const {title, icon} = setTitleAndIcon(tier.id)
      
      return {
        ...tier,
        title,
        icon
      }

    }) ?? [];

    setTransportProps(tiers);
  }, [country]);

  return (
    <>
      {countryTransport?.length ? (
        <div className={css.container} ref={transportRef}>
          <h1 className={css.title}>Transportation</h1>
          <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {countryTransport.map((transport) => {
              // the first features (max 6) are always shown
              // if there are additional, they are covered in the see more tab
              const firstFeatures = transport.features.slice(0, 6);
              const remainingFeatures = transport.features.slice(6);

              return (
                <div
                  key={transport.title}
                  className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex-1 text-start">
                      <div className="absolute top-0 -translate-y-1/2 transform rounded-full bg-[#0B3D59] py-2 px-4 font-semibold" style={{ color: 'white'}}>
                        <div className="flex items-center gap-2">
                          <i className={transport.icon}></i>{transport.title}
                        </div>
                      </div>

                    {/* Feature list */}
                    <ul className="mt-6 space-y-6">
                      <TransportFeatures features={firstFeatures} />
                    </ul>

                    {!!remainingFeatures.length && (
                      <Disclosure as="div">
                        {({ open }) => (
                          <div>
                            <Disclosure.Panel as="ul" className="mt-6 space-y-6">
                              <TransportFeatures features={remainingFeatures} />
                            </Disclosure.Panel>
                            <ShowMore textColors={["[#0B3D59]", "[#B2D8FB]"]} open={open}/>
                          </div>
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
