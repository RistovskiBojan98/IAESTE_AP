import React from "react";
import { useRef } from "react";
import Landing from "./Landing";
import Stats from "./stats/stats";
import Footer from "./footer/Footer";
import Countries from "./countries/Countries";

export default function Layout() {
    const countriesRef = useRef(null);

    return (
        <section>
            <Landing/>
            <Stats/>
            <Countries passRef={countriesRef}/>
            <Footer/>
        </section>
    )
}
