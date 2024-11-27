import React from "react";

const TransportFeatures = ({features, icon}) =>
    features.map((feature, index) =>
        <li key={feature + "-" + index} className="flex items-center">
          <i
            className={`${icon} h-6 w-6 mt-1.5 text-[#0B3D59]`}
            aria-hidden="true"
          />
          <div className="ml-2 text-[#3A4856] font-semibold flex flex-row justify-between items-center w-full">
            <p>{feature.name}</p>
            {!!feature.link &&
              <a href={feature.link} target={"_blank"} rel="noopener noreferrer" className="hover:text-sky-700">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            }
          </div>
        </li>
      )

export default TransportFeatures;