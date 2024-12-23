import React from "react";
import { DisclosureButton } from "@headlessui/react";
import DownIcon from "./DownIcon";

interface ShowMoreProps {
    textColors: string[]
    open: boolean
}

const ShowMore: React.FC<ShowMoreProps> = ({ textColors, open }) => {
    const [textColor, textHoverColor] = textColors
    // Icon for opening additional panels
    return (
        <DisclosureButton className={`pt-6 flex md:w-2/7 items-start justify-between text-left text-${textColor} hover:text-${textHoverColor}`}>
            <span>
                {open ? 'Show less' : 'Show more'}
            </span>
            <DownIcon isOpen={open} />
        </DisclosureButton>
    )
};

export default ShowMore;