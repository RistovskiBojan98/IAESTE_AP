import React, { useState, useEffect } from "react";
import "./Card.css"
import { loadingTimer, getCardAndCountryFromUrl } from "../../components/global/global_functions";
import Loader from "./Loader/Loader";
import CardHeader from "./CardHeader";
import { committees } from "../../components/committees/committees";

const CitiesWithLcs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [country, setCountry] = useState(null);
    const [card, setCard] = useState(null);
    const [committeesData, setCommitteesData] = useState([]); // State to manage contact list
    const [isAddMode, setIsAddMode] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
    const [headerButtonsStatus, setHeaderButtonsStatus] = useState(true);
    const [hasChanges, setHasChanges] = useState(false); // Track if changes are made

    useEffect(() => {
        loadingTimer(setIsLoading)
    }, []);

    useEffect(() => {
        const { card, country } = getCardAndCountryFromUrl()
        setCard(card);
        setCountry(country);
    }, []);

    useEffect(() => {
        if (country) {
            const countryName = typeof(country) === 'string' ? country : country?.name;
            const data = committees.find(com => com.country === countryName)
            if (data) setCommitteesData(data.lcs)
        }
    }, [country]);

    return (
        <section className="section">
            {isLoading ? (
                <Loader />
            ) : (
                <section className="background">
                    <div className="container">
                        <div className="elements-position">
                            <CardHeader />

                            <form className="form spacing-y">
                                {!!committeesData.length ? committeesData.map((city, index) => (
                                    <div key={index} className="flex sm:items-center sm:space-x-4">
                                        <input
                                            type="text"
                                            disabled={!isEditMode}
                                            value={city}
                                            onChange={(e) => console.log(e)}
                                            className="border rounded-md px-2 py-1 w-full"
                                        />
                                    </div>
                                )) : (
                                    <div>No committees available.</div>
                                )}
                            </form>
                        </div>
                    </div>
                </section>
            )}
        </section>
    )
}

export default CitiesWithLcs