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

      const { title, icon } = setTitleAndIcon(tier.id)

      return {
        ...tier,
        title,
        icon
      }

    })?.filter(tier => !!tier.features?.length) ?? [];

    setTransportProps(tiers);
  }, [country]);

  return countryTransport?.length ? (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B75BB]/10 text-2xl text-[#1B75BB]">
          <i className="fa fa-train" />
        </span>

        <h2 className="text-3xl font-bold text-[#143D59] sm:text-4xl">
          Transportation
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
          Useful transport options and links for getting around.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {countryTransport.map((transport) => {
          const firstFeatures = transport.features.slice(0, 5);
          const remainingFeatures = transport.features.slice(5);

          return (
            <div
              key={transport.title}
              className="group relative flex flex-col rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-[#27A9E1]/30 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#143D59] via-[#1B75BB] to-[#49C0B5] text-white shadow-md transition group-hover:scale-105">
                  <i className={transport.icon} />
                </span>

                <h3 className="text-xl font-bold text-[#143D59]">
                  {transport.title}
                </h3>
              </div>

              <ul>
                <TransportFeatures features={firstFeatures} icon={transport.icon} />
              </ul>

              {!!remainingFeatures.length && (
                <Disclosure as="div">
                  {({ open }) => (
                    <div>
                      <DisclosurePanel as="ul" className="mt-3">
                        <TransportFeatures
                          features={remainingFeatures}
                          icon={transport.icon}
                        />
                      </DisclosurePanel>

                      <ShowMore textColors={["[#1B75BB]", "[#49C0B5]"]} open={open} />
                    </div>
                  )}
                </Disclosure>
              )}
            </div>
          );
        })}
      </div>
    </section>
  ) : null;
});

export default Transport;
