import React, { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import CardHeader from "./CardHeader";
import { getCardAndCountryFromUrl } from "../../components/global/global_functions";
import "./Card.css"
import EmergencyContacts from "./EmergencyContacts";
import CitiesWithLcs from "./CitiesWithLcs";
import GeneralInfo from "./GeneralInfo";

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
                    setCardComponent(<EmergencyContacts selectedCountry={countryName}/>)
                    break
                case "Cities with lcs":
                    setCardComponent(<CitiesWithLcs selectedCountry={countryName} />)
                case "General information":
                    setCardComponent(<GeneralInfo selectedCountry={countryName} />)
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
                <section className="background">
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