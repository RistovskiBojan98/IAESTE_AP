import { useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./footer.js";
import Transport from "./transport/Transport.jsx";
import Cities from "./cities/Cities.jsx";
// import Gallery from "./gallery/Gallery.jsx";
import Facts from "./facts/Facts.jsx";
import Food from "./food/Food.jsx";
import GeneralInformation from "./generalInformation/GeneralInformation.jsx";
import Committees from "./committees/Committees.jsx";
import EmergencyContacts from "./emergencyContacts/EmergencyContacts.jsx";
import Hero from "./hero/Hero.jsx";
import ImageSection from "./imageSection/ImageSection.jsx";
import Navbar from "./navbar/Navbar.jsx";

const Country = () => {
  const { id } = useParams();
  console.log(id);

  const transportRef = useRef(null);
  const citiesRef = useRef(null);
  const foodRef = useRef(null);

  const scrollToTransport = () => {
    transportRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCities = () => {
    citiesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFood = () => {
    foodRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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
      />
      <EmergencyContacts country={id} />
      <GeneralInformation country={id} />
      <Committees country={id} />
      <Facts country={id} />
      <ImageSection selectedCountry={id} />
      <Transport transportRef={transportRef} />
      <Cities country={id} citiesRef={citiesRef} />
      {/* <Gallery country={id} /> */}
      <Food country={id} foodRef={foodRef} />
      <Footer />
    </>
  );
};

export default Country;
