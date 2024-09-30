import React, { useState } from "react";

const CitiesWithLcs = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <section className="relative w-full min-h-screen">
            {isLoading ? (
                <Loader />
            ) : (
                <div></div>
            )}
        </section>
    )
}

export default CitiesWithLcs