import React from "react";
import { statInfo } from "./stats";
import { Disclosure } from "@headlessui/react";
import DownIcon from "../global/DownIcon";
import { bgGradient } from "../global/global_functions";

const StatsInfo = ({id}) => {
    const data = statInfo.find(stat => stat.id === id)

    return (
        <Disclosure as="div">
            {({ open }) => (
              <div>
                <dt>
                  <Disclosure.Button className="flex w-64 items-start justify-between text-left text-gray-400 my-5">
                    <span className={`hover:${bgGradient} bg-clip-text text-white hover:text-transparent text-xl font-semibold`}>
                      {data.title}
                    </span>
                    <DownIcon isOpen={open}/>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="mt-5 text-lg text-gray-300">
                    {data.info}
                  </p>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
    )
}

export default StatsInfo;