import { useState, useEffect, useCallback } from "react";
import { fetchDbData } from "../../service/CountriesService";
import { CountryType } from "../../types/Types";
import './Countries.css';

interface CountriesProps {
  passRef: React.RefObject<null>
}

const Countries: React.FC<CountriesProps> = ({ passRef }) => {
  const [countries, setCountries] = useState<CountryType[]>([])
  const [displayedCountries, setDisplayedCountries] = useState<CountryType[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Number>(0)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDbData()
      setCountries(data)
      // setDisplayedCountries(data)
      setSelectedRegion(1)
    }

    fetchData()
  }, [])

  const filterCountiresByRegion = useCallback(() => { 
    return countries.filter(country => selectedRegion === 1 ? 
    country.region === "cer" || country.region === "core"
    : country.region !== "cer" && country.region !== "core"
  )}, [selectedRegion, countries])

  useEffect(() => {
    if (!searchQuery.trim().length) setDisplayedCountries(filterCountiresByRegion);
    else {
      const newCountriesList = filterCountiresByRegion().filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedCountries(newCountriesList);
    }
  }, [searchQuery, filterCountiresByRegion])

  useEffect(() => {
    setDisplayedCountries(filterCountiresByRegion)
  }, [selectedRegion, filterCountiresByRegion])

  const onFilterCountriesHandler = (e: any) => setSearchQuery(e.target.value);

  const handleRegionChange = (region: Number) => setSelectedRegion(region)

  return (
    <div className="bg-white overflow-x-hidden" ref={passRef} id="countries-div">
      <div className="containerPosition py-8 px-4 sm:px-6 g:px-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center mb-4">
            <button
              className="landingBtns hover-bgGradient"
              /*
              className={`font-bold text-lg py-2 px-4 rounded-full transition duration-150 ease-in-out
                ${selectedRegion === 1
                  ? 'bg-sky-200 text-sky-800'
                  : 'bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800'
                }
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50`} */
              onClick={() => handleRegionChange(1)}
            >
              <i className="fa-solid fa-earth-europe mr-2"></i> IAESTE CER & CoRe Members
            </button>
            <button className="landingBtns hover-bgGradient"
              /*
              className={`font-bold text-lg py-2 px-4 rounded-full transition duration-150 ease-in-out
                ${selectedRegion === 2
                  ? 'bg-sky-200 text-sky-800'
                  : 'bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800'
                }
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50`} */
              onClick={() => handleRegionChange(2)}
            >
              <i className="fa-solid fa-globe mr-2"></i> IAESTE Global Members
            </button>
          </div>
          <hr></hr>
          <div className="flex flex-col md:flex-row justify-center w-full mt-4">
             <h2 className="font-bold text-2xl sm:text-4xl text-center w-full">
              { selectedRegion === 1 ? "IAESTE CER & CoRe Members" : "IAESTE Global Members"}
              
            </h2>
            <div className="flex justify-center md:justify-end w-full mt-4 md:mt-0">
              <input
                value={searchQuery}
                type="text"
                className="p-2 max-w-xs w-full border border-solid border-black rounded-xl"
                placeholder="Search for a country"
                onChange={onFilterCountriesHandler}
              />
            </div>
          </div>
        </div>
        {displayedCountries.length ? (
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8">
          {displayedCountries.map((country, index) => (
            <div className="text-center opacity-0 animate-fade-in" key={index}>
              <a key={country.id} className="group items-center" href={country.href}>
                  <div className="mx-auto h-20 w-20 sm:h-40 sm:w-40">
                    <img
                      src={country.imageSrc}
                      alt={country.imageAlt}
                      className="group-hover:opacity-75 rounded-full hover:scale-105 w-full h-full transition-all duration-300 ease-in-out"
                    />
                </div>
              </a>
              <a href={country.href}>
                <h1 className="my-5 font-semibold text-xl text-[#0B3D59] hover:text-sky-700">
                  IAESTE {country.name}
                </h1>
              </a>
              {/* <button className={`btn text-center text-white text-sm w-1/2 sm:w-1/3 py-2 max-w-20 bg-[#0B3D59] hover:${bgGradient} rounded-2xl`}>
                <a href={country.pdf} target='_blank' rel="noreferrer">
                  <i className="fa-solid fa-download text-white text-lg mr-2"></i>PDF
                  </a>
              </button> */}
            </div>
          ))}
        </div>
        ) : (
          <div className="flex w-full text-3xl font-semibold justify-center mt-16 mb-6">
            <div
              className="bg-sky-50 border border-sky-300 text-sky-700 px-8 py-6 rounded-xl shadow-md flex items-center space-x-3 text-2xl sm:text-3xl"
              role="alert" aria-live="polite"
            >
              <i className="fa-solid fa-triangle-exclamation mr-2 text-3xl"></i>{" "}
              <span>No countries found for search parameters!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;
