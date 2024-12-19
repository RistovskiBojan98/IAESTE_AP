import React from "react";
import FactCard from "./FactCard";
import css from "../app.module.css"
import { CountryComponent } from "../../types/Types";

const Facts: React.FC<CountryComponent> = ({ country, ref }) => {
  const facts = country.facts ?? [];

  return facts?.length ? (
    <section
      ref={ref}
      aria-labelledby="testimonial-heading"
      className={`${css.container} bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] shadow-xl sm:overflow-hidden sm:rounded-2xl sm:mb-10`}
    >
      <div className="mx-auto max-w-2xl lg:max-w-none text-start">
        <h2 id="testimonial-heading" className={css.title2}>
          <i className='fa fa-brain mr-4'></i>
          Did you know ?
        </h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:space-y-0">
          {facts.map((fact, index) => (
            <FactCard fact={fact} key={index} />
          ))}
        </div>
      </div>
    </section>
  ) : null
};

export default Facts;
