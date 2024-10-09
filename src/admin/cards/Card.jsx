import React, { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import CardHeader from "./CardHeader";
import { getCardAndCountryFromUrl } from "../../components/global/global_functions";
import "./Card.css"
import EmergencyContacts from "./EmergencyContacts";
import CitiesWithLcs from "./CitiesWithLcs";
import GeneralInfo from "./GeneralInfo";
import FunFacts from "./FunFacts";
import Cuisine from "./Cuisine";
import Places from "./Places";
import Other from "./Other";
import Transport from "./Transport";
import SummerReception from "./summer-reception/SummerReception";
import Gallery from "./Gallery";

const Card = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [country, setCountry] = useState(null);
    const [card, setCard] = useState(null);
    const [cardComponent, setCardComponent] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            const { cardName, countryName } = getCardAndCountryFromUrl()
            setCard(cardName);
            setCountry(countryName);
            console.log(cardName)
            // add the proper card component
            switch (cardName) {
                case "Emergency numbers":
                    setCardComponent(<EmergencyContacts selectedCountry={countryName} />)
                    break
                case "Cities with lcs":
                    setCardComponent(<CitiesWithLcs selectedCountry={countryName} />)
                    break
                case "General information":
                    setCardComponent(<GeneralInfo selectedCountry={countryName} />)
                    break
                case "Fun facts":
                    setCardComponent(<FunFacts selectedCountry={countryName} />)
                    break
                case "Traditional cuisine":
                    setCardComponent(<Cuisine selectedCountry={countryName} />)
                    break
                case "Recommended places":
                    setCardComponent(<Places selectedCountry={countryName} />)
                    break
                case "Other information":
                    setCardComponent(<Other selectedCountry={countryName} />)
                    break
                case "Transportation":
                    setCardComponent(<Transport selectedCountry={countryName} />)
                    break
                case "Summer reception":
                    setCardComponent(<SummerReception selectedCountry={countryName} />)
                    break
                case "Gallery":
                    setCardComponent(<Gallery selectedCountry={countryName} />)
                    break
                default:
                    break
            }

            setIsLoading(false);
        }, 1100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="section">
            {isLoading ? (
                <Loader />
            ) : (
                <section className="p-1 bg-sky-100">
                    <div className="container">
                        <div className="elements-position">
                            <CardHeader country={country?.name} card={card} />

                            {cardComponent}

                        </div>
                    </div>
                </section>
            )}
        </section>
    )

}

export default Card;