import { Helmet } from "react-helmet";
import Footer from "../footer";
import Navbar from "../navbar/Navbar";

export default function SRWeekends() {
    return (
        <>
        <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>IAESTE | Across </title>
      </Helmet>
      <Navbar />
      {/* <Hero
        country={id}
        scrollToCities={scrollToCities}
        scrollToFood={scrollToFood}
        scrollToTransport={scrollToTransport}
        scrollToSummerReception={scrollToSummerReception}
      /> */}
      {/* <EmergencyContacts country={id} />
      <GeneralInformation country={id} />
      <Committees country={id} />
      <SummerReception country={id} summerReceptionRef={summerReceptionRef} />
      <Facts country={id} /> */}
      {/* <ImageSection selectedCountry={id} /> */}
      {/* <Transport transportRef={transportRef} country={id} />
      <Cities country={id} citiesRef={citiesRef} />
      <Gallery country={id} />
      <Food country={id} foodRef={foodRef} /> */}
      <Footer />
      </div>
        </>
    )
}