import React, { useState, useEffect } from "react";
import { summerReception } from "../../../components/summer-recepiton/summerReception";
import Weekend from "../../../components/global/Weekend";

const SummerReception = ({ selectedCountry }) => {
    const [weekends, setWeekends] = useState([]);

    useEffect(() => {
        if (selectedCountry) setWeekends(summerReception[selectedCountry.name])
    }, [selectedCountry]);


    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 p-1">
            {!!weekends.length && weekends.map((weekend, index) => 
                <div key={index} className="p-4 bg-white rounded-md flex flex-col">
                    <Weekend weekend={weekend} />
                </div>            
            )}
        </section>
    )
}

export default SummerReception