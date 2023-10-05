import React, {useState} from "react";
import { committees } from "./committees";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { secondImage } from "../imageSection/secondImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Committees = ({ country }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenCitiesHandler = () => {
    setIsOpen(prev => !prev)
  }
  const countryCommittees = committees.find((obj) => obj.country === country);
  
  const selectedImg = secondImage.find((item) => item.country === country)?.image ?? ''

  return (
    <div className="relative bg-gray-900">
      <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src={selectedImg}
          alt=""
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
        />
      </div>
      <div
        className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2
            className="text-lg font-semibold text-gray-300"
            style={{ fontSize: "36px" }}
          >
            Cities with IAESTE LCs
          </h2>
          <p className="mt-2 font-bold tracking-tight text-white" style={{fontSize: '18px'}}>
            In {country.replace(/-/g, " ")} we have {countryCommittees.lcs.length} local commitees:
          </p>
          <p className="mt-3 text-3xl text-gray-300 sm:text-4xl">
            <ul>
              {countryCommittees.lcs.length <= 5 &&
                countryCommittees.lcs.map((committee) => {
                  return <li style={{fontSize: '24px'}} key={committee}>LC {committee}</li>;
                })}
              {countryCommittees.lcs.length > 5 &&
                countryCommittees.lcs.map((com, index) => {
                  if (index <= 5) {
                    return <li style={{fontSize: '24px'}} key={com}>{com}</li>;
                  }
                  return <></>;
                })}
              {countryCommittees.lcs.length > 5 && (
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        {countryCommittees.lcs.map((com, index) => {
                          if (index > 5) {
                            return <li style={{fontSize: '24px'}} key={com}>{com}</li>;
                          }
                          return <></>;
                        })}
                      </Disclosure.Panel>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex md:w-2/7 items-start justify-between text-left text-gray-400 pt-6"
                          onClick={onOpenCitiesHandler} style={{fontSize: '18px'}}>
                          <span className="font-medium text-white-900">
                            {isOpen ? 'Show less' : 'Show more'}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                    </>
                  )}
                </Disclosure>
              )}
            </ul>
            <p style={{ fontSize: "24px", paddingTop: "1rem" }}>
              You can also visit IAESTE {country} here:
            </p>
            <a style={{fontSize: "24px"}} href={countryCommittees.page}>{countryCommittees.page}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Committees;
