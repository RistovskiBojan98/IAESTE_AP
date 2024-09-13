import React from "react";
import { Disclosure } from "@headlessui/react";
import DownIcon from "./DownIcon";

const ShowMore = ({ textColors, open }) => {
    const [textColor, textHoverColor] = textColors
    // Icon for opening additional panels
    return (
        <Disclosure.Button className={`pt-6 flex md:w-2/7 items-start justify-between text-left text-${textColor} hover:text-${textHoverColor}`}>
            <span>
                {open ? 'Show less' : 'Show more'}
            </span>
            <DownIcon isOpen={open} />
        </Disclosure.Button>
    )
};

export default ShowMore;