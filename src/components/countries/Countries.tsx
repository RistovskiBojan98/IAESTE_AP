import { useState, useEffect } from "react";
import { fetchDbData } from "../../service/CountriesService";
import { CountryType } from "../../types/Types";

interface CountriesProps {
  passRef: React.RefObject<null>;
}

const Countries: React.FC<CountriesProps> = ({ passRef }) => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDbData();
      setCountries(data);
      setDisplayedCountries(data);
    };

    fetchData();
  }, []);

  const onFilterCountriesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedCountry = e.target.value.trim().toLowerCase();

    if (!typedCountry) {
      setDisplayedCountries(countries);
      return;
    }

    setDisplayedCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(typedCountry)
      )
    );
  };

  return (
    <section
      ref={passRef}
      id="countries-div"
      className="overflow-x-hidden bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B75BB]/10 text-2xl text-[#1B75BB]">
            <i className="fa fa-globe-europe" />
          </span>

          <h2 className="text-3xl font-bold text-[#143D59] sm:text-4xl">
            IAESTE CER & CoRe Member Countries
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            Search and explore country guides, local committees, travel tips and useful information.
          </p>

          <div className="relative mt-8 w-full max-w-md">
            <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-700 outline-none transition focus:border-[#27A9E1] focus:bg-white focus:ring-4 focus:ring-[#27A9E1]/10"
              placeholder="Search for a country..."
              onChange={onFilterCountriesHandler}
            />
          </div>
        </div>

        {displayedCountries.length ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10">
            {displayedCountries.map((country) => (
              <a
                key={country.id}
                href={country.href}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-24 w-24 rounded-full bg-white p-1 shadow-lg ring-1 ring-slate-100 transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-[#27A9E1]/40 sm:h-40 sm:w-40">
                  <img
                    src={country.imageSrc}
                    alt={country.imageAlt}
                    className="h-full w-full rounded-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#143D59] transition group-hover:text-[#1B75BB] sm:text-xl">
                  IAESTE {country.name}
                </h3>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <i className="fa fa-magnifying-glass mb-4 text-4xl text-slate-300" />
            <h3 className="text-xl font-bold text-[#143D59]">
              No countries found
            </h3>
            <p className="mt-2 text-slate-500">
              Try searching with a different country name.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Countries;