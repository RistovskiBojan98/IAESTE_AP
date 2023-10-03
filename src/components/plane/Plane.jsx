import React, { useState, useEffect } from "react";

const Plane = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [countryHref, setCountryHref] = useState("")
    const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hrefParam = searchParams.get("countryHref");
    const nameParam = searchParams.get("countryName");

    if (hrefParam && nameParam) {
        // Set the retrieved parameters
        setCountryHref(hrefParam);
        setCountryName(nameParam);
      }

    const timer = setTimeout(() => {
        setIsLoading(false)
      // Redirect to the selected country component after a delay
      window.location.href = hrefParam;
    }, 1000); // Adjust the delay duration as needed (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
        {isLoading ? (
            <div>
                <p>Loading...</p>
                <p>Entering {{countryName, countryHref}}</p>
            </div>
        ) : null}
    </div>
  );
};

export default Plane;