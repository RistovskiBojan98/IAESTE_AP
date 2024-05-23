import { information } from "./information";

const GeneralInformation = ({ country }) => {
  const countryInfo = information.find((obj) => obj.country === country);
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
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
                      <h3>{info.name}</h3>
                      <p className="text-[#0B3D59]">{info.role}</p>
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
