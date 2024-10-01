import { countries } from "../countries/countries";

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const bgGradient = "bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5]";

export const leftArrow = <svg
    width="15"
    viewBox="0 0 20 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M4.76 17.6L19.448 32.288L17.672 34.304L0.872 17.6L17.432 0.847998L19.208 2.864L4.76 17.6Z"
        fill="black"
    />
</svg>

export const rightArrow = <svg
    width="15"
    viewBox="0 0 20 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M2.66588 0.847998L19.1779 17.6L2.42588 34.304L0.601875 32.288L15.3379 17.6L0.841875 2.864L2.66588 0.847998Z"
        fill="black"
    />
</svg>

export const TRANSPORT_CONSTANTS = {
    AIRPORTS: 1,
    NATIONAL_AND_INTERNATIONAL_TRANSPORT: 2,
    PUBLIC_TRANSPORT: 3,
    DISCOUNTS: 4
}

export const mapEmergencyContacts = (contacts, country) => {
    const countryName = typeof(country) === 'string' ? country : country?.name;
    let eContacts = contacts.find((obj) => obj.country === countryName);
    eContacts = Object.entries(eContacts).filter((obj) => obj[0] !== "country");

    return eContacts.map(([key, value]) => {
        const getTitle = () => {
            switch (key) {
                case 'police':
                    return 'Police'

                case 'ambulance':
                    return 'Ambulance'
                // For better visual design, if there are 3 contants the name is shorter so that the contacts are in one row
                case 'fire':
                    return contacts.length === 3 ? 'Fire dpt.' : 'Fire Department'

                default:
                    return "Emergency line";
            }
        }

        return {
            title: getTitle(),
            number: value
        }
    })
}

export const getCardAndCountryFromUrl = () => {
    const urlParts = window.location.href.split("/");
    const cardUrl = urlParts[urlParts.length - 1].replaceAll("-", " ");
    const cardName = cardUrl.charAt(0).toUpperCase() + cardUrl.slice(1);

    const countryUrl = urlParts[urlParts.length - 2];
    const countryName = countries.find((c) => c.name === countryUrl);

    return { cardName, countryName }
}

export const loadingTimer = (setIsLoading) => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
}