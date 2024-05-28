import { information } from "./information";
import css from "../app.module.css"

const GeneralInformation = ({ country }) => {
  const countryInfo = information.find((obj) => obj.country === country);
  
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
