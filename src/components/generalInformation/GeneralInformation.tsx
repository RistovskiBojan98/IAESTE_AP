import React, { useState, useEffect, forwardRef } from "react"
import { InformationType, CountryComponent } from "../../types/Types"
// logo images
import voltage from "./images/voltage1.jpg"
import country_code from "./images/country_dialing_code.jpg"
import population from "./images/population2.jpg"
import { GENERAL_INFO_IMGS } from "../global/global_functions";

interface EmergencyItemProps {
  icon: string;
  label: string;
  value: string;
}

const EmergencyItem: React.FC<EmergencyItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB]">
      <i className={icon} />
    </span>

    <div>
      <p className="text-3xl font-bold text-[#0B3D59]">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
);

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
    !!info.length ? (
      <section ref={ref} className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 text-center">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B75BB]/10 text-2xl text-[#1B75BB]">
            <i className="fa fa-info-circle" />
          </span>
          <h2 className="text-3xl font-bold text-[#143D59] sm:text-4xl">
            General Information
          </h2>
          <p className="mt-3 text-slate-500">
            Useful basics to know before arriving.
          </p>
        </div>

        {/* Info cards */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {info.map((info) => (
            <li
              key={info.name}
              className="group rounded-[2rem] bg-white p-5 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-[#27A9E1]/30"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-100 sm:h-20 sm:w-20">
                  <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    src={info.imageUrl}
                    alt={info.name}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">
                    {info.name}
                  </h3>
                  <p className="mt-1 text-lg font-bold text-[#0B3D59]">
                    {info.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Emergency numbers */}
        <div className="my-10 rounded-[2rem] bg-white p-5 shadow-lg ring-1 ring-slate-100">
          <div className="mb-4 flex items-center gap-3 text-[#0B3D59]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B75BB]/10 text-[#1B75BB]">
              <i className="fa fa-phone" />
            </span>

            <div>
              <h3 className="text-xl font-bold">Emergency numbers</h3>
              <p className="text-sm text-slate-500">Quick access numbers in {country.name.replace(/-/g, " ")}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <EmergencyItem icon="fa-solid fa-truck-medical" label="Ambulance" value="144" />
            <EmergencyItem icon="fa-solid fa-shield-halved" label="Police" value="133" />
            <EmergencyItem icon="fa-solid fa-fire-extinguisher" label="Fire Dept." value="122" />
          </div>
        </div>
      </section>
    ) : null
  );
});

export default GeneralInformation;
