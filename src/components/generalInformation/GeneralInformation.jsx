import css from "../app.module.css"
// logo images
import voltage from "./images/voltage1.jpg"
import country_code from "./images/country_dialing_code.jpg"
import population from "./images/population2.jpg"
import { langImgUrl, timeZoneImgUrl, currencyImgUrl, climateImgUrl, simImgUrl } from "./information";

const GeneralInformation = ({ country, infoRef }) => {
  // helper function
  const addImgUrl = (obj) => {
    switch (obj.name) {
      case "Language":
        obj.imageUrl = langImgUrl;
        break;
      case "Time zone":
        obj.imageUrl = timeZoneImgUrl;
        break;
      case "Currency":
        obj.imageUrl = currencyImgUrl;
        break;
      case "Voltage":
        obj.imageUrl = voltage;
        break;
      case "Climate":
        obj.imageUrl = climateImgUrl;
        break;
      case "Country dialing code":
        obj.imageUrl = country_code;
        break;
      case "SIM card providers":
        obj.imageUrl = simImgUrl;
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

  return (
    !!countryInfo.length &&
      <div className={`${css.container}`} ref={infoRef}>
      <div className="mb-14 space-y-5 sm:mx-auto sm:max-w-xl lg:max-w-5xl">
        <h2 className={css.title}>
        <i className='fa fa-info-circle mr-4'></i>
          General Information
        </h2>
      </div>
      <ul className="mx-auto grid grid-cols-3 gap-8 lg:max-w-5xl">
        {countryInfo.map((info) => (
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
  );
};

export default GeneralInformation;
