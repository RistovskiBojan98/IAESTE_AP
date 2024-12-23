import React, { useState, useEffect, forwardRef } from "react"
import { InformationType, CountryComponent } from "../../types/Types"
// logo images
import voltage from "./images/voltage1.jpg"
import country_code from "./images/country_dialing_code.jpg"
import population from "./images/population2.jpg"
import { GENERAL_INFO_IMGS } from "../global/global_functions";

const GeneralInformation = forwardRef<HTMLDivElement, CountryComponent>(({ country }, ref) => {
  const [info, setInfo] = useState<InformationType[]>([]);


  useEffect(() => {
    // helper function
    const addImgUrl = (obj: InformationType) => {
      switch (obj.name) {
        case "Language":
          obj.imageUrl = GENERAL_INFO_IMGS.LANGUAGE;
          break;
        case "Time zone":
          obj.imageUrl = GENERAL_INFO_IMGS.TIME_ZONE;
          break;
        case "Currency":
          obj.imageUrl = GENERAL_INFO_IMGS.CURRENCY;
          break;
        case "Voltage":
          obj.imageUrl = voltage;
          break;
        case "Climate":
          obj.imageUrl = GENERAL_INFO_IMGS.CLIMATE;
          break;
        case "Country dialing code":
          obj.imageUrl = country_code;
          break;
        case "SIM card providers":
          obj.imageUrl = GENERAL_INFO_IMGS.SIM;
          break;
        case "Population":
          obj.imageUrl = population;
          break;
        default:
          obj.imageUrl = country.imageSrc ?? country.imageAlt
          break;
      }
    }
    const countryInfo = country.information ?? []
    // Dynamically add imageUrl back to each object based on its name
    countryInfo.forEach(addImgUrl);
    setInfo(countryInfo)
  }, [country])

  return (
    !!info.length ?
      <div className="container" ref={ref}>
        <div className="mb-14 space-y-5 sm:mx-auto sm:max-w-xl lg:max-w-5xl">
          <h2 className="title">
            <i className='fa fa-info-circle mr-4'></i>
            General Information
          </h2>
        </div>
        <ul className="mx-auto grid grid-cols-3 gap-8 lg:max-w-5xl">
          {info.map((info) => (
            <li key={info.name}>
              <div className="space-y-5">
                <div className="mx-auto h-20 w-20 sm:h-40 sm:w-40">
                  <img className="rounded-full w-full h-full" src={info.imageUrl} alt="" />
                </div>
                <div className="text-lg leading-6">
                  <h3 className="text-[#38607F]">{info.name}</h3>
                  <p className="text-[#0B3D59] font-semibold">{info.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      : <></>
  );
});

export default GeneralInformation;
