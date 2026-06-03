import moment from 'moment';
import { CountryType, WeekendType, SummerReceptionWeekend } from '../../types/Types';
import austria from "../../images/austria_flag.png"
import belgium from "../../images/belgium_flag.jpg"
import bosnia from "../../images/bosna_and_herzcegovina_flag.png"
import croatia from "../../images/croatia_flag.png"
import czechia from "../../images/czechia_flag.png"
import france from "../../images/france_flag.jpg"
import germany from "../../images/germany_flag.png"
import hungary from "../../images/hungary_flag.png"
import macedonia from "../../images/macedonia_flag.png"
import malta from "../../images/malta_flag.png"
import norway from "../../images/norway_flag.jpg"
import poland from "../../images/poland_flag.png"
import slovakia from "../../images/slovakia_flag.png"
import slovenia from "../../images/slovenia_flag.png"
import spain from "../../images/spain_flag.jpg"
import sweden from "../../images/sweden_flag.jpg"
import switzerland from "../../images/switzerland_flag.jpg"
import turkey from "../../images/turkey_flag.png"

// global constants
export const TRANSPORT_CONSTANTS = {
    AIRPORTS: 1,
    NATIONAL_AND_INTERNATIONAL_TRANSPORT: 2,
    PUBLIC_TRANSPORT: 3,
    DISCOUNTS: 4
}

export const GENERAL_INFO_IMGS = {
    LANGUAGE: "https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
    TIME_ZONE: "https://images.unsplash.com/photo-1508962914676-134849a727f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    CURRENCY: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    CLIMATE: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    SIM: "https://images.unsplash.com/photo-1562831915-6524120efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80",
}

// functions
export const getCountryDbName = (country: string): string => {
    switch (country) {
        case "Bosnia-and-Herzegovina":
            return "Bosnia & Herzegovina"
        case "Czech-Republic":
            return "Czech Republic"
        default:
            return country
    }
}

export const mapSummerReceptionWeekend = (weekend: WeekendType, country: CountryType): SummerReceptionWeekend => {
    const start = moment(weekend.startDate).format("DD-MM").replace("-", ".")
    const end = moment(weekend.endDate).format("DD-MM").replace("-", ".")

    return {
        ...weekend,
        country: country.name,
        startDate: new Date(weekend.startDate),
        endDate: new Date(weekend.endDate),
        start,
        end,
        title: weekend.name,
        date: `${start} - ${end}`
    }
}

export const scrollToSection = (ref:  React.RefObject<null | HTMLDivElement>) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" })
}

export const addClickEventListeners = (ref: React.RefObject<HTMLDivElement | null>, onClose: () => void) => {
    // click outside of the popup window
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) onClose();
    };
    // escape button
    const handleEscapeKey = (event: any) => {
        if (event.keyCode === 27) onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
    };
}

export const setCountryFlagImg = (name: string): string => {
    const FLAG_IMAGES: Record<string, string> = {
        Austria: austria,
        Bosnia: bosnia,
        Belgium: belgium,
        Croatia: croatia,
        Czech: czechia,
        France: france,
        Germany: germany,
        Hungary: hungary,
        Macedonia: macedonia,
        Malta: malta,
        Norway: norway,
        Poland: poland,
        Slovakia: slovakia,
        Slovenia: slovenia,
        Spain: spain,
        Sweden: sweden,
        Switzerland: switzerland,
        Turkiye: turkey
    }

    const firstLine: string = name.split(' ')[0];

    return FLAG_IMAGES[firstLine] || ""
}