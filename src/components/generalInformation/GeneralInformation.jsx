import css from "../app.module.css"
import { mapGeneralInfo } from "../global/global_functions";

const GeneralInformation = ({ country }) => {
  
  const countryInfo = mapGeneralInfo(country)

  return (
    <div className={`${css.container}`}>
      <div className="mb-14 space-y-5 sm:mx-auto sm:max-w-xl lg:max-w-5xl">
        <h2 className={css.title}>
          General Information
        </h2>
      </div>
      <ul className="mx-auto grid grid-cols-3 gap-8 lg:max-w-5xl">
        {countryInfo.data.map((info) => (
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
