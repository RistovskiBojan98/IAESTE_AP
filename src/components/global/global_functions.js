import { countries } from "../countries/countries";
import { information, langImgUrl, timeZoneImgUrl, currencyImgUrl, climateImgUrl, simImgUrl, voltageImgUrl, countryCodeImgUrl, populationImgUrl } from "../generalInformation/information";
import { food, drinks } from "../food/dataFood";
import { TRANSPORT_CONSTANTS, transport } from "../transport/transport";

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

export const getSelectedCountryName = (country) => typeof (country) === 'string' ? country : country?.name;

export const mapEmergencyContacts = (contacts, country) => {
    const countryName = getSelectedCountryName(country)
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

export const mapGeneralInfo = (country) => {
    // helper function
    const addImgUrl = (obj) => {
        switch (obj.name) {
            case "Language":
                obj.imageUrl = langImgUrl;
                break;
            case "Time zone":
                obj.imageUrl = timeZoneImgUrl;
                break;
            case "Currency":
                obj.imageUrl = currencyImgUrl;
                break;
            case "Voltage":
                obj.imageUrl = voltageImgUrl;
                break;
            case "Climate":
                obj.imageUrl = climateImgUrl;
                break;
            case "country dialing code":
                obj.imageUrl = countryCodeImgUrl;
                break;
            case "SIM card providers":
                obj.imageUrl = simImgUrl;
                break;
            case "Population":
                obj.imageUrl = populationImgUrl;
                break;
            default:
                break;
        }
    }

    const countryName = getSelectedCountryName(country)
    const countryInfo = information.find((obj) => obj.country === countryName)
    // Dynamically add imageUrl back to each object based on its name
    countryInfo.data.forEach(addImgUrl);
    return countryInfo;
}

export const getCountryFoodAndDrinks = (selectedCountry) => {
    // helper function
    const findContent = (obj, countryName) => obj.find((el) => el.country === countryName)?.content ?? [];

    const countryName = getSelectedCountryName(selectedCountry)
    const countryFood = findContent(food, countryName)
    const countryDrinks = findContent(drinks, countryName)
    return [...countryFood, ...countryDrinks]
}

export const mapCountryTransportTiers = (tiers) => tiers?.map(tier => {
    // helper function
    const setTransportTitleAndIcon = (transportId) => {
        const { AIRPORTS, NATIONAL_AND_INTERNATIONAL_TRANSPORT, PUBLIC_TRANSPORT } = TRANSPORT_CONSTANTS
    
        switch (transportId) {
            case AIRPORTS:
                return {
                    title: "Airports",
                    icon: "fa fa-plane",
                };
    
            case NATIONAL_AND_INTERNATIONAL_TRANSPORT:
                return {
                    title: "National and international transport",
                    icon: "fa fa-train",
                };
    
            case PUBLIC_TRANSPORT:
                return {
                    title: "Public transport",
                    icon: "fa fa-bus",
                }
    
            default:
                return {
                    title: "Discounts",
                    icon: "fa fa-tag",
                }
        }
    }

    const { title, icon } = setTransportTitleAndIcon(tier.id)

    return {
        ...tier,
        title,
        icon
    }
})

export const getCountryTransport = (country) => {
    const countryName = getSelectedCountryName(country)
    const tiers = transport[countryName]?.tiers ?? []

    return tiers.length ? mapCountryTransportTiers(transport[countryName]?.tiers) : []
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

export const editCardItem = (index, editIndex, setEditIndex) => {
    if (editIndex !== index) setEditIndex(index) // Enter edit mode for this row
    else {
        // Save changes and exit edit mode, show success alert
        setEditIndex(null)
        window.alert('Item updated successfully!');
    }
}

export const deleteCardItem = (index, dataList, setDataList) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
        const newDataList = dataList.filter((_, i) => i !== index); // Remove the item
        setDataList(newDataList);
        window.alert('Item deleted successfully!');
    }
}

export const saveNewCardItem = (listData, inputValue, setListData, setAddMode, setInputValue) => {
    const newData = [...listData, inputValue]
    setListData(newData)
    setAddMode(false)
    setInputValue("")
    window.alert('Item added successfully!')
}