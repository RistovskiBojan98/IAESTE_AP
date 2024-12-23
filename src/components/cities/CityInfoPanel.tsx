import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { CityType } from '../../types/Types';
import DownIcon from '../global/DownIcon'; // Ensure you have this component

interface CityProps {
  cities: CityType[];
}

const CityInfoPanel: React.FC<CityProps> = ({ cities }) => (
  <>
    {cities.map((city, index) => (
      <Disclosure as="div" key={index} className="pt-6 text-start">
        {({ open }) => (
          <div>
            <dt className="text-[#F1F1E6] hover:text-[#B2D8FB]">
              <DisclosureButton className="flex w-full items-start justify-between text-left px-3">
                <span className="font-semibold text-2xl">{city.name}</span>
                <DownIcon isOpen={open} />
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" className="mt-2 pr-12">
              <p className="p-4 text-lg" style={{ color: 'white', fontWeight: '300' }}>
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