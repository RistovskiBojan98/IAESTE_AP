import React, { useState, useEffect, forwardRef } from "react";
import useWindowSize from "../../hooks/useScreenSize";
import OtherInfoCard from "./InfoCard";
import { OtherType, CountryComponent } from "../../types/Types";

const Other = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const { width } = useWindowSize();
  const [otherInfo, setOtherInfo] = useState<OtherType[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const data = country.otherInformation ?? [];
    setOtherInfo(data);
    setPage(0);
  }, [country]);

  if (!otherInfo.length) return null;

  const itemsPerPage = width >= 1024 ? 4 : width >= 768 ? 2 : 1;
  const totalPages = Math.ceil(otherInfo.length / itemsPerPage);

  const visibleItems = otherInfo.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const showPrev = () => {
    setPage((current) => Math.max(current - 1, 0));
  };

  const showNext = () => {
    setPage((current) => Math.min(current + 1, totalPages - 1));
  };

  return (
    <section
      ref={ref}
      className="
        mx-auto max-w-7xl rounded-[2rem] px-4 py-20
        bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent
      "
    >
      <div className="mb-10 flex flex-col items-center text-center">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-2xl text-[#8B5CF6]">
          <i className="fa fa-file-circle-plus" />
        </span>

        <h2 className="text-3xl font-bold text-[#143D59] sm:text-4xl">
          Interesting & Useful Information
        </h2>

        <p className="mt-3 max-w-2xl text-slate-500">
          Additional tips, recommendations and useful information for your stay.
        </p>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <button
          onClick={showPrev}
          disabled={page === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#143D59] shadow-md ring-1 ring-slate-100 transition hover:bg-[#8B5CF6] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <i className="fa fa-chevron-left" />
        </button>

        <div className="grid gap-5 md:grid-cols-2">
          {visibleItems.map((item, index) => (
            <OtherInfoCard
              key={`${item.title}-${page}-${index}`}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <button
          onClick={showNext}
          disabled={page >= totalPages - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#143D59] shadow-md ring-1 ring-slate-100 transition hover:bg-[#8B5CF6] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <i className="fa fa-chevron-right" />
        </button>
      </div>
    </section>
  );
});

export default Other;