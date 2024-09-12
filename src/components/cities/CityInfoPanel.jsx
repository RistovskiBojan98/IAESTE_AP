import React from "react";
import { Disclosure } from "@headlessui/react";
import DownIcon from "./DownIcon";

const CityInfoPanel = ({ cities }) =>
    cities.map((faq, index) =>
        <Disclosure as="div" key={index} className="pt-6 text-start">
            {({ open }) => (
                <div>
                    <dt className="text-[#F1F1E6] hover:text-[#B2D8FB]">
                        <Disclosure.Button
                            className="flex w-full items-start justify-between text-left px-3">
                            <span className="font-semibold text-2xl">
                                {faq.question}
                            </span>
                            <DownIcon isOpen={open} />
                        </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="p-4 text-lg text-[#F1F1E6]">{faq.answer}</p>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );

export default CityInfoPanel;