import { information } from "./information";
import css from "../app.module.css"
// logo images
import voltage from "../../images/voltage1.jpg"
import country_code from "../../images/country_dialing_code.jpg"
import population from "../../images/population2.jpg"

const GeneralInformation = ({ country }) => {
  // global constants
  const langImgUrl = "https://images.unsplash.com/photo-1508962914676-134849a727f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  const timeZoneImgUrl = "https://images.unsplash.com/photo-1508962914676-134849a727f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  const currencyImgUrl = "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
  const climateImgUrl = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  const simImgUrl = "https://images.unsplash.com/photo-1562831915-6524120efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80"
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
      case "country dialing code":
        obj.imageUrl = country_code;
        break;
      case "SIM card providers":
        obj.imageUrl = simImgUrl;
        break;
      case "Population":
        obj.imageUrl = population;
        break;
      default:
        break;
    }
  }

  const countryInfo = information.find((obj) => obj.country === country);
  // Dynamically add imageUrl back to each object based on its name
  countryInfo.data.forEach(addImgUrl);

  return (
    <div className="bg-white">
      <div className={css.container}>
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className={css.title}>
              General Information
            </h2>
          </div>
          <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-3">
            {countryInfo.data.map((info) => (
              <li key={info.name}>
                <div className="space-y-6">
                  <div className="mx-auto h-40 w-40">
                  <img
                    className="rounded-full"
                    src={info.imageUrl}
                    alt=""
                    style={{width:'100%', height:'100%'}}
                  />
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3 className="text-[#38607F]">{info.name}</h3>
                      <p className="text-[#0B3D59] font-semibold">{info.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
