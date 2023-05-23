import { useRef } from "react";
import Landing from "./landing.jsx";
import Stats from "./stats.js";
import Footer from "./footer.js";
import Countries from "./countries/Countries.jsx";

export default function Layout() {
    const countriesRef = useRef(null);

    return (
        <>
        <Landing countriesRef={countriesRef}/>
        <Stats/>
        <Countries passRef={countriesRef}/>
        <Footer/>
        </>
    )
}
