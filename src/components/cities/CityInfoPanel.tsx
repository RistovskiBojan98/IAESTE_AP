import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { CityType } from "../../types/Types";
import DownIcon from "../global/DownIcon";

interface CityProps {
  cities: CityType[];
}

const CityInfoPanel: React.FC<CityProps> = ({ cities }) => (
  <>
    {cities.map((city, index) => (
      <Disclosure as="div" key={`${city.name}-${index}`}>
        {({ open }) => (
          <div
            className={`rounded-2xl border p-4 transition ${open
                ? "border-white/30 bg-white/15 shadow-lg"
                : "border-white/10 bg-white/10 hover:bg-white/15"
              }`}
          >
            <DisclosureButton className="flex w-full items-center justify-between gap-4 text-left">
              <span className="text-xl font-bold text-white sm:text-2xl">
                {city.name}
              </span>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <DownIcon isOpen={open} />
              </span>
            </DisclosureButton>

            <DisclosurePanel className="mt-4 border-t border-white/10 pt-4">
              <p className="text-base leading-7 text-white/85 sm:text-lg">
                {city.description}
              </p>
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    ))}
  </>
);

export default CityInfoPanel;