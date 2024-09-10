import React from "react";
import { committees } from "./committees";
// import { Disclosure } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import { secondImage } from "../imageSection/secondImage";


const Committees = ({ country }) => {
  // local helper functions
  // const classNames = (...classes) => classes.filter(Boolean).join(" ");
  // filter - false if the country has 5 or less committees, true if more
  // lower - true if we need to list the first five elements
  // const listCommittees = (filter, lower) => {
  //   let committeesToDisplay = countryCommittees.lcs;

  //   if (filter) committeesToDisplay = lower ? countryCommittees.lcs.slice(0, 5) : countryCommittees.lcs.slice(5);

  //   return committeesToDisplay.map((committee, index) => (
  //     <li style={{ fontSize: '24px' }} key={index}>{committee}</li>
  //   ));
  // }


  // const [isOpen, setIsOpen] = useState(false);
  // const onOpenCitiesHandler = () => setIsOpen(prev => !prev)
  
  const countryCommittees = committees.find((obj) => obj.country === country);

  // const selectedImg = secondImage.find((item) => item.country === country)?.image ?? ''

  return (
    <div className="relative bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] max-w-7xl mx-auto sm:px-6 lg:px-8 shadow-xl sm:overflow-hidden sm:rounded-2xl" >
      {/* <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src={selectedImg}
          alt=""
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
        />
      </div> */}
      <div
        className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div className="md:ml-auto md:pl-10 text-center"> {/* md:w-1/2 */}
          <h2 className="text-3xl md:text-4xl font-semibold text-[#F1F1E6]">
            Cities with IAESTE LCs
          </h2>
          <p className="mt-2 text-[#F1F1E6]" style={{ fontSize: '18px' }}>
            In {country.replace(/-/g, " ")} we have {country !== "Germany" ? countryCommittees.lcs.length : 'a lot of'} cities with local committees:
          </p>
          <div className="mt-3 text-3xl text-[#F1F1E6] sm:text-4xl font-semibold">
            {countryCommittees.page ?
              <div>
                <p className="text-xl pt-2">You can check out the full list of the local committees here:</p>
                <a className="italic underline decoration-solid text-2xl hover:text-[#0B3D59]" href={countryCommittees.page} target="_blank" rel="noopener noreferrer">
                  Local Committees {country}
                </a>
              </div>
              : 
              <div className="flex justify-center mt-5">
                <div className="flex flex-wrap w-2/3 justify-center gap-2">
                  {countryCommittees.lcs.map((lc, index) => (
                    <p key={index} className="text-white m-2">
                      {lc}
                    </p>
                  ))}
                </div>
              </div>
              // <ul className="items-center flex flex-col">
              //   {countryCommittees.lcs.length <= 5 && listCommittees(false)}
              //   {countryCommittees.lcs.length > 5 && listCommittees(true, true)}
              //   {countryCommittees.lcs.length > 5 && (
              //     <Disclosure as="div">
              //       {({ open }) => (
              //         <>
              //           <Disclosure.Panel as="dd">
              //             {listCommittees(true, false)}
              //           </Disclosure.Panel>
              //           <dt className="text-lg">
              //             <Disclosure.Button className="flex md:w-2/7 items-start justify-between text-left text-[#F1F1E6] hover:text-[#B2D8FB] pt-6"
              //               onClick={onOpenCitiesHandler} style={{ fontSize: '18px' }}>
              //               <span className="font-base">
              //                 {isOpen ? 'Show less' : 'Show more'}
              //               </span>
              //               <span className="ml-6 flex h-7 items-center">
              //                 <ChevronDownIcon
              //                   className={classNames(
              //                     open ? "-rotate-180" : "rotate-0",
              //                     "h-6 w-6 transform"
              //                   )}
              //                   aria-hidden="true"
              //                 />
              //               </span>
              //             </Disclosure.Button>
              //           </dt>
              //         </>
              //       )}
              //     </Disclosure>
              //   )}
              // </ul>
            }
            {/* <p style={{ fontSize: "24px", paddingTop: "1rem" }}>
              You can also visit IAESTE {country} here:
            </p>
            <a style={{fontSize: "23px"}} href={countryCommittees.page}>{countryCommittees.page}</a>
         */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committees;
