import React, { forwardRef } from "react";
import FactCard from "./FactCard";
import { CountryComponent } from "../../types/Types";

const Facts = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const facts = country.facts ?? [];

  return facts?.length ? (
    <section
      ref={ref}
      aria-labelledby="testimonial-heading"
      className="container bgGradient shadow-xl sm:overflow-hidden sm:rounded-2xl sm:mb-10"
    >
      <div className="mx-auto max-w-2xl lg:max-w-none text-start">
        <h2 id="testimonial-heading" className="title2">
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
});

export default Facts;
