import React, { useState, useEffect, forwardRef } from "react";
import { Disclosure, DisclosurePanel } from "@headlessui/react";
import TransportFeatures from "./TransportFeatures";
import { TRANSPORT_CONSTANTS } from "../global/global_functions";
import ShowMore from "../global/ShowMore";
import { TransportType, CountryComponent } from "../../types/Types";

const Transport = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const [countryTransport, setTransportProps] = useState<TransportType[]>([]);

  useEffect(() => {
    const tiers = country.transport?.map(tier => {
      // helper function
      // set the title and icon of the feature tier
      const { AIRPORTS, NATIONAL_AND_INTERNATIONAL_TRANSPORT, PUBLIC_TRANSPORT } = TRANSPORT_CONSTANTS
      const setTitleAndIcon = (id: number) => {
        switch (id) {
          case AIRPORTS:
            return {
              title: "Airports",
              icon: "fa fa-plane-departure",
            };
          
          case NATIONAL_AND_INTERNATIONAL_TRANSPORT:
            return {
              title: "National & international transport",
              icon: "fa fa-train-subway",
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

    })?.filter(tier => !!tier.features?.length) ?? [];

    setTransportProps(tiers);
  }, [country]);

  return (
    <>
      {countryTransport?.length ? (
        <div className="container" ref={ref}>
          <h1 className="title">
            <i className='fa fa-train mr-4'></i>
            Transportation
          </h1>
          <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {countryTransport.map((transport) => {
              // the first features (max 6) are always shown
              // if there are additional, they are covered in the see more tab
              const firstFeatures = transport.features.slice(0, 5);
              const remainingFeatures = transport.features.slice(5);

              return (
                <div
                  key={transport.title}
                  className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex-1 text-start">
                      <div className="absolute top-0 -translate-y-1/2 transform rounded-full bg-[#0B3D59] py-2 px-4 font-semibold" style={{ color: 'white'}}>
                        <div className="flex items-center gap-2">
                          <i className={transport.icon}></i>
                          {transport.title}
                        </div>
                      </div>

                    {/* Feature list */}
                    <ul className="mt-6">
                      <TransportFeatures features={firstFeatures} icon={transport.icon}/>
                    </ul>

                    {!!remainingFeatures.length && (
                      <Disclosure as="div">
                        {({ open }) => (
                          <div>
                            <DisclosurePanel as="ul" className="mt-3">
                              <TransportFeatures features={remainingFeatures} icon={transport.icon}/>
                            </DisclosurePanel>
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
});

export default Transport;
