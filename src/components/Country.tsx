import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./footer/Footer";
import Transport from "./transport/Transport";
import Cities from "./cities/Cities";
import Gallery from "./gallery/Gallery";
import Facts from "./facts/Facts";
import Food from "./food/Food";
import GeneralInformation from "./generalInformation/GeneralInformation";
import Committees from "./committees/Committees";
import EmergencyContacts from "./emergencyContacts/EmergencyContacts";
import Hero from "./hero/Hero";
// import Navbar from "./navbar/Navbar";
import Plane from "./plane/Plane";
import SummerReception from "./summer-recepiton/SummerReception"
import Other from "./otherInformation/Other";
import { fetchCountryData } from "../service/CountriesService";
import ScrollToTop from "./scroll/ScrollToTop";
import { CountryType } from "../types/Types";

const Country = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<CountryType>()

  const infoRef = useRef(null);
  const lcsRef = useRef(null);
  const transportRef = useRef(null);
  const citiesRef = useRef(null);
  const foodRef = useRef(null);
  const summerReceptionRef = useRef(null)
  const factsRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (id) {
      const timer = setTimeout(async () => {
        const data = await fetchCountryData(id)
        setCountry(data)
        setIsLoading(false);
      }, 1100)

      return () => clearTimeout(timer);
    }
  }, [id]);

  return (
    <>
      {isLoading || !country ? (
        <Plane country={id!}></Plane>
      ) : (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>IAESTE | Across {id?.replace(/-/g, " ")}</title>
          </Helmet>
          <Hero
            country={country}
            citiesRef={citiesRef}
            foodRef={foodRef}
            transportRef={transportRef}
            summerReceptionRef={summerReceptionRef}
            infoRef={infoRef}
            lcsRef={lcsRef}
            factsRef={factsRef}
            galleryRef={galleryRef}
          />
          <EmergencyContacts country={country} />
          <GeneralInformation country={country} ref={infoRef} />
          <Committees country={country} ref={lcsRef} />
          <Transport country={country} ref={transportRef} />
          <Cities country={country} ref={citiesRef} />
          <SummerReception country={country} ref={summerReceptionRef} />
          <Food country={country} ref={foodRef} />
          <Facts country={country} ref={factsRef} />
          <Other country={country} />
          <Gallery country={country} ref={galleryRef} />
          <Footer />
          <ScrollToTop />
        </div>
      )}

    </>
  );
};

export default Country;
