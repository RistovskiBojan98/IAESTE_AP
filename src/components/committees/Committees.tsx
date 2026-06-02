import React, { forwardRef } from "react";
import { CountryComponent } from "../../types/Types";

const Committees = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const countryCommittees = country.committees ?? [];
  const countryName = country.name.replace(/-/g, " ");
  const isGermany = country.name === "Germany";

  if (!countryCommittees.length && !isGermany) return null;

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#143D59] via-[#1B75BB] to-[#49C0B5] p-6 text-white shadow-xl sm:p-10">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative text-center">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
            <i className="fa fa-city" />
          </span>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Cities with IAESTE LCs
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            {isGermany
              ? `IAESTE ${countryName} has many local committees across the country.`
              : `In ${countryName}, there ${countryCommittees.length === 1 ? "is" : "are"} ${countryCommittees.length} ${countryCommittees.length === 1 ? "city" : "cities"} with local committees.`}
          </p>

          {isGermany ? (
            <div className="mt-8">
              <a
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-bold text-[#1B75BB] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View local committees
                <i className="fa fa-arrow-up-right-from-square ml-3 text-sm" />
              </a>
            </div>
          ) : (
            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
              {countryCommittees.map((lc) => (
                <span
                  key={lc}
                  className="rounded-full bg-white/15 px-5 py-3 text-lg font-bold text-white ring-1 ring-white/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/25"
                >
                  {lc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Committees;