import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./footer.js";
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
import Navbar from "./navbar/Navbar.jsx";
import Plane from "./plane/Plane.jsx";
import SummerReception from "./summer-recepiton/SummerReception.jsx"
import Other from "./otherInformation/Other.jsx";

const Country = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const transportRef = useRef(null);
  const citiesRef = useRef(null);
  const foodRef = useRef(null);
  const summerReceptionRef = useRef(null)

  const scrollToTransport = () => {
    transportRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCities = () => {
    citiesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFood = () => {
    foodRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSummerReception = () => {
    summerReceptionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Simulate a delay (you can adjust the duration as needed)
    const timer = setTimeout(() => {
      // Hide the loading screen after a delay
      setIsLoading(false);
    }, 1100); // Adjust the delay duration as needed (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

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
      <Navbar />
      <Hero
        country={id}
        scrollToCities={scrollToCities}
        scrollToFood={scrollToFood}
        scrollToTransport={scrollToTransport}
        scrollToSummerReception={scrollToSummerReception}
      />
      <EmergencyContacts country={id} />
      <GeneralInformation country={id} />
      <Committees country={id} />
      {/* <ImageSection selectedCountry={id} /> */}
      <Transport transportRef={transportRef} country={id} />
      <Cities country={id} citiesRef={citiesRef} />
      <SummerReception country={id} summerReceptionRef={summerReceptionRef} />
      <Food country={id} foodRef={foodRef} />
      <Facts country={id} />
      <Other country={id} />
      <Gallery country={id} />
      <Footer />
      </div>
    )}

    </>
  );
};

export default Country;
