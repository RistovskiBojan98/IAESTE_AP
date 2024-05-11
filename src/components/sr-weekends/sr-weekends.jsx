import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Footer from "../footer";
import SRNavbar from "./SRNavbar";
import EventList from "./EventList";
import Loader from "./Loader";
import css from "./sr-weekends.module.css";

export default function SRWeekends() {
  // Remove filter from storage when accessing this component for the first time
  localStorage.removeItem('filterValues')

  const [isLoading, setIsLoading] = useState(true);

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
        <Loader />
      ) : (
        <div className={css.bg}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>IAESTE | Across the Planet | Summer Reception </title>
          </Helmet>
          <SRNavbar />
          <EventList />
          <Footer />
        </div>
      )}
    </>
  )
}