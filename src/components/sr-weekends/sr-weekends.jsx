import { Helmet } from "react-helmet";
import Footer from "../footer";
import Navbar from "../navbar/Navbar";
import EventList from "./EventList";

export default function SRWeekends() {
    return (
        <>
        <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>IAESTE | Across the Planet | Summer Reception </title>
      </Helmet>
      <Navbar />
      <EventList />
      <Footer />
      </div>
        </>
    )
}