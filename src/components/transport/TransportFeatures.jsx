import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

const TransportFeatures = ({features}) =>
    features.map((feature, index) =>
        <li key={feature + "-" + index} className="flex">
          <CheckIcon
            className="h-6 w-6 flex-shrink-0 text-[#0B3D59]"
            aria-hidden="true"
          />
          <div className="ml-3 text-[#3A4856] font-semibold">
            {feature.link ? 
              <a href={feature.link} target={"_blank"} rel="noopener noreferrer" className="hover:text-sky-700">
                {feature.name}
              </a>
              :
              <p>{feature.name}</p>
            }
          </div>
        </li>
      )

export default TransportFeatures;