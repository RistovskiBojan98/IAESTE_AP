import React, { useState } from "react";
import FactCard from "./FactCard";
import useWindowSize from "../../hooks/useScreenSize";
import { CountryComponent } from "../../types/Types";

const Facts = React.forwardRef<HTMLDivElement, CountryComponent>
(({ country }, ref) => {
  const { width } = useWindowSize();
  const facts = country.facts ?? [];
  const [page, setPage] = useState(0);

  if (!facts.length) return null;

  const itemsPerPage = width >= 1024 ? 6 : width >= 768 ? 4 : 1;
  const totalPages = Math.ceil(facts.length / itemsPerPage);

  const visibleFacts = facts.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const showPrev = () => setPage((current) => Math.max(current - 1, 0));
  const showNext = () => setPage((current) => Math.min(current + 1, totalPages - 1));

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-20 rounded-[2rem] 
                                  bg-gradient-to-r from-transparent via-[#1B75BB]/30 to-transparent">
      <div className="mb-10 flex flex-col gap-4 text-center">
        <div  className="flex flex-col justify-center items-center w-full">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B75BB]/10 text-2xl text-[#1B75BB] md:mx-0">
            <i className="fa fa-brain" />
          </span>

          <h2 className="text-3xl font-bold text-[#143D59] sm:text-4xl">
            Did you know?
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            Fun facts and cultural details worth knowing before you visit.
          </p>
        </div>

        {/* <div className="text-sm font-semibold text-slate-400">
          {page + 1} / {totalPages}
        </div> */}
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <button
          onClick={showPrev}
          disabled={page === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#143D59] shadow-md ring-1 ring-slate-100 transition hover:bg-[#1B75BB] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <i className="fa fa-chevron-left" />
        </button>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFacts.map((fact, index) => (
            <FactCard key={`${page}-${index}`} fact={fact} />
          ))}
        </div>

        <button
          onClick={showNext}
          disabled={page >= totalPages - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#143D59] shadow-md ring-1 ring-slate-100 transition hover:bg-[#1B75BB] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <i className="fa fa-chevron-right" />
        </button>
      </div>

      {/* {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`h-2.5 rounded-full transition-all ${page === index
                  ? "w-8 bg-[#1B75BB]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              aria-label={`Go to facts page ${index + 1}`}
            />
          ))}
        </div>
      )} */}
    </section>
  );
});

export default Facts;