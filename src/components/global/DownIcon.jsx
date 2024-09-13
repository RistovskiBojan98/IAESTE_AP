import React from "react";
import { classNames } from "./global_functions";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const DownIcon = ({ isOpen }) =>
    <span className="ml-6 flex h-7 items-center">
        <ChevronDownIcon
            className={classNames(
                isOpen ? "-rotate-180" : "rotate-0",
                "h-6 w-6 transform"
            )}
            aria-hidden="true"
        />
    </span>

export default DownIcon;