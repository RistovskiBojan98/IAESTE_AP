import React, { forwardRef } from "react";
import { Disclosure, DisclosurePanel } from "@headlessui/react";
import CityInfoPanel from "./CityInfoPanel";
import ShowMore from "../global/ShowMore";
import { CountryComponent } from "../../types/Types";

const Cities = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const countryCities = country.cities ?? [];

  if (!countryCities.length) return null;

  const firstCities = countryCities.slice(0, 5);
  const additionalCities = countryCities.slice(5);
  const countryName = country.name.replace(/-/g, " ");

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#143D59] via-[#1B75BB] to-[#49C0B5] p-6 text-white shadow-xl sm:p-10">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
              <i className="fa fa-location-dot" />
            </span>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Places to Visit
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Recommended places to explore while visiting {countryName}.
            </p>
          </div>

          <dl className="space-y-4">
            <CityInfoPanel cities={firstCities} />

            {!!additionalCities.length && (
              <Disclosure as="div">
                {({ open }) => (
                  <div>
                    <DisclosurePanel as="dt" className="space-y-4">
                      <CityInfoPanel cities={additionalCities} />
                    </DisclosurePanel>

                    <ShowMore textColors={["white", "[#B2D8FB]"]} open={open} />
                  </div>
                )}
              </Disclosure>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
});

export default Cities;