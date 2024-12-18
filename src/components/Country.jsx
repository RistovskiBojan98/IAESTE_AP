import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./footer/footer.jsx";
import Transport from "./transport/Transport.jsx";
import Cities from "./cities/Cities.jsx";
import Gallery from "./gallery/Gallery.jsx";
import Facts from "./facts/Facts.jsx";
import Food from "./food/Food.jsx";
import GeneralInformation from "./generalInformation/GeneralInformation.jsx";
import Committees from "./committees/Committees.jsx";
import EmergencyContacts from "./emergencyContacts/EmergencyContacts.jsx";
import Hero from "./hero/Hero.jsx";
// import ImageSection from "./imageSection/ImageSection.jsx";
// import Navbar from "./navbar/Navbar.jsx";
import Plane from "./plane/Plane.jsx";
import SummerReception from "./summer-recepiton/SummerReception.jsx"
import Other from "./otherInformation/Other.jsx";
import { fetchCountryData } from "../service/CountriesService.jsx";
import ScrollToTop from "./scroll/ScrollToTop.jsx";

const Country = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState()

  const infoRef = useRef(null);
  const lcsRef = useRef(null);
  const transportRef = useRef(null);
  const citiesRef = useRef(null);
  const foodRef = useRef(null);
  const summerReceptionRef = useRef(null)
  const factsRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    // Simulate a delay (you can adjust the duration as needed)
    const timer = setTimeout(async () => {
      // Hide the loading screen after a delay
      const data = await fetchCountryData(id)
      setCountry(data)
      setIsLoading(false);
    }, 1100); // Adjust the delay duration as needed (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <>
    {isLoading ? (
      <Plane country={id}></Plane>
    ) : (
      <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>IAESTE | Across {id.replace(/-/g, " ")}</title>
      </Helmet>
      {/* <Navbar isCountryNav={true} /> */}
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
      <GeneralInformation country={country} infoRef={infoRef}/>
      <Committees country={country} lcsRef={lcsRef}/>
      {/* <ImageSection selectedCountry={id} /> */}
      <Transport transportRef={transportRef} country={country} />
      <Cities country={country} citiesRef={citiesRef} />
      <SummerReception country={country} summerReceptionRef={summerReceptionRef} />
      <Food country={country} foodRef={foodRef} />
      <Facts country={country} factsRef={factsRef} />
      <Other country={country} />
      <Gallery country={country} galleryRef={galleryRef} />
      <Footer />
      <ScrollToTop />
      </div>
    )}

    </>
  );
};

export default Country;
