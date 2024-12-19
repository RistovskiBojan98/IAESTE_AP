import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface DownIconProps {
    isOpen: boolean;
}

const DownIcon: React.FC<DownIconProps> = ({ isOpen }) =>
    <span className="ml-6 flex h-7 items-center">
        <ChevronDownIcon
            className={`"h-6 w-6 transform" ${isOpen ? "-rotate-180" : "rotate-0"}`}
            aria-hidden="true"
        />
    </span>

export default DownIcon;